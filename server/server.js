require('dotenv').config(); 
const express = require("express");
const app = express();
const authRoute = require("./routers/auth-router");
const calculateRouter = require("./routers/calculate-router");
const contactRoute = require("./routers/contact-router");

const connectDb = require("./utils/db");

const errorMiddleware = require("./middlewares/error-middleware");

// Middlewares
app.use(express.json());

// user related route
app.use("/api/auth", authRoute);

// calculator route
app.use("/api/calculate", calculateRouter);

// contact route
app.use("/api/form", contactRoute);

// error middleware to handle and sending response for the errors
app.use(errorMiddleware);

// app.get("/", (req, res) => {
//     res.status(200).send("Welcome to the world of mern Dishant");
// });

// app.get("/register", (req, res) => {
//     res.status(200).send("Registration successfull");
// });

// app.get("/login", (req, res) => {
//     res.status(200).send("Login successfull");
// });


PORT = 5000;
connectDb().then(() => {
app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});
})