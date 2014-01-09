Meteor.login = function( user, callback ) {
    //create a login request with admin: true, so our loginHandler can handle this request
    var loginRequest = { id : user.id, password : user.password };

    //send the login request
    Accounts.callLoginMethod({
        methodArguments: [loginRequest],
        userCallback: callback
    });
};