module.exports = function(grunt) {
  
  grunt.config('watch', {
    scripts: {
      files: ['src/**/*.js','src/components/**/*.jsx','files.json','!src/templates/**/*.js'],
      tasks: ["react","clean:dist", 'jsbeautifier', 'jshint:with_debug', "concat:dist"],
      options: {
        spawn: false
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
};
