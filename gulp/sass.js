'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('sass', function() {
  return gulp.src(gulp.paths.src + '/styles/*.scss')
    .pipe($.autoprefixer())
    .pipe($.sass({style: 'compressed'}))
    .pipe($.concat('app.css'))
    .pipe(gulp.dest(gulp.paths.dist + '/css'));
});
