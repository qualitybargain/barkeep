var vows = require('vows'),
assert = require('assert');

var Barkeep = require('../lib/barkeep');

var barkeep = new Barkeep();

vows.describe('barkeep').addBatch({
    "An instance of barkeep": {
        "should be an event emitter": function () {
            assert.instanceOf(barkeep, require('events').EventEmitter);
        }
    }
}).export(module);
