module.exports = function(grunt) {
  
  grunt.config('uglify', {
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
        'dist/playerjs.min.js': grunt.file.readJSON('files.json')
      }
    },
    max_build: {
      options: {
        beautify: {
          indent_start: 0,
          indent_level: 2,
          //quote_keys: false,
          //space_colon: true,
          //ascii_only: false,
          //unescape_regexps: false,
          //inline_script: false,
          //width: 80,
          //max_line_len: 32000,
          beautify: true,
          // source_map: null,
          // bracketize: false,
          //semicolons: true,
          comments: true,
          preserve_line: true,
          //screw_ie8: false,
          //preamble: null        
        },
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>*/\n'
      },
      files: {
        'dist/basejs.js': grunt.config("project_files")
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
};