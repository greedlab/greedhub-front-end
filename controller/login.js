/*
 *  登录
 *
 *  文档: https://developer.github.com/v3/oauth/
 */
var request = require('request');
var qs = require('querystring');
var debug = require('debug')('greedhub-front-end:server');
var config = require('../util/config');
var cookies = require('../util/cookies');
var user = require('./user');

var login = {
    oauth: function (req, res, code) {
        var url = 'https://github.com/login/oauth/access_token';
        var form = {
            'client_id': config.client_id,
            'client_secret': config.client_secret,
            'code': code
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = qs.parse(body);
                var accessToken = info.access_token;
                if (accessToken) {
                    cookies.setToken(accessToken,res);
                    res.redirect("/");
                    return;
                }
            }
            res.redirect('/login');
        }
        request(url, {
            method: 'POST',
            form: form
        }, callback);
    }
};

module.exports = login;
