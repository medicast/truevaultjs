# TrueVault Client Library for Node.js

An unofficial JavaScript implementation of the [TrueVault REST API](https://www.truevault.com/rest-api.html).

[TrueVault](https://www.truevault.com/) is a secure "backend-as-a-service" content storage solution for HIPAA compliance.  

## Installing

Use
[npm](http://npmjs.org) to install into your Node.js. Simply include "truevaultjs" as a dependency or type the following into a terminal window:

```sh
npm install truevaultjs
```

## Example

```js

var TrueVault = require('truevaultjs');

var client = new TrueVault('secure_api_key');

var mydoc = { secure: 'data', isPHI: true };
client.json.create(vaultId,mydoc,function(err,result) {
    console.log(result.document_id);
});

mydoc.newField = 12345;
client.json.update(vaultId,mydoc,function(err) {});

client.json.get(vaultId,documentId,function(err,document) {
    assert.equal(mydoc,document);
});

client.json.del(vaultId,documentId,function(err) {});

```

## API

The API is designed to closely mirror the [TrueVault REST API](https://www.truevault.com/rest-api.html).  The client handles authentication headers as well as Base64 encoding and decoding, so all you need to do is plug in your own API key (from the TrueVault Users dashboard), vault ID (also created and managed in the dashboard), and content.

### Initialization

```js

var TrueVault = require('truevaultjs');
var client = new TrueVault('secure_api_key');	// replace with your own

```

### JSON (Document) Store

```js

client.json.create(vaultId,document,callback)
client.json.update(vaultId,documentId,document,callback)
client.json.del(vaultId,documentId,callback)
client.json.get(vaultId,documentId,callback)

```

### BLOB Store

```js

client.blob.create(vaultId,document,callback)
client.blob.update(vaultId,documentId,blob,callback)
client.blob.del(vaultId,documentId,callback)
client.blob.get(vaultId,documentId,callback)

```

### Schema Store

```js

client.json.create(vaultId,document,callback)
client.json.update(vaultId,documentId,document,callback)
client.json.del(vaultId,documentId,callback)
client.json.get(vaultId,documentId,callback)
client.json.all(vaultId,callback)

```

### Search Engine

NOTE: This hasn't been fully implemented yet, so the API is likely to change.

```js

client.json.find(vaultId,query,callback)

```

### Callbacks

The callback signature follows the typical Node.js form:

```js

callback = function(err,value) {}

```


## Plain-English Disclaimer

HIPAA compliance is very complicated.  The authors and contributors of this client library cannot guarantee that by using it, you will be compliant.  Please consult experts to make sure you are doing this right!

## License

This SDK is distributed under the
[MIT License](http://opensource.org/licenses/MIT).

```no-highlight
Copyright (c) 2013 Medicast, Inc. or its affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
