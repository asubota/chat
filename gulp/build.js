'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var series = require('stream-series');

gulp.task('clean', function(done) {
  $.del('public/', done);
});

gulp.task('build', ['vendors-css', 'vendors-js', 'coffee', 'sass', 'scripts', 'inject']);
