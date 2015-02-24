'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'stream-series']
});

var series = require('stream-series');

gulp.task('clean', function(done) {
  $.del('public/', done);
});

gulp.task('build', ['vendors-css', 'vendors-js', 'sass', 'scripts'], function() {
  var styles  = gulp.src([gulp.paths.dist + '/css/*.css'], {read: false});
  var scripts = gulp.src([gulp.paths.dist + '/js/*.js'], {read: false});

  var cssVendors = gulp.src([gulp.paths.dist + '/css/vendors/*.css'], {read: false});
  var jsVendors  = gulp.src([gulp.paths.dist + '/js/vendors/*.js'], {read: false});

  var injectOptions = {
    addRootSlash: false,
    ignorePath: 'public'
  };

  return gulp.src(gulp.paths.src + '/index.html')
    .pipe($.inject(series(cssVendors, styles),  injectOptions))
    .pipe($.inject(series(jsVendors, scripts),  injectOptions))

    .pipe(gulp.dest('./public'));
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
