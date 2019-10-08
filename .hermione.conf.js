module.exports = {
    baseUrl: 'http://localhost:7777',
    retry: 1,
    screenshotsDir: 'tests/e2e/screens',

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
    },

    plugins: {
        'html-reporter/hermione': {
            enabled: true,
            path: 'tests/e2e/html-report',
        }
    },
};
