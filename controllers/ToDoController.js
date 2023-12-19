const ToDoModel = require("../models/ToDoModel")

module.exports.getAllToDos = async (req,res) => {
    const toDos = await ToDoModel.find();
    return res.status(200).send(toDos);
};

module.exports.getMyToDos = async (req,res) => {
    const {userid} = req.user;
    const toDos = await ToDoModel.find({user:userid});
    return res.status(200).send(toDos);
};

module.exports.saveToDos = (req,res) => {

    const {title, description} = req.body;
    const {userid} = req.user;
    const newTodo = {title, description, user:userid};

    ToDoModel.create(newTodo).then((data) => {
        console.log("data saved...");
        return res.status(201).send(data);
    }).catch( (error) => {
        return res.status(400).send({error: error, msg : "Something went wrong...!!"});
    });
};

module.exports.updateToDos = async (req, res) => {

    const todoId = req.params.id;
    const updateTodo = req.body;
    const { userid } = req.user;

    try {

        const updatedTodo = await ToDoModel.findOneAndUpdate({ _id: todoId, user: userid }, updateTodo, { new: true });

        if (!updatedTodo) {
          return res.status(404).send({ message: 'Todo not found' });
        } else {
            return res.status(201).send({ message: 'Todo updated successfully' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send({error: error, msg : "Something went wrong...!!"});
    }
};

module.exports.deleteToDos = (req,res) => {
    
    const todoId = req.params.id;
    const { userid } = req.user;
    
    ToDoModel.deleteOne({_id: todoId, user : userid}).then((result) => {
        
        if(result.deletedCount === 1) {
            return res.status(201).send({msg:"Deleted.."});
        } else {
            return res.status(201).send({msg:"Data not found.."});
        }
        
    }).catch( (error) => {
        return res.status(400).send({error: error, msg : "Something went wrong...!!"});
    });
};