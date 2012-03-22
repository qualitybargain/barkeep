// ## barkeep.js
// A toolkit of event emitting, build-related functions.

var util = require('util'),
    path = require('path'),
    fs = require('fs'),
    glob = require('glob'),
    events = require('events');

var Barkeep = module.exports = exports = function (options) {
    events.EventEmitter.call(this);
    options = options || {};
};

// Yep, Barkeep emits events.
util.inherits(Barkeep, events.EventEmitter);    

Barkeep.command = require('./barkeep/command');
Barkeep.doc = require('./barkeep/doc');
Barkeep.lint = require('./barkeep/lint');
Barkeep.s3 = require('./barkeep/s3');

// ## directory
// Creates a directory if one doesn't already exist, with optional callback.
Barkeep.prototype.directory = function (dir, callback) {
    if (!path.existsSync(dir)){
        this.emit('debug', util.format('Creating %s directory...', dir));
        fs.mkdirSync(dir);
        if (callback){
            callback(dir);
        }
    }    
    return this;
};

// # fileListSync
// From a glob pattern, gets a listing of files. Optionally excludes some files.
Barkeep.prototype.fileListSync = function (globPattern, excludes) {
    var allFiles = glob.sync(globPattern);
    
    if (allFiles.length === 0) {
        return [];
    }
    
    if (excludes && excludes.length > 0) {
        allFiles = allFiles.filter(function (file) {
            return excludes.every(function (exclude) { 
                    return file.indexOf(exclude) === -1;
                });
        });
    }
    return allFiles;
};

// # fileListRecursive
// Starting from a root directory, recursively find all files matching a pattern.
Barkeep.prototype.fileListRecursive = function (rootDirectory, filePattern, excludes) {
    var globPattern = path.join(rootDirectory, '**', filePattern);
    return this.fileListSync(globPattern, excludes);
};

// # cacheReadFile
// Cache text files on the filesystem into memory (async)
Barkeep.prototype.cacheReadFile = function (filename, encoding, callback) {
    var self = this;
    this.fileCache = this.fileCache || {};
    if (self.fileCache[filename]) {
        process.nextTick(function () {
            callback(null, self.fileCache[filename]);
        })
    } else {
        fs.readFile(filename, encoding, function (err, data) {
            if (err) {
                callback(err, null);
            }
            self.fileCache[filename] = data;
            return callback(null, self.fileCache[filename]);
        });
    }
};
