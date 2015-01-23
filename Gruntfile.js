/* global module */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ['./less']
        },
        files: {
          './css/main.css': './less/main.less'
        }
      },
      dist: {
        options: {
          paths: ['./less'],
          compress: true
        },
        files: {
          './dist/css/main.css': './less/main.less'
        }
      }
    },
    requirejs: {
      dist: {
        options: {
          baseUrl: './js',
          name: 'main',
          out: './dist/js/main.js',

          paths: {
            knockout: 'empty:'
          }
        }
      }
    },
    copy: {
      dist: {
        files: [
          { src: ['./img/*'], dest: './dist/' },
          { src: ['./index.html'], dest: './dist/' }
        ],
      },
    },
    clean: [ './dist' ],
    watch: {
      files: './less/*',
      tasks: [ 'less:development' ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', 'watch');
  grunt.registerTask('dist', [ 'clean', 'copy:dist', 'requirejs:dist', 'less:dist' ]);
};