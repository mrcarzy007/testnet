const mysql = require("mysql2");

const db = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "",
  database : "registration_db",
})

db.connect((err)=>{
   if(err){
    console.log("DataBase Connection Failed", err);
    return;
   }
   else {
      console.log("Connected to mysql Database")
   }
})

module.exports = db;