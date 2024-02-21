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
                    let dateTime = new Date(body.date).toISOString().slice(0, 19).replace("T", " ");
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

module.exports = {
    getAllMatches,
    getMatch,
    postMatch
}