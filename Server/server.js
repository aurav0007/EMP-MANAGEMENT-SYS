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
app.use(express.static('public'));

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

app.post('/create',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (`name`,`email`,`password`, `address`, `salary`,`image`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename
        ]
        connection.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inside singup query"});
            return res.json({Status: "Success"});
        })
    } )
})

app.put('/update/:id', (req,res)=>{
    const id = req.params.id;
    const sql = "UPDATE employee set salary = ? WHERE id = ?";
    connection.query(sql, [req.body.salary, id] , (err,result) => {
    if(err) return res.json({Error :"Error in updating"});
    return res.json({Status :"Success"});
    })
})
app.get('/getEmployee', (req,res) => {
    const sql = "SELECT * FROM employee";
    connection.query(sql,(err,result) => {
        if(err) return res.json({Error:"Get Employee Error"});
        return res.json({Status : "Success" ,Result: result});
    })
})

app.get('/get/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    connection.query(sql, [id], (err,result)=>{
        if(err) return res.json({Error : "Error in getting info to update"});
        return res.json({Status:"Success", Result:result});
    })

})
app.delete('/delete/:id' , (req,res) =>{
    const id = req.params.id;
    const sql = "DELETE from employee Where id=?";
    connection.query(sql ,[id], (err,result) =>{
        if(err) return res.json({Error : "Error in deleting"});
        return res.json({Status : "Success"});
    })
})

app.listen(8081, () => {
    console.log("Running");
    console.log("Running");
});
