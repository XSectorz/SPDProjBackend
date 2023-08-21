const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


module.exports = app;
