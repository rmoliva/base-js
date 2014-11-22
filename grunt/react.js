module.exports = function(grunt) {
  
  grunt.config('react', {
    files: {
      expand: true,
      src: ['src/components/**/*.jsx'],
      dest: 'src/templates',
      ext: '.js'
    }
  });
  
  grunt.loadNpmTasks('grunt-react');
};
