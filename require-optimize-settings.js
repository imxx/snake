({
    appDir: "./src/scripts",

    baseUrl: "./",

    optimize: "uglify2",

    uglify2: {
        compress: {
            global_defs: {
                DEBUG: false
            }
        }
    },

    modules: [{
        name: "main"
    }],

    paths: {
        "knockout": "./libs/knockout"
    },

    dir: "./build/optimized-requirejs-scripts",
    
    onBuildWrite: function (moduleName, path, contents) {
       // return contents;
         return contents.replace(/console.log(.*);/g, '');
    }
})