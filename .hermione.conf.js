module.exports = {
    baseUrl: 'http://localhost:7777',

    sets: {
        desktop: {
            files: 'tests/e2e/**/*.spec.js'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome' // this browser should be installed on your OS
            }
        }
    }
};
