/*
 *  repo
 *
 *  文档: https://developer.github.com/v3/repos/
 */
var request = require('request');
var template = require('art-template');
var debug = require('debug')('greedhub-front-end:controller');
var config = require('../util/config');
var cookies = require('../util/cookies');
var menu = require('../models/menu');

var repository = {
    relativeUrl: '/user/repos',
    absoluteUrl: function() {
        return config.githubdomain + this.relativeUrl;
    },
    list:function (req,res) {
        var token = cookies.getToken(req);
        var options = {
            url: this.absoluteUrl(),
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
                    title: 'Repositories',
                    menu: menu,
                    list: list
                };
                var html = template('repos', data);
                res.send(html);
                return;
            }
            res.send(body);
        }
        request(options, callback);
    }
};

module.exports = repository;
