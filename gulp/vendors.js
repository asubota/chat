'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('vendors-css', function() {
  gulp.src($.mainBowerFiles())
    .pipe($.filter('*.css'))
    .pipe($.concat('vendors.css'))
    .pipe(gulp.dest(gulp.paths.dist + '/css/vendors/'));
});

gulp.task('vendors-js', function() {
  gulp.src($.mainBowerFiles())
    .pipe($.filter('*.js'))
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest(gulp.paths.dist + '/js/vendors/'));
});
