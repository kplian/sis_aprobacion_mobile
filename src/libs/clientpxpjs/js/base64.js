/* eslint-disable */
/******************************************************************************
 Copyright(c) 2019 by
 Disydes - Kplian
 All rights reserved
 ******************************************************************************
 NAME:         js/base64.js
 DEVELOPER:    Favio Figueroa P (finguer)
 DESCRIPTION:  base64.js
 REVISIONS:
 Date          Issue   Author             Description
 ---------     ------  --------------     ------------------------------------
 25-DEC-2019   0        Favio Figueroa    Created
 ******************************************************************************/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Base64 class: Base 64 encoding / decoding (c) Chris Veness 2002-2009                          */
/*    note: depends on Utf8 class                                                                 */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
var Utf8 = {
  // public method for url encoding
  encode: function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  },

  // public method for url decoding
  decode: function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {

        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
};

export {
  Base64
};
var Base64 = {}; // Base64 namespace

Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param {String} str The string to be encoded as base-64
 * @param {Boolean} [utf8encode=false] Flag to indicate whether str is Unicode string to be encoded 
 *   to UTF8 before conversion to base64; otherwise string is assumed to be 8-bit characters
 * @returns {String} Base64-encoded string
 */
Base64.encode = function (str, utf8encode) { // http://tools.ietf.org/html/rfc4648
  utf8encode = (typeof utf8encode == 'undefined') ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e = [],
    pad = '',
    c, plain, coded;
  var b64 = Base64.code;

  plain = utf8encode ? Utf8.encode(str) : str;

  c = plain.length % 3; // pad string to length of multiple of 3
  if (c > 0) {
    while (c++ < 3) {
      pad += '=';
      plain += '\0';
    }
  }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars

  for (c = 0; c < plain.length; c += 3) { // pack three octets into four hexets
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c + 1);
    o3 = plain.charCodeAt(c + 2);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hextets to index into code string
    e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join(''); // join() is far faster than repeated string concatenation in IE

  // replace 'A's from padded nulls with '='s
  coded = coded.slice(0, coded.length - pad.length) + pad;

  return coded;
}

/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param {String} str The string to be decoded from base-64
 * @param {Boolean} [utf8decode=false] Flag to indicate whether str is Unicode string to be decoded 
 *   from UTF8 after conversion from base64
 * @returns {String} decoded string
 */
Base64.decode = function (str, utf8decode) {
  utf8decode = (typeof utf8decode == 'undefined') ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d = [],
    plain, coded;
  var b64 = Base64.code;

  coded = utf8decode ? Utf8.decode(str) : str;

  for (var c = 0; c < coded.length; c += 4) { // unpack four hexets into three octets
    h1 = b64.indexOf(coded.charAt(c));
    h2 = b64.indexOf(coded.charAt(c + 1));
    h3 = b64.indexOf(coded.charAt(c + 2));
    h4 = b64.indexOf(coded.charAt(c + 3));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >>> 16 & 0xff;
    o2 = bits >>> 8 & 0xff;
    o3 = bits & 0xff;

    d[c / 4] = String.fromCharCode(o1, o2, o3);
    // check for padding
    if (h4 == 0x40) d[c / 4] = String.fromCharCode(o1, o2);
    if (h3 == 0x40) d[c / 4] = String.fromCharCode(o1);
  }
  plain = d.join(''); // join() is far faster than repeated string concatenation in IE

  return utf8decode ? Utf8.decode(plain) : plain;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */