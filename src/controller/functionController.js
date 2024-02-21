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
            decodedToken = decoded
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
            expiresIn: "72h",
        }
    );

    return token;
}

module.exports = {
    decodeToken,
    createToken
}