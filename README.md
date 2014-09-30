# configurify

A browserify transform to expose server-side configuration options to the
browser.

### The Idea

Lets say you have a `conf` module that exposes a different set of config
options depending on its environement:

```js
var profile = process.env.NODE_CONF || 'default';

// Note the dynamic require expression:
module.exports = require('./' + profile);
```

The __configurify__ transform will require the module on the server and pass
the exported object to `JSON.stringify()`. The serialized configuration will
then be bundled by browserify and exposed to the client.

Whether the transform is applied or not depends on the modules file name. By
default all files that match the `**/conf/*` glob pattern will be transformed.

### Usage

The easiest way to use (and optionally configure) the transform is to add it to
your project's package.json:

```json
{
  "browserify": {
    "transform": [
      ["configurify", { "pattern": "**/conf/*" } ]
    ]
  }
}
```

### Async Example

Your module may also obtain its configuration asynchronously. Simply export a
function that takes a node-style callback as argument:

```js
var request = require('request');

module.exports = function(cb) {
  request.get('http://localhost:8080/config.json', function(err, res, body) {
    if (err) return cb(err);
    cb(null, JSON.parse(body));
  });
}
```

### The MIT License (MIT)

Copyright (c) 2014 Felix Gnass

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
