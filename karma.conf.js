module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*.js'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    concurrency: Infinity,
    preprocessors: {
      'test/**/*.js': ['webpack'],
    },
    reporters: ['mocha', 'coverage'], //report results in this format
    mochaReporter: {
      output: 'autowatch',
    },
    coverageReporter: {
      reporters: [{type: 'text'}, {type: 'html'}],
    },
  });
};
