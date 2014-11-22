module.exports = function(grunt) {
  
  grunt.config('bower', {
    install: {
      options: {
        targetDir: './lib',
        layout: 'byType',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false,
        bowerOptions: {}
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-bower-task');
};
