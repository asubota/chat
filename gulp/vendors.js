'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('vendors', ['vendors-fonts', 'vendors-css', 'vendors-js']);

gulp.task('vendors-css', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('*.css'))
    .pipe($.replace('themes/default/assets/fonts', '../../fonts'))
    .pipe($.concat('vendors.css'))
    .pipe($.minifyCss())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(gulp.paths.dist + '/css/vendors/'));
});

gulp.task('vendors-js', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('*.js'))
    .pipe($.concat('vendors.js'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe(gulp.dest(gulp.paths.dist + '/js/vendors/'));
});

gulp.task('vendors-fonts', function() {
  return gulp.src(['./bower_components/semantic-ui/dist/themes/default/assets/fonts/*'])
    .pipe(gulp.dest(gulp.paths.dist + '/fonts/'));
});
