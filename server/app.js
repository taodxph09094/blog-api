const express = require("express");
const app = express();

app.use(express.json());
//Route Import

const post = require("../routes/postRoute");

app.use("/api/v1", post);

module.exports = app;
