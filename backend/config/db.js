const mysql = require("mysql2");

const connection = mysql.createConnection(
    process.env.MYSQL_PUBLIC_URL
);

connection.connect((err) => {

    if(err){

        console.log("Database Connection Failed");

        console.log(err);

    }
    else{

        console.log("Database Connected");

    }

});

module.exports = connection;