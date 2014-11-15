module.exports = function(grunt) {
  
  grunt.config('sass', {
    dist: {
      files: {
        'assets/css/player.css': 'assets/css/player.scss'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
};


