'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'stream-series']
});

gulp.task('clean', function(done) {
  return $.del('public/', done);
});
