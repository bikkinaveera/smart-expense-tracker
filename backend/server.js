const express = require("express");

const cors = require("cors");

require("./config/db");

const expenseRoutes =
require("./routes/expenseRoutes");

const authRoutes =
require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", expenseRoutes);

app.use("/", authRoutes);

app.get("/", (req, res) => {

    res.send("Server Running");

});

app.listen(5000, () => {

    console.log("Server started on port 5000");

});