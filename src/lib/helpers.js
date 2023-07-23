import { goto } from '$app/navigation';
import { toastStore } from '@skeletonlabs/skeleton';

var defaultParseOptions = {
	decodeValues: true,
	map: false,
	silent: false
};

function isNonEmptyString(str) {
	return typeof str === 'string' && !!str.trim();
}

export function parseString(setCookieValue, options) {
	var parts = setCookieValue.split(';').filter(isNonEmptyString);

	var nameValuePairStr = parts.shift();
	var parsed = parseNameValuePair(nameValuePairStr);
	var name = parsed.name;
	var value = parsed.value;

	options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;

	try {
		value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
	} catch (e) {
		console.error(
			"set-cookie-parser encountered an error while decoding a cookie with value '" +
				value +
				"'. Set options.decodeValues to false to disable this feature.",
			e
		);
	}

	var cookie = {
		name: name,
		value: value
	};

	parts.forEach(function (part) {
		var sides = part.split('=');
		var key = sides.shift().trimLeft().toLowerCase();
		var value = sides.join('=');
		if (key === 'expires') {
			cookie.expires = new Date(value);
		} else if (key === 'max-age') {
			cookie.maxAge = parseInt(value, 10);
		} else if (key === 'secure') {
			cookie.secure = true;
		} else if (key === 'httponly') {
			cookie.httpOnly = true;
		} else if (key === 'samesite') {
			cookie.sameSite = value;
		} else {
			cookie[key] = value;
		}
	});

	return cookie;
}

function parseNameValuePair(nameValuePairStr) {
	// Parses name-value-pair according to rfc6265bis draft

	var name = '';
	var value = '';
	var nameValueArr = nameValuePairStr.split('=');
	if (nameValueArr.length > 1) {
		name = nameValueArr.shift();
		value = nameValueArr.join('='); // everything after the first =, joined by a "=" if there was more than one part
	} else {
		value = nameValuePairStr;
	}

	return { name: name, value: value };
}

export function splitCookiesString(cookiesString, delimiter = ',') {
	if (Array.isArray(cookiesString)) {
		return cookiesString;
	}
	if (typeof cookiesString !== 'string') {
		return [];
	}

	var cookiesStrings = [];
	var pos = 0;
	var start;
	var ch;
	var lastComma;
	var nextStart;
	var cookiesSeparatorFound;

	function skipWhitespace() {
		while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
			pos += 1;
		}
		return pos < cookiesString.length;
	}

	function notSpecialChar() {
		ch = cookiesString.charAt(pos);

		return ch !== '=' && ch !== ';' && ch !== ',';
	}

	while (pos < cookiesString.length) {
		start = pos;
		cookiesSeparatorFound = false;

		while (skipWhitespace()) {
			ch = cookiesString.charAt(pos);
			if (ch === delimiter) {
				// ',' is a cookie separator if we have later first '=', not ';' or ','
				lastComma = pos;
				pos += 1;

				skipWhitespace();
				nextStart = pos;

				while (pos < cookiesString.length && notSpecialChar()) {
					pos += 1;
				}

				// currently special character
				if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
					// we found cookies separator
					cookiesSeparatorFound = true;
					// pos is inside the next cookie, so back up and return it.
					pos = nextStart;
					cookiesStrings.push(cookiesString.substring(start, lastComma));
					start = pos;
				} else {
					// in param ',' or param separator ';',
					// we continue from that comma
					pos = lastComma + 1;
				}
			} else {
				pos += 1;
			}
		}

		if (!cookiesSeparatorFound || pos >= cookiesString.length) {
			cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
	}

	return cookiesStrings;
}

export function handleAppwriteError({ code }) {
	console.log(code);
	switch (code) {
		case 401:
			goto('/auth/logout');
			toastStore.trigger({ message: 'Your session has expired' });
			break;
		case 403:
			toastStore.trigger({ message: 'You are not allowed to perform this action' });
			break;
		case 404:
			toastStore.trigger({ message: 'This resource does not exist' });
			break;
		case 429:
			toastStore.trigger({ message: 'Ratelimit exceded' });
			break;
	}
}
