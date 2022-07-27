'use strict';

/**
 *function to set the error code if error is a valid http error
 *
 *@param {string} error
 *
 */

function setCode(error) {
	var code;
	switch (error) {
		case 'continue':
			code = 100;
			break;

		case 'switchingProrocols':
			code = 101;
			break;

		case 'processing':
			code = 102;
			break;

		case 'ok':
			code = 200;
			break;

		case 'created':
			code = 201;
			break;

		case 'accepted':
			code = 202;
			break;

		case 'nonAuthoritativeInformation':
			code = 203;
			break;

		case 'noContent':
			code = 204;
			break;

		case 'resetContent':
			code = 205;
			break;

		case 'partialContent':
			code = 206;
			break;

		case 'multiStatus':
			code = 207;
			break;

		case 'alreadyReporting':
			code = 208;
			break;

		case 'IMUsed':
			code = 226;
			break;

		case 'multipleChoices':
			code = 300;
			break;

		case 'movedPermanently':
			code = 301;
			break;

		case 'found':
			code = 302;
			break;

		case 'seeOther':
			code = 303;
			break;

		case 'notModified':
			code = 304;
			break;

		case 'useProxy':
			code = 305;
			break;

		case 'switchProxy':
			code = 306;
			break;

		case 'temporaryRedirect':
			code = 307;
			break;

		case 'permanentRedirect':
			code = 308;
			break;

		case 'badRequest':
			code = 400;
			break;

		case 'unauthorized':
			code = 401;
			break;

		case 'paymentRequired':
			code = 402;
			break;

		case 'forbidden':
			code = 403;
			break;

		case 'notFound':
			code = 404;
			break;

		case 'methodNotAllowed':
			code = 405;
			break;

		case 'notAcceptable':
			code = 406;
			break;

		case 'proxyAuthenticationRequired':
			code = 407;
			break;

		case 'requestTimeOut':
			code = 408;
			break;

		case 'conflict':
			code = 409;
			break;

		case 'gone':
			code = 410;
			break;

		case 'lengthRequired':
			code = 411;
			break;

		case 'preconditionFaild':
			code = 412;
			break;

		case 'payloadTooLarge':
			code = 413;
			break;

		case 'uriTooLong':
			code = 414;
			break;

		case 'unsupportedMediaType':
			code = 415;
			break;

		case 'rangeNotSatisfiable':
			code = 416;
			break;

		case 'expectationFailed':
			code = 417;
			break;

		case 'teapot':
			code = 418;
			break;

		case 'misdirectedRequest':
			code = 421;
			break;

		case 'unprocessableEntity':
			code = 422;
			break;

		case 'locked':
			code = 423;
			break;

		case 'failedDependency':
			code = 424;
			break;

		case 'upgradeRequired':
			code = 426;
			break;

		case 'preconditionRequired':
			code = 428;
			break;

		case 'tooManyRequests':
			code = 429;
			break;

		case 'requestHeaderFieldsTooLarge':
			code = 431;
			break;

		case 'unavailableForLegalReasons':
			code = 100;
			break;

		case 'internalServerError':
			code = 500;
			break;

		case 'notImplemented':
			code = 501;
			break;

		case 'badGateway':
			code = 502;
			break;

		case 'serviceUnavailable':
			code = 503;
			break;

		case 'gatewayTimeout':
			code = 504;
			break;

		case 'httpVersionNotSupported':
			code = 505;
			break;

		case 'variantAlsoNegotiates':
			code = 506;
			break;

		case 'insufficientStorage':
			code = 507;
			break;

		case 'loopDetected':
			code = 508;
			break;

		case 'notExtended':
			code = 510;
			break;

		case 'networkAuthenticationRequired':
			code = 511;
			break;

		case 'loginTimeOut':
			code = 440;
			break;

		case 'retryWith':
			code = 449;
			break;

		case 'redirect':
			code = 451;
			break;

		case 'noResponse':
			code = 444;
			break;

		case 'sslCertificateError':
			code = 495;
			break;

		case 'sslCertificateRequired':
			code = 496;
			break;

		case 'httpRequestSentToHttpsPort':
			code = 497;
			break;

		case 'clientClosedRequest':
			code = 499;
			break;

		case 'unknownError':
			code = 520;
			break;

		case 'webServerIsDown':
			code = 521;
			break;

		case 'connectionTimedOut':
			code = 522;
			break;

		case 'originIsUnreachable':
			code = 523;
			break;

		case 'aTimeoutOccured':
			code = 524;
			break;

		case 'SSLHandshakefailed':
			code = 525;
			break;

		case 'invalidSSLCertificate':
			code = 526;
			break;

		case 'railgunError':
			code = 527;
			break;

		default:
			code = null;
	}

	return code;
}

/**
 *a function returning object having properties code, status and message
 *if arguments  are valid otherwise it will throw error
 *
 *@param {string} error
 *@param {string} message
 */
exports.errorCode = function(error, message) {
	var codeObj = {};

	//checking for argument length (whether they are two in number or not)
	if (arguments.length == 2) {
		//checking for the type of arguments
		if (typeof error !== 'string' || typeof message !== 'string') {
			//throw type error if they are not valid
			throw TypeError('Argument is not of valid type');
		} else {
			// else return successfully an object having code , status and message
			var code = setCode(error);
			if (code) {
				codeObj.code = code;
				codeObj.status = error;
				codeObj.message = message;

				return codeObj;
			} else {
				throw Error('Error is not valid');
			}
		}
	} else if (arguments.length == 1) {
		//checking for argument length (whether they are one in number or not)

		if (!error) {
			//throw error if error field is not passed
			throw Error('Error field is required');
		} else {
			//throw type error of error field is not of string type
			if (typeof error !== 'string') {
				throw TypeError('Argument is not of valid type');
			} else {
				//else return object having properties code and status
				var code = setCode(error);
				if (code) {
					codeObj.code = setCode(error);
					codeObj.status = error;
					return codeObj;
				} else {
					throw Error('Error is not valid');
				}
			}
		}
	} else if (arguments.length == 0) {
		// throw error if argument is not provided
		throw Error('No arugments provided ');
	} else {
		//throw error if number of argument is not valid
		throw Error('Number of arguments is not valid');
	}
};
