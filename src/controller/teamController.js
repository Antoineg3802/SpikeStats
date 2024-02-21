const mysqlController = require("./mysqlController");
const functionController = require("./functionController");

function getAllTeams() {
    return new Promise((reslove, reject) => {
        mysqlController.getAllTeams()
            .then((rows) => {
                reslove(rows)
            }).catch((err) => {
                reject(err)
            })
    })
}

function getTeam(teamId) {
    
}

function postTeam(name, description, userId, token) {
    let decodedToken = functionController.decodeToken(token)
    return new Promise((resolve, reject) => {
        if(decodedToken){
            if (decodedToken.role !== "admin" && decodedToken.role !== "coach"){
                resolve({
                    error: true,
                    status: 403,
                    message: "Insufficient credentials"
                })
            }else{
                let ownerId = userId ? userId: userId = decodedToken.user_id
                mysqlController.postTeam(name, description, ownerId)
                    .then((response) => {
                        if (response.error){
                            resolve(response)
                        }else{
                            resolve(response.data)
                        }
                        resolve(response)
                    }).catch((err) => {
                        reject(err)
                    })
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

function joinTeam(invitationCode, token){
    return new Promise((resolve, reject) => {
        let decodedToken = functionController.decodeToken(token)
        if (decodedToken){
            if (decodedToken.role !== "player"){
                resolve({
                    error: true,
                    status: 403,
                    message: "User must be a player to join a team"
                })
            }else{
                mysqlController.getTeamByInvitationCode(invitationCode)
                    .then((team) => {
                        if (team){
                            mysqlController.joinTeam(decodedToken.user_id, team.id)
                                .then((response) => {
                                    if (response.error){
                                        resolve(response)
                                    }else{
                                        resolve({
                                            team: team,
                                            user: decodedToken.user_id
                                        })
                                    }
                                }).catch((err) => {
                                    reject(err)
                                })
                        }else{
                            resolve({
                                error: true,
                                status: 400,
                                message: "Invalid invitation code"
                            })
                        }
                    }).catch((err) => {
                        reject(err)
                    })
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
    getAllTeams,
    getTeam,
    postTeam,
    joinTeam
}