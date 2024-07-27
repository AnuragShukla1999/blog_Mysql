import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import { dbConnection } from './config/db.js';
import authRouter from './routes/authRoute.js'


dotenv.config();

const app = express();


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());


app.use('/api', authRouter);



app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
});


dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');

    dbConnection.query("CREATE DATABASE IF NOT EXISTS blog", (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        };

        console.log("Database created or already exists");
    });
});













// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import mysql from 'mysql2';

// dotenv.config();

// const app = express();

// // Database configuration
// const dbConfig = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "anurag7587709264@#$%shukla",
//     port: "3306"
// };

// // Create a connection to MySQL server (no database specified)
// const initialConnection = mysql.createConnection(dbConfig);

// // Function to create the database
// function createDatabase(callback) {
//     initialConnection.query("CREATE DATABASE IF NOT EXISTS blog", (err, result) => {
//         if (err) {
//             console.error('Error creating database:', err);
//             callback(err);
//             return;
//         }
//         console.log("Database created or already exists");
//         callback(null);
//     });
// }

// // Function to connect to the newly created database
// function connectToDatabase() {
//     const dbConnection = mysql.createConnection({
//         ...dbConfig,
//         database: "blog"
//     });

//     dbConnection.connect((err) => {
//         if (err) {
//             console.error('Error connecting to MySQL database:', err);
//             return;
//         }
//         console.log('Connected to MySQL database');
//         // You can add other database initialization code here if needed
//     });

//     return dbConnection;
// }

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(cors());

// // Start the server
// app.listen(process.env.PORT, () => {
//     console.log(`Server is running at ${process.env.PORT}`);
// });

// // Create the database and then connect to it
// createDatabase((err) => {
//     if (err) return;

//     // Close the initial connection
//     initialConnection.end((err) => {
//         if (err) {
//             console.error('Error ending initial MySQL connection:', err);
//             return;
//         }
//         console.log('Initial connection ended, reconnecting to the database...');
        
//         // Connect to the database
//         const dbConnection = connectToDatabase();

//         // Additional setup or query executions can be done here using dbConnection
//     });
// });
