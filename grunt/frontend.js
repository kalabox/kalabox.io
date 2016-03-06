'use strict';

/**
 * This file/module contains helpful frontend config.
 */

module.exports = {

  /**
   * Basic bower task that uses
   * Bower's API's directly.
   */
  bower : {
    install: {
      options: {
        directory: 'bower_components'
      }
    }
  },

  /**
   * `grunt concat` concatenates multiple source files into a single file.
   */
  concat: {
    /**
     * The `build_css` target concatenates compiled CSS and vendor CSS
     * together.
     */
    buildCss: {
      src: [
        '<%= css %>'
     ],
      dest: 'css/style.css'
    },
    /**
     * The `compile_js` target is the concatenation of all required JS in
     * one file
     */
    compileJs: {
      src: [
        '<%= js %>',
      ],
      dest: 'js/main.js'
    }
  },

  /**
   * `grunt-contrib-sass` handles our LESS compilation and uglification automatically.
   * Only our `main.scss` file is included in compilation; all other files
   * must be imported from this file.
   */
  sass: {
    build: {
      files: {
        'css/main.css':
          '<%= sass %>'
      },
      options: {
        cleancss: true,
        compress: true
      }
    }
  },
  delta: {
    /**
     * By default, we want the Live Reload to work for all tasks; this is
     * overridden in some tasks (like this file) where browser resources are
     * unaffected. It runs by default on port 35729, which your browser
     * plugin should auto-detect.
     */
    options: {
      livereload: true
    },

    /**
     * When our templates change, we only rewrite the template cache.
     */
    tpls: {
      files: [
        '<%= appFiles.atpl %>'
     ],
      tasks: ['html2js:app']
    },

    /**
     * When the CSS files change, we need to compile and minify them.
     */
    sass: {
      files: ['scss/**/*.scss'],
      tasks: ['sass:build']
    }
  }
};
