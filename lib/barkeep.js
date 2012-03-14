// ## barkeep.js
// A toolkit of event emitting, build-related functions.

var util = require('util'),
event = require('event');

var Barkeep = exports = function (options) {
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