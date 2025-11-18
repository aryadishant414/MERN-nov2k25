const User = require("../models/user-model");
const bcrypt = require('bcryptjs'); // used to hash the password for security



// ************************** Home Logic *****************************
const home = async (req, res) => {
    try {   
        res.status(200).send("Welcome to the mern home page Created by Controller");
    } catch (error) {
        res.status(400).send({msg: "Its a error by server side using controller"});
    }
}


// ***************************** User Registration Logic *************************************
const register = async (req, res) => {
    try {
        // console.log(req.body);
        // const data = req.body;

        // Get the registration data which is send by the frontend
        const { username, email, phone, password } = req.body;

        // Check email existence
        const userExist = await User.findOne({email: email});

        if(userExist) {
            return res.status(400).json({msg: "email already exist"});
        }

        // Password hashing
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        // Creating the user into our database
        const createdUser = await User.create({username: username, email: email, phone: phone, password: hash_password });



        // here we are using the 'jwt' token 
        res.status(200).json({ msg: createdUser, token: await createdUser.generateToken(), userId: createdUser._id.toString(),

        });
    } catch (error) {
        console.log(error);
        
        res.status(400).send({msg : "Page not found"});
    }
}
// const register = async (req, res) => {
//     try {
//         res.status(200).send("Welcome to Registration page created by Controller");
//     } catch (error) {
//         res.status(400).send({msg : "Page not found"});
//     }
// }


// ******************** User Login Logic *************************************
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email: email});
        console.log("Value inside userExist" , userExist);
        

        if(!userExist) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        // Compare the password
        // const isPasswordValid = await bcrypt.compare(password, userExist.password);  //Option 1
        const isPasswordValid = await userExist.comparePassword(password);  // this compare password is a custom method that we have defined inside our 'user-model.js' file. so now the request is going there

        if(isPasswordValid) {
            res.status(200).json({msg : "Login Successfull", token: await userExist.generateToken(), userId: userExist._id.toString(),})
        } else {
            res.status(401).json({ message: "Invalid email or password"});
        }

        
    } catch (error) {
        res.status(400).send("Error Internal server error!! we cant get you Login page created by Controllers");
    }
}



module.exports = {home, register, login};