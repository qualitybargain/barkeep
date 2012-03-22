// Lint.js - Helper for linting javascript files.

var command = require('./command'),
    path = require('path');

var lint = exports;

lint.jsHint = function (files, callback) {
    var jshintPath = path.resolve(require.resolve('jshint'), '../../../bin');
    
    command.spawn(path.join(jshintPath, 'hint'), files, function (code) {
        if (code) {
            console.log('Could not run jshint');
            return callback(code);
        }
        callback();    
    });    
};
