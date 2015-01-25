/* global module */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ['./less'],
          sourceMap: true,
          sourceMapURL: '../css/main.css.map',
          sourceMapBasepath: '..',
          sourceMapRootpath: '..',
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
          './css/main.min.css': './less/main.less'
        }
      }
    },
    imageEmbed: {
      dist: {
        src: [ './css/main.min.css' ],
        dest: './dist/css/main.css',
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
          { src: ['./index.html'], dest: './dist/' }
        ],
      }
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
  grunt.loadNpmTasks('grunt-image-embed');

  grunt.registerTask('default', 'watch');
  grunt.registerTask('dist', [ 'clean', 'copy:dist', 'requirejs:dist', 'less:dist', 'imageEmbed:dist' ]);
};