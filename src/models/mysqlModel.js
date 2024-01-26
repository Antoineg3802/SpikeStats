const mysql = require('mysql2');
require('dotenv').config();

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 20
});

dbConnection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à MySQL');
});

function SQLRequest(query) {
    return new Promise((resolve, reject) => {
        dbConnection.query(query, (err, rows) => {
            if (err) {
                // Handle error
                console.log(err);
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

module.exports = {
    SQLRequest
}