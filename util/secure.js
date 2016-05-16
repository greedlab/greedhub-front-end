/*
 * 加密解密
 */
var crypto = require("crypto");
var debug = require('debug')('greedhub-front-end:util');
var config = require('./config');

var secure = {
    encode: function (str) {
        var cipher = crypto.createCipher("aes192", config.secret);
        var enc = cipher.update(str, "utf8", "hex");//编码方式从utf-8转为hex;
        if (!enc) {
            return null;
        }
        var final = cipher.final("hex");//编码方式从转为hex;
        if (!final) {
            return null;
        }
        enc += final;
        return enc;
    },
    decode: function (str) {
        var decipher = crypto.createDecipher("aes192", config.secret);
        var dec = decipher.update(str, "hex", "utf8");//编码方式从hex转为utf-8;
        if (!dec) {
            return null;
        }
        var final = decipher.final("utf8");//编码方式从utf-8;
        if (!final) {
            return null;
        }
        dec += final;
        return dec;
    }
};

module.exports = secure;
