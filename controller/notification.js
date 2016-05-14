/*
 *  notifications
 *
 *  文档: https://developer.github.com/v3/activity/notifications/
 */
var request = require('request');
var template = require('art-template');
var qs = require('querystring');
var config = require('../util/config');
var cookies = require('../util/cookies');
var link = require('../util/link');
var menu = require('../module/menu');

var notification = {
    list:function (req,res) {
        var url = config.githubdomain + '/notifications';
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

        // console.log("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var pageArray = new Array();
                var index = 0;
                if (response.headers.link) {
                    console.log('response.headers.link: ', response.headers.link);
                    var prev = link.getPrev(response.headers.link);
                    if (prev) {
                        pageArray[index] = {
                            title: "prev",
                            link: "notifications?page=" + prev
                        };
                        index++;
                    }
                    var next = link.getNext(response.headers.link);
                    if (next) {
                        pageArray[index] = {
                            title: "next",
                            link: "notifications?page=" + next
                        };
                        index++;
                    }
                }

                var list = JSON.parse(body);
                console.log("list:", list);
                var data = {
                    title: 'Notifications',
                    menu: menu,
                    list: list,
                    pageNavigation: pageArray
                };
                var html = template('notifications', data);
                res.send(html);
                return;
            }
            res.send(body);
        }
        request(options, callback);
    }
};

module.exports = notification;
