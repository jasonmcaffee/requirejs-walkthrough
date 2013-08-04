module.exports = function(grunt){
    'use strict';

    var requirejs = require('requirejs');

    /**
     * builds src and places built code into the dist dir.
     */
    grunt.registerTask("build", function(){
        grunt.log.writeln("build task is running.");

        var taskDone = this.async();//grunt async task management
        var startMilli = new Date().getTime();//calculate build time
        var config = grunt.config();//get our configuration defined in Gruntfile.js

        //configuration for requirejs
        var rjsConfig = {
            //src directory which requirejs will process and build to the dist dir
            appDir: config.build.source,

            //base location for all js files. This gets prepended to all require calls.
            //e.g. define(['core/util/log'], function(log){...}); would result the path 'js/core/util/log'
            baseUrl: "js",

            //the directory which processed files should be placed in.
            dir: config.build.dist,

            keepBuildDir:false, //whether the dist dir should be deleted before a build. set to true for faster builds.
            generateSourceMaps: false, //might be useful at some point.
            optimize:"none", //which minifier to use. 'none' if you don't want minification, 'uglifyjs' if you do want minification
            removeCombined:false, //if true, any files that were combined into a build bundle will be removed from the output folder

            //shortcuts for commonly used modules.
            //e.g. rather than requiring the full path define(['lib-third-party/jquery-1.9.0'], function($){...});
            //     we can use define(['jquery'], function($){...});
            paths:{
                'jquery': 'lib-third-party/jquery',
                'handlebars': 'lib-third-party/handlebars.runtime',
                'requireLib' : 'lib-third-party/require'
            },

            //shim will wrap non-amd libraries as if they used define()
            //allows you to require them in your module. e.g. define(['jquery'], function($){...});
            shim:{
                'jquery':{
                    exports:'$',
                    deps:[]
                },
                'handlebars':{
                    exports:'Handlebars'
                }
            },
            //list out the files/modules which should be concatenated together with their dependencies.
            modules:[
                {
                    "name": "core/core",
                    "include": [
                        "requireLib"
                    ]
                },
                {
                    "name": "lib/views/Home",
                    "exclude": ["core/core"]
                }
            ],
            //the map configuration allows you to point to different paths for dependencies in particular modules.
            //e.g. we can say that when ModuleA requires ModuleB, give it ModuleC instead.
            map:{
                // 'ModuleA':{
                // 	'ModuleB' : 'ModuleC'
                // }
            }
        };

        grunt.log.writeln('requirejs configuration:\n'+ JSON.stringify(rjsConfig, undefined, 2));

        //build the app using requirejs
        requirejs.optimize(rjsConfig, function (buildResponse) {
            var endMilli = new Date().getTime();
            var totalMilli = endMilli - startMilli;
            grunt.log.writeln('build task completed in ' + totalMilli + ' ms');
            taskDone(true);//let grunt know the async task is complete.
        },function(e){
            grunt.log.error('ERROR IN REQUIREJS BUILD:\n' + e.toString());
        });
    });

    process.on('uncaughtException', function(err) {
        console.log('Caught exception: ' + err);
    });
    process.on('error', function(err){
        console.log('process error: ' + JSON.stringify(err));
    });
};