// s3.js - Wrapper for s3 sync functions.
var s3 = exports;

// ## connectToS3
// Establishes a connection to the Amazon S3 bucket.
var connectToS3 = function (options) {
    options = options || {};  
    var accessKeyId = options.accessKeyId || process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey = options.secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY,
        awssum = require('awssum');
        amazon = awssum.load('amazon/amazon');
        s3Service = awssum.load('amazon/s3');
        
    if (!accessKeyId || !secretAccessKey) {
        throw "Error: Must specify the env variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY";
    }
    return new s3Service(accessKeyId, secretAccessKey, "ops", amazon.US_EAST_1);    
};

// ## createClient
// Creates an S3 client.
s3.createClient = function (options) {
    s3.client = connectToS3(options);
    s3.bucket = options.bucket || '';
    return s3;
};

// ## setBucket
// Set the s3 bucket name.
s3.setBucket = function (bucketName) {
    s3.bucket = bucketName;
    return s3;
};

// ## getBucketObjects
// Gets a listing of objects in an S3 bucket, with an optional prefix. 
s3.getBucketObjects = function (prefix, callback) {
    if (!s3.client || !s3.bucket) {
        callback(new Error("Error: No client or bucket name defined."), null);
    }
    // List all of the objects in the bucket starting with prefix.
    var options = {BucketName : s3.bucket, prefix: prefix || ''};
    s3.client.ListObjects(options, function(err, data) {
        if (err) {
            return callback(err);
        }
        var bucketContents = data.Body.ListBucketResult.Contents;
        
        callback(bucketContents);
    });    
};
