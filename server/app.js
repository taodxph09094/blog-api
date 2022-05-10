const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("../middleware/error");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//Route Import

const post = require("../routes/postRoute");
const user = require("../routes/userRoute");

app.use("/api/v1", post);

app.use("/api/v1", user);

app.use(errorMiddleware);
//Middleware for error

module.exports = app;
