const express = require("express");
const app = express();
const checkCustomGoals = require("./checkCustomGoals");
const fetchTests = require("./fetchTests");
const createAlert = require("./createAlert");
const sendAlert = require("./sendAlert");
const fetchRuleset = require("./checkFEexperiment");

app.use(express.json());

app.post("/pvh/optimizely/web", async (req, res) => {
    const runningTests = await fetchTests();
    const testsWithMissingGoals = checkCustomGoals(runningTests);
    
    if (testsWithMissingGoals.length) {
        const alert = createAlert(testsWithMissingGoals);
        sendAlert(alert);
    }
});

app.post("/pvh/optimizely/featureExperimentation", async (req, res) => {
    if (req.body.event === "project.ruleset_updated") {
    if (req.body.data[0].changes && 
        req.body.data[0].changes[0].property === "enabled" &&
        req.body.data[0].changes[0].after === true &&
        req.body.data[0].entity.api_url.indexOf("othersdb0") > -1) {

        const projectID = req.body.data[0].project_id;
        const flagKey = req.body.data[0].entity.api_url.split("flags/")[1].split("/")[0];
        const environment = req.body.data[0].entity.api_url.split("rules/")[1];
        
        const hasEqualTrafficAllocation = await fetchRuleset(projectID, flagKey, environment);

        if (!hasEqualTrafficAllocation) {
            console.log("unequal traffic allocation");
        }
        

    }
}


})

app.listen(3030, () => {
    console.log("listening on port 3030");
});