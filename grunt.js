module.exports = function(grunt){

    var rootDirectory = process.cwd();

    //config for various build tasks and helpers.
    var config = {
        source: rootDirectory + '/src',
        cssSource : rootDirectory + '/src/css',
        jsSource : rootDirectory + '/src/js',
        distPublic : rootDirectory + '/dist',
        templatesSourceDir :  rootDirectory + '/src/templates',
        templatesDistDir : rootDirectory + '/src/js/compiled-templates'
    };

    // Project configuration.
    grunt.initConfig({
        build:{
            source: config.source,
            cssSource : config.cssSource,
            jsSource: config.jsSource,
            dist: config.distPublic
        },
        templates:{
            templatesSourceDir: config.templatesSourceDir,
            templatesDistDir: config.templatesDistDir
        },
        watch:{
            templateWatch:{
                files: [config.templatesSourceDir + '/**/*.html'],
                tasks:[ 'compile-templates', 'build']
            },
            jsWatch:{
                files: [config.jsSource + "/**/*.js"],
                tasks:['build']
            }
        }
    });

    grunt.registerTask("default", "build");

    //load our tasks from the tasks folder
    grunt.loadTasks('grunt-tasks');
};