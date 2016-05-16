/*
 *  feeds
 *
 *  文档: https://developer.github.com/v3/activity/feeds/
 */
var request = require('request');
var template = require('art-template');
var debug = require('debug')('greedhub-front-end:controller');
var config = require('../util/config');
var cookies = require('../util/cookies');
var menu = require('../models/menu');

var feed = {
    list:function (req,res) {
        var options = {
            url: config.githubdomain + '/feeds',
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
                debug("detail:", detail);
                var data = {
                    title: 'Feeds',
                    menu: menu,
                    detail: body
                };
                var html = template('feeds', data);
                res.send(html);
                return;
            }
            res.send(body);
        }
        request(options, callback);
    }
};

module.exports = feed;
