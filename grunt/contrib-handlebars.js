module.exports = function(grunt) {
  
  grunt.config('handlebars', {
    compile: {
      options: {
        namespace: "JST",
        processName: function(filePath) {
          // Hacerlo relativo al proyecto: player/templates/house.hjs"
          var p = filePath.split("/");
          p.splice(0,1);
          return "player/"+p.join("/");
        }          
      },
      files: {
        "src/templates/templates.js": "src/templates/**/*.hjs"
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-handlebars');
};