
module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            install: {
                files: [
                    {expand: true, cwd: 'components/normalize-css', src: ['*.css'], dest: 'www/css/'},
                    {expand: true, cwd: 'components/jquery', src: ['jquery.*'], dest: 'www/js/'}
                ]
            }
        },
        uglify: {
            install: {
                files: [
                    {
                        src: ['components/foundation/js/foundation/foundation.js'],
                        dest: 'www/js/foundation.min.js'
                    },
                    {
                        src: ['components/foundation/js/foundation/foundation.*.js'],
                        dest: 'www/js/foundation.plugins.min.js'
                    }
                ]
            }
        },
        sass: {
            install: {
                files: {
                    'www/css/foundation.css': 'components/foundation/scss/foundation.scss'
                }
            },
            development: {
                files: {
                    "www/css/styles.css": "dev/scss/styles.scss"
                }
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: function(dest,src) {
                        var data = { path: ''};
                        var fname = src.toString();
                        fname = fname.replace(this.cwd+'/','');
                        if( fname !== 'index.jade') {
                            data.path = '../';
                        }
                        return data;
                    }
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
        },
        watch: {
            jade: {
                files: ['dev/**/*.jade'],
                tasks: ['jade']
            },
            less: {
                files: ['dev/scss/**'],
                tasks: ['sass:development']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('install', ['copy:install', 'uglify:install', 'sass:install', 'sass:development', 'jade']);
};
