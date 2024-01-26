import mysql, {RowDataPacket} from "mysql2/promise";
require('dotenv').config()

const dbConnection = await mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

try {
	await dbConnection.connect();
	console.log("Database connected");
} catch (error) {
	console.error("Failed to connect to the database:", error);
}
function SQLRequest(query: string): Promise<RowDataPacket>{
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

export default SQLRequest;