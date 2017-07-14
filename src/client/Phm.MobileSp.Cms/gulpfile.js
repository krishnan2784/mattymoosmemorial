/// <binding BeforeBuild='assets, less, typescript, css, javascript' AfterBuild='dummy-data' Clean='clean' ProjectOpened='watch-assets, watch-less, watch-ts' />
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var path = require('path');
var changed = require('gulp-changed');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');

gulp.task('dummy-data', function () {
    return gulp.src('./ClientApp/**/data2.json')
            .pipe(rename({dirname: ''}))
          .pipe(changed('./wwwroot/assets'))
            .pipe(gulp.dest('./wwwroot/assets'));
});

gulp.task('sass', function() {
    gulp.src('./ClientApp/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('assets', function () {
    return gulp.src('./assets/**')
          .pipe(changed('./wwwroot/assets'))
            .pipe(gulp.dest('./wwwroot/assets'));
});

gulp.task('less', function () {

    return gulp.src('./css/**/*.less')
      .pipe(less({
          paths: [path.join('./css', 'less', 'includes')]
      }))
      .pipe(gulp.dest('./wwwroot/css'));
});

gulp.task('css', function () {

    gulp.src('./css/**/*.css')
        .pipe(changed('./wwwroot/css'))
        .pipe(gulp.dest('./wwwroot/css'));

});

gulp.task('typescript', function () {
    return gulp.src('./scripts/**/*.ts')
      .pipe(ts({
          paths: [path.join('./scripts', 'ts', 'includes')]
      }))
      .pipe(gulp.dest('./wwwroot/scripts'));
});

gulp.task('javascript', function () {
    gulp.src('./scripts/**/*.js')
      .pipe(changed('./wwwroot/scripts'))
        .pipe(gulp.dest('./wwwroot/scripts'));

    gulp.src('./scripts/tinymce/**/*.*')
        .pipe(changed('./wwwroot/scripts'))
        .pipe(gulp.dest('./wwwroot/scripts/tinymce'));
});

gulp.task('watch-assets', function () {
    gulp.watch('./assets/**/*', ['assets']);
});

gulp.task('watch-scss', function () {
    gulp.watch('./ClientApp/**/*.scss', ['sass']);
});

gulp.task('watch-less', function () {
    gulp.watch('./css/**/*.less', ['less']);
    gulp.watch('./css/**/*.css', ['css']);
});

gulp.task('watch-ts', function () {
    gulp.watch('./scripts/**/*.ts', ['typescript']);
    gulp.watch('./scripts/**/*.js', ['javascript']);
});


gulp.task('clean', function () {
    gulp.src('./wwwroot/assets/**/*', { read: false })
        .pipe(clean());
    gulp.src('./wwwroot/css/**/*', { read: false })
        .pipe(clean());
    gulp.src('./wwwroot/scripts/**/*', { read: false })
        .pipe(clean());
});
