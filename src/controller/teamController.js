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

module.exports = {
    getAllTeams,
    getTeam,
    postTeam
}