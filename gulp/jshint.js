'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('jshint', function() {
  return gulp.src(gulp.paths.src + '/js/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish-ex'));
});
