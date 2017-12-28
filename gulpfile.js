var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    include = require("gulp-include"),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

var resources = 'resources/';

// ************************************************ //
// --- JavaScript files
// ************************************************ //

// Javascript
var jsFiles = [
    'resources/js/app.js'
];

// StyleSheets
var cssFiles = [
    'resources/scss/style.scss'
];

// Destination folders
var destJS = 'dist/js';
var destCSS = 'dist/css';

// ************************************************ //
// --- Minimized and for showcase
// ************************************************ //

gulp.task('scripts', function () {
    gulp.src(jsFiles)
        .pipe(include())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(destJS));
});

gulp.task('sass', function () {
    gulp.src(cssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

        .pipe(gulp.dest(destCSS));

});

// ************************************************ //
// --- Directly for production
// ************************************************ //

gulp.task('sass-production', function () {
    gulp.src(cssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            debug: true
        }, function (details) {}))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(destCSS));
});

gulp.task('scripts-production', function () {
    gulp.src(jsFiles)
        .pipe(include())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destJS));
});

// ************************************************ //
// --- Watchers
// ************************************************ //
gulp.task('watch', function () {
    // Watch .js files
    gulp.watch(resources + 'js/**/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch(resources + 'scss/**/*.scss', ['sass']);
});


//default tasks
gulp.task('dev', ['scripts', 'sass', 'watch']);

//production tasks
gulp.task('production', ['scripts-production', 'sass-production']);