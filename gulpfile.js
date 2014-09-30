var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webserver = require('gulp-webserver');
var karma = require('karma').server;
var protractor = require('gulp-protractor').protractor;
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;

var server = {
  host: 'localhost',
  port: '8001',
  root: './app'
};


var paths = {
  ourJsFiles: ['app/**/*.js', 'test/**/*.js', '!app/lib/**/*', '!protractor.conf.js']
};

gulp.task('webserver', ['lint'], function () {
  gulp.src(server.root)
    .pipe(webserver({
      host: server.host,
      port: server.port,
      open: true,
      livereload: true,
      directoryListing: false
    }));
});


gulp.task('lint', function () {
  gulp.src(paths.ourJsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('seleniumServer', webdriverStandalone);

/**
 * Runs our e2e tests
 * */
gulp.task('e2e', function () {
  gulp.src(['test/e2e/*.js'])
    .pipe(protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', function (err) {
      throw err;
    });
});

/**
 * Runs our unit tests with karma
 * */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    autoWatch: false
  }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 * */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true
  }, done);
});

gulp.task('watch', function () {
  gulp.watch(paths.ourJsFiles, ['lint']);
});


gulp.task('default', ['webserver', 'tdd', 'seleniumServer', 'watch']);