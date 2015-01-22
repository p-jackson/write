/* global module */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ['./less'],
          yuicompress: true
        },
        files: {
          './css/main.css': './less/main.less'
        }
      }
    },
    watch: {
      files: './less/*',
      tasks: ['less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default','watch');
};