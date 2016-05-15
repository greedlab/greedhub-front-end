/*
 * 路由
 *
 * Author: Bell
 */

var express = require('express');
var router = express.Router();
var template = require('art-template');
var path = require('path');
var debug = require('debug')('greedhub-front-end:server');

var menu = require('../module/menu');

var cookies = require('../util/cookies');
var config = require('../util/config');

var login = require('../controller/login');
var star = require('../controller/star');
var event = require('../controller/event');
var feed = require('../controller/feed');
var notification = require('../controller/notification');
var watch = require('../controller/watch');
var user = require('../controller/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (cookies.getToken(req)) {
        var data = {
            title: 'title',
            menu: menu
        };
        var html = template('index', data);
        res.send(html);
    } else {
        res.redirect('/login');
    }
});

/* GET home page. */
router.get('/index.html', function (req, res, next) {
    res.redirect('/');
});

/* login */
router.get('/login', function (req, res, next) {
    var url = "https://github.com/login/oauth/authorize?client_id=" + config.client_id + "&scope=" + config.scope + "&state=" + config.state;
    var data = {
        title: 'login',
        loginurl: url
    };
    var html = template('login', data);
    res.send(html);
});

/* callback */
router.get('/callback', function (req, res, next) {
    var query = req.query;
    if (query && query.code && query.state && query.state == config.state) {
        cookies.setCode(query.code, res);
        login.oauth(req, res, query.code);
        return;
    }
    res.redirect("/login");
});

/* 获取登录的用户信息 */
router.get('/user', function (req, res, next) {
    if (cookies.getToken(req)) {
        user.info(req, res);
    } else {
        res.redirect('/login');
    }
});

/* notifications */
router.get('/notifications', function (req, res, next) {
    if (cookies.getToken(req)) {
        notification.list(req, res, req.query.page);
    } else {
        res.redirect('/login');
    }
});

/* starring */
router.get('/starring', function (req, res, next) {
    if (cookies.getToken(req)) {
        star.list(req, res, req.query.page);
    } else {
        res.redirect('/login');
    }
});

/* events */
router.get('/events', function (req, res, next) {
    if (cookies.getToken(req)) {
        if (cookies.getUserLogin(req)) {
            event.list(req, res, req.query.page);
        } else {
            user.infoCallback(req,res,function () {
                if (!error && response.statusCode == 200) {
                    var detail = JSON.parse(body);
                    cookies.setUserId(detail.id,res);
                    cookies.setUserLogin(detail.login,res);
                    event.list(req, res, req.query.page);
                } else {
                    res.redirect('/login');
                }
            })
        }   
    } else {
        res.redirect('/login');
    }
});

/* feeds */
router.get('/feeds', function (req, res, next) {
    if (cookies.getToken(req)) {
        feed.list(req, res);
    } else {
        res.redirect('/login');
    }
});

/* watching */
router.get('/watching', function (req, res, next) {
    if (cookies.getToken(req)) {
        watch.list(req, res);
    } else {
        res.redirect('/login');
    }
});

/* logout */
router.get('/logout', function (req, res, next) {
    if (cookies.getToken(req)) {
        cookies.delToken(res);
    }
    res.redirect('/login');
});

module.exports = router;
