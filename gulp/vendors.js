'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('vendors-css', function() {
  gulp.src($.mainBowerFiles())
    .pipe($.filter('*.css'))
    .pipe($.replace('themes/default/assets/fonts', '../../fonts'))
    .pipe($.concat('vendors.css'))
    .pipe(gulp.dest(gulp.paths.dist + '/css/vendors/'));
});

gulp.task('vendors-js', function() {
  gulp.src($.mainBowerFiles())
    .pipe($.filter('*.js'))
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest(gulp.paths.dist + '/js/vendors/'));
});

gulp.task('vendors-fonts', function() {
  return gulp.src(['./bower_components/semantic-ui/dist/themes/default/assets/fonts/*'])
    .pipe(gulp.dest(gulp.paths.dist + '/fonts/'));
});
