'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {
  // Watch .coffee files
  gulp.watch(gulp.paths.src + '/coffee/*.coffee', ['build']);

  // Watch .js files
  gulp.watch(gulp.paths.src + '/js/*.js', ['build']);

  // Watch .scss files
  gulp.watch(gulp.paths.src + '/styles/*.scss', ['build']);

  // Watch .html files
  gulp.watch(gulp.paths.src + '/index.html', ['build']);
});
