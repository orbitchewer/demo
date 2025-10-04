import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load variables from your .env file

import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

// Use the CLIENT_URL from your .env file for CORS
app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee', EmployeeRouter);
app.use(express.static('Public'));

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        // Use the JWT_SECRET from your .env file
        Jwt.verify(token, process.env.JWT_SECRET, (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"});
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        return res.json({Status: false, Error: "Not authenticated"});
    }
};

app.get('/verify', verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id});
});

app.listen(3000, () => {
    console.log("Server is running");
});