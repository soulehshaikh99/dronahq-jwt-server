const authorize = require("./authorize");

const extractResponse = (msg) => {
    const status = msg.split('-');
    return {
        statusCode: status[0].trim(),
        statusMsg: status[1].trim()
    }
}

module.exports = (req, res, next) => {
    const status = authorize(req.headers.authorization);
    const response = extractResponse(status);
    res.status(response.statusCode).send(response.statusMsg);
}