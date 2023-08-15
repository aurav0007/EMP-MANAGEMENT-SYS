import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup" // Replace with your actual database name
});
//multer
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'public/imaged')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

connection.connect(function(err) {
    if (err) {
        console.error("Error in connection:", err);
    } else {
        console.log("Connected");
    }
});


app.post('/login',(req,res) => {
   const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
   //run quesry
   connection.query(sql, [req.body.email, req.body.password], (err,result) => {
    if(err) return res.json({Status: "Error in Server", Error: "Error in running query"});
    if(result.length > 0)
    {
        return res.json({Status: "Success"})
    }else {
        return res.json({Status: "Error in Server", Error: "Wrong Email or Password"});
    }
   })
})

app.post('/create',upload.single('image'), (req,res) =>{
    console.log(req.body);
})
app.listen(8081, () => {
    console.log("Running");
    console.log("Running");
});
