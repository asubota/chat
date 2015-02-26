'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'stream-series']
});

gulp.task('watch', function() {
  $.livereload.listen();

  gulp.watch([
    gulp.paths.src + '/coffee/*.coffee',
    gulp.paths.src + '/js/*.js',
    gulp.paths.src + '/styles/*.scss',
    gulp.paths.src + '/index.html'
  ], ['build']);
});
