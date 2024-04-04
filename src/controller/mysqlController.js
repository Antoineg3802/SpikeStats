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

function getTeam(teamId) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `teams` WHERE id = ' + teamId)
            .then((query) => {
                if (query.length == 0) {
                    resolve(false);
                } else {
                    resolve({
                        id: query[0].id,
                        name: query[0].name,
                        description: query[0].description,
                        owner: query[0].owner_id
                    })
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getTeamUsers(teamId) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT users.id, firstname, lastname, mail, roles.level FROM `teams_users` INNER JOIN `users` ON teams_users.user_id = users.id INNER JOIN `roles` ON users.role_id = roles.id WHERE team_id = ' + teamId)
            .then((query) => {
                if (query.length == 0) {
                    resolve(false);
                } else {
                    resolve(query);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getAllMatches(){
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `matches`')
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function getMatch(id, includeSets = true){
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `matches` WHERE id = ' + id)
            .then((rows) => {
                if (rows.length == 0) {
                    resolve(false);
                } else {
                    if (includeSets){
                        getSetsByMatch(id)
                        .then((users) => {
                            if(users.length > 0){
                                rows[0].users = users;
                                resolve(rows[0]);
                            }else{
                                resolve({
                                    error: true,
                                    status: 404,
                                    message: "No sets found for this match"
                                })
                            }
                        })
                    }else{
                        resolve(rows[0])
                    }
                }
            }).catch((err) => {
                reject(err)
            })
    })
}

function getSetsByMatch(matchId){
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `sets` WHERE match_id = ' + matchId)
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function postMatch(teamId, opponent, date, location){
    return new Promise((resolve, reject) => {
        SQLRequest('INSERT INTO `matches` (`team_id`, `opponent`, `date`, `location`) VALUES ("' + teamId + '","' + opponent + '","' + date + '","' + location + '")')
            .then((request) => {
                if (request.affectedRows) {
                    resolve({
                        id : request.insertId,
                        teamId : teamId,
                        opponent : opponent,
                        date : date,
                        location : location
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

function addSet(matchId, numberSet, startSet, endSet, teamScore, opponentScore, winner){
    return new Promise((resolve)=>{
        verifySet(matchId, numberSet)
        .then((isSetValid) => {
            if (isSetValid){
                isEndedMatch(matchId)
                    .then((isMatchEnded) => {
                        if (isMatchEnded){
                            resolve({
                                error: true,
                                status: 400,
                                message: 'Match already ended'
                            })
                        }else{
                            SQLRequest("INSERT INTO `sets` (`match_id`, `number_set`, `start_set`, `end_set`, `team_score`, `opponent_score`, `winner`) VALUES (" + matchId + "," + numberSet + ",'" + startSet + "','" + endSet + "'," + teamScore + "," + opponentScore + "," + winner + ")")
                            .then((request) => {
                                if (request.affectedRows) {
                                    resolve({
                                        id : request.insertId,
                                        matchId : matchId,
                                        numberSet : numberSet,
                                        startSet : startSet,
                                        endSet : endSet,
                                        teamScore : teamScore,
                                        opponentScore : opponentScore
                                    })
                                } else {
                                    resolve({
                                        error: true,
                                        status: 500,
                                        message: 'Internal server error'
                                    })
                                }
                            })
                        }
                    })
            }else{
                resolve({
                    error: true,
                    status: 400,
                    message: 'Set already exist'
                })
            }
        })
    })
}

function verifySet(matchId, numberSet){
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `sets` WHERE match_id = ' + matchId + ' AND number_set = ' + numberSet)
            .then((query) => {
                if (query.length == 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
    });
}

function isEndedMatch(matchId){
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT match_id, COUNT(CASE WHEN winner = 1 THEN 1 END) AS team_wins, COUNT(CASE WHEN winner = 0 THEN 1 END) AS opponent_wins FROM sets WHERE match_id = ' + matchId + ' GROUP BY match_id HAVING team_wins >= 3 OR opponent_wins >= 3;')
            .then((query) => {
                if (query.length == 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
    });
}

// setId, fault.type, player, fault.teamPoints, fault.oponentPoints
function pushFaults(setId, type_id, player_id, team_points, oponent_points){
    return new Promise((resolve) => {
        let requestString;
        if (player_id == null){
            requestString = 'INSERT INTO `faults` (`set_id`, `fault_type_id`, `team_points`, `oponent_points`) VALUES (' + setId + ',' + type_id + ',' + team_points + ',' + oponent_points + ')';
        }else{
            requestString = 'INSERT INTO `faults` (`set_id`, `player_id`, `fault_type_id`, `team_points`, `oponent_points`) VALUES (' + setId + ',' + player_id + ',' + type_id + ',' + team_points + ',' + oponent_points + ')';
        }
        SQLRequest(requestString)
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
            })
    })
}

function pushPoints(setId, type_id, player_id, team_points, oponent_points){
    return new Promise((resolve) => {
        let requestString;
        if (player_id == null){
            requestString = 'INSERT INTO `points` (`set_id`, `point_type_id`, `team_points`, `oponent_points`) VALUES (' + setId + ',' + type_id + ',' + team_points + ',' + oponent_points + ')';
        }else{
            requestString = 'INSERT INTO `points` (`set_id`, `player_id`, `point_type_id`, `team_points`, `oponent_points`) VALUES (' + setId + ',' + player_id + ',' + type_id + ',' + team_points + ',' + oponent_points + ')';
        }
        SQLRequest(requestString)
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
            })
    })
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
    joinTeam,
    getTeam,
    getTeamUsers,
    getAllMatches,
    getMatch,
    postMatch,
    addSet,
    pushFaults,
    pushPoints
}