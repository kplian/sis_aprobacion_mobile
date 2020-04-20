import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';
 

export function CryptoJSAesEncrypt(passphrase, plain_text){

    var salt = CryptoJS.lib.WordArray.random(256);
    var iv = CryptoJS.lib.WordArray.random(16);
    //for more random entropy can use : https://github.com/wwwtyro/cryptico/blob/master/random.js instead CryptoJS random() or another js PRNG

    var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999 });

    var encrypted = CryptoJS.AES.encrypt(plain_text, key, {iv: iv});

    var data = {
        ciphertext : CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
        salt : CryptoJS.enc.Hex.stringify(salt),
        iv : CryptoJS.enc.Hex.stringify(iv)    
    }

    return JSON.stringify(data);
}