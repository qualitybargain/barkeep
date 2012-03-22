var exec = require('child_process').exec,
    spawn = require('child_process').spawn;
    
var command = exports;

// ## exec
// Wrapper for child_process.cmd.
command.exec = function (cmd, callback) {
    return exec(cmd, function (err, stdout, stderr) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, stdout, stderr);
    });
};
// ## spawn
// Wrapper for child_process.spawn, prints all output to console.
command.spawn = function (cmd, arguments, callback) {
    var child = spawn(cmd, arguments);
    child.stdout.setEncoding("utf8");
    child.stdout.on('data', function (data) {
        console.log(data);
    });
    child.stderr.setEncoding("utf8");
    child.stderr.on('data', function (data) {
        console.error(data);
    });
    child.on('exit', function (code) {
        callback(code); 
    });
    return child;
};
