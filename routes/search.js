
var express = require('express');
var router = express.Router();
var cookies = require('../util/cookies');
var search = require('../controllers/search');
var qs = require('querystring');

/* search */
router.get('/', function (req, res, next) {
    if (cookies.getToken(req)) {
        search.search(req, res);
    } else {
        res.redirect('/login');
    }
});

/* search */
router.get('/repos', function (req, res, next) {
    if (cookies.getToken(req)) {
        if (req.query) {
            search.repos(req, res);
        } else {
            res.redirect('/search');
        }
    } else {
        res.redirect('/login');
    }
});

/* search code */
router.get('/code', function (req, res, next) {
    if (cookies.getToken(req)) {
        if (req.query) {
            search.code(req, res);
        } else {
            res.redirect('/search');
        }
    } else {
        res.redirect('/login');
    }
});

/* search issues */
router.get('/issues', function (req, res, next) {
    if (cookies.getToken(req)) {
        if (req.query) {
            search.issues(req, res);
        } else {
            res.redirect('/search');
        }
    } else {
        res.redirect('/login');
    }
});

/* search users */
router.get('/users', function (req, res, next) {
    if (cookies.getToken(req)) {
        if (req.query) {
            search.users(req, res);
        } else {
            res.redirect('/search');
        }
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
