module.exports = function(grunt) {
  'use strict';

  // Array con los ficheros que componen el proyecto.
  // Es importante el orden
  var files = [
     "src/core-plugins/scaleapp-media.js",
     "src/core-plugins/init.js",
     "src/templates/templates.js",
     "src/modules/loader/module.js",
     "src/modules/init.js",
     "src/media.js",
     "src/application.js",
   ];
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        strict: false,
        debug: false,
        globals: {
          "window": false,
          "NS": false,
          "_": false,
          "$": false,
          "alert": false,
          "document": false,
          "BaseJS": false,
          "scaleApp": false,
          "Image": false,
          "WebFont": false,
          "JST": false,
          "Handlebars": false,
          "Promise": false
        }
      },
      with_debug: {
        options: {
          debug: true
        }
      }
    },
    jsbeautifier: {
      files : ["src/**/*.js"],
      options : {
        indent_size: 2,
        indent_char: " ",
        indent_level: 0,
        indent_with_tabs: false,
        preserve_newlines: true,
        max_preserve_newlines: 10,
        jslint_happy: false,
        brace_style: "collapse",
        keep_array_indentation: false,
        keep_function_indentation: false,
        space_before_conditional: true,
        break_chained_methods: false,
        eval_code: false,
        wrap_line_length: 0,
        unescape_strings: false
      }
    },
    jasmine: {
      generic: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/*Spec.js',
          helpers: 'spec/*Helper.js',
          vendor: [
            'lib/jquery-1.10.2.js',
            'lib/lodash.js'
          ]
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: files,
        dest: 'dist/base-js.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ["handlebars", "jshint:with_debug", 'concat'],
        options: {
          spawn: false
        }
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        },
        wrap: true
      },
      min_build: {
        options: {
          report: 'gzip',
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> : minified */\n'
        },
        files: {
          'dist/basejs.min.js': files
        }
      },
      build: {
        options: {
          beautify: {
            beautify: true
          },
          mangle: false,
          preserveComments: 'all',
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>*/\n'
        },
        files: {
          'dist/base-js.js': files
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: "JST",
          processName: function(filePath) {
            // Hacerlo relativo al proyecto: player/templates/house.hjs"
            var p = filePath.split("/");
            p.splice(0,1);
            return "avatar/"+p.join("/");
          }          
        },
        files: {
          "src/templates/templates.js": "src/templates/**/*.hjs"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  
  // Default task(s).
  grunt.registerTask('default', ['jshint','jsbeautifier']);

};
