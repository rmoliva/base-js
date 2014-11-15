module.exports = function(grunt) {
  
  grunt.config('jasmine', {
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
  });
  
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};