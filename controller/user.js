/*
 *  feeds
 *
 *  文档: https://developer.github.com/v3/activity/feeds/
 */
var request = require('request');
var template = require('art-template');
var config = require('../util/config');
var cookies = require('../util/cookies');
var localStorage = require('../util/localStorage');
var menu = require('../module/menu');

var user = {
    info:function (req,res) {
        var options = {
            url: config.githubdomain + '/user',
            headers: {
                'Authorization': 'token ' + cookies.getToken(req),
                'User-Agent': config.useragent
            }
        };
        // console.log("options:", options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var detail = JSON.parse(body);
                cookies.setUserId(detail.id,res);
                cookies.setUserLogin(detail.login,res);
            }
            res.redirect(config.home());
        }
        request(options, callback);
    }
}

module.exports = user;
