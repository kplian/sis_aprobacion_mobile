/**
 * Pxp Rest client v2 
 * Connect with pxp framework php 7 version
 * @author : Jaime Rivera
 * @example
 * // create client:
 * const x = new PXPRestClient2('3.133.135.231', 'kerp/pxp/lib/rest', 'cors');
 * @example
 * // authenticate
 * const prom = x.authenticate('admin', 'admin');
 * prom.then(data => {
 *   console.log('2:',data);
 * });
 * @example
 * // doRequest
 * fetch(x.request({
 *       url: 'seguridad/Usuario/listarUsuario',
 *       params: {
 *           start: 0,
 *           limit: 1000
 *       }
 *   }))
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 *   .catch(err => console.log('error', err));
 * 
 */

import md5 from 'crypto-js/md5';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import Hex from 'crypto-js/enc-hex';
import { v4 as uuidv4 } from 'uuid';

class Encryption {
    /**
     * @var integer Return encrypt method or Cipher method number. (128, 192, 256)
     */
    get encryptMethodLength() {
        var encryptMethod = this.encryptMethod;
        // get only number from string.
        // @link https://stackoverflow.com/a/10003709/128761 Reference.
        var aesNumber = encryptMethod.match(/\d+/)[0];
        return parseInt(aesNumber);
    }// encryptMethodLength


    /**
     * @var integer Return cipher method divide by 8. example: AES number 256 will be 256/8 = 32.
     */
    get encryptKeySize() {
        var aesNumber = this.encryptMethodLength;
        return parseInt(aesNumber / 8);
    }// encryptKeySize


    /**
     * @link http://php.net/manual/en/function.openssl-get-cipher-methods.php Refer to available methods in PHP if we are working between JS & PHP encryption.
     * @var string Cipher method. 
     *              Recommended AES-128-CBC, AES-192-CBC, AES-256-CBC 
     *              due to there is no `openssl_cipher_iv_length()` function in JavaScript 
     *              and all of these methods are known as 16 in iv_length.
     */
    get encryptMethod() {
        return 'AES-256-CBC';
    }// encryptMethod


    /**
     * Decrypt string.
     * 
     * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
     * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs Crypto JS base64 encode/decode reference.
     * @param string encryptedString The encrypted string to be decrypt.
     * @param string key The key.
     * @return string Return decrypted string.
     */
    decrypt(encryptedString, key) {
        var json = JSON.parse(Utf8.stringify(Base64.parse(encryptedString)));

        var salt = Hex.parse(json.salt);
        var iv = Hex.parse(json.iv);

        var encrypted = json.ciphertext;// no need to base64 decode.

        var iterations = parseInt(json.iterations);
        if (iterations <= 0) {
            iterations = 999;
        }
        var encryptMethodLength = (this.encryptMethodLength/4);// example: AES number is 256 / 4 = 64
        var hashKey = CryptoJS.PBKDF2(key, salt, {'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations});

        var decrypted = AES.decrypt(encrypted, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});

        return decrypted.toString(Utf8);
    }// decrypt


    /**
     * Encrypt string.
     * 
     * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
     * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs Crypto JS base64 encode/decode reference.
     * @param string string The original string to be encrypt.
     * @param string key The key.
     * @return string Return encrypted string.
     */
    encrypt(string, key) {
        var iv = CryptoJS.lib.WordArray.random(16);// the reason to be 16, please read on `encryptMethod` property.

        var salt = CryptoJS.lib.WordArray.random(256);
        var iterations = 999;
        var encryptMethodLength = (this.encryptMethodLength/4);// example: AES number is 256 / 4 = 64
        var hashKey = CryptoJS.PBKDF2(key, salt, {'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations});

        var encrypted = AES.encrypt(string, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});
        var encryptedString = Base64.stringify(encrypted.ciphertext);

        var output = {
            'ciphertext': encryptedString,
            'iv': Hex.stringify(iv),
            'salt': Hex.stringify(salt),
            'iterations': iterations
        };

        return Base64.stringify(Utf8.parse(JSON.stringify(output)));
    }// encrypt
}

 export default class PXPRestClient2 {
    constructor(host, baseUrl = 'rest/', mode = 'same-origin', port = '80', protocol = 'http') {
        this.host = host;
        this.baseUrl = baseUrl;
        this.port = port;
        this.protocol = protocol;
        this.mode = mode;
    }

    authenticate(user, pass) {
        this.prefix = uuidv4();
        this.user = user;
        const md5Pass = md5(pass).toString();
        const enc = new Encryption();
        const encrypted = enc.encrypt(this.prefix + '$$' + this.user, md5Pass);
        

        const request = this.request({
            url: 'seguridad/Auten/verificarCredenciales',            
            headers: {
                'Pxp-user': user,
                'auth-version': 2,
                'Php-Auth-User': encrypted
            },
            params: {
                'test1': 'test4',
                otroParam: ''
            }
        });
        return fetch(request)
            .then(response => response.json())
            .then(data => {
                console.log('1:', data);
                return data;
            }) 
            .catch(err => console.log('error', err));
    }
    request(obj) {
        const headers = obj.headers || {}; 
        let dataSend = new FormData();
        let params = '';
        if (obj.params) {
            params = this.encodeFormData(obj.params);            
        }
        return new Request(
            `${this.protocol}://${this.host}:${this.port}/${this.baseUrl}/${obj.url}`, 
            {
                method: obj.method || 'POST',
                mode: this.mode,
                headers: {
                    ...headers,
                    'content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }, 
                cache: 'no-cache',
                credentials: 'include',
                body: params
            }
        );
    }

    encodeFormData(data) {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }
}

// const x = new PXPRestClient2('3.133.135.231', 'kerp20201/pxp/lib/rest', 'cors');
// const prom = x.authenticate('admin', 'admin');

// prom.then(data => {
//     console.log('2:',data);
//     fetch(x.request({
//         url: 'seguridad/Usuario/listarUsuario',
//         params: {
//             start: 0,
//             limit: 1000
//         }
//     }))
//     .then(response => response.json())
//     .then(data => console.log('3:', data))
//     .catch(err => console.log('error', err));
// });
