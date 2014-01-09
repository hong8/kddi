Accounts.registerLoginHandler(function(loginRequest) {

    //we create a user if not exists, and get the userId
    var user = KddiUsers.findOne( { id : loginRequest['id'], password : loginRequest['password'] } );
    if(!user) {
        //userId = Meteor.users.insert({username: '821067351365'});
        return null;
    } else {
        return user;
    }
});