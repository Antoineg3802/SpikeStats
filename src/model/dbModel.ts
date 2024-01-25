import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "test",
});

try{
	const [results, fields] = await connection.query(
		'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
	);

	console.log(results);
	console.log(fields);
} catch (err) {
	console.log(err);
}

try {
	const [results] = await connection.query(
		"SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
		["Page", 45]
	);

	console.log(results);
} catch (err) {
	console.log(err);
}

export default connection;