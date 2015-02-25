'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'stream-series']
});

var styles  = gulp.src([
  gulp.paths.dist + '/css/*.css',
  '!' + gulp.paths.dist + '/css/vendors/*.css'], {read: false});

var scripts = gulp.src([
  gulp.paths.dist + '/js/*.js',
  '!' + gulp.paths.dist + '/js/vendors/*.js'], {read: false});

console.log(scripts.toString());


var cssVendors = gulp.src([gulp.paths.dist + '/css/vendors/*.css'], {read: false});
var jsVendors  = gulp.src([gulp.paths.dist + '/js/vendors/*.js'], {read: false});

var injectOptions = {
  addRootSlash: false,
  ignorePath: 'public'
};

gulp.task('inject', function() {
  return gulp.src(gulp.paths.src + '/index.html')
    .pipe($.inject($.streamSeries(cssVendors, styles),  injectOptions))
    .pipe($.inject($.streamSeries(jsVendors, scripts),  injectOptions))

    .pipe(gulp.dest('./public'));
});
