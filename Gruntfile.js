module.exports = function(grunt) {
    grunt.initConfig({
        // # files that our tasks will use
        files: {
            html: {
                src: "app/index.html",
                dev: "generated/index.html"
            },
            sass: {
                src: "app/sass/",
                dev: "generated/css/"
            }
        },
        //task configuration
        compass: {
            dev: {
                options: {
                    noLineComments: true,
                    sassDir: '<%= files.sass.src %>',
                    cssDir: '<%= files.sass.dev %>'
                }
            }
        },
        copy: {
            html: {
                files: {
                    "<%=files.html.dev%>": "<%=files.html.src%>"
                }
            }
        },
        server: {
            base: "<%= process.env.SERVER_BASE || 'generated'%>",
            web: {
                port: 8000
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ["<%= files.html.src %>"],
                tasks: ["copy"]
            },
            compass: {
                files: ["<%= files.sass.src %>"],
                tasks: ["compass:dev"]
            }
        }
    });
    grunt.loadTasks("tasks");
    // # Loads all plugins that match "grunt-", in this case all of our current plugins
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
    // grunt.registerTask "default", ["handlebars", "less:dev", "coffee", "concat_sourcemap", "copy", "server", "open", "watch"]
    grunt.registerTask("default", ["compass:dev", "copy:html", "server","watch"]);
}