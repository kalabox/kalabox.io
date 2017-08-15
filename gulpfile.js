'use strict';

// Modz
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var server = require('gulp-express');
var jslint = require('gulp-jslint');
var jscs = require('gulp-jscs');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Helper "constants"
var vendorDir = 'bower_components/';
var css = [
  vendorDir + 'font-awesome/css/font-awesome.min.css',
  vendorDir + 'nivo-lightbox/nivo-lightbox.css',
  vendorDir + 'owl/owl-carousel/owl.carousel.css',
  vendorDir + 'owl/owl-carousel/owl.theme.css',
  'css/animate.css',
  'css/main.css',
  'css/bootstrap-theme.css'
];
var js = [
  vendorDir + 'jquery/dist/jquery.min.js',
  vendorDir + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',
  vendorDir + 'wow/dist/wow.min.js',
  vendorDir + 'nivo-lightbox/nivo-lightbox.min.js',
  vendorDir + 'owl/owl-carousel/owl.carousel.min.js',
  'js/custom.js'
];
var appCode = [
  'server.js',
  'gulpfile.js',
  'controllers/*.js',
  'models/*.js'
];

// Lint code
gulp.task('lint', function() {
  return gulp.src(appCode)
    .pipe(jslint({
      node: true,
      es6: false,
      white: true,
      global: [],
      predef: [],
      this: true
    }))
    .pipe(jslint.reporter('stylish'));
});

// CS code
gulp.task('cs', function() {
  return gulp.src(appCode)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('failImmediately'));
});

// Sassify
gulp.task('sass', function() {
  return gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// Compile css
gulp.task('css', ['sass'], function() {
  gulp.src(css)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/css'));
});

// Minify css
gulp.task('cssMin', ['sass'], function() {
  return gulp.src(css)
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('public/css'));
});

// Compile JS
gulp.task('js', function() {
  gulp.src(js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'));
});

// Minify JS
gulp.task('jsMin', function() {
  return gulp.src(js)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('public/js'));
});

// Watch files
gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['jsMin']);
  gulp.watch('scss/**/*.scss', ['cssMin']);
});

// Serve and watch
gulp.task('server', function() {

  // Start the server at the beginning of the task
  server.run(['server.js']);

  // Restart the server when file changes
  gulp.watch(['views/**/*.twig'], [server.run]);
  gulp.watch('js/**/*.js', ['js', 'jsMin']);
  gulp.watch('public/**/*.js', [server.run]);
  gulp.watch('scss/**/*.scss', ['cssMin']);
  gulp.watch(['server.js', 'controllers/*.js', 'models/*.js'], [server.run]);

});

// Common tasks
gulp.task('build', ['cssMin', 'jsMin']);
gulp.task('default', ['build']);
gulp.task('test', ['lint', 'cs']);
