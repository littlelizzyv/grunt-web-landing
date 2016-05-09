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
        partials: ['src/templates/includes/**/*.hbs'],
      },
      site: {
        // Target-level options
        options: {layout: 'default.hbs'},
        files: [
          { expand: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: '<%= site.destination %>/' }
        ]
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.scss'],
          dest: '../css',
          ext: '.css'
        }]
      }
    },
    jshint: {
      all: ['src/helpers/*.js']
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      all: ['<%= site.destination %>/**/*.{html,md}']
    },

    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '127.0.0.1',
          bases: ['<%= dist %>', '<%= src %>'],
          livereload: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['src/templates/**/*.hbs', 'data/*.json', 'css/scss/**/*.scss', 'css/*.css', 'helpers/*.js', 'Gruntfile.js'],
        tasks: ['jshint']
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-open');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble', 'sass', 'jshint']);

  grunt.registerTask('server', [
      'default',
      'connect',
      'watch',
      'open'
    ]);
};
