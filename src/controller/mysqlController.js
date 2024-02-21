const { SQLRequest } = require('../models/mysqlModel');
const { randomString } = require('./functionController');

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
        SQLRequest('SELECT users.id, users.firstname, users.lastname, users.mail, roles.level as role FROM `users` INNER JOIN `roles` ON users.role_id = roles.id WHERE users.id = ' + id)
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function verifyAccount(email) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT users.id, users.firstname, users.lastname, users.password, users.mail, roles.level as role FROM `users` INNER JOIN `roles` ON users.role_id = roles.id WHERE `mail` = "' + email + '"')
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function registerUser(firstname, lastname, mail, password, roleId = 2) {
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
                    SQLRequest('INSERT INTO `users` (`firstname`, `lastname`, `mail`, `password`, `role_id`) VALUES ("' + firstname + '","' + lastname + '","' + mail + '","' + password + '", ' + roleId + ');')
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

function updateUser(userId, body) {
    // Utilisation de la fonction dans la fonction `updateUser`
    return new Promise(async (resolve) => {
        if (await doUserExistInDbById(userId)) {
            if (areKeysAllowed(body)) {
                const updateFields = Object.keys(body).map(key => `${key}='${body[key]}'`).join(', ');
                SQLRequest('UPDATE `users` SET ' + updateFields + ' WHERE id = ' + userId)
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
                    status: 400,
                    message: 'Invalid keys provided'
                });
            }
        } else {
            resolve({
                error: true,
                status: 404,
                message: 'User not found'
            });
        }
    });
}

function areKeysAllowed(body) {
    const allowedKeys = ['firstname', 'lastname', 'mail', 'password'];
    const keys = Object.keys(body);

    return keys.every(key => allowedKeys.includes(key));
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

function getAllTeams() {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `teams`')
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function postTeam(name, description, ownerId) {
    return new Promise((resolve, reject) => {
        getOneUser(ownerId)
            .then((user) => {
                if (!user) {
                    resolve({
                        error: true,
                        status: 404,
                        message: "User not found"
                    })
                } else {
                    getInvitationCode()
                        .then((code) => {
                            SQLRequest('INSERT INTO `teams` (`name`, `description`, owner_id, invitation_code) VALUES ("' + name + '","' + description + '","' + ownerId + '","' + code + '")')
                                .then((request) => {
                                    if (request.affectedRows) {
                                        resolve({
                                            error: false,
                                            data: {
                                                name : name,
                                                description : description,
                                                owner : user[0]
                                            }
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
                        })
                }
            })
    })
}

function getInvitationCode() {
    let code = randomString(10);
    return new Promise((resolve, reject) => {
        checkCode(code, resolve, reject);
    });
}

function checkCode(code, resolve, reject) {
    SQLRequest('SELECT * FROM `teams` WHERE invitation_code = "' + code + '"')
        .then((query) => {
            if (query.length == 0) {
                resolve(code);
            } else {
                let newCode = randomString(10);
                checkCode(newCode, resolve, reject);
            }
        })
        .catch((err) => {
            reject(err);
        });
}

function getTeamByInvitationCode(invitationCode) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `teams` WHERE invitation_code = "' + invitationCode + '"')
            .then((query) => {
                if (query.length == 0) {
                    resolve(false);
                } else {
                    resolve(query[0]);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function joinTeam(teamId, userId) {
    return new Promise((resolve, reject) => {
        verifyUserInTeam(teamId, userId)
        .then((isUserInTeam) => {
            if (isUserInTeam) {
                resolve({
                    error: true,
                    status: 409,
                    message: "User already in team"
                })
            } else {
                SQLRequest('INSERT INTO `teams_users` (`team_id`, `user_id`) VALUES (' + teamId + ',' + userId + ')')
                    .then((request) => {
                        if (request.affectedRows) {
                            resolve({
                                error: false
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

function verifyUserInTeam(teamId, userId) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `teams_users` WHERE team_id = ' + teamId + ' AND user_id = ' + userId)
            .then((query) => {
                if (query.length == 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    getAllUsers,
    getOneUser,
    verifyAccount,
    registerUser,
    updateUser,
    deleteUser,
    getAllTeams,
    postTeam,
    getTeamByInvitationCode,
    joinTeam
}