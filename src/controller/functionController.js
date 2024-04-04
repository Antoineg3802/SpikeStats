const jwt = require("jsonwebtoken");

function decodeToken(token) {
    let decodedToken
    if (token == undefined) {
        return false
    }
    jwt.verify(token, process.env.SHA_KEY, (err, decoded) => {
        if (err) {
            return false
        } else {
            let currentTime = new Date().getTime()
            if (currentTime <= decoded.exp * 1000) {
                decodedToken = decoded
            }else{
                decodedToken = false
            }
        }
    })
    return decodedToken
}

function createToken(userId, role = 2) {
    const token = jwt.sign(
        {
            user_id: userId,
            role: role
		},
        process.env.SHA_KEY,
        {
            expiresIn: "4h",
        }
    );

    return token;
}

function randomString(lenght){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < lenght; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Verify set validity
function doBodyOk(body){
    if (body.setNumber && body.startTime && body.endTime && body.teams && body.teams.currentTeam && body.teams.opponentTeam){
        if (body.teams.currentTeam.pointsDetail.length + body.teams.opponentTeam.faultsDetail.length === body.teams.currentTeam.points && body.teams.opponentTeam.pointsDetail.length + body.teams.currentTeam.faultsDetail.length === body.teams.opponentTeam.points){
            if (verifyTeamProperties(body.teams.currentTeam) && verifyTeamProperties(body.teams.opponentTeam)){
                return true
            }
        }
    }
    return false
}

function verifyTeamProperties(team){
    if (team.points && team.faultsDetail && team.pointsDetail){
        return true
    }
    return false
}

function inputDateToSQLDate(date){
    return dateTime = new Date(date).toISOString().slice(0, 19).replace("T", " ");
}

module.exports = {
    decodeToken,
    createToken,
    randomString,
    doBodyOk,
    inputDateToSQLDate
}