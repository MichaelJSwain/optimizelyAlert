const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
    console.log("optimizely web project updated = ", req.body);
});

app.listen(3030, () => {
    console.log("listening on port 3030");
});