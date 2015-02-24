'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(gulp.paths.src + '/js/*.js', ['scripts']);

  // Watch .scss files
  gulp.watch(gulp.paths.src + '/styles/*.scss', ['sass']);
});
