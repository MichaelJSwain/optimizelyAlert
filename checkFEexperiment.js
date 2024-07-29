require('dotenv').config()
const {OPTLY_AUTH_TOKEN} = process.env;

const reqBody = {
    "event": "project.ruleset_updated",
    "data": [
        {
            "project_id": 20129521369,
            "changes": [
                {
                    "property": "enabled",
                    "before": false,
                    "after": true,
                    "description": "updated enabled"
                }
            ],
            "entity": {
                "api_url": "https://api.optly.com/v2/projects/20129521369/flags/qa_webhook_test/rules/othersdb0"
            }
        }
    ]
};

const fetchRuleset = async (projectID, flagKey, environment) => {
    const options = {method: 'GET', 
        headers: {
            accept: 'application/json',
            authorization: OPTLY_AUTH_TOKEN
        }};

    const hasEqualTrafficAllocation = await fetch(`https://api.optimizely.com/flags/v1/projects/${projectID}/flags/${flagKey}/environments/${environment}/ruleset`, options)
    .then(response => response.json())
    .then(response => {
        // console.log(response.rules.qa_webhook_test.variations);
        const testVariations = Object.keys(response.rules.qa_webhook_test.variations);
        // console.log(testVariations.variations);
        const hasEqualTrafficAllocation = testVariations.some(variation => {
            const v = response.rules.qa_webhook_test.variations[variation];
        return (v.percentage_included * testVariations.length) === 10000;
        })
        return hasEqualTrafficAllocation;
    })
    .catch(err => console.error(err));

    return hasEqualTrafficAllocation;
}

module.exports = fetchRuleset;

// if (reqBody.event === "project.ruleset_updated") {
//     if (reqBody.data[0].changes && 
//         reqBody.data[0].changes[0].property === "enabled" &&
//         reqBody.data[0].changes[0].after === true &&
//         reqBody.data[0].entity.api_url.indexOf("production") > -1) {
//         console.log("flag enabled on prod");
//         fetchRuleset();
//     }
// }


  
   
  
  