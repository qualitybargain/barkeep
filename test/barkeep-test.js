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
}).addBatch({
    "Barkeep S3": {
        "should be able to create a client": function () {
            Barkeep.s3.createClient({accessKeyId: "AKIAIYACYTHS3QYSLHTQ", 
                secretAccessKey: "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"});
            Barkeep.s3.setBucket("asset-qa.postapp.com");
            
            assert.isNotNull(Barkeep.s3.client);
            assert.isNotNull(Barkeep.s3.bucket);
        },
        "requires access keys" : function () {
            assert.throws(function () {
                Barkeep.s3.createClient()
                }, /Error: Must specify/);
        }
    }
}).export(module);
