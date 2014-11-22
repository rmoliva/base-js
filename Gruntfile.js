module.exports = function(grunt) {
  'use strict';


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project_files: grunt.config("project_files", grunt.file.readJSON('files.json')) 
  });

  //Load per-task config from separate files.
  grunt.loadTasks('grunt');

  // Default task(s).
  grunt.registerTask('default', ["react", 'jshint:all','jsbeautifier']);
  grunt.registerTask('buildjs', ["react", "clean:dist", "sass",'jsbeautifier', 'jshint:all', "concat:dist"]);
  grunt.registerTask('buildjs:with_debug', ["react", "clean:dist", "sass",'jsbeautifier', 'jshint:with_debug', "concat:dist"]);
  
  grunt.registerTask('copy:'+grunt.config('pkg').name, ["copy:images", "copy:js_max", "copy:css"]);
  grunt.registerTask('deploy:'+grunt.config('pkg').name, function(commit_message) {
    var build_task = commit_message ? 
        'build:patch:'+commit_message : 
        'build:patch';
    grunt.task.run([build_task, 'copy:'+grunt.config('pkg').name]); 
  });
};
