'use strict';

module.exports = function(grunt) {

  // loads all grunt-* tasks based on package.json definitions
  //require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-bower-install-simple');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /**
   * Load in our build configuration filez
   */
  var files = require('./grunt/files.js');
  var frontend = require('./grunt/frontend.js');

  /*
   * Helper funct to return some common build tasks
   */
  var commonBuildTasks = function() {
    return [
      'bower-install-simple:install',
      'sass:build',
      'concat:buildCss',
      'concat:buildJs'
    ];
  };

  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  var taskConfig = {

    // Let's use our pkg info here
    pkg: grunt.file.readJSON('./package.json'),

    /**
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner:
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
        ' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        '<%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },

    // Installs bower deps
    'bower-install-simple': {
      install: frontend.bower.install
    },
    // Concatenates multiple source files into a single file.
    concat: {
      buildCss: frontend.concat.buildCss,
      compileJs: frontend.concat.compileJs
    },
    // Sassify
    sass: {
      build: frontend.sass.build
    },
    // @todo: resurrect in our build process here.
    index: {
      build: frontend.index.build,
      compile: frontend.index.compile
    }
  };

  // Init our grunt config
  grunt.initConfig(grunt.util._.extend(taskConfig, files));

  /**
   * The default task is to build and compile.
   */
  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['delta']);

  grunt.registerTask('default', ['build']);
  grunt.registerTask('sassBuild', ['sass:build']);

  /**
   * The `build` task does all the work right now of concatenating/minifying
   * JS + CSS into single files.
   */
  var buildTask = commonBuildTasks();
  grunt.registerTask('build', buildTask);

  /**
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask('index', 'Process index.html template', function() {
    var buildDir = grunt.config('buildDir');
    var compileDir = grunt.config('compileDir');
    var dirRE = new RegExp('^(' + buildDir + '|' + compileDir + ')\/', 'g');
    var jsFiles = filterForJS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
      process: function(contents) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });

};
