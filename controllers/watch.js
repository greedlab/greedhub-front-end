/*
 *  watching
 *
 *  文档: https://developer.github.com/v3/activity/watching/
 */
var request = require('request');
var template = require('art-template');
var qs = require('querystring');
var debug = require('debug')('greedhub-front-end:watch');
var config = require('../util/config');
var cookies = require('../util/cookies');
var link = require('../util/link');
var menu = require('../models/menu');

var watch = {
    list:function (req,res) {
        var url = config.githubdomain + '/user/subscriptions';
        if (req.query) {
            url = url + "?" + qs.stringify(req.query);
        }
        var options = {
            url: url,
            headers: {
                'Authorization': 'token ' + cookies.getToken(req),
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };

        // debug("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var pageArray = new Array();
                var index = 0;
                if (response.headers.link) {
                    debug('response.headers.link: ', response.headers.link);
                    var prev = link.getPrev(response.headers.link);
                    if (prev) {
                        pageArray[index] = {
                            title: "prev",
                            link: "watching?page=" + prev
                        };
                        index++;
                    }
                    var next = link.getNext(response.headers.link);
                    if (next) {
                        pageArray[index] = {
                            title: "next",
                            link: "watching?page=" + next
                        };
                        index++;
                    }
                }
                var list = JSON.parse(body);
                debug("list:", list);
                var data = {
                    title: 'Watching',
                    menu: menu,
                    list: list,
                    pageNavigation: pageArray
                };
                var html = template('watching', data);
                res.send(html);
                return;
            }
            res.send(body);
        }
        request(options, callback);
    }
};

module.exports = watch;
