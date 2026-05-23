const connection = require("../config/db");



const addExpense = (req, res) => {

    const {
        amount,
        category,
        user_id
    } = req.body;

    const sql =
    "INSERT INTO expenses (amount, category, user_id) VALUES (?, ?, ?)";

    connection.query(

        sql,

        [amount, category, user_id],

        (err, result) => {

            if(err){

                res.send("Error Adding Expense");

            }

            else{

                res.send("Expense Added Successfully");

            }

        }

    );

};




const getExpenses = (req, res) => {

    const user_id = req.params.user_id;

    const sql =
    "SELECT * FROM expenses WHERE user_id = ?";

    connection.query(sql, [user_id], (err, result) => {

        if(err){

            res.send("Error Fetching Expenses");

        }

        else{

            res.json(result);

        }

    });

};




const deleteExpense = (req, res) => {

    const id = req.params.id;

    const sql =
    "DELETE FROM expenses WHERE id = ?";

    connection.query(sql, [id], (err, result) => {

        if(err){

            res.send("Error Deleting Expense");

        }

        else{

            res.send("Expense Deleted Successfully");

        }

    });

};




const updateExpense = (req, res) => {

    const id = req.params.id;

    const {
        amount,
        category
    } = req.body;

    const sql =
    "UPDATE expenses SET amount = ?, category = ? WHERE id = ?";

    connection.query(

        sql,

        [amount, category, id],

        (err, result) => {

            if(err){

                res.send("Error Updating Expense");

            }

            else{

                res.send("Expense Updated Successfully");

            }

        }

    );

};




module.exports = {

    addExpense,

    getExpenses,

    deleteExpense,

    updateExpense

};