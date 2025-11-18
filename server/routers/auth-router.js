const express = require("express");
const router = express.Router();

// const {home, register} = require("../controllers/auth-controller"); // this and the below line means is same
const authControllers = require("../controllers/auth-controller");

const signupSchema = require("../validators/auth-validator");  // this is the zod schema
const validate = require("../middlewares/validate-middleware");  // this middleware is checking the validator using using zod schema and details entered by the user.


// Router and controller dono saath mai use ho rhe hai yaha par. 
router.route("/").get(authControllers.home);  // iski jagah this was also correct : router.route("/").get(home); but to do this we have to uncomment line 4 and comment line 5 

// router.route("/register").get(authControllers.register);
router.route("/register").post(validate(signupSchema), authControllers.register); // here we are using middleware for zod schema checkup


router.route("/login").get(authControllers.login);








// Option1 (router)
// router.get("/", (req, res) => {
//     res.status(200).send("Welcome to the mern home page Created by Routers");
// });

// router.get("/register", (req, res) => {
//     res.status(200).send("Welcome to Registration page Created by Router");
// });


// Option 2 (router)
// router.route("/").get((req, res) => {
//     res.status(200).send("Welcome to the mern home page Created by Routers");
// });
// router.route("/register").get((req, res) => {
//     res.status(200).send("Welcome to Registration page Created by Router");
// });
// router.route("/login").get((req, res) => {
//     res.status(200).send("Welcome to Login page Created by Router");
// });


module.exports = router;