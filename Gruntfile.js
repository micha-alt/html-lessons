
module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    "www/index.html": ["dev/views/index.jade"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');

};
