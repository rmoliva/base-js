module.exports = function(grunt) {
  
  grunt.config('sftp', {
    dev: {
      files: {
        "./": [
          "assets/**/*",
          "examples/home.html",
          "src/stories/*.js",
          "assets/css/style.css", 
          //"lib/*.js", 
          "dist/player.max.js" 
        ]
      },
      options: {
        // Yet to be configured
        host: "example.com",
        username: "ape",
        path: '/var/ape/apps/project/shared/js',
        createDirectories: true,
        showProgress: true,
        privateKey: grunt.file.read("id_ssh")
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-ssh');
};
