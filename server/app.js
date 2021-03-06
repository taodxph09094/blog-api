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
const category = require("../routes/categoryRoute");
const tag = require("../routes/tagRoute");
const sub = require("../routes/subRoute");
app.use("/api/v1", post);

app.use("/api/v1", user);

app.use("/api/v1", category);

app.use("/api/v1", tag);
app.use("/api/v1", sub);
app.use(errorMiddleware);
//Middleware for error

module.exports = app;
