/*
 * Assemble, component generator for Grunt.js
 * https://github.com/assemble/
 *
 * Copyright (c) 2013 Upstage
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('src/data/site.yml'),
    dist: 'dist',

    assemble: {
      // Task-level options
      options: {
        prettify: {indent: 2},
        marked: {sanitize: false},
        production: true,
        data: 'src/**/*.{json,yml}',
        assets: '<%= site.destination %>/assets',
        helpers: 'src/helpers/helper-*.js',
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/includes/**/*.hbs']
      },
      site: {
        // Target-level options
        options: {layout: 'elways.hbs'},
        files: [
          { expand: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: '<%= site.destination %>/' }
        ]
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: './src/css/scss',
          src: ['*.scss'],
          dest: './dist',
          ext: '.css'
        }]
      }, 
    },
    jshint: {
      all: ['src/helpers/*.js']
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      all: 'dist'
    },

    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '127.0.0.1',
          base: 'dist',
          livereload: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['src/templates/**/*.hbs', 'data/*.json', 'css/scss/*', 'helpers/*.js', 'Gruntfile.js'],
        tasks: ['clean', 'sass:dist', 'assemble', 'jshint']
      },
      css: {
        files: ['src/css/scss/*.scss'],
        tasks: ['sass:dist']
      }
    },
    open: {
      path: 'http://localhost:9001',
      app: 'Google Chrome'
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-verb');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-open');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'sass:dist', 'assemble', 'jshint']);
  grunt.registerTask('build', ['clean', 'sass:dist', 'assemble', 'jshint']);
  grunt.registerTask('server', [
      'build',
      'connect',
      'watch',
      'open',
    ]);
};
