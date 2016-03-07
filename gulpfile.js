var gulp    = require('gulp');
var sass    = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var vendorDir = 'bower_components/';
var css = [
  'css/**/*.css',
  vendorDir + 'font-awesome/css/font-awesome.min.css',
  vendorDir + 'nivo-lightbox/nivo-lightbox.css',
  vendorDir + 'owl/owl-carousel/owl.carousel.css',
  vendorDir + 'owl/owl-carousel/owl.theme.css' 
];
var js = [
  'js/custom.js',
  vendorDir + 'jquery/dist/jquery.min.js',
  vendorDir + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',
  vendorDir + 'wow/dist/wow.min.js',
  vendorDir + 'nivo-lightbox/nivo-lightbox.min.js',
  vendorDir + 'owl/owl-carousel/owl.carousel.min.js'
];

gulp.task('sass', function(){
  return sass('./scss/main.scss', { style: 'expanded' })
    .pipe(gulp.dest('./css'));
});


// create task
gulp.task('cssMin', function(){
  gulp.src(css)
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('css', function(){
  gulp.src(css)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function(){
  gulp.src(js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('jsMin', function(){
  gulp.src(js)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/js'))
});