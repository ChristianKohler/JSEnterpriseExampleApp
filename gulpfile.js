var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webserver = require('gulp-webserver');

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

  gulp.watch(path.ourJsFiles, ['lint']);
});


gulp.task('lint', function () {
  gulp.src(path.ourJsFiles)
    .pipe(eslint())
    .pipe(eslint.format());

});


gulp.task('default', ['webserver']);
