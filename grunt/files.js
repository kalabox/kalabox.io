'use strict';

/**
 * This file/module contains helpful file location config.
 */

var vendorDir = 'bower_components/';

module.exports = {
  sass: 'scss/main.scss',
  js: [
    'js/custom.js',
    vendorDir + 'jquery/dist/jquery.min.js',
    vendorDir + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',
    vendorDir + 'wow/dist/wow.min.js',
    vendorDir + 'nivo-lightbox/nivo-lightbox.min.js',
    vendorDir + 'owl/owl-carousel/owl.carousel.min.js'
  ],
  css: [
    vendorDir + 'font-awesome/css/font-awesome.min.css',
    vendorDir + 'nivo-lightbox/nivo-lightbox.css',
    vendorDir + 'owl/owl-carousel/owl.carousel.css',
    vendorDir + 'owl/owl-carousel/owl.theme.css',
    'img/themes/default/default.css',
    'css/animate.css',
    'css/bootstrap-theme.css',
    'css/main.css'
  ],
  assets: [
    vendorDir + 'font-awesome/fonts/fontawesome-webfont.eot',
    vendorDir + 'font-awesome/fonts/fontawesome-webfont.svg',
    vendorDir + 'font-awesome/fonts/fontawesome-webfont.ttf',
    vendorDir + 'font-awesome/fonts/fontawesome-webfont.woff',
    vendorDir + 'font-awesome/fonts/fontawesome-webfont.woff2'
  ],
};
