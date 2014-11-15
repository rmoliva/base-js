module.exports = function(grunt) {
  
  grunt.config('jshint', {  
    all: [
      'Gruntfile.js', 
      'src/**/*.js',
      '!src/templates/**/*.js'
      
    ],
    options: {
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      boss: true,
      eqnull: true,
      node: true,
      strict: false,
      debug: true,
      globals: {
        "window": false,
        "NS": false,
        "_": false,
        "$": false,
        "alert": false,
        "document": false,
        "Player": false,
        "Kinetic": false,
        "scaleApp": false,
        "amplify": false,
        "Handlebars": false,
        "JST": false,
        "Image": false,
        "async": false,
        "WebFont": false,
        "Promise": true,
        "navigator": true,
        "Html2Canvas": true,
        "Signal": true,
        "sprintf": true,
        "BaseJS": true
      }
    },
    with_debug: {
      options: {
        debug: true
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
