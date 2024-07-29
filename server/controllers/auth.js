import { dbConnection } from "../config/db.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        if (!email || !password) {
            res.status(401).json({
                message: "Please enter email or password"
            })
        };

        const query = 'SELECT email FROM users WHERE email = ?'
        dbConnection.query(query, [username, email, password], (err, result) => {
            if (err) {
                res.status(400).json({
                    message: "Error happen in query function"
                })
            }

            if (result.length > 0) {
                res.status(401).json({
                    message: "Email has already has been exist"
                })
            } else {
                const hashedPassword = bcryptjs.hashSync(password, 10);

                dbConnection.query("INSERT INTO users SET ?", { username: username, email: email, password: hashedPassword }, (err, result) => {
                    if (err) {
                        res.status(402).json({
                            message: err.message
                        })
                    } else {
                        res.status(201).json({
                            message: "User created successfully"
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = "SELECT * FROM users WHERE email = ?";

        dbConnection.query(query, [email], (err, result) => {
            if (err) {
                res.status(403).json({
                    message: err.message
                })
            }

            if (result.length === 0) {
                res.status(402).json({
                    message:"User not found"
                })
            }; 


            const checkPassword = bcryptjs.compareSync(password, result[2].password);

            if (!checkPassword) {
                res.status(404).json({
                    message: "Wrong password"
                })
            };


            const token = jwt.sign({ id: result[1].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie("access_token", token, { httpOnly: true });
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}