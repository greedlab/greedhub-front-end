var config = {
    useragent: "greedhub-front-end",
    githubdomain: "https://api.github.com",
    client_id: "8100247edc7338dbaf32",
    client_secret: "61a228029766325f1649a019bb0c88b84838282a",
    redirect_uri: "http://localhost:2028/callback",
    scope: "user,repo",
    state: "login_greedhub",

    port: 2028,
    domain: "localhost",
    secret: "fsfdJHfdDS3234IJU",
    home: function () {
        return "http://" + this.domain + ":" + this.port;
    }
};

module.exports = config;
