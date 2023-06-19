const express = require("express");
const authorize = require('./authorize');

const app = express();

app.use(express.json());

app.get("/health", (req, res, next) => {
    res.status(200).send(`Server is running fine!\nLocal time: ${new Date()}`);
});

app.post("/login", authorize);

app.listen(process.env.PORT || "3000", () => {
    console.log(`Server is listening on port ${process.env.PORT || "3000"}`);
});