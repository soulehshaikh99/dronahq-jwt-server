const express = require("express");
const login = require("./login");
const authorize = require("./authorize");

const app = express();

app.use(express.json());

const extractResponse = (msg) => {
    const status = msg.split('-');
    return {
        statusCode: status[0].trim(),
        statusMsg: status[1].trim()
    }
}

app.get("/health", (req, res, next) => {
    res.status(200).send(`Server is running fine!\nLocal time: ${new Date()}`);
});

app.post("/login", (req, res, next) => {
    const status = authorize(req.headers.authorization);
    const response = extractResponse(status);
    res.status(response.statusCode).send(response.statusMsg);
});

app.get('/emptyResponse', (req, res, next) => {
    res.status(204).send();
});

app.get("/data", (req, res, next) => {
    const status = authorize(req.headers.authorization);
    const response = extractResponse(status);
    if (response.statusCode === 200) {
        res.status(200).send([
            {
                "FirstName": "Joey",
                "PhoneNumber": "1-601-348-7614",
                "Email": "Eldora39@hotmail.com",
                "Vehicle": "Jeep Model T",
                "JobTitle": "Dynamic Interactions Orchestrator",
                "id": 1
            },
            {
                "FirstName": "Jovani",
                "PhoneNumber": "1-742-283-6472 x65650",
                "Email": "Kristin10@hotmail.com",
                "Vehicle": "BMW Spyder",
                "JobTitle": "Global Factors Director",
                "id": 2
            },
            {
                "FirstName": "Allison",
                "PhoneNumber": "289.224.4762",
                "Email": "Trinity.Collins47@hotmail.com",
                "Vehicle": "Tesla Sentra",
                "JobTitle": "Investor Communications Director",
                "id": 3
            },
            {
                "FirstName": "Trystan",
                "PhoneNumber": "524.645.0079",
                "Email": "Arlo_Goldner8@hotmail.com",
                "Vehicle": "Fiat Accord",
                "JobTitle": "Dynamic Functionality Consultant",
                "id": 4
            },
            {
                "FirstName": "Lester",
                "PhoneNumber": "857-406-9475 x323",
                "Email": "Alaina72@gmail.com",
                "Vehicle": "Bugatti Model 3",
                "JobTitle": "Central Metrics Manager",
                "id": 5
            },
            {
                "FirstName": "Felix",
                "PhoneNumber": "(356) 717-2673",
                "Email": "Ricky_Rippin47@hotmail.com",
                "Vehicle": "Chrysler Element",
                "JobTitle": "Customer Response Associate",
                "id": 6
            },
            {
                "FirstName": "Cordie",
                "PhoneNumber": "471-925-5123",
                "Email": "Oran98@yahoo.com",
                "Vehicle": "Smart Grand Caravan",
                "JobTitle": "Chief Markets Specialist",
                "id": 7
            },
            {
                "FirstName": "Magdalen",
                "PhoneNumber": "(597) 825-4142 x1107",
                "Email": "Jensen.Crooks@yahoo.com",
                "Vehicle": "Toyota 911",
                "JobTitle": "Corporate Configuration Specialist",
                "id": 8
            },
            {
                "FirstName": "Anibal",
                "PhoneNumber": "(538) 291-8557 x1402",
                "Email": "Sydney62@gmail.com",
                "Vehicle": "Mazda PT Cruiser",
                "JobTitle": "Dynamic Integration Agent",
                "id": 9
            },
            {
                "FirstName": "Lucienne",
                "PhoneNumber": "(566) 588-7835",
                "Email": "Jazmin_Wilkinson@gmail.com",
                "Vehicle": "Mercedes Benz Alpine",
                "JobTitle": "Corporate Response Analyst",
                "id": 10
            }
        ]);
    } else {
        res.status(response.statusCode).send(response.statusMsg);
    }
});

app.listen(process.env.PORT || "3000", () => {
    console.log(`Server is listening on port ${process.env.PORT || "3000"}`);
});