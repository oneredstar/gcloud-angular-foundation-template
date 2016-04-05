var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var browserSync = require('browser-sync').create();
var requirejsOptimize = require('gulp-requirejs-optimize');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

gulp.task('clean', function() {
    return gulp.src('frontend/www')
        .pipe(rimraf());
});

gulp.task('sass', ['clean'], function() {
    return gulp.src('frontend/src/scss/app.scss')
        .pipe(sass({
                includePaths: sassPaths
            })
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('frontend/www/css'));
});

gulp.task('copy:require', ['clean'], function() {
    return gulp.src('./bower_components/requirejs/require.js')
        .pipe(gulp.dest('./frontend/www/js/'));
});

gulp.task('copy:www', ['clean'], function() {
    return gulp.src('./frontend/src/**.*')
        .pipe(gulp.dest('./frontend/www/'));
});

gulp.task('browser-sync', ['copy:require', 'copy:www', 'sass', 'scripts'], function() {
    browserSync.init({
        server: {
            baseDir: "./frontend/www"
        }
    });
});

gulp.task('scripts', ['clean', 'copy:require'], function () {
    return gulp.src('./frontend/src/js/app.js')
        .pipe(requirejsOptimize(function(file) {
            return {
                baseUrl: './frontend/src/js',
                mainConfigFile: './frontend/src/js/app.js',
                name: 'app',
                optimize: 'none'
            }
        }))
        .pipe(gulp.dest('./frontend/www/js/'));
});

gulp.task('default', ['clean', 'copy:require', 'copy:www', 'sass', 'scripts', 'browser-sync'], function() {

});