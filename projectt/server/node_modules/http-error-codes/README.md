

http error code middleware provide all possible http error codes
(1XX - informational responses
 2XX - success
 3XX - redirection
 4XX - client
 5XX - server
 internet information services
 cloudfare
 nginx
)

Installation

npm install http-error-codes

API

var httpErrorCodes = require('http-error-codes')

httpErrorCodes.errorCode(error ,message)

error
 It is an error message in the form of string in camelCase format like badRequest , notFound etc . It is required

 message
This is optional parameter containing user friendly message in the form of string 

Usage

var express = require('express');
var httpErrorCodes = require('http-error-codes');

var app = express();

app.get('/', (req, res) => {
	res.send(httpErrorCodes.errorCode('notFound', 'page is not available'));
});

app.listen(3000, () => {
	console.log('app is listening');
});
