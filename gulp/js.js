'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('js', ['coffee', 'jshint'], function() {
  return gulp.src(gulp.paths.src + '/js/*.js')
    .pipe($.concat('app.js'))
    .pipe($.rename({suffix: '.min'}))
    // .pipe($.uglify())
    .pipe(gulp.dest(gulp.paths.dist + '/js'));
});
