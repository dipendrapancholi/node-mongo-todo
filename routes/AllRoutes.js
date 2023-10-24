const {Router} = require("express");
const todoController = require("../controllers/ToDoController");
const UserController = require("../controllers/UserController");

const router = Router();

//Main Routes
router.get( "/", (req, res) => {
    res.status(200).send("Welcom to the NodeMongo");
});

// TODO Routes
router.get( "/todos/getall", todoController.getAllToDos );
router.post( "/todos/mytodos", todoController.getMyToDos );
router.post( "/todos/save", todoController.saveToDos );
router.delete( "/todos/delete/:id", todoController.deleteToDos );

// User Routes
router.get( "/users/getall", UserController.getAllUsers );
router.get( "/users/userbyid", UserController.getUserByID );
router.get( "/users/userbyusername", UserController.getUserByUserName );
router.get( "/users/userbyemail", UserController.getUserByEmail );

router.put( "/users/createuser", UserController.createUser );
router.get( "/users/userlogin", UserController.userLogin );

module.exports = router