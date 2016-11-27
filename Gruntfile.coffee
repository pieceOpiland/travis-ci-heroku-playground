module.exports = (grunt) ->
  grunt.initConfig
    copy:
      main:
        files: [
          cwd: 'web'
          src: ['**']
          dest: 'build'
          expand: true
        ]

    clean:
      main: ['build'],
      dist: ['build/scripts', 'build/less', 'build/libs']

    requirejs:
      options:
        baseUrl: 'build/scripts'
        name: '../libs/almond/almond'
        mainConfigFile: 'web/scripts/config.js'
        out: 'build/dist/main.min.js'
        include: ['main']
      prod:
        options:
          out: 'build/dist/main.min.js'
          optimize: 'uglify2'
      dev:
        options:
          out: 'build/dist/main.js'
          optimize: 'none'

    less:
      options:
        paths: ['build/less']
      prod:
        files:
          'build/dist/styles.min.css': 'build/less/styles.less'
        options:
          compress: true
      dev:
        files:
          'build/dist/styles.css': 'build/less/styles.less'
        options:
          compress: false

    processhtml:
      main:
        files: {'build/index.html': ['build/index.html']}

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-less'

  grunt.loadNpmTasks 'grunt-processhtml'

  grunt.registerTask 'production', ['clean:main', 'copy', 'requirejs:prod', 'less:prod', 'processhtml', 'clean:dist']
  grunt.registerTask 'dev', ['clean:main', 'copy', 'requirejs:dev', 'less:dev']
