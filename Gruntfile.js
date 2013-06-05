
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
                files: [ {
                    expand: true,
                    src: "**/*.jade",
                    dest: "www/",
                    cwd: "dev/views" ,
                    rename: function(destBase, destPath) {
                        return destBase + destPath.replace(/\.jade$/, '.html')
                    }
                } ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');

};
