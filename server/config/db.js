import mysql from 'mysql2';

export const dbConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "anurag7587709264@#$%shukla",
    database: "blog",
    port: "3306"
});

// Handle connection errors
dbConnection.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
    } else {
        throw err;
    }
});

function handleDisconnect() {
    dbConnection.end(err => {
        if (err) {
            console.error('Error ending MySQL pool:', err);
        }
        console.log('Reconnecting to MySQL...');
        // Recreate the pool
        pool = mysql.createPool(dbConfig);
    });
}