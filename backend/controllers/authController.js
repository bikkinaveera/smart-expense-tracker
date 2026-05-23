const connection = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    connection.query(

        sql,

        [name, email, hashedPassword],

        (err, result) => {

            if(err){

                console.log(err);

                res.send("Registration Failed");

            }

            else{

                res.send("User Registered Successfully");

            }

        }

    );

};




const loginUser = (req, res) => {

    const { email, password } = req.body;

    const sql =
    "SELECT * FROM users WHERE email = ?";

    connection.query(sql, [email], async (err, result) => {

        if(err){

            res.send("Database Error");

        }

        else if(result.length == 0){

            res.send("User Not Found");

        }

        else{

            const user = result[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if(!isMatch){

                res.send("Invalid Password");

            }

            else{

                const token = jwt.sign(

                    {
                        id: user.id
                    },

                    "secretkey"

                );

                res.json({

                  message: "Login Successful",

                  token: token,

                  userId: user.id

              });

            }

        }

    });

};



module.exports = {

    registerUser,

    loginUser

};