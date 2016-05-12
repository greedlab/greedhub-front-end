var express = require('express');
var router = express.Router();
var template = require('art-template');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'title',
    head: 'head',
    list: ['listA','listB','ListC'],
    footer: 'footer'
  }
  var html = template('index', data);
  res.send(html);
  // res.render('index', data);
});

module.exports = router;
