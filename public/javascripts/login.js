
function login() {
    var client_id = "8100247edc7338dbaf32";
    var client_secret = "61a228029766325f1649a019bb0c88b84838282a";
    var redirect_uri = "http://localhost:2028/callback";
    var scope = "user,repo";
    var state = "login_greedhub";
    var authurl = "https://github.com/login/oauth/authorize";
    var loginurl = authurl + "?client_id=" + client_id + "&client_secret=" + client_secret + "&redirect_uri=" + redirect_uri + "&scope=" + scope + "&state=" + state;
    window.location.href=loginurl;
}
