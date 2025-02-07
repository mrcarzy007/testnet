const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt"); 
const db = require("./bd");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

// ✅ Backend Check API
app.get("/", (req, res) => {
  res.send(`Backend Server is Fully Running`);
});

// 🔹 **Register API**
// app.post("/api/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
   
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
//     db.query(sql, [name, email, hashedPassword], (err, result) => {
//       if (err) {
//         console.error("Database Error:", err);
//         return res.status(500).json({ message: "Database error" });
//       }
//       res.json({ message: "User Registered Successfully!" });
//     });
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
  app.post("/api/register",(req,res)=>{
     const {applicationid, registrationNo, name , mobileNumber, dob, email,address1,address2,district,state,pincode,qualification,passoutYear} = req.body;
      if(!registrationNo){
        return res.status(400).json({message : "Registration number is required"});

      }
      const sql = `INSERT INTO users (applicationid,registrationNo,name, 
   mobileNumber, dob, email,address1,address2,district,state,pincode,qualification,passoutYear)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

       db.query(sql, [applicationid, registrationNo, name , mobileNumber, dob, email,address1,address2,district,state,pincode,qualification,passoutYear]
        ,(err,results) => {
          if(err) {
            console.error("Error inserting Data", err);
            return res.status(500).json({message :"DataBase error", error: err})
          }else {
            res.status(200).json({message : "Registration successfull", userId: results.insertId})
          }

        }
       )

  })

// 🔹 **Login API**
// app.post("/api/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = "SELECT * FROM users WHERE email = ?";
//   db.query(sql, [email], async (err, results) => {
//     if (err) {
//       console.log("Database Error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = results[0];

   
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     res.json({ message: "Login successful", user });
//   });
// });

app.post("/api/login",(req,res)=>{
  const {registrationNo,dob} = req.body;
   if(!registrationNo || !dob){
    return res.status(400).json({message : "All field are required"})
   }
   
   const sql = "SELECT * FROM users WHERE registrationNo = ? AND dob = ?";
   db.query(sql, [registrationNo,dob], (err,result)=>{
    if(err){
      console.log("Database Error", err)
      return res.status(500).json({message : "Database error"})
    }
    if(result.length === 0){
       return res.status(401).json({message : "Invalid Registration No or DOB"})
    }
    res.json({message : "Login Successfull ", user : result[0]})
   });
})
app.get("/api/dashboard/:registrationNo", (req, res) => {
  const { registrationNo } = req.params;

  if (!registrationNo) {
    return res.status(400).json({ message: "Registration number is required" });
  }

  const sql = "SELECT * FROM users WHERE registrationNo = ?";
  db.query(sql, [registrationNo], (err, result) => {
    if (err) {
      console.error("Database Error", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user: result[0] });
  });
});


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
