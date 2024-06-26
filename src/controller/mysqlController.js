const { SQLRequest } = require('../models/mysqlModel');
const { randomString } = require('./functionController');

function getAllUsers() {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT users.id, users.firstname, users.lastname, users.mail, level as role FROM `users` INNER JOIN `roles` ON users.role_id = roles.id WHERE users.active = 1')
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function getOneUser(id) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT users.id, users.firstname, users.lastname, users.mail, roles.level as role FROM `users` INNER JOIN `roles` ON users.role_id = roles.id WHERE users.id = ' + id + 'AND users.active = 1')
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function verifyAccount(email) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT users.id, users.firstname, users.lastname, users.password, users.mail, roles.level as role FROM `users` INNER JOIN `roles` ON users.role_id = roles.id WHERE `mail` = "' + email + '" AND users.active = 1')
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
        SQLRequest('SELECT * FROM `users` WHERE mail = "' + email + '" AND active = 1')
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
        SQLRequest('SELECT * FROM `users` WHERE id = "' + userId + '" AND active = 1')
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
    return new Promise(async(resolve) => {
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
    return new Promise(async(resolve) => {
        if (await doUserExistInDbById(userId)) {
            SQLRequest('UPDATE `users` SET active = 0 WHERE id = ' + userId)
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
        SQLRequest('SELECT * FROM `teams` WHERE active = 1')
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
                                                name: name,
                                                description: description,
                                                owner: user[0]
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
    SQLRequest('SELECT * FROM `teams` WHERE invitation_code = "' + code + '" AND active = 1')
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
        SQLRequest('SELECT * FROM `teams` WHERE invitation_code = "' + invitationCode + '" AND active = 1')
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
        SQLRequest('SELECT * FROM `teams_users` WHERE team_id = ' + teamId + ' AND user_id = ' + userId + ' AND active = 1')
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
        SQLRequest('SELECT * FROM `teams` WHERE id = ' + teamId + ' AND active = 1')
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
        SQLRequest('SELECT users.id, firstname, lastname, mail, roles.level FROM `teams_users` INNER JOIN `users` ON teams_users.user_id = users.id INNER JOIN `roles` ON users.role_id = roles.id WHERE team_id = ' + teamId + ' AND users.active = 1')
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

function getAllMatches(userId) {
    return new Promise((resolve, reject) => {
        const currentDate = new Date();
        SQLRequest('SELECT matches.id, matches.date, matches.opponent, matches.location FROM `matches` INNER JOIN `teams` ON matches.team_id = teams.id INNER JOIN `teams_users` ON teams_users.team_id = teams.id WHERE teams_users.user_id = ' + userId + ' AND matches.active = 1 AND matches.date < "' + currentDate.toISOString() + '" ORDER BY date DESC')
            .then((pastMatches) => {
                SQLRequest('SELECT matches.id, matches.date, matches.opponent, matches.location FROM `matches` INNER JOIN `teams` ON matches.team_id = teams.id INNER JOIN `teams_users` ON teams_users.team_id = teams.id WHERE teams_users.user_id = ' + userId + ' AND matches.active = 1 AND matches.date >= "' + currentDate.toISOString() + '" ORDER BY date ASC')
                    .then((incomingMatches) => {
                        resolve({ passed: pastMatches, incoming: incomingMatches });
                    }).catch((err) => {
                        reject(err);
                    });
            }).catch((err) => {
                reject(err);
            });
    })
}

function getMatch(id, includeSets = true, userId = null, role = 'admin') {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `matches` WHERE id = ' + id + ' AND active = 1')
            .then((rows) => {
                if (rows.length == 0) {
                    resolve(false);
                } else {
                    if (includeSets) {
                        isUserInMatch(id, userId).then((isUserInMatch) => {
                            if (isUserInMatch) {
                                getSetsByMatch(id)
                                    .then(async(sets) => {
                                        if (sets.length > 0) {
                                            let finalRow = rows[0];
                                            finalRow.sets = sets;
                                            for (const [index, set] of sets.entries()) { // Utiliser for...of pour pouvoir utiliser await à l'intérieur
                                                let results
                                                if (role == 'admin' || role == 'coach') {
                                                    results = await Promise.all([
                                                        getPointsBySet(set.id),
                                                        getFaultsBySet(set.id),
                                                        getPointsBySet(set.id, true),
                                                        getFaultsBySet(set.id, true)
                                                    ]);

                                                    finalRow.sets[index].points = {
                                                        teamPoints: results[0],
                                                        teamFaults: results[1],
                                                        opponentPoints: results[2],
                                                        opponentFaults: results[3],
                                                    };
                                                } else {
                                                    results = await Promise.all([
                                                        getPointsBySet(set.id, false, userId),
                                                        getFaultsBySet(set.id, false, userId)
                                                    ]);

                                                    finalRow.sets[index].points = {
                                                        teamPoints: results[0],
                                                        teamFaults: results[1]
                                                    };
                                                }
                                            }

                                            resolve(finalRow)
                                        } else {
                                            resolve({
                                                error: true,
                                                status: 404,
                                                message: "No sets found for this match"
                                            })
                                        }
                                    })
                            } else {
                                resolve({
                                    error: true,
                                    status: 403,
                                    message: "User not in match"
                                })
                            }
                        })
                    } else {
                        resolve(rows[0])
                    }
                }
            }).catch((err) => {
                reject(err)
            })
    })
}

function getSetsByMatch(matchId) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `sets` WHERE match_id = ' + matchId)
            .then((rows) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function getPointsBySet(setId, opponent = false, userId = null) {
    return new Promise((resolve, reject) => {
        let requestString;
        if (opponent) {
            requestString = 'SELECT pt.name, team_points, oponent_points FROM `points` INNER JOIN `point_type` pt ON points.point_type_id = pt.id WHERE set_id = ' + setId + ' AND player_id IS NULL'
        } else {
            if (userId != null) {
                requestString = 'SELECT pt.name, team_points, oponent_points FROM `points` INNER JOIN `point_type` pt ON points.point_type_id = pt.id WHERE set_id = ' + setId + ' AND player_id = ' + userId
            } else {
                requestString = 'SELECT pt.name,team_points, oponent_points, CONCAT(u.firstname, " ", u.lastname) AS player FROM `points` INNER JOIN `point_type` pt ON points.point_type_id = pt.id INNER JOIN `users` u ON u.id = points.player_id WHERE set_id = ' + setId + ' AND player_id IS NOT NULL'
            }
        }
        SQLRequest(requestString)
            .then((rows) => {
                resolve(rows);
            }).catch((err) => {
                reject(err)
            })
    })
}

function getFaultsBySet(setId, opponent = false, userId = null) {
    return new Promise((resolve, reject) => {
        let requestString;
        if (opponent) {
            requestString = 'SELECT ft.name,team_points, oponent_points FROM `faults` INNER JOIN `fault_type` ft ON faults.fault_type_id = ft.id WHERE set_id = ' + setId + ' AND player_id IS NULL'
        } else {
            if (userId != null) {
                requestString = 'SELECT ft.name, team_points, oponent_points FROM `faults` INNER JOIN `fault_type` ft ON faults.fault_type_id = ft.id WHERE set_id = ' + setId + ' AND player_id = ' + userId
            } else {
                requestString = 'SELECT ft.name, team_points, oponent_points, CONCAT(u.firstname, " ", u.lastname) AS player FROM `faults` INNER JOIN `fault_type` ft ON faults.fault_type_id = ft.id INNER JOIN `users` u ON u.id = faults.player_id WHERE set_id = ' + setId + ' AND player_id IS NOT NULL'
            }
        }
        SQLRequest(requestString)
            .then((rows) => {
                resolve(rows);
            }).catch((err) => {
                reject(err)
            })
    })
}

function postMatch(teamId, opponent, date, location) {
    return new Promise((resolve, reject) => {
        SQLRequest('INSERT INTO `matches` (`team_id`, `opponent`, `date`, `location`) VALUES ("' + teamId + '","' + opponent + '","' + date + '","' + location + '")')
            .then((request) => {
                if (request.affectedRows) {
                    resolve({
                        id: request.insertId,
                        teamId: teamId,
                        opponent: opponent,
                        date: date,
                        location: location
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

function addSet(matchId, numberSet, startSet, endSet, teamScore, opponentScore, winner) {
    return new Promise((resolve) => {
        verifySet(matchId, numberSet)
            .then((isSetValid) => {
                if (isSetValid) {
                    isEndedMatch(matchId)
                        .then((isMatchEnded) => {
                            if (isMatchEnded) {
                                resolve({
                                    error: true,
                                    status: 400,
                                    message: 'Match already ended'
                                })
                            } else {
                                SQLRequest("INSERT INTO `sets` (`match_id`, `number_set`, `start_set`, `end_set`, `team_score`, `opponent_score`, `winner`) VALUES (" + matchId + "," + numberSet + ",'" + startSet + "','" + endSet + "'," + teamScore + "," + opponentScore + "," + winner + ")")
                                    .then((request) => {
                                        if (request.affectedRows) {
                                            resolve({
                                                id: request.insertId,
                                                matchId: matchId,
                                                numberSet: numberSet,
                                                startSet: startSet,
                                                endSet: endSet,
                                                teamScore: teamScore,
                                                opponentScore: opponentScore
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
                } else {
                    resolve({
                        error: true,
                        status: 400,
                        message: 'Set already exist'
                    })
                }
            })
    })
}

function verifySet(matchId, numberSet) {
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

function isEndedMatch(matchId) {
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
function pushFaults(setId, type_id, player_id, team_points, oponent_points) {
    return new Promise((resolve) => {
        let requestString;
        if (player_id == null) {
            requestString = 'INSERT INTO `faults` (`set_id`, `fault_type_id`, `team_points`, `oponent_points`) VALUES (' + setId + ',' + type_id + ',' + team_points + ',' + oponent_points + ')';
        } else {
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

function pushPoints(setId, type_id, player_id, team_points, oponent_points) {
    return new Promise((resolve) => {
        let requestString;
        if (player_id == null) {
            requestString = 'INSERT INTO `points` (`set_id`, `point_type_id`, `team_points`, `oponent_points`) VALUES (' + setId + ',' + type_id + ',' + team_points + ',' + oponent_points + ')';
        } else {
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

function getMyTeams(userId) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT teams.id, teams.name, teams.description FROM `teams_users` INNER JOIN `teams` ON teams_users.team_id = teams.id WHERE user_id = ' + userId)
            .then((rows) => {
                SQLRequest('SELECT users.id, CONCAT(users.firstname, " ",users.firstname) AS name, roles.level AS role FROM `teams_users` INNER JOIN users ON users.id = teams_users.user_id INNER JOIN roles ON roles.id = users.role_id WHERE teams_users.team_id = ' + rows[0].id + ' ORDER BY roles.level ASC')
                    .then((users) => {
                        rows[0].members = users;
                        resolve(rows[0])
                    })
            }).catch((err) => {
                reject(err)
            })
    })
}

function isUserInMatch(matchId, userId) {
    return new Promise((resolve, reject) => {
        SQLRequest('SELECT * FROM `matches` INNER JOIN `teams_users` ON matches.team_id = teams_users.team_id WHERE matches.id = ' + matchId + ' AND user_id = ' + userId)
            .then((query) => {
                if (query.length == 0 || userId == null) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
    })
}

function deleteMatch() {
    return new Promise((resolve, reject) => {
        SQLRequest('UPDATE `matches` SET active = 0 WHERE id = ' + matchId)
            .then((query) => {
                if (query.affectedRows == 0) {
                    resolve(false)
                } else {
                    resolve(true)
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
    pushPoints,
    getPointsBySet,
    getFaultsBySet,
    getMyTeams,
    deleteMatch
}