/*
 * 加密解密
 */
var crypto = require("crypto");
var config = require('./config');

var secure = {
    encode: function (str) {
        var cipher = crypto.createCipher("aes192", config.secret);
        var enc = cipher.update(str, "utf8", "hex");//编码方式从utf-8转为hex;
        enc += cipher.final("hex");//编码方式从转为hex;
        return enc;
    },
    decode: function (str) {
        var decipher = crypto.createDecipher("aes192", config.secret);
        var dec = decipher.update(str, "hex", "utf8");//编码方式从hex转为utf-8;
        dec += decipher.final("utf8");//编码方式从utf-8;
        return dec;
    }
};

module.exports = secure;
