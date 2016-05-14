/*
 *  repository
 *
 *  文档: https://developer.github.com/v3/activity/starring/
 */
var request = require('request');
var template = require('art-template');
var config = require('../util/config');
var cookies = require('../util/cookies');
var menu = require('../module/menu');

var repository = {
    relativeUrl: '/user/starred',
    absoluteUrl: function() {
        return config.githubdomain + this.relativeUrl;
    },
    list:function (req,res) {
        var token = cookies.getToken(req);
        var options = {
            url: this.absoluteUrl(),
            headers: {
                'Authorization': 'token ' + token,
                'User-Agent': config.useragent
            }
        };

        // console.log("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var list = JSON.parse(body);
                console.log("list:", list);
                var data = {
                    title: 'Starring',
                    menu: menu,
                    list: list
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

module.exports = repository;
