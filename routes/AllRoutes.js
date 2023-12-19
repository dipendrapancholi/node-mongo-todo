const {Router} = require("express");
const todoController = require("../controllers/ToDoController");
const UserController = require("../controllers/UserController");
const verifyToken = require("./verifyToken");

const router = Router();

//Main Routes
router.get( "/", (req, res) => {
    res.status(200).send("Welcom to the NodeMongo");
});

// TODO Routes
router.get( "/todos/getall", verifyToken, todoController.getAllToDos );
router.get( "/todos/mytodos", verifyToken, todoController.getMyToDos );
router.post( "/todos/save", verifyToken, todoController.saveToDos );
router.put( "/todos/update/:id", verifyToken, todoController.updateToDos );
router.delete( "/todos/delete/:id", verifyToken, todoController.deleteToDos );

// User Routes
router.get( "/users/getall", verifyToken, UserController.getAllUsers );
router.get( "/users/userbyid", verifyToken, UserController.getUserByID );
router.get( "/users/userbyusername", verifyToken, UserController.getUserByUserName );
router.get( "/users/userbyemail", verifyToken, UserController.getUserByEmail );

router.put( "/users/createuser", UserController.createUser );
router.post( "/users/userlogin", UserController.userLogin );

module.exports = router