$('#login-form').submit(function(event){
    var username = $('#username').val(),
        password = $('#password').val();
    var promise = Kinvey.User.login(username, password);
    promise.then(function(user) {
        showHideLogin(false);

        $('#login-form').each(function(){
            this.reset();
        });
    }, function(err) {
        console.log("login failed " + JSON.stringify(err));
        alert("Error: " + err.description);
    });
    event.preventDefault();
});

$('#logout-btn').click(function(){
    var promise = Kinvey.User.logout();
    promise.then(function(user) {
        console.log("user " + JSON.stringify(user));
        showHideLogin(true);
    }, function(err) {
        console.log("logout failed " + JSON.stringify(err));
    });
});

$('#mic-login-btn').click(function(){
    //TODO fix callbackURL
    var promise = Kinvey.User.MIC.loginWithAuthorizationCodeLoginPage('http://google.com');
    promise.then(function(user) {
        console.log("user " + JSON.stringify(user));
        showHideLogin(false);
    }, function(err) {
        console.log("login failed " + JSON.stringify(err));
    });
});


function showHideLogin(show) {
    if (show) {
        $('#login-view').show();
        $('#logout-view').hide();
    } else {
        $('#login-view').hide();
        $('#logout-view').show();
    }
}