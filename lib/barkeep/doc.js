// doc.js - Helper for generating JS documentation.

var command = require('./command'),
path = require('path');

var doc = exports;

// ## generateDocco
// Generates docco reports for an array of javascript files.
doc.generateDocco = function (javascripts, callback) {
    if (javascripts.length === 0) {
        console.log('   no files found to generate docs.');
        return callback();
    }
    console.log(__dirname) 
    command.spawn(path.join(__dirname, '/node_modules/docco/bin/docco'), javascripts, function (code) {
        if (code) {
            console.log('Could not generate docs');
            console.log("Please verify if 'docco' and 'Pygments' are installed'");
            console.log("To install Pygments run 'easy_install Pygments'");
            return callback(code);
        }
        callback();    
    });
}
