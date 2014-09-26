var gulp      = require('gulp');
var webserver = require('gulp-webserver');

var server = {
  host: 'localhost',
  port: '8001',
  root: './app'
}

gulp.task('webserver', function() {
  gulp.src( server.root )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      open:             true,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('default', ['webserver']);
