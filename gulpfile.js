var gulp = require('gulp');
var webserver = require('gulp-webserver');
var eslint = require('gulp-eslint');
var karma = require('karma').server;

var server = {
  host: 'localhost',
  port: '8001',
  root: './app'
};


var paths = {
  ourJsFiles: ['app/**/*.js', 'test/**/*.js', '!app/lib/**/*', '!protractor.conf.js']
};

gulp.task('webserver', function () {
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


gulp.task('default', ['webserver', 'lint', 'tdd', 'watch']);