// Lint.js - Helper for linting javascript files.

var command = require('./command'),
    path = require('path');

var lint = exports;

// # jsHint
// jshint command-line wrapper.
lint.jsHint = function (files, options, callback) {
    var jshintPath = path.resolve(require.resolve('jshint'), '../../../bin');
    var baseOptions = options.configFile ? ["--config", options.configFile] : [];
    command.spawn(path.join(jshintPath, 'hint'), files.concat(baseOptions), function (code) {
        if (code) {
            return callback(code);
        }
        callback();    
    });    
};
