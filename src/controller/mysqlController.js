const {SQLRequest} = require('../models/mysqlModel');

function getAllUsers() {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT users.id, users.firstname, users.lastname, users.mail, level as role FROM `users` INNER JOIN `roles` ON users.role_id = roles.id')
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function getOneUser(id) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT id, firstname, lastname, mail, level as role FROM `users` WHERE id = ' + id +
        'INNER JOIN `roles` ON users.role_id = roles.id')
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function verifyAccount(email) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `users` WHERE `mail` = "' + email + '"')
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function registerUser(firstname, lastname, mail, password) {
    return new Promise((resolve, reject) => {
        doUserExistInDb(mail)
            .then((isUserInDb) => {
                if (isUserInDb) {
                    resolve({
                        error: true,
                        status: 409,
                        message: "User already exist with email '" + mail + "'"
                    })
                } else {
                    SQLRequest('INSERT INTO `users` (`firstname`, `lastname`, `mail`, `password`) VALUES ("' + firstname + '","' + lastname + '","' + mail + '","' + password + '");')
                        .then((request) => {
                            if (request.affectedRows) {
                                resolve({
                                    error: false,
                                    userId: parseInt(request.insertId)
                                })
                            } else {
                                resolve({
                                    error: true,
                                    status: 500,
                                    message: 'Internal server error'
                                })
                            }
                        }).catch((err) => {
                            reject(err)
                        })
                }
            })
    })
}

function doUserExistInDb(email) {
    return new Promise((resolve) => {
        SQLRequest('SELECT * FROM `users` WHERE mail = "' + email + '"')
            .then((query) => {
                if (query.length == 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })
}

function doUserExistInDbById(userId) {
    return new Promise((resolve) => {
        SQLRequest('SELECT * FROM `users` WHERE id = "' + userId + '"')
            .then((query) => {
                if (query.length == 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })
}

function updateUser(user_id, body) {
    return new Promise(async (resolve) => {
        if (await doUserExistInDbById(user_id)) {
            SQLRequest('UPDATE table SET ' + body + ' WHERE id=' + user_id)
                .then((query) => {
                    if (query.affectedRows == 0) {
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                })
        } else {
            resolve({
                error: true,
                status: 404,
                message: 'User not found'
            })
        }
    })
}

function deleteUser(userId) {
    return new Promise(async (resolve) => {
        if (await doUserExistInDbById(userId)) {
            SQLRequest('DELETE FROM `users` WHERE id = ' + userId)
                .then((query) => {
                    if (query.affectedRows == 0) {
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                })
        } else {
            resolve({
                error: true,
                message: 'User not found'
            })
        }
    })
}

module.exports = {
    getAllUsers,
    getOneUser,
    verifyAccount,
    registerUser,
    updateUser,
    deleteUser
}