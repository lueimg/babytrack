var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    less = require('gulp-less'),
    path = require('path'),
    paths = {
      scripts: [
        'public/core/*.js',
        'public/features/*.js',
        'public/features/**/*.js',
        'server/*.js',
        'server/**/*.js'
      ],
      styles: [
        './public/*.less'
      ]
    };


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
      .pipe(eslint())
      .pipe(eslint.formatEach());
});

gulp.task('less', function () {
  return gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'lint']);