require('dotenv').config()
const {OPTLY_AUTH_TOKEN} = process.env;


const fetchTests = async () => {
    console.log("fetching tests...");
    /*
    1. fetch all tests for the given projectID
    2. Filter "running" tests
    3. Filter PROD tests (running tests that are exposed to real users / not QA cookie audience)
    */
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: OPTLY_AUTH_TOKEN
        }

      };

      const tests = await fetch('https://api.optimizely.com/v2/experiments?per_page=100&page=1&project_id=26081140005', options)
      .then(response => response.json())
      .then(response => {
          const runningTests = response.filter(r => r.status === "running");
          const prodTests = runningTests.filter(t => {
            const audienceConditions = JSON.parse(t.audience_conditions);
                if (!(audienceConditions.some(a => a.audience_id === 25974863091) && audienceConditions[0] === "and")) { 
                    return t;
                }
          });
          return prodTests;
        })
      .catch(err => console.error(err));
      return tests;
};

module.exports = fetchTests;


// const audienceConditions = Array(t.audience_conditions);
// audienceConditions.forEach(audience => {
//     if (!(audience.some(a => a.audience_id === 25974863091) && audience[0] === "and")) {
//     console.log("prod test");
// } else {
//     console.log("non prod test");
// }
// return t;



