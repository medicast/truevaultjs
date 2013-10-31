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
client.create(vaultId,mydoc,function(err,result) {
    console.log(result.document_id);
});

mydoc.newField = 12345;
client.update(vaultId,mydoc,function(err) {});

client.get(vaultId,documentId,function(err,document) {
    assert.equal(mydoc,document);
});

client.del(vaultId,documentId,function(err) {});

```


## Plain-English Disclaimer

HIPAA compliance is very complicated.  The authors and contrbutors of this client library cannot guarantee that by using it, you will be compliant.  Please consult experts to make sure you are doing this right!

## License

This SDK is distributed under the
[MIT License](http://opensource.org/licenses/MIT).

```no-highlight
Copyright (c) 2013 Medicast, Inc. or its affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```