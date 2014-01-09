//'use strict';
app = angular.module('meteorapp', ['meteor', 'ui.bootstrap', 'ngTable', 'ngTableExport' ]);
// App Module: the name AngularStore matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
app.config([ '$routeProvider', '$locationProvider', function ( $routeProvider, $locationProvider )
{
    $routeProvider.
        when('/splash', {
            templateUrl: 'partials/splash.html',
            controller: 'SplashCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/splash.html',
            controller: 'LoginCtrl'
        }).
        when('/user', {
            templateUrl: 'partials/user.html',
            controller: 'UserCtrl'
        }).
        when('/base', {
            templateUrl: 'partials/base.html',
            controller: 'BaseCtrl'
        }).
        when('/import', {
            templateUrl: 'partials/import.html',
            controller: 'ImportCtrl'
        }).
        when('/input', {
            templateUrl: 'partials/input.html',
            controller: 'InputCtrl'
        }).
        when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'ListCtrl'
        }).
        when('/trend', {
            templateUrl: 'partials/trend.html',
            controller: 'TrendCtrl'
        }).
        otherwise({
            redirectTo: 'splash'
        });

    //$locationProvider.html5Mode( true );
}]);

sharedService = {};
//TO-DO delete user's attrs
sharedService.user = { id : 'admin', password :'admin', type : 'admin' };
sharedService.route = 'input';
sharedService.phase = 'input';
sharedService.i18n = {};
sharedService.data = {};

sharedService.i18nApply = function( ctrlName, scope )
{
    var map = sharedService.i18n[ctrlName];
    for ( var p in map )
        scope[p] = map[p];

    map = sharedService.i18n['common'];
    for ( p in map )
        scope[p] = map[p]
};

//for shared data among controllers
sharedService.appready = function( rootScope )
{
    rootScope.$broadcast('appready');
};

//for menu
sharedService.selectMenuBroadcast = function( phase, rootScope )
{
    sharedService.phase = phase;
    rootScope.$broadcast('selectMenuBroadcast')
};

//for shared data among controllers
sharedService.dataBroadcast = function( data, rootScope )
{
    sharedService.data = data;
    rootScope.$broadcast('dataBroadcast');
};

//for shared data among controllers
sharedService.showMenuBroadcast = function( rootScope )
{
    rootScope.$broadcast('showMenuBroadcast');
};
sharedService.hideMenuBroadcast = function( rootScope )
{
    rootScope.$broadcast('hideMenuBroadcast');
};

sharedService.showLoading = function( rootScope )
{
    rootScope.$broadcast('showLoading');
};

sharedService.hideLoading = function( rootScope )
{
    rootScope.$broadcast('hideLoading');
};
