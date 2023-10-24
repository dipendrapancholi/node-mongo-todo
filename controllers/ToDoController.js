const ToDoModel = require("../models/ToDoModel")

module.exports.getAllToDos = async (req,res) => {
    const toDos = await ToDoModel.find();
    return res.status(200).send(toDos);
};

module.exports.getMyToDos = async (req,res) => {
    const {id} = req.user;
    const toDos = await ToDoModel.find({user:id});
    return res.status(200).send(toDos);
};

module.exports.saveToDos = (req,res) => {

    const {title, description} = req.body;
    const {id} = req.user;
    const newTodo = {title, description, user:id};

    ToDoModel.create(newTodo).then((data) => {
        console.log("data saved...");
        return res.status(201).send(data);
    }).catch( (error) => {
        return res.status(400).send({error: error, msg : "Something went wrong...!!"});
    });
};

module.exports.deleteToDos = (req,res) => {
    const { id } = req.param;
    ToDoModel.findByIdAndDelete(id).then(() => {
        console.log("ToDo Deleted...");
        return res.status(201).send("Deleted...");
    }).catch( (error) => {
        return res.status(400).send({error: error, msg : "Something went wrong...!!"});
    });
};