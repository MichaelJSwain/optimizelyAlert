const checkCustomGoals = tests => {
    let testsWithMissingGoals = [];

    tests.forEach(test => {
        if (test.changes.length && test.changes.some(c => c.type === 'custom_code')) {
            const customCode = test.changes.filter(c => c.type === 'custom_code');
            if (customCode && customCode[0].value.indexOf('optimizely.sendAnalyticsEvents') === -1) {
                testsWithMissingGoals.push(test.name);
            }
         } else {
            testsWithMissingGoals.push(test.name);
         }
    });

     return testsWithMissingGoals;
};

module.exports = checkCustomGoals;