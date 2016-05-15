/*
 *  收藏
 *
 *  文档: https://developer.github.com/v3/activity/starring/
 */
var request = require('request');
var template = require('art-template');
var debug = require('debug')('greedhub-front-end:server');
var config = require('../util/config');
var cookies = require('../util/cookies');
var menu = require('../module/menu');
var link = require('../util/link');
var qs = require('querystring');

var star = {
    list: function (req, res) {
        var url = config.githubdomain + '/user/starred';
        if (req.query) {
            url = url + "?" + qs.stringify(req.query);
        }
        var options = {
            url: url,
            headers: {
                'Authorization': 'token ' + cookies.getToken(req),
                'User-Agent': config.useragent
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
                            link: "starring?page=" + prev
                        };
                        index++;
                    }
                    var next = link.getNext(response.headers.link);
                    if (next) {
                        pageArray[index] = {
                            title: "next",
                            link: "starring?page=" + next
                        };
                        index++;
                    }
                }

                var list = JSON.parse(body);
                // debug("list:", list);
                var data = {
                    title: 'Starring',
                    menu: menu,
                    list: list,
                    pageNavigation: pageArray
                };
                var html = template('starring', data);
                res.send(html);
                return;
            }
            res.send(body);
        }

        request(options, callback);
    }
};

module.exports = star;
