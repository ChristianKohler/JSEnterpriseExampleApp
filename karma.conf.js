module.exports = function (config) {
  config.set({
    basePath: './',

    frameworks: ['jasmine' ],

    files: [
      'app/lib/angular/angular.min.js',
      'app/lib/angular-mocks/angular-mocks.js',
      'app/lib/angular-ui-router/release/angular-ui-router.min.js',
      'app/*.js',
      'test/unit/**/*.js'
    ],

    exclude: [
      'karma.conf.js'
    ],

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],

    // web server port
    port: 8081,

    // cli runner port
    runnerPort: 9000,

    reporters: ['progress'],

    captureTimeout: 7000
  });
};