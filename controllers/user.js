/*
 *  feeds
 *
 *  文档: https://developer.github.com/v3/activity/feeds/
 */
var request = require('request');
var template = require('art-template');
var qs = require('querystring');
var debug = require('debug')('greedhub-front-end:user');
var config = require('../util/config');
var cookies = require('../util/cookies');
var menu = require('../models/menu');

var user = {
    info: function (req, res) {
        var options = {
            url: config.githubdomain + '/user',
            headers: {
                'Authorization': 'token ' + cookies.getToken(req),
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };
        // debug("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var detail = JSON.parse(body);
                cookies.setUserId(detail.id, res);
                cookies.setUserLogin(detail.login, res);
            }
            res.redirect("/");
        }

        request(options, callback);
    },
    infoCallback: function (req, res, callback) {
        var options = {
            url: config.githubdomain + '/user',
            headers: {
                'Authorization': 'token ' + cookies.getToken(req),
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };
        request(options, callback);
    },
    login: function (req, res) {
        var url = "https://github.com/login/oauth/authorize?client_id=" + config.client_id + "&scope=" + config.scope + "&state=" + config.state;
        var data = {
            title: 'login',
            loginurl: url
        };
        var html = template('login', data);
        res.send(html);
    },
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

module.exports = user;
