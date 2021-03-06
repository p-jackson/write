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
    compress: {
      dist: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'dist/',
        src: ['**/*'],
        dest: 'dist-compressed/'
      }
    },
    imageEmbed: {
      dist: {
        src: [ './css/main.min.css' ],
        dest: './dist/css/main.css'
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
    hashres: {
      options: {
        fileNameFormat: '${name}.${hash}.${ext}',
        renameFiles: true
      },
      dist: {
        src: [
          './dist/js/main.js',
          './dist/css/main.css'
        ],
        dest: './dist/index.html',
      }
    },
    clean: [ './dist', './dist-compressed' ],
    watch: {
      files: './less/*',
      tasks: [ 'less:development' ]
    },
    jasmine: {
      options: {
        specs: [ './test/spec/*.spec.js' ]
      },
      test: {
        options: {
          outfile: './test/spec-runner.html',
          template: require('grunt-template-jasmine-requirejs'),
          keepRunner: true,
          templateOptions: {
            requireConfig: {
              baseUrl: '../js',
              paths: {
                knockout: 'http://cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min'
              }
            }
          }
        }
      },
      coverage: {
        options: {
          src: 'js/*.js',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: './test/coverage/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: './test/coverage/html'
                }
              },
              {
                type: 'text-summary'
              }
            ],
            template: require('grunt-template-jasmine-requirejs'),
            templateOptions: {
              scripts: { src: '*.js' },
              requireConfig: {
                baseUrl: '.grunt/grunt-contrib-jasmine/js',
                paths: {
                  knockout: 'http://cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min'
                }
              }
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-image-embed');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', 'watch');
  grunt.registerTask('dist', [ 'clean', 'copy:dist', 'requirejs:dist', 'less:dist', 'imageEmbed:dist', 'hashres:dist', 'compress:dist' ]);
  grunt.registerTask('test', [ 'jasmine:test' ]);
  grunt.registerTask('coverage', [ 'jasmine:coverage' ]);
  grunt.registerTask('cover', [ 'coverage' ]);
};