'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('coffee', function() {
  return gulp.src(gulp.paths.src + '/coffee/*.coffee')
    .pipe($.coffee({bare: true}).on('error', $.util.log))
    .pipe(gulp.dest(gulp.paths.src + '/js'));
});
