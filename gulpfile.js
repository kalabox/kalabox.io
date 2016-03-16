var gulp    = require('gulp');
var server = require('gulp-express');
var sass    = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
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
  'js/custom.js',
];

gulp.task('sass', function(){
  return sass('./scss/main.scss', { style: 'expanded' })
    .pipe(gulp.dest('./css'));
});


// create task
gulp.task('css', ['sass'], function(){
  gulp.src(css)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/css'))
});

gulp.task('cssMin', ['sass'], function(){
  return gulp.src(css)
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('js', function(){
  gulp.src(js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('jsMin', function(){
  return gulp.src(js)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['jsMin']);
  gulp.watch('scss/**/*.scss', ['cssMin']);
})

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['server.js']);
 
    // Restart the server when file changes 
    gulp.watch(['views/**/*.twig'], [server.run]);
    gulp.watch('js/**/*.js', ['jsMin']);
    gulp.watch('scss/**/*.scss', ['cssMin']);
    gulp.watch(['images/**/*'], server.notify);
    gulp.watch(['server.js'], [server.run]);
});

gulp.task('build', ['cssMin', 'jsMin']);
gulp.task('default', ['build']);
