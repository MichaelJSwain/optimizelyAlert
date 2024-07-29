const createAlert = tests => {
    let alertBody = `
    Hello,

    The following tests are currently running with no custom goals: 
    
    ${tests}

    please update!
    `;

    // tests.forEach(t => {
    //     console.log(t);
    //     alertBody += `, ${t}`;
    // })
    
    return alertBody;
}

module.exports = createAlert;