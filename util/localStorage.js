/*
 * localStorage
 */

var localStorage = {
    getUserInfo: function (req) {
        userInfo = req.localStorage.getItem('userinfo');
        if (userInfo) {
            return JSON.parse(userInfo);
        } else {
            return null;
        }
    },
    setUserInfo: function (userInfo,res) {
        if (userInfo) {
            res.localStorage.setItem('userinfo',userInfo);
        }
    }
};

module.exports = localStorage;
