
function login() {
    var client_id = "8100247edc7338dbaf32";
    var scope = "user,repo";
    var state = "login_greedhub";
    var authurl = "https://github.com/login/oauth/authorize";
    var loginurl = authurl + "?client_id=" + client_id + "&scope=" + scope + "&state=" + state;
    window.location.href=loginurl;
}
