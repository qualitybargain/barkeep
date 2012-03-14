// ## barkeep.js
// A toolkit of event emitting, build-related functions.

var util = require('util'),
path = require('path'),
events = require('events');

var Barkeep = exports.Barkeep = function (options) {
    events.EventEmitter.call(this);
    options = options || {};
};

// Yep, Barkeep emits events.
util.inherits(Barkeep, events.EventEmitter);    

// ## directory
// Creates a directory if one doesn't already exist, with optional callback.
Barkeep.prototype.directory = function (dir, callback) {
    if (!path.existsSync(dir)){
        this.emit('debug', util.format('Creating %s directory...'));
        fs.mkdirSync(dir);
        if (callback){
            callback(dir);
        }
    }    
    return this;
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
