const mysqlController = require("./mysqlController");
const functionController = require("./functionController");
require("dotenv").config();
const bcrypt = require("bcrypt");

function getAllUsers() {
	return new Promise((resolve, reject) => {
		mysqlController
			.getAllUsers()
			.then((rows) => {
				resolve(rows);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function getOneUser(id) {
	return new Promise((resolve, reject) => {
		mysqlController
			.getOneUser(id)
			.then((user) => {
				if (user.length == 0) {
					resolve(false);
				}
				resolve(user[0]);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function logUser(email, password) {
	return new Promise((resolve, reject) => {
		mysqlController
			.verifyAccount(email)
			.then((user) => {
				if (user.length == 1) {
					bcrypt
						.compare(password, user[0].password)
						.then((isCorrect) => {
							if (isCorrect) {
								resolve({
									token: functionController.createToken(
										user[0].id,
										user[0].role
									),
									maxAge: 259560000,
								});
							} else {
								resolve({
									error: true,
									status: 400,
									message:
										"Invalid email/password combinaison",
								});
							}
						});
				} else {
					resolve({
						error: true,
						status: 404,
						message: 'No User found with email "' + email + '"',
					});
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function registerUser(firstname, lastname, mail, password, roleId) {
	return new Promise((resolve, reject) => {
		bcrypt
			.hash(password, 10)
			.then((hashPswd) => {
				mysqlController
					.registerUser(firstname, lastname, mail, hashPswd, roleId)
					.then((res) => {
						if (!res.error) {
							resolve({
								firstname: firstname,
								lastname: lastname,
								mail: mail,
							});
						} else {
							resolve(res);
						}
					});
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function updateUser(token, body) {
	let decodedToken = functionController.decodeToken(token)
	return new Promise((resolve) => {
		if (!decodedToken) {
			resolve({ error: true, status: 401, message: "Invalid JWT token" });
		}else{
			if (body.password) {
				bcrypt
				.hash(body.password, 10)
				.then((hashPswd) => {
					body.password = hashPswd

					mysqlController.updateUser(decodedToken.user_id, body).then((response) => {
						resolve(response);
					});
				})
			}
		}
	});
}

function getCurrentUser(token) {
	return new Promise((resolve) => {
		let decodedToken = functionController.decodeToken(token)
		if (decodedToken) {
			mysqlController.getOneUser(decodedToken.user_id).then((response) => {
				resolve(response[0]);
			});
		} else {
			resolve({ error: true, message: "Invalid JWT token" });
		}
	});
}

function deleteUser(token) {
	return new Promise((resolve) => {
		let decodedToken = functionController.decodeToken(token)
		if (decodedToken) {
			mysqlController.deleteUser(decodedToken.user_id).then((response) => {
				resolve(response);
			});
		}else{
			resolve({ error: true, message: "Invalid JWT token" });
		}
	});
}

module.exports = {
	getAllUsers,
	getOneUser,
	registerUser,
	logUser,
	updateUser,
	getCurrentUser,
	deleteUser,
};
