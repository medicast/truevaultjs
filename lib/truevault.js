var restify = require('restify');

var ENDPOINT = 'https://api.truevault.com';

function TrueVault(apikey) {
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
	create : function(vaultId,document,callback) {
		this.client.post('/v1/vaults/' + vaultId + '/documents',{ document : base64Encode(document) }, handleResult(callback));
	},
	update : function(vaultId,documentId,document,callback)  {
		this.client.put('/v1/vaults/' + vaultId + '/documents/' + documentId, { document : base64Encode(document) }, handleResult(callback));
	},
	del : function(vaultId,documentId,callback) {
		this.client.del('/v1/vaults/' + vaultId + '/documents/' + documentId, handleResult(callback));
	},
	get    : function(vaultId,documentId,callback) {
		this.client.get('/v1/vaults/' + vaultId + '/documents/' + documentId, handleResult(callback,true));
	}

};


var truevault = module.exports = exports = TrueVault;