const express = require("express");

const router = express.Router();

const {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense
} = require("../controllers/expenseController");

router.post("/addExpense", addExpense);

router.get("/expenses/:user_id", getExpenses);

router.delete("/deleteExpense/:id", deleteExpense);

router.put("/updateExpense/:id", updateExpense);

module.exports = router;