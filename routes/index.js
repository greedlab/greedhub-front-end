/*
 * 路由
 *
 * Author: Bell
 */

var express = require('express');
var router = express.Router();
var template = require('art-template');
var path = require('path');
var debug = require('debug')('greedhub-front-end:routes');

var cookies = require('../util/cookies');
var config = require('../util/config');

var index = require('../controllers/index');
var star = require('../controllers/star');
var event = require('../controllers/event');
var feed = require('../controllers/feed');
var notification = require('../controllers/notification');
var watch = require('../controllers/watch');
var user = require('../controllers/user');
var repo = require('../controllers/repo');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (cookies.getToken(req)) {
        index.index(req,res);
    } else {
        res.redirect('/login');
    }
});

router.get('/index.html', function (req, res, next) {
    res.redirect('/');
});

router.get('/index', function (req, res, next) {
    res.redirect('/');
});

/* login */
router.get('/login', function (req, res, next) {
    user.login(req,res);
});

/* callback */
router.get('/callback', function (req, res, next) {
    var query = req.query;
    if (query && query.code && query.state && query.state == config.state) {
        cookies.setCode(query.code, res);
        user.oauth(req, res, query.code);
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
            user.infoCallback(req,res,function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var detail = JSON.parse(body);
                    cookies.setUserId(detail.id,res);
                    cookies.setUserLogin(detail.login,res);
                    event.list(req, res,detail.login);
                } else {
                    res.redirect('/login');
                }
            });
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

/* repos */
router.get('/repos', function (req, res, next) {
    if (cookies.getToken(req)) {
        repo.list(req, res);
    } else {
        res.redirect('/login');
    }
});

/* logout */
router.get('/logout', function (req, res, next) {
    cookies.clear(res);
    res.redirect('/login');
});

module.exports = router;
