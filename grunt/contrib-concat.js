module.exports = function(grunt) {
  
  grunt.config('concat', {
    options: {
      separator: ';',
      stripBanners: true,
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',    
    },
    dist: {
      src: grunt.config("project_files"),
      dest: 'dist/'+grunt.config.get('pkg').name+'.max.js'
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
};
