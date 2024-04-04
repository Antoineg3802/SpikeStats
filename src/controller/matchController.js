const mysqlController = require("./mysqlController");
const functionController = require("./functionController");

function getAllMatches() {
    return new Promise((resolve) => {
        mysqlController.getAllMatches()
            .then((matches) => {
                resolve(matches)
            })
    })
}

function getMatch(id) {
    return new Promise((resolve) => {
        mysqlController.getMatch(id)
            .then((match) => {
                resolve(match)
            })
    })
}

function postMatch(body, token){
    let decodedToken = functionController.decodeToken(token)
    return new Promise((resolve) => {
        if(decodedToken){
            if (decodedToken.role=== "player"){
                resolve({
                    error: true,
                    status: 403,
                    message: "User must be a coach to create a match"
                })
            }else{
                if (body.teamId && body.opponent && body.date && body.location){
                    let dateTime = functionController.inputDateToSQLDate(body.date);
                    mysqlController.postMatch(body.teamId, body.opponent, dateTime, body.location)
                        .then((response) => {
                            resolve(response)
                        })
                }else{
                    resolve({
                        error: true,
                        status: 400,
                        message: "Invalid parameters"
                    })
                }
            }
        }else{
            resolve({
                error: true,
                status: 401,
                message: "Invalid JWT token"
            })
        }
    })
}

function addSet(matchId, body, token){
    let decodedToken = functionController.decodeToken(token)
    return new Promise((resolve) => {
        if(decodedToken){
            if (decodedToken.role=== "player"){
                resolve({
                    error: true,
                    status: 403,
                    message: "User must be a coach to add a set"
                })
            }else{
                if (functionController.doBodyOk(body)){
                    mysqlController.getMatch(matchId, false)
                    .then((match) => {
                        if (match.error){
                            resolve({
                                error: true,
                                status: 404,
                                message: "Match not found"
                            })
                        }else{
                            let startdateTime = functionController.inputDateToSQLDate(body.startTime)
                            let endDateTime = functionController.inputDateToSQLDate(body.endTime)
                            let isWinner = body.teams.currentTeam.points > body.teams.opponentTeam.points ? true : false
                            mysqlController.addSet(matchId, body.setNumber, startdateTime, endDateTime, body.teams.currentTeam.points, body.teams.opponentTeam.points, isWinner)
                                .then((set) => {
                                    if (set.error){
                                        resolve({
                                            error: true,
                                            status: set.status,
                                            message: set.message
                                        })
                                    }else{
                                        Promise.all([
                                            pushFaults(set.id, body.teams.currentTeam.faultsDetail),
                                            pushFaults(set.id, body.teams.opponentTeam.faultsDetail, true),
                                            pushPoints(set.id, body.teams.currentTeam.pointsDetail),
                                            pushPoints(set.id, body.teams.opponentTeam.pointsDetail, true)
                                        ]).then(() => {
                                            resolve({
                                                error: false,
                                                status: 201,
                                                message: "Set added successfully"
                                            })
                                        }).catch((error) => {
                                            resolve({
                                                error: true,
                                                status: 500,
                                                message: error.message
                                            })
                                        });
                                    }
                                })
                        }
                    })
                }else{
                    resolve({
                        error: true,
                        status: 400,
                        message: "Invalid parameters"
                    })
                }
            }
        }else{
            resolve({
                error: true,
                status: 401,
                message: "Invalid JWT token"
            })
        }
    })
}

function pushFaults(setId, faults, isOponent = false){
    return new Promise((resolve) => {
        faults.forEach(fault => {
            let player = isOponent ? null : fault.playerId;
            mysqlController.pushFaults(setId, fault.typeId, player, fault.teamPoints, fault.oponentPoints)
                .then((response) => {
                    resolve(response)
                })
        })
    })
}

function pushPoints(setId, points, isOponent = false){
    return new Promise((resolve) => {
        points.forEach(point => {
            let player = isOponent ? null : point.playerId;
            mysqlController.pushPoints(setId, point.typeId, player, point.teamPoints, point.oponentPoints)
                .then((response) => {
                    resolve(response)
                })
        })
    })
}

module.exports = {
    getAllMatches,
    getMatch,
    postMatch,
    addSet
}