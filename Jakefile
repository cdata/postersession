var uglifyParser = require("uglify-js").parser,
    uglifyProcessor = require("uglify-js").uglify,
    util = require('util'),
    process = require('child_process'),
    concatenate = function(inputFiles, outputFile, callback) {
        
        var contents = [],
            callback = callback || outputFile,
            complete = function() {
                
                if(callback) {
                    
                    callback(contents.join('\n'));
                }
            },
            parsed = 0;
        
        inputFiles.forEach(
            function(file, index) {
                
                fs.readFile(
                    file,
                    function(error, data) {
                        
                        if(error) {
                            
                            util.error("Error reading concatenation target " + file + ": " + error);
                            contents[index] = "/* ERROR READING FILE: " + file + " */"
                        } else {
                            
                            contents[index] = data;
                        }
                        
                        parsed++;
                        
                        if(parsed == inputFiles.length) {
                            
                            if(outputFile == callback) {
                                
                                complete();
                            } else {
                                
                                fs.writeFile(
                                    outputFile,
                                    contents.join('\n'),
                                    function(error) {
                                        
                                        if(error) {
                                            
                                            util.error("Error writing concatenated file: " + error);
                                        } else {
                                            
                                            complete();
                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            }
        );
    },
    minify = function(input, outputFile) {
    
        var minified = uglifyProcessor.gen_code(uglifyProcessor.ast_squeeze(uglifyParser.parse(input)));
        
        fs.writeFile(
            outputFile,
            minified,
            function(error) {
                
                if(error) {
                    
                    until.error('Error writing minified file: ' + error);
                }
            }
        );
    },
    library = [
        
        "./vendor/modernizr/modernizr.js",
        "./vendor/underscore/underscore.js",
        "./lib/postersession.js"
    ];

task(
    'default',
    [],
    function() {
        
        concatenate(
            library,
            './dist/postersession.js',
            function(output) {
            
                minify(
                    
                    output,
                    './dist/postersession.min.js'
                );
            }
        );
    }
);