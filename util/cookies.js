/*
 * cookies
 *
 * cookie 写之后马上读读取不到.
 */

var crypto = require("crypto");
var secure = require('./secure');
var maxAge = 30 * 24 * 60 * 60 * 1000;

var cookies = {
    getCode: function (req) {
        var cookies = req.cookies;
        if (cookies && cookies.greedhubCode) {
            return secure.decode(cookies.greedhubCode);
        } else {
            return null;
        }
    },
    setCode: function (code,res) {
        if (code) {
            var encode = secure.encode(code);
            // console.log("encode " + encode);
            res.cookie('greedhubCode', encode, {maxAge: maxAge});
        }
    },
    getToken: function (req) {
        var cookies = req.cookies;
        if (cookies && cookies.greedhubToken) {
            return secure.decode(cookies.greedhubToken);
        } else {
            return null;
        }
    },
    setToken: function (token,res) {
        if (token) {
            var encode = secure.encode(token);
            // console.log("encode " + encode);
            res.cookie('greedhubToken', encode, {maxAge: maxAge});
        }
    },
    getUserId: function (req) {
        var cookies = req.cookies;
        if (cookies) {
            return cookies.userId;
        } else {
            return null;
        }
    },
    setUserId: function (userId,res) {
        if (userId) {
            res.cookie('userId', userId, {maxAge: maxAge});
        }
    },
    getUserLogin: function (req) {
        var cookies = req.cookies;
        if (cookies) {
            return cookies.userLogin;
        } else {
            return null;
        }
    },
    setUserLogin: function (userLogin,res) {
        if (userLogin) {
            res.cookie('userLogin', userLogin, {maxAge: maxAge});
        }
    },
    clear: function (res) {
        res.cookie('greedhubCode', "", 0);
        res.cookie('greedhubToken', "", 0);
        res.cookie('userId', "", 0);
        res.cookie('userLogin', "", 0);
    }
};

module.exports = cookies;
