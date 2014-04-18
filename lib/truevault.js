var restify = require('restify');

var ENDPOINT = 'https://api.truevault.com';

function TrueVault(apikey) {
	this.deprecationWarned = false;

	this.apikey = apikey;
	this.client = restify.createJsonClient({
		url: ENDPOINT
	});
	this.client.basicAuth(apikey,'');
}

var base64Encode = function(document) {
	if (typeof document == 'string') {
		return document;
	} else if (typeof document == 'object') {
		return new Buffer(JSON.stringify(document)).toString('base64');
	} else {
		return String.valueOf(document);
	}
};

var base64Decode = function(document) {
	return JSON.parse(new Buffer(document, 'base64').toString('ascii'));
};

var handleResult = function(callback, decode) {
	return function(err,req,res,result) {
		if (err) {
			callback(TrueVault.StatusCode['s' + err.statusCode]);
		} else {
			if (decode) {
				callback(null,base64Decode(res.body));
			} else {
				callback(null,result);
			}
		}
	};
};

var warnDeprecation = function(reason) {
	if (this.deprecationWarned) {
		console.log('TrueVaultJS warning: you are using a deprecated API that will be removed in the next version (' + reason + ')');
	}
	this.deprecationWarned = true;
};

TrueVault.StatusCode = {
		's200': 'OK',
		's400': 'Bad Request - Are you missing a required parameter?',
		's401': 'Unauthorized - No valid API key provided',
		's402': 'Request Failed - Parameters were valid but request failed',
		's404': 'Not Found - The requested item doesn\'t exist',
		's500': 'Server error',
		's502': 'Server error',
		's503': 'Server error',
		's504': 'Server error',
		's9501': 'Method not implemented'
};

TrueVault.prototype = {
	// JSON methods; deprecated; use TrueVault.json.* instead
	create: function(vaultId,document,callback) {
		warnDeprecation('JSON store now accessed using TrueVault.client.*');
		this.client.post('/v1/vaults/' + vaultId + '/documents',{ document : base64Encode(document) }, handleResult(callback));
	},
	update: function(vaultId,documentId,document,callback)  {
		warnDeprecation('JSON store now accessed using TrueVault.client.*');
		this.client.put('/v1/vaults/' + vaultId + '/documents/' + documentId, { document : base64Encode(document) }, handleResult(callback));
	},
	del: function(vaultId,documentId,callback) {
		warnDeprecation('JSON store now accessed using TrueVault.client.*');
		this.client.del('/v1/vaults/' + vaultId + '/documents/' + documentId, handleResult(callback));
	},
	get: function(vaultId,documentId,callback) {
		warnDeprecation('JSON store now accessed using TrueVault.client.*');
		this.client.get('/v1/vaults/' + vaultId + '/documents/' + documentId, handleResult(callback,true));
	},
	document: {
		create: function(vaultId,document,callback) {
			this.client.post('/v1/vaults/' + vaultId + '/documents',{ document : base64Encode(document) }, handleResult(callback));
		},
		update: function(vaultId,documentId,document,callback)  {
			this.client.put('/v1/vaults/' + vaultId + '/documents/' + documentId, { document : base64Encode(document) }, handleResult(callback));
		},
		del: function(vaultId,documentId,callback) {
			this.client.del('/v1/vaults/' + vaultId + '/documents/' + documentId, handleResult(callback));
		},
		get: function(vaultId,documentId,callback) {
			this.client.get('/v1/vaults/' + vaultId + '/documents/' + documentId, handleResult(callback,true));
		}
	},
	blob: {
		create: function(vaultId,document,callback) {
			this.client.post('/v1/vaults/' + vaultId + '/blobs',{ document : base64Encode(document) }, handleResult(callback));
		},
		update: function(vaultId,documentId,document,callback)  {
			this.client.put('/v1/vaults/' + vaultId + '/blobs/' + documentId, { document : base64Encode(document) }, handleResult(callback));
		},
		del: function(vaultId,documentId,callback) {
			this.client.del('/v1/vaults/' + vaultId + '/blobs/' + documentId, handleResult(callback));
		},
		get: function(vaultId,documentId,callback) {
			this.client.get('/v1/vaults/' + vaultId + '/blobs/' + documentId, handleResult(callback,true));
		}
	},
	schema: {
		create: function(vaultId,document,callback) {
			this.client.post('/v1/vaults/' + vaultId + '/schemas',{ document : base64Encode(document) }, handleResult(callback));
		},
		update: function(vaultId,documentId,document,callback)  {
			this.client.put('/v1/vaults/' + vaultId + '/schemas/' + documentId, { document : base64Encode(document) }, handleResult(callback));
		},
		del: function(vaultId,documentId,callback) {
			this.client.del('/v1/vaults/' + vaultId + '/schemas/' + documentId, handleResult(callback));
		},
		get: function(vaultId,documentId,callback) {
			this.client.get('/v1/vaults/' + vaultId + '/schemas/' + documentId, handleResult(callback,true));
		},
		all: function(vaultId,callback) {
			this.client.get('/v1/vaults/' + vaultId + '/schemas', handleResult(callback,true));
		}
	},
	search: {
		get: function(vaultId,query,callback) {
			callback('Not implemented yet');
		}
	}
};


var truevault = module.exports = exports = TrueVault;