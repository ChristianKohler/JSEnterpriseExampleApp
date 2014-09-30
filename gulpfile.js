var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webserver = require('gulp-webserver');
var karma = require('karma').server;


var server = {
  host: 'localhost',
  port: '8001',
  root: './app'
};


var path = {
  ourJsFiles: ['app/**/*.js', 'test/**/*.js', '!app/lib/**/*']

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
  gulp.src(path.ourJsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});


/**
 * Runs our mocha unit tests with karma
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


gulp.task('default', ['webserver', 'tdd'], function () {
  gulp.watch(path.ourJsFiles, ['lint']);
});
