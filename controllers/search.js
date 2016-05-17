/*
 *  repo
 *
 *  文档: https://developer.github.com/v3/repos/
 */
var request = require('request');
var template = require('art-template');
var debug = require('debug')('greedhub-front-end:repo');
var config = require('../util/config');
var cookies = require('../util/cookies');
var menu = require('../models/menu');

var search = {
    search: function (req, res, q, sort, order) {
        var data = {
            title: 'Search',
            menu: menu
        };
        var html = template('search', data);
        res.send(html);
    },
    repos: function (req, res, q, sort, order) {
        var token = cookies.getToken(req);
        var options = {
            url: config.githubdomain + '/search/repositories' + "?" + qs.stringify(req.query),
            headers: {
                'Authorization': 'token ' + token,
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };

        // debug("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var list = JSON.parse(body);
                debug('list:', list);
                var data = {
                    title: 'Search',
                    menu: menu,
                    list: list
                };
                var html = template('search', data);
                res.send(html);
                return;
            }
            res.send(body);
        }

        request(options, callback);
    },
    code: function (req, res, q, sort, order) {
        var token = cookies.getToken(req);
        var options = {
            url: config.githubdomain + '/search/code' + "?" + qs.stringify(req.query),
            headers: {
                'Authorization': 'token ' + token,
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };

        // debug("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var list = JSON.parse(body);
                debug('list:', list);
                var data = {
                    title: 'Search',
                    menu: menu,
                    list: list
                };
                var html = template('search', data);
                res.send(html);
                return;
            }
            res.send(body);
        }

        request(options, callback);
    },
    issues: function (req, res, q, sort, order) {
        var token = cookies.getToken(req);
        var options = {
            url: config.githubdomain + '/search/issues' + "?" + qs.stringify(req.query),
            headers: {
                'Authorization': 'token ' + token,
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };

        // debug("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var list = JSON.parse(body);
                debug('list:', list);
                var data = {
                    title: 'Search',
                    menu: menu,
                    list: list
                };
                var html = template('search', data);
                res.send(html);
                return;
            }
            res.send(body);
        }

        request(options, callback);
    },
    users: function (req, res, q, sort, order) {
        var token = cookies.getToken(req);
        var options = {
            url: config.githubdomain + '/search/users' + "?" + qs.stringify(req.query),
            headers: {
                'Authorization': 'token ' + token,
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };

        // debug("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var list = JSON.parse(body);
                debug('list:', list);
                var data = {
                    title: 'Search',
                    menu: menu,
                    list: list
                };
                var html = template('search', data);
                res.send(html);
                return;
            }
            res.send(body);
        }

        request(options, callback);
    }
};

module.exports = search;
