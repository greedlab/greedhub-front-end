/*
 * 解析 header.link
 */
var crypto = require("crypto");
var config = require('./config');
var URL = require('url');

var secure = {
    getPage: function (link, key) {
        if (link.length < 1) {
            return null;
        }
        var index = link.indexOf(key);
        if (index <= 0) {
            return null;
        }

        var target = link.substring(0, index);

        var endTag = ">";
        var endIndex = target.lastIndexOf(endTag);
        if (endIndex <= 0) {
            return null;
        }

        var beginTag = "<";
        var beginIndex = target.lastIndexOf(beginTag);
        if (beginIndex < 0) {
            return null;
        }

        var url = target.substring(beginIndex + beginTag.length, endIndex);
        console.log('url: ' + url);
        if (!url) {
            return null;
        }
        page = URL.parse(url,true).query.page;
        // console.log("page: ", page);
        return page;
    },
    getPrev: function (link) {
        return this.getPage(link, "rel=\"prev\"");
    },
    getNext: function (link) {
        return this.getPage(link, "rel=\"next\"");
    },
    getLast: function (link) {
        return this.getPage(link, "rel=\"last\"");
    },
    getFirst: function (link) {
        return this.getPage(link, "rel=\"first\"");
    }
};

module.exports = secure;
