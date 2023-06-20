const jwt = require("jsonwebtoken");
const usersList = require('./users.json');
const { IsNullOrEmpty } = require('./utils');

module.exports = (authorization) => {
    let role = '';
    const token = authorization.toString().replace(/(bearer|basic)\s/gmi, '');
    try {
        const payload = jwt.verify(token, 'dronahq@123');
        const username = payload.username;
        const password = payload.password;
        if (IsNullOrEmpty(username) || IsNullOrEmpty(password)) {
            return `401 - Invalid login credentials, missing username or password`;
        }
        for(let user of usersList) {
            if(user.username === username && user.password === password) {
                role = user.role;
            }
        }
        if(!role) {            
            return `401 - Invalid login credentials, cannot generate JWT!`;
        }
    } catch(err) {
        return `500 - ${err.message || "Some error occurred!"}`;
    }
    return `200 - Successfully logged in as ${role}`;
}