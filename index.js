const express = require("express");
const authorize = require('./authorize');

const app = express();

app.use(express.json());

app.post("/login", authorize);

app.listen(process.env.PORT || "3000", () => {
    console.log(`Server is listening on port ${process.env.PORT || "3000"}`);
});