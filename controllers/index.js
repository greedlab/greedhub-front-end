/*
 * 首页
 */

var template = require('art-template');
var debug = require('debug')('greedhub-front-end:controller');
var config = require('../util/config');
var cookies = require('../util/cookies');
var menu = require('../models/menu');

var index = {
    index: function (req, res) {
        var data = {
            title: 'Index',
            menu: menu
        };
        var html = template('index', data);
        res.send(html);
    }
};

module.exports = index;
