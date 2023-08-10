import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // database: "your_database_name", // Replace with your actual database name
});

connection.connect(function(err) {
    if (err) {
        console.error("Error in connection:", err);
    } else {
        console.log("Connected");
    }
});

app.listen(8081, () => {
    console.log("Running");
});
