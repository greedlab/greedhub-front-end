/*
 *  events
 *
 *  文档: https://developer.github.com/v3/activity/events/
 */
var request = require('request');
var template = require('art-template');
var qs = require('querystring');
var debug = require('debug')('greedhub-front-end:controller');
var config = require('../util/config');
var cookies = require('../util/cookies');
var link = require('../util/link');
var menu = require('../models/menu');

var event = {
    list: function (req, res, userLogin) {
        var user = userLogin ? userLogin : cookies.getUserLogin(req);
        var url = config.githubdomain + '/users/' + user + '/received_events';
        if (req.query) {
            var query = qs.stringify(req.query);
            if (query.length > 0) {
                url = url + "?" + query;
            }
        }
        var options = {
            url: url,
            headers: {
                'Authorization': 'token ' + cookies.getToken(req),
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };

        debug("options:", options);
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
                            link: "events?page=" + prev
                        };
                        index++;
                    }
                    var next = link.getNext(response.headers.link);
                    if (next) {
                        pageArray[index] = {
                            title: "next",
                            link: "events?page=" + next
                        };
                        index++;
                    }
                }

                var list = JSON.parse(body);
                debug("list:", list);
                var data = {
                    title: 'Events',
                    menu: menu,
                    list: list,
                    pageNavigation: pageArray
                };
                var html = template('events', data);
                res.send(html);
                return;
            }
            res.send(body);
        }

        request(options, callback);
    }
};

module.exports = event;
