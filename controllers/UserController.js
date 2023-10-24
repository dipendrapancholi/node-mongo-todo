const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    return res.status(200).send(users);
};

module.exports.getUserByID = async (req, res) => {
    const {id} = req.body;
    const user = await UserModel.findOne({id});
    return res.status(200).send(user);
};

module.exports.getUserByUserName = async (req, res) => {
    const {username} = req.body;
    const user = await UserModel.findOne({username});
    return res.status(200).send(user);
};

module.exports.getUserByEmail = async (req, res) => {
    const {email} = req.body;
    const user = await UserModel.findOne({email});
    return res.status(200).send(user);
};

module.exports.createUser = (req, res) => {
    const newUser = req.body;
    newUser.password = bcrypt.hashSync(req.body.password, 10);

    if( newUser.password != newUser.cpassword ) {
        return res.status(400).send({"errors" : "Password and Confirm password does not match"});
    }

    UserModel.create(newUser).then(user => {
        return user.password = undefined;
        return res.status(201).send(user);
    }).catch( err => {
        return res.status(400).send(err);
    });
};

module.exports.userLogin = async (req, res) => {
    
    const {username, password} = req.body;
    const user = await UserModel.findOne({"$or":[{username:username},{email:username}]});
    
    if(!user) {
        return res.status(401).send("Authentication failed.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).send("Authentication failed.");
    }
    
    const userData = { 
            userid : user._id,
            username : user.username, 
            email : user.email,
            firstname : user.firstname,
            lastname : user.lastname
        };

    const token = jwt.sign(userData, process.env.SECRATE, { expiresIn: '1h' });
    return res.status(200).send({token : token});
};