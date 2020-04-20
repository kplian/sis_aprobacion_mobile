/******************************************************************************
 Copyright(c) 2019 by
 Disydes - Kplian
 All rights reserved
 ******************************************************************************
 NAME:         js/clientRestPxp.js
 DEVELOPER:    Favio Figueroa P (finguer)
 DESCRIPTION:  Class for doing rest with pxp server
 REVISIONS:
 Date          Issue   Author             Description
 ---------     ------  --------------     ------------------------------------
 25-DEC-2019   0        Favio Figueroa    Created
 ******************************************************************************/

import {Base64} from './base64.js';
import {mcrypt} from './mcrypt.js';

// cryptoJS lib
import { CryptoJSAesEncrypt } from './crypto';

class clientRestPxp {

    constructor(url,typeUrl, port = 80, file = 'kerp', protocol = 'http') {
        this._protocol = protocol;
        this._host = url;
        this._base_url = '';
        // _port = '80/kerp',
        this._port = port;
        this._user = null;
        this._pass = null;
        this._pxp = false;
        this._request_number = 1;
        this._first_connection = true;
        this._error_number = 0;
        this._cookie_file = '';
        this._connMultiple = false;
        this._headers = {};

        this.HTTP = 'http';
        this.HTTPS = 'https';

        this.url = url;
        this.urlForRequest = null;

        // we create the url for doing the requests
        if (typeUrl == 'IP') {
            this.urlForRequest = url + ':80/' + file;
        } else {
            this.urlForRequest = url + ':80';
        }

    }

    verifyUser(verifyCallback){
        var params = new URLSearchParams();
        params.append('usuario', this.user);
        params.append('contrasena', this._user);
        console.log('p', params);
        
        fetch(this._urlRequest('seguridad/Auten/verificarCredenciales'), {
            method: 'POST',
            body: params,
            headers: Object.assign({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }, this._headers),
        }).then(res => res.text())
            .catch(error => console.log('Error:', error))
            .then(response => {
                console.log('resp', response);
                if( response ) {
                    let obj = eval('(' + response + ')');
                    let json = JSON.parse(JSON.stringify(obj));
                    verifyCallback(json)
                }
                else {
                    verifyCallback(null)
                }
            });

    }
    request(control, params, respCallback) {
        fetch(this._urlRequest(control), {
            method: 'POST',
            body: params,
            headers: Object.assign({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }, this._headers),
        }).then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => respCallback(response));

    }

    _urlRequest(control) {
        var resp = this._protocol + "://" + this.url + "/pxp/lib/rest/" + control;
        return resp;
    }

    setCredentialsPxp(user, pass) {
        this.pxp = true;
        this.pass = pass;
        this.user = user;
    }

    /**
     * setHeaders
     *
     * @param array $headers
     * @return Http
     */
    addHeader(headers) {
        // Ext.apply(this._headers, headers);
        //$.extend(this._headers, headers);
        Object.assign(this._headers, headers);
        return this;
    }


    /**
     * setHeaders
     *
     * @param array $headers
     * @return Http
     */
    setHeaders(headers) {
        this._headers = headers;
        return this;
    }


    /**
     * setHeaders
     *
     * @param array $headers
     * @return Http
     */
    getHeaders(headers) {
        return this._headers;

    }


    genHeaders() {
        var prefix = this.uniqid('pxp');
        this.pxp = true;
        // this._user = this.fnEncrypt(prefix + '$$' + this.user, this.pass);
        this._user = this.pass;
        // this._user = CryptoJSAesEncrypt( 'pxp$$' + this.user, this.pass);
        // this._pass = this.fnEncrypt(prefix + '$$' + this.pass, this.pass);

        this.addHeader({"Pxp-user": this.user});
        this.addHeader({"Php-Auth-User": this._user});
        //this.addHeader({"Php-Auth-Pw":this._pass});


        return this._headers
    }

    fnEncrypt($sValue, $sSecretKey) {

        return Base64.encode(mcrypt.Encrypt($sValue, undefined, $sSecretKey, 'rijndael-256', 'ecb'));
    }

    uniqid(prefix, more_entropy) {
        //  discuss at: http://phpjs.org/functions/uniqid/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //  revised by: Kankrelune (http://www.webfaktory.info/)
        //        note: Uses an internal counter (in php_js global) to avoid collision
        //        test: skip
        //   example 1: uniqid();
        //   returns 1: 'a30285b160c14'
        //   example 2: uniqid('foo');
        //   returns 2: 'fooa30285b1cd361'
        //   example 3: uniqid('bar', true);
        //   returns 3: 'bara20285b23dfd1.31879087'

        if (typeof prefix === 'undefined') {
            prefix = '';
        }

        var retId;
        var formatSeed = function (seed, reqWidth) {
            seed = parseInt(seed, 10)
                .toString(16); // to hex str
            if (reqWidth < seed.length) { // so long we split
                return seed.slice(seed.length - reqWidth);
            }
            if (reqWidth > seed.length) { // so short we pad
                return Array(1 + (reqWidth - seed.length))
                        .join('0') + seed;
            }
            return seed;
        };

        // BEGIN REDUNDANT
        if (!this.php_js) {
            this.php_js = {};
        }
        // END REDUNDANT
        if (!this.php_js.uniqidSeed) { // init seed with big random int
            this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }
        this.php_js.uniqidSeed++;

        retId = prefix; // start with prefix, add current milliseconds hex string
        retId += formatSeed(parseInt(new Date()
                .getTime() / 1000, 10), 8);
        retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
        if (more_entropy) {
            // for more entropy we add a float lower to 10
            retId += (Math.random() * 10)
                .toFixed(8)
                .toString();
        }

        return retId;
    }

}
export { clientRestPxp };
