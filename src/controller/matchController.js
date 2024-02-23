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
                            console.log(match)
                            resolve({
                                error: true,
                                status: 404,
                                message: "Match not found"
                            })
                        }else{
                            let startdateTime = functionController.inputDateToSQLDate(body.startTime)
                            let endDateTime = functionController.inputDateToSQLDate(body.endTime)
                            // mysqlController.addSet(matchId, body.setNumber, startdateTime, endDateTime, body.teams.currentTeam.points, body.teams.opponentTeam.points)
                                // .then((set) => {
                                //     if (set.error){
                                //         resolve(set)
                                //     }else{
                                        pushFaults(1, body.teams.currentTeam.foolsDetail)
                                        pushFaults(1, body.teams.opponentTeam.foolsDetail, true)
                                        pushPoints(1, body.teams.currentTeam.pointsDetail)
                                        pushPoints(1, body.teams.opponentTeam.pointsDetail, true)
                                //     }
                                // })
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
            console.log(fault)
            mysqlController.pushFaults(setId, fault.point, fault.player, isOponent)
                .then((response) => {
                    resolve(response)
                })
        })
    })
}

function pushPoints(setId, faults, isOponent = false){
    return new Promise((resolve) => {
        faults.forEach(fault => {
            mysqlController.pushPoints(setId, fault.point, fault.player, isOponent)
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