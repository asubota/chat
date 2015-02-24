'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('sass', function() {
  return gulp.src(gulp.paths.src + '/**/*.scss')
    .pipe($.concat('app.css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.sass({style: 'compressed'}))
    .pipe(gulp.dest(gulp.paths.dist + '/css'));
});
