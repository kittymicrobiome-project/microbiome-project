module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

    clear: {
      files: ['**/*'],
      tasks: ['clear']
    },

    sass: {
      dist: {
        files: {
          'css/main.css' : 'sass/main.scss'
        }
      }
    },
    watch: {
      html:{
        files: ['index.html']
      },
      css: {
        files: ['**/*.scss','**/**/*.scss'],
        tasks: ['sass']
      },
      options : {
        livereload: true,
      }
    },

    connect: {
      server: {
        livereload: true,
        options: {
        port: 9090,
        base: './'
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'js/build/production.min.js': ['js/build/production.js']
        }
      }
    },

    concat: {
      dist: {
        src: [
          'js/test.js', // All JS in the libs folder
          'js/main.js'  // This specific file
        ],
        dest: 'js/build/production.js',
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/build/main.min.css': ['css/lib/*.css','css/normalize.css','css/*.css']
        }
      }
    }

  });

  // Load these required NPM tasks:
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');


  //register the task
  grunt.registerTask('server',['connect']);
  grunt.registerTask('build',['clear','concat','uglify','cssmin']);
  grunt.registerTask('c',['clear']); // This registers the watch task as the default task. If you require more tasks, create another one
  grunt.registerTask('default',['connect', 'watch']); // This registers the watch task as the default task. If you require more tasks, create another one

};