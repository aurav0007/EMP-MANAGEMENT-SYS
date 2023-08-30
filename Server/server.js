import express, { response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
// import { verify } from 'crypto';

const app = express();

app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT","DELETE"],
        credentials: true
    }
));
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

// admin operations
app.get('/getadmininfo' ,(req,res) => {
    const sql = "SELECT * FROM users";
    connection.query(sql,(err,result) =>{
        if(err) res.json({Error: "Get User Detail Error"});
        return res.json({Status : "Success" , Result: result});
    })
})

app.delete('/admindelete/:id',(req,res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    connection.query(sql,[id],(err,result) =>{
        if(err) return res.json({Error : "Deletion admin error"});
        return res.json({Status : "Success"});
    })
})
app.put('/updatee/:id', (req,res)=>{
    const id = req.params.id;
    const sql = "UPDATE employee set name = ?,email = ?,address = ?,salary = ? WHERE id = ?";
    connection.query(sql, [req.body.name,req.body.email,req.body.address,req.body.salary, id] , (err,result) => {
    if(err) return res.json({Error :"Error in updating"});
    return res.json({Status :"Success"});
    })
})
// employee operation
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
app.put('/update/:id', (req,res)=>{
    const id = req.params.id;
    const sql = "UPDATE employee set salary = ? WHERE id = ?";
    connection.query(sql, [req.body.salary, id] , (err,result) => {
    if(err) return res.json({Error :"Error in updating"});
    return res.json({Status :"Success"});
    })
})



app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM employee WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete employee error in sql"});
        return res.json({Status: "Success"})
    })
})
 


const verifyUser = (req,res,next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error : "you are not Authenticated"});

    } else {
        jwt.verify(token, "jwt-secret-key" , (err,decoded) => {
            if(err) return res.json({Error : "Token Wrong"});
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        })
    }
}
app.get('/dashboard', verifyUser , (req,res) => {
      return res.json({Status : "Success", Role : req.role ,id : req.id});
})

app.get('/adminCount' , (req,res) =>{
    const sql = "SELECT count(id) as admin from users";
    connection.query(sql,(err,result) =>{
        if(err) return res.json({Error : "Error in running query"});
        return res.json( result);
    })
})

app.get('/employeeCount' ,(req,res) => {
    const sql = "SELECT count(id) as employee from employee";
    connection.query(sql, (err,result) =>{
        if(err) return res.json({Error : "Error in running query"});
        return res.json(result);
    })
})
app.get('/sumSalary' ,(req,res) => {
    const sql = "SELECT sum(salary) as salary from employee";
    connection.query(sql, (err,result) =>{
        if(err) return res.json({Error : "Error in running query"});
        return res.json(result);
    })
})
app.post('/login',(req,res) => {
   const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
   //run quesry
   connection.query(sql, [req.body.email, req.body.password], (err,result) => {
    if(err) return res.json({Status: "Error in Server", Error: "Error in running query"});
    if(result.length > 0)
    {
        // making logIN functionality as we login using jwt
        const id = result[0].id;
        const token = jwt.sign({role : "admin"},"jwt-secret-key", {expiresIn: '1d'});
        res.cookie('token' , token);

        return res.json({Status: "Success"})
    }else {
        return res.json({Status: "Error in Server", Error: "Wrong Email or Password"});
    }
   })
})

// employee login
app.post('/employeelogin',(req,res) => {
   const sql = "SELECT * FROM employee WHERE email = ?";
   //run quesry
   connection.query(sql, [req.body.email], (err,result) => {
    if(err) return res.json({Status: "Error in Server", Error: "Error in running query"});
    if(result.length > 0)
    {
        bcrypt.compare(req.body.password.toString(), result[0].password ,(err,response) =>
        {
            if(response) {
                const id = result[0].id;
                const token = jwt.sign({role : "employee" ,id:result[0].id},"jwt-secret-key", {expiresIn: '1d'});
                res.cookie('token' , token);
        
                return res.json({Status: "Success" , id : result[0].id})
            } 
            else { 
            return res.json({Error : "Wrong email or password"}); 
            }

        })
        // making logIN functionality as we login using jwt
       
    }else {
        return res.json({Status: "Error in Server", Error: "Wrong Email or Password"});
    }
   })
})

// app.get('/employee/:id', (req,res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee WHERE id = ?";
//     connection.query(sql, [id], (err,result)=>{
//         if(err) return res.json({Error : "Error in getting info to update"});
//         return res.json({Status:"Success", Result:result});
//     })
// })

app.get('/logout' , (req,res) => {
       res.clearCookie('token');
       return res.json({Status : "Success"})
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



app.listen(8081, () => {
    console.log("Running");
    console.log("Running");
});
