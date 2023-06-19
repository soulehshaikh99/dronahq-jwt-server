const jwt = require("jsonwebtoken");
const usersList = require('./users.json');
const { IsNullOrEmpty } = require('./utils');

module.exports = (req, res, next) => {    
    const token = req.headers.authorization.toString().replace(/(bearer|basic)\s/gmi, '');
    try {
        const payload = jwt.verify(token, 'dronahq@123');
        const username = payload.username;
        const password = payload.password;
        if (IsNullOrEmpty(username) || IsNullOrEmpty(password)) {
            return res.status(401).send({
                error: "Invalid login credentials, missing username or password"
            });
        }
        for(let user of usersList) {
            if(user.username === username && user.password === password) {
                res.locals.role = user.role;
            }
        }
        if(!res.locals.role) {
            return res.status(401).send({
                error: "Invalid login credentials, cannot generate JWT!"
            });
        }
    } catch(err) {
        return res.status(500).send({
            "error": err.message || "Some error occurred!"
        });
    }
    return res.status(200).send({
        "message": `Successfully logged in as ${res.locals.role}`
    });
}