'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(gulp.paths.src + '/js/*.js', ['scripts', 'build']);

  // Watch .scss files
  gulp.watch(gulp.paths.src + '/styles/*.scss', ['sass', 'build']);

  // Watch .html files
  gulp.watch(gulp.paths.src + '/index.html', ['build']);
});
