const express = require("express");
const app = express();
const errorMiddleware = require("../middleware/error");
app.use(express.json());
//Route Import

const post = require("../routes/postRoute");

app.use("/api/v1", post);
app.use(errorMiddleware);
//Middleware for error

module.exports = app;
