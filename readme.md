barkeep
===

<img src="http://bit.ly/wAqCqY" alt="Barkeep" title="Barkeep" height="336" width="535"/>

Barkeep is Flite's javascript build toolkit. It provides a simple toolkit of common build-related functions, such as:

* Pushing to S3
* Creating directories if they don't exist.

## Usage

Include the barkeep module and instantiate it.

``` javascript
var Barkeep = require('barkeep').Barkeep;

var bk = new Barkeep();
```

## Examples

*To create a directory if one doesn't exist.*

``` javascript
var bk = new Barkeep();
bk.directory('/scripts');
```