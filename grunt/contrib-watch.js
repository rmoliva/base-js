module.exports = function(grunt) {
  
  grunt.config('watch', {
    scripts: {
      files: ['src/**/*.js','files.json','!src/templates/templates.js'],
      tasks: ["clean:dist", 'jsbeautifier', 'jshint:with_debug', "concat:dist"],
      options: {
        spawn: false
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
};
