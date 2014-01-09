//'use strict';
Meteor.subscribe('kddiusers');
Meteor.subscribe('bases');
Meteor.subscribe('purchasesales');
Meteor.subscribe('contributionmargins');

app.controller('SplashCtrl', ['$scope', '$location', '$routeParams', '$window', '$rootScope', '$dialog', function( $scope, $location, $routeParams, $window, $rootScope, $dialog )
{
    sharedService.i18nApply( 'splash', $scope );

    openLoginDialog();

    function openLoginDialog()
    {
        var opts =
        {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl: 'partials/popup/login.html',
            controller: 'LoginDialogCtrl'
        };

        var d = $dialog.dialog( opts );
        d.open().then( function( data )
        {
            if( data['id'] && data['password'] )
            {
                sharedService.user['id'] = data['id'];
                sharedService.user['password'] = data['password'];
                sharedService.route =  'login';
                sharedService.dataBroadcast( sharedService.data, $rootScope );
            }
        });
    };
}]);

app.controller('LoginDialogCtrl', ['$scope', 'dialog', function( $scope, dialog )
{
    sharedService.i18nApply( 'logindialog', $scope );

    $scope.title = jQuery.i18n.prop('logindialog_login_title');
    //TO-DO delete!!
//    $scope.id = 'admin';
//    $scope.password = 'admin';

    $scope.close = function()
    {
        dialog.close(null);
    };

    $scope.signIn = function()
    {
        dialog.close( { id : $scope.id, password : $scope.password } );
    };
}]);

app.controller('LoginCtrl', ['$scope', '$meteor', '$location', '$routeParams', '$timeout', '$rootScope', '$dialog', '$window', function( $scope, $meteor, $location, $routeParams, $timeout, $rootScope, $dialog, $window )
{
    sharedService.i18nApply( 'login', $scope );

    Meteor.login( sharedService.user , loginResult );

    function loginResult( error )
    {
        if ( error && error.message && error.message.indexOf('login') != -1 )
        {
            $scope.$apply( function()
            {
                var title = jQuery.i18n.prop('common_information');
                var msg = jQuery.i18n.prop('login_no_result');
                var btns = [{result:'cancel', label: jQuery.i18n.prop('common_cancel')}, {result:'ok', label: jQuery.i18n.prop('common_ok'), cssClass: 'btn-primary'}];
                var msgBox = $dialog.messageBox(title, msg, btns)
                var open = msgBox.open();
            })
        }
        else
        {
            sharedService.user = this.userCallback.caller.arguments[1];

//            Meteor.subscribe('kddiusers');
//            Meteor.subscribe('bases');
//            Meteor.subscribe('purchasesales');

            sharedService.showMenuBroadcast( $rootScope );

            $timeout( function()
                {
                    $scope.$apply( function()
                    {
                        sharedService.route =  'trend';
                        sharedService.dataBroadcast( sharedService.data, $rootScope );
                    })
                }
                , 500)
        }
    }
}]);

app.controller('MainCtrl', ['$scope', '$location', function( $scope, $location )
{
    jQuery(document).ready(function() {
        loadBundles();
        sharedService.i18nApply( 'main', $scope );
//        importSources(
//            function() {
//                loadBundles();
//                sharedService.i18nApply( 'main', $scope );
//            }
//        )
    });

    $scope.user = sharedService.user;

    $scope.$on('selectMenuBroadcast', function()
    {
        $scope.selectMenu( sharedService.phase );
    });

    $scope.$on('showLoading', function()
    {
        $scope.loading = true;
    });
    $scope.$on('hideLoading', function()
    {
        $scope.loading = false;
    });

    $scope.$on('dataBroadcast', function()
    {
        Route = function() { $location.url('/' + sharedService.route ); }
        var func = new Route();
        $scope.$apply(func);
    });

    $scope.selectMenu = function( phase )
    {
        switch ( phase )
        {
            case 'user' :
                $scope.title = jQuery.i18n.prop('user_main_title');
                $scope.naviSelected0 = true;
                $scope.naviSelected1 = false;
                $scope.naviSelected2 = false;
                $scope.naviSelected3 = false;
                $scope.naviSelected4 = false;
                $scope.naviSelected5 = false;
                break;
            case 'base' :
                $scope.title = jQuery.i18n.prop('base_main_title');
                $scope.naviSelected0 = false;
                $scope.naviSelected1 = true;
                $scope.naviSelected2 = false;
                $scope.naviSelected3 = false;
                $scope.naviSelected4 = false;
                $scope.naviSelected5 = false;
                break;
            case 'import' :
                $scope.title = jQuery.i18n.prop('import_main_title');
                $scope.naviSelected0 = false;
                $scope.naviSelected1 = false;
                $scope.naviSelected2 = true;
                $scope.naviSelected3 = false;
                $scope.naviSelected4 = false;
                $scope.naviSelected5 = false;
                break;
            case 'input' :
                $scope.title = jQuery.i18n.prop('input_main_title');
                $scope.naviSelected0 = false;
                $scope.naviSelected1 = false;
                $scope.naviSelected2 = false;
                $scope.naviSelected3 = true;
                $scope.naviSelected4 = false;
                $scope.naviSelected5 = false;
                break;
            case 'list' :
                $scope.title = jQuery.i18n.prop('list_main_title');
                $scope.naviSelected0 = false;
                $scope.naviSelected1 = false;
                $scope.naviSelected2 = false;
                $scope.naviSelected3 = false;
                $scope.naviSelected4 = true;
                $scope.naviSelected5 = false;
                break;
            case 'trend' :
                $scope.title = jQuery.i18n.prop('trend_main_title');
                $scope.naviSelected0 = false;
                $scope.naviSelected1 = false;
                $scope.naviSelected2 = false;
                $scope.naviSelected3 = false;
                $scope.naviSelected4 = false;
                $scope.naviSelected5 = true;
                break;

        }
    }

}]);

app.controller('UserCtrl', ['$scope', '$meteor', '$routeParams', '$rootScope', '$dialog', '$window', '$timeout', '$route', '$filter', 'ngTableParams', function( $scope, $meteor, $routeParams, $rootScope, $dialog, $window, $timeout, $route, $filter, ngTableParams )
{
    if ( !didYouLogin('user') ) return;

    sharedService.i18nApply( 'user', $scope );
    sharedService.selectMenuBroadcast( 'user', $rootScope );

    $scope.types = [
        { name : 'admin' }, { name : 'user' }, { name : 'viewer' }
    ]
    $scope.type = $scope.types[0]

    $scope.KddiUsers = $meteor('kddiusers');
    $scope.temp = $scope.KddiUsers.find({});


    $scope.$watch( 'temp', init, true );
    function init()
    {
        var num = 1;
        for ( var i = 0; i < $scope.temp.length; i++ )
        {
            var row = $scope.temp[i]
            row['num'] = num++;
        }

        $scope.kddiusers = $scope.temp;

        if ( $scope.tableParams == undefined )
        {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    num: 'asc'     // initial sorting
                }
            }, {
                total: $scope.kddiusers.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.kddiusers, params.orderBy()) : $scope.kddiusers;

                    $scope.visibleData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.visibleData);
                }
            });
        }
        else
        {
            $scope.tableParams.reload();
        }
    }

    $scope.selectData = function(index)
    {
        $scope.selectedIndex = index;
        $scope.selectedItem = $scope.visibleData[index];
    }

    $scope.$watch( 'selectedItem', displayUser, true );
    function displayUser()
    {
        $scope.newMode = false;

        $scope.newDisabled = false;
        $scope.saveDisabled = false;
        $scope.removeDisabled = false;

        $scope.kddiuser = clone($scope.selectedItem);

        $scope.type = idxOf($scope.types, $scope.selectedItem['type'] , 'name' )
    }

    $scope.new = function()
    {
        $scope.newMode = true;

        $scope.newDisabled = false;
        $scope.saveDisabled = false;
        $scope.removeDisabled = true;

        $scope.kddiuser = {};
    }

    $scope.save = function()
    {
        var data = clone($scope.base);

        var _id = data['_id']
        delete data['_id'];
        delete data['$$hashKey'];

        data.owner = sharedService.user;
        data.type = $scope.type['name'];
        data.create_date = yyyymmdd(new Date());

        $scope.KddiUsers = $meteor('kddiusers');
        if ( $scope.newMode )
        {
            var base_id = $scope.KddiUsers.insert( data );
        }
        else
        {
            $scope.KddiUsers.update( { _id : _id }, data );
            $scope.visibleData[$scope.selectedIndex] = data;
        }

        var title = jQuery.i18n.prop('common_information');
        var msg = jQuery.i18n.prop('input_data_saved');
        var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
        var msgBox = $dialog.messageBox(title, msg, btns)
        var open = msgBox.open();
    }

    $scope.remove = function()
    {
        var title = jQuery.i18n.prop('common_information');
        var msg = jQuery.i18n.prop('input_data_remove_message');
        var btns = [{result:'cancel', label: jQuery.i18n.prop('common_cancel')}, {result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-primary'}];

        var msgBox = $dialog.messageBox(title, msg, btns)
        var open = msgBox.open();
        open.then(function(result){
            //alert('dialog closed with result: ' + result);
            if ( result == 'ok' )
            {
                $scope.KddiUsers = $meteor('kddiusers');
                $scope.KddiUsers.remove( { _id : $scope.base['_id'] } );

                var title = jQuery.i18n.prop('common_information');
                var msg = jQuery.i18n.prop('input_data_removed');
                var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
                var msgBox = $dialog.messageBox(title, msg, btns)
                var open = msgBox.open();

                $scope.visibleData.splice($scope.selectedIndex,1);

                $scope.new();
            }
        });
    }
}]);

app.controller('BaseCtrl', ['$scope', '$meteor', '$routeParams', '$rootScope', '$dialog', '$window', '$timeout', '$route', '$filter', 'ngTableParams', function( $scope, $meteor, $routeParams, $rootScope, $dialog, $window, $timeout, $route, $filter, ngTableParams )
{
    if ( !didYouLogin('base') ) return;

    sharedService.i18nApply( 'base', $scope );
    sharedService.selectMenuBroadcast( 'base', $rootScope );

    $scope.categories = [
        { name : 'groups' }, { name : 'services' }, { name : 'licensees' }, { name : 'customers' }, { name : 'speeds' },
        { name : 'bus' }, { name : 'contacts' }, { name : 'sales' }, { name : 'purchases' }, { name : 'rates' }
    ]
    $scope.category = $scope.categories[0]

    $scope.Bases = $meteor('bases');
    $scope.temp = $scope.Bases.find({});

    $scope.$watch( 'temp', init, true );
    function init()
    {
        var num = 1;
        for ( var i = 0; i < $scope.temp.length; i++ )
        {
            var row = $scope.temp[i]
            row['num'] = num++;
        }

        $scope.bases = $scope.temp;

        if ( $scope.tableParams == undefined )
        {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    num: 'asc'     // initial sorting
                }
            }, {
                total: $scope.bases.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.bases, params.orderBy()) : $scope.bases;

                    $scope.visibleData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.visibleData);
                }
            });
        }
        else
        {
            $scope.tableParams.reload();
        }
    }

    $scope.selectData = function(index)
    {
        $scope.selectedIndex = index;
        $scope.selectedItem = $scope.visibleData[index];
    }

    $scope.$watch( 'selectedItem', displayBase, true );
    function displayBase()
    {
        $scope.newMode = false;

        $scope.newDisabled = false;
        $scope.saveDisabled = false;
        $scope.removeDisabled = false;

        $scope.base = clone($scope.selectedItem);
        $scope.category = idxOf($scope.categories, $scope.selectedItem['category'], 'name' )
    }

    $scope.new = function()
    {
        $scope.newMode = true;

        $scope.newDisabled = false;
        $scope.saveDisabled = false;
        $scope.removeDisabled = true;

        $scope.base = {};
    }

    $scope.save = function()
    {
        var data = clone($scope.base);

        var _id = data['_id']
        delete data['_id'];
        delete data['$$hashKey'];

        data.owner = sharedService.user;
        data.create_date = yyyymmdd(new Date());
        data.category = $scope.category['name'];

        if ( data.category == 'rates' ) data.info3 = parseFloat( data.info3, 10)

        $scope.Bases = $meteor('bases');
        if ( $scope.newMode )
        {
            var base_id = $scope.Bases.insert( data );
        }
        else
        {
            $scope.Bases.update( { _id : _id }, data );
            $scope.visibleData[$scope.selectedIndex] = data;
        }

        var title = jQuery.i18n.prop('common_information');
        var msg = jQuery.i18n.prop('input_data_saved');
        var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
        var msgBox = $dialog.messageBox(title, msg, btns)
        var open = msgBox.open();
    }

    $scope.remove = function()
    {
        var title = jQuery.i18n.prop('common_information');
        var msg = jQuery.i18n.prop('input_data_remove_message');
        var btns = [{result:'cancel', label: jQuery.i18n.prop('common_cancel')}, {result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-primary'}];

        var msgBox = $dialog.messageBox(title, msg, btns)
        var open = msgBox.open();
        open.then(function(result){
            //alert('dialog closed with result: ' + result);
            if ( result == 'ok' )
            {
                $scope.Bases = $meteor('bases');
                $scope.Bases.remove( { _id : $scope.base['_id'] } );

                var title = jQuery.i18n.prop('common_information');
                var msg = jQuery.i18n.prop('input_data_removed');
                var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
                var msgBox = $dialog.messageBox(title, msg, btns)
                var open = msgBox.open();

                $scope.visibleData.splice($scope.selectedIndex,1);

                $scope.new();
            }
        });
    }
}]);

app.controller('ImportCtrl', ['$scope', '$meteor', '$routeParams', '$rootScope', '$dialog', '$window', '$timeout', '$route', '$filter', 'ngTableParams', function( $scope, $meteor, $routeParams, $rootScope, $dialog, $window, $timeout, $route, $filter, ngTableParams )
{
    if ( !didYouLogin('import') ) return;

    sharedService.i18nApply( 'import', $scope );
    sharedService.selectMenuBroadcast( 'import', $rootScope );

    $scope.selectedMonth = yyyymmdd(new Date()).substr(0,6);
    //$scope.selectedMonth = '201310'
    $('#dpMonths').datepicker( 'setValue', new Date() );
    $('#dpMonths').datepicker()
        .on('changeDate', function(event){
            if ( event.viewMode == "months" )
            {
                $scope.pss = $scope.temp = $scope.visibleData = $scope.selectedItem = null;
                $scope.selectedIndex = -1;

                $scope.selectedMonth = yyyymmdd(event.date).substr(0,6);

                searchData();

                $('.datepicker.dropdown-menu').css('display', 'none');
            }
        });

    $("#copyBox").bind('paste', function() {

        sharedService.showLoading( $rootScope );

        var $this = $(this);

        $timeout( function()
        {
            var tableValue = [];

            var pasteValues = $this.val();

            var clipRows = pasteValues.split(String.fromCharCode(10))

            var cols = sharedService.data.importColumns;
            for ( var i = 0; i < clipRows.length; i++ )
            {
                clipRows[i] = clipRows[i].split(String.fromCharCode(9));
                for ( var j = 0; j < clipRows[i].length; j++ )
                {
                    var row = {};
                    for ( var k = 0; k < Math.min(clipRows[i].length, cols.length); k++ )
                    {
                        row[cols[k]] = clipRows[i][k];
                    }
                }
                row['num'] = (i+1);
                tableValue.push(row)
            }

            $scope.pss = tableValue;
            $scope.tableParams.reload();

            $this.val('');

            sharedService.hideLoading( $rootScope );

        }, 1000);
    });

    function searchData()
    {
        sharedService.showLoading( $rootScope );

        $scope.PurchaseSales = $meteor('purchasesales');
        $scope.temp = $scope.PurchaseSales.find({ month : $scope.selectedMonth });

        var num = 1;
        for ( var i = 0; i < $scope.temp.length; i++ )
        {
            var row = $scope.temp[i]
            row['num'] = num++;

        }

        $scope.pss = $scope.temp;

        if ( $scope.tableParams == undefined )
        {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 1000,          // count per page
                sorting: {
                    num: 'asc'     // initial sorting
                }
            }, {
                total: $scope.pss.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.pss, params.orderBy()) : $scope.pss;

                    $scope.visibleData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.visibleData);
                }
            });
        }
        else
        {
            $scope.tableParams.reload();
        }


        $timeout( function(){
            sharedService.hideLoading( $rootScope );
            $('#table th.header.sortable').getColumnFields();
        }, 1000);
    }

    $scope.importData = function()
    {
        var title = jQuery.i18n.prop('common_information');
        var msg = jQuery.i18n.prop('import_confirm_import_data');
        var btns = [{result:'cancel', label: jQuery.i18n.prop('common_cancel')}, {result:'ok', label: jQuery.i18n.prop('common_ok'), cssClass: 'btn-primary'}];
        var msgBox = $dialog.messageBox(title, msg, btns)
        var open = msgBox.open();
        open.then(function(result){
            if ( result == 'ok' )
            {
                $scope.PurchaseSales = $meteor('purchasesales');
                $scope.pre_pss = $scope.PurchaseSales.find({ month : $scope.selectedMonth });
                for ( var i = $scope.pre_pss.length-1; i >= 0 ; i-- )
                {
                    $scope.PurchaseSales.remove( { _id : $scope.pre_pss[i]['_id'] } );
                }

                if ( $scope.pss && $scope.pss.length > 0 )
                {
                    for ( var i = 0; i < $scope.pss.length; i++ )
                    {
                        var data = clone($scope.pss[i]);
                        delete data['_id'];
                        delete data['$$hashKey'];

                        for ( var p in data )
                        {
                            if ( p.indexOf('s_') != -1 || p.indexOf('p_') != -1 )
                                data[p] = parseFloat(data[p], 10);
                        }

                        data['owner'] = sharedService.user;
                        data['month'] = $scope.selectedMonth;
                        data['create_date'] = yyyymmdd(new Date())

                        var ps_id = $scope.PurchaseSales.insert( data );
                    }

                    var title = jQuery.i18n.prop('common_information');
                    var msg = jQuery.i18n.prop('input_generate_data');
                    var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
                    var msgBox = $dialog.messageBox(title, msg, btns)
                    var open = msgBox.open();

                    searchData();
                }
                else
                {
                    var title = jQuery.i18n.prop('common_information');
                    var msg = jQuery.i18n.prop('input_no_exist_data');
                    var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
                    var msgBox = $dialog.messageBox(title, msg, btns)
                    var open = msgBox.open();
                }
            }
        });
    }

    $timeout( function(){
        searchData();
    },1000)
}]);

app.controller('InputCtrl', ['$scope', '$meteor', '$routeParams', '$rootScope', '$dialog', '$window', '$timeout', '$route', '$filter', 'ngTableParams', function( $scope, $meteor, $routeParams, $rootScope, $dialog, $window, $timeout, $route, $filter, ngTableParams )
{
    if ( !didYouLogin('input') ) return;

    sharedService.i18nApply( 'input', $scope );
    sharedService.selectMenuBroadcast( 'input', $rootScope );

    sharedService.showLoading( $rootScope );

    $scope.selectedMonth = yyyymmdd(new Date()).substr(0,6);
    //$scope.selectedMonth = '201310'
    $('#dpMonths').datepicker( 'setValue', new Date() );
    $('#dpMonths').datepicker()
        .on('changeDate', function(event){
            if ( event.viewMode == "months" )
            {
                $scope.pss = $scope.temp = $scope.visibleData = $scope.selectedItem = null;
                $scope.selectedIndex = -1;

                $scope.selectedMonth = yyyymmdd(event.date).substr(0,6);
                $scope.rates = getSpecificList( $scope.baseInfos['rates'], 'info1', [$scope.selectedMonth] )[$scope.selectedMonth];
                $scope.units = clone($scope.rates);
                $scope.unit = {};
                for ( var i = 0; i < $scope.units.length; i++ )
                {
                    $scope.unit[$scope.units[i]['info2']] = $scope.units[i]['info3']
                }

                searchData();

                $('.datepicker.dropdown-menu').css('display', 'none');
            }
        });

    $scope.Bases = $meteor('bases');
    $scope.bases = $scope.Bases.find({});

    $scope.$watch( 'bases', init, true );

    function init()
    {
        $scope.selectedIndex = -1;

        createBases();

        $timeout( function(){
            $('input.number').removeRougeChar();
            $("input.number").forceNumeric();
            $("input.number").on('click', function()
            {
                $(this).val($(this).val().replace(/,/g,''))
                $(this).select();
            })
            $("input.number").focusout(function(){
                $(this).forceRemoveRougeChar();
            });

            $scope.new();
        }, 1000);

        searchData();
    }

    function createBases()
    {
        var baseInfos = $scope.baseInfos = getSpecificList( $scope.bases, 'category', [ 'groups', 'services', 'licensees', 'customers', 'speeds', 'bus', 'contacts', 'rates', 'sales', 'purchases' ] );

        $scope.groups = baseInfos['groups'];
        $scope.services = baseInfos['services'];
        $scope.licensees = baseInfos['licensees'];
        $scope.customers = baseInfos['customers'];
        $scope.speeds = baseInfos['speeds'];
        $scope.bus = baseInfos['bus'];
        $scope.contacts = baseInfos['contacts'];
        $scope.rates = getSpecificList( $scope.baseInfos['rates'], 'info1', [$scope.selectedMonth] )[$scope.selectedMonth];
        $scope.units = clone($scope.rates);
        $scope.unit = {};
        for ( var i = 0; i < $scope.units.length; i++ )
        {
            $scope.unit[$scope.units[i]['info2']] = $scope.units[i]['info3']
        }

        $scope.sales = baseInfos['sales'];
        $scope.purchases = baseInfos['purchases'];
    }

    function searchData()
    {
        sharedService.showLoading( $rootScope );

        $scope.PurchaseSales = $meteor('purchasesales');
        $scope.temp = $scope.PurchaseSales.find({ month : $scope.selectedMonth });

        var sumData = [
            { group : 'KKR LEAD' },
            { group : 'KDDI LEAD' },
            { group : 'TRANS' },
            { group : 'TOTAL' }
        ];
        var num = 1;
        for ( var i = 0; i < $scope.temp.length; i++ )
        {
            var row = $scope.temp[i]
            row['num'] = num++;

            var sumRow;
            if ( row['group'] == 'KKR LEAD' )
                sumRow = sumData[0];
            else if ( row['group'] == 'KDDI LEAD' )
                sumRow = sumData[1];
            else if ( row['group'] == 'TRANS' )
                sumRow = sumData[2];

            var totalRow = sumData[3];

            for ( var p in row )
            {
                if ( p.indexOf('s_') != -1 || p.indexOf('p_') != -1 )
                {
                    if ( p.indexOf('_memo') == -1 )
                    {
                        if ( !sumRow.hasOwnProperty(p) ) sumRow[p] = 0;
                        sumRow[p] += row[p];

                        if ( !totalRow.hasOwnProperty(p) ) totalRow[p] = 0;
                        totalRow[p] += row[p];
                    }
                }
            }
        }

        //{ 'KKR LEAD' : 0, 'KDDI LEAD' : 0, 'TRANS' : 0, total : 0  };
        $scope.pss = $scope.temp;
        $scope.summary = sumData;

        if ( $scope.tableParams == undefined )
        {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    num: 'asc'     // initial sorting
                }
            }, {
                total: $scope.pss.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.pss, params.orderBy()) : $scope.pss;

                    $scope.visibleData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.visibleData);
                }
            });
        }
        else
        {
            $scope.tableParams.reload();
        }


        $timeout( function(){ sharedService.hideLoading( $rootScope ); }, 1000);
    }

    $scope.selectData = function(index)
    {
        $scope.selectedIndex = index;
        $scope.selectedItem = $scope.visibleData[index];
    }

    $scope.$watch( 'selectedItem', displayPS, true );
    function displayPS()
    {
        $scope.newMode = false;

        $scope.newDisabled = false;
        $scope.saveDisabled = false;
        $scope.removeDisabled = false;

        $scope.ps = clone($scope.selectedItem);

        $scope.group = idxOf( $scope.groups, $scope.ps.group, 'info1' );
        $scope.service = idxOf( $scope.services, $scope.ps.service, 'info1' );
        $scope.licensee = idxOf( $scope.licensees, $scope.ps.licensee, 'info1' );
        $scope.customer = idxOf( $scope.customers, $scope.ps.customer, 'info1' );
        $scope.speed = idxOf( $scope.speeds, $scope.ps.speed, 'info1' );
        $scope.bu = idxOf( $scope.bus, $scope.ps.bu, 'info1' );
        $scope.contact = idxOf( $scope.contacts, $scope.ps.contact, 'info1' );

        $scope.unitForForm = idxOf( $scope.units, $scope.ps.unit, 'info2' );

        $scope.s_total = $scope.ps.s_local+$scope.ps.s_dsu+$scope.ps.s_one_time+$scope.ps.s_qos_wp+$scope.ps.s_wp+$scope.ps.s_tax+$scope.ps.s_sl+$scope.ps.s_local_j+$scope.ps.s_ic
        $scope.s_total_ex = ($scope.ps.s_local_ex&&$scope.ps.s_local_ex||$scope.ps.s_local*$scope.unit[$scope.ps.unit])+
            ($scope.ps.s_dsu_ex&&$scope.ps.s_dsu_ex||$scope.ps.s_dsu*$scope.unit[$scope.ps.unit])+
            ($scope.ps.s_one_time_ex&&$scope.ps.s_one_time_ex||$scope.ps.s_one_time*$scope.unit[$scope.ps.unit])+
            ($scope.ps.s_qos_wp_ex&&$scope.ps.s_qos_wp_ex||$scope.ps.s_qos_wp*$scope.unit[$scope.ps.unit])+
            ($scope.ps.s_wp_ex&&$scope.ps.s_wp_ex||$scope.ps.s_wp*$scope.unit[$scope.ps.unit])+
            ($scope.ps.s_tax_ex&&$scope.ps.s_tax_ex||$scope.ps.s_tax*$scope.unit[$scope.ps.unit])+
            ($scope.ps.s_sl_ex&&$scope.ps.s_sl_ex||$scope.ps.s_sl*$scope.unit[$scope.ps.unit])+
            ($scope.ps.s_local_j_ex&&$scope.ps.s_local_j_ex||$scope.ps.s_local_j*$scope.unit[$scope.ps.unit])+
        ($scope.ps.s_ic_ex&&$scope.ps.s_ic_ex||$scope.ps.s_ic*$scope.unit[$scope.ps.unit])

        $scope.p_total = $scope.ps.p_local+$scope.ps.p_n_dsu+$scope.ps.p_tras_dc+$scope.ps.p_wp+$scope.ps.p_transmit+$scope.ps.p_sl+$scope.ps.p_qos_sl+$scope.ps.p_local_j+$scope.ps.p_i_dsu+$scope.ps.p_ic;
        $scope.p_total_ex = ($scope.ps.p_local_ex&&$scope.ps.p_local_ex||$scope.ps.p_local*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_n_dsu_ex&&$scope.ps.p_n_dsu_ex||$scope.ps.p_n_dsu*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_tras_dc_ex&&$scope.ps.p_tras_dc_ex||$scope.ps.p_tras_dc*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_wp_ex&&$scope.ps.p_wp_ex||$scope.ps.p_wp*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_transmit_ex&&$scope.ps.p_transmit_ex||$scope.ps.p_transmit*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_sl_ex&&$scope.ps.p_sl_ex||$scope.ps.p_sl*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_qos_sl_ex&&$scope.ps.p_qos_sl_ex||$scope.ps.p_qos_sl*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_local_j_ex&&$scope.ps.p_local_j_ex||$scope.ps.p_local_j*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_i_dsu_ex&&$scope.ps.p_i_dsu_ex||$scope.ps.p_i_dsu*$scope.unit[$scope.ps.unit])+
            ($scope.ps.p_ic_ex&&$scope.ps.p_ic_ex||$scope.ps.p_ic*$scope.unit[$scope.ps.unit])

        $scope.cm_total = $scope.s_total_ex - $scope.p_total_ex;

        $timeout( function(){
            $('input.number').forceRemoveRougeChar();
        }, 100);

    }

    $scope.setCheck = function(element)
    {
        //var id = element.id;
        //$scope.ps['flag'] = id.substr(3).toLowerCase();
    };

    $scope.unitChanged = function()
    {
        $scope.rate = idxOf( $scope.rates, this.rate.info2, 'info2' );
    };

    $scope.opts =
    {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: 'partials/popup/memo.html',
        controller: 'MemoCtrl'
    };

    $scope.openMemoDialog = function( field )
    {
        sharedService.data['memo'] = $scope.ps[field] ? $scope.ps[field] : '';

        var d = $dialog.dialog( $scope.opts );
        d.open().then( function( result )
        {
            if( result )
            {
                $scope.ps[field] = result;
            }
        });
    };


    $scope.genData = function()
    {
        var title = jQuery.i18n.prop('common_information');
        var msg = $scope.pss.length > 0 ? jQuery.i18n.prop('input_gen_exist_data') : jQuery.i18n.prop('input_gen_new_data');
        var btns = [{result:'cancel', label: jQuery.i18n.prop('common_cancel')}, {result:'ok', label: jQuery.i18n.prop('common_ok'), cssClass: 'btn-primary'}];
        var msgBox = $dialog.messageBox(title, msg, btns)
        var open = msgBox.open();
        open.then(function(result){
            if ( result == 'ok' )
            {
                $scope.PurchaseSales = $meteor('purchasesales');
                for ( var i = $scope.pss.length-1; i >= 0; i-- )
                {
                    $scope.PurchaseSales.remove( { _id : $scope.pss[i]['_id'] } );
                }

                var preMonth = new Date( parseInt($scope.selectedMonth.substr(0,4), 10), parseInt($scope.selectedMonth.substr(4,2), 10)-2 )
                $scope.pre_pss = $scope.PurchaseSales.find({ month : yyyymmdd(preMonth).substr(0,6) });
                if ( $scope.pre_pss && $scope.pre_pss.length > 0 )
                {
                    $scope.PurchaseSales = $meteor('purchasesales')

                    for ( var i = 0; i < $scope.pre_pss.length; i++ )
                    {
                        var data = clone($scope.pre_pss[i]);
                        delete data['_id'];
                        delete data['$$hashKey'];

                        data['owner'] = sharedService.user;
                        data['flag'] = '';
                        data['month'] = $scope.selectedMonth;
                        data['create_date'] = yyyymmdd(new Date())

                        var ps_id = $scope.PurchaseSales.insert( data );
                    }

                    var title = jQuery.i18n.prop('common_information');
                    var msg = jQuery.i18n.prop('input_generate_data');
                    var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
                    var msgBox = $dialog.messageBox(title, msg, btns)
                    var open = msgBox.open();

                    searchData();
                }
                else
                {
                    var title = jQuery.i18n.prop('common_information');
                    var msg = jQuery.i18n.prop('input_no_exist_data');
                    var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
                    var msgBox = $dialog.messageBox(title, msg, btns)
                    var open = msgBox.open();
                }
            }
        });
    }

    $scope.confirmData = function()
    {
        if ( $scope.pss.length > 0 )
        {
            var title = jQuery.i18n.prop('common_information');
            var msg = jQuery.i18n.prop('input_confirm_data');
            var btns = [{result:'cancel', label: jQuery.i18n.prop('common_cancel')}, {result:'ok', label: jQuery.i18n.prop('common_ok'), cssClass: 'btn-primary'}];
            var msgBox = $dialog.messageBox(title, msg, btns)
            var open = msgBox.open();
            open.then(function(result){
                if ( result == 'ok' )
                {
                    $scope.ContributionMargins = $meteor('contributionmargins');
                    var cmlist = $scope.ContributionMargins.find({ month : $scope.selectedMonth });
                    for ( var i = cmlist.length-1; i >= 0 ; i-- )
                    {
                        $scope.ContributionMargins.remove( { _id : cmlist[i]['_id'] } );
                    }

                    var flagData = { change : 0, new : 0, cancel : 0 };
                    var groupData = { 'KKR LEAD' : 0, 'KDDI LEAD' : 0, 'TRANS' : 0, TOTAL : 0  };
                    var contactData = {};
                    var licenseeData = {};

                    var list = $scope.pss;
                    if ( list && list.length > 0 )
                    {

                        for ( var i = 0; i < list.length; i++ )
                        {
                            if ( list[i].customer_no == '2010300228')
                                console.log('======================>'+list[i].customer_no)

                            if ( list[i]['flag'] == 'change' ||
                                list[i]['flag'] == 'new' ||
                                list[i]['flag'] == 'cancel' )
                            {
                                flagData[list[i]['flag']] += 1;
                            }

                            list[i].s_total_ex = (list[i].s_local_ex&&list[i].s_local_ex||list[i].s_local*$scope.unit[list[i].unit])+
                                (list[i].s_dsu_ex&&list[i].s_dsu_ex||list[i].s_dsu*$scope.unit[list[i].unit])+
                                (list[i].s_one_time_ex&&list[i].s_one_time_ex||list[i].s_one_time*$scope.unit[list[i].unit])+
                                (list[i].s_qos_wp_ex&&list[i].s_qos_wp_ex||list[i].s_qos_wp*$scope.unit[list[i].unit])+
                                (list[i].s_wp_ex&&list[i].s_wp_ex||list[i].s_wp*$scope.unit[list[i].unit])+
                                (list[i].s_tax_ex&&list[i].s_tax_ex||list[i].s_tax*$scope.unit[list[i].unit])+
                                (list[i].s_sl_ex&&list[i].s_sl_ex||list[i].s_sl*$scope.unit[list[i].unit])+
                                (list[i].s_local_j_ex&&list[i].s_local_j_ex||list[i].s_local_j*$scope.unit[list[i].unit])+
                                (list[i].s_ic_ex&&list[i].s_ic_ex||list[i].s_ic*$scope.unit[list[i].unit])

                            list[i].p_total_ex = (list[i].p_local_ex&&list[i].p_local_ex||list[i].p_local*$scope.unit[list[i].unit])+
                                (list[i].p_n_dsu_ex&&list[i].p_n_dsu_ex||list[i].p_n_dsu*$scope.unit[list[i].unit])+
                                (list[i].p_tras_dc_ex&&list[i].p_tras_dc_ex||list[i].p_tras_dc*$scope.unit[list[i].unit])+
                                (list[i].p_wp_ex&&list[i].p_wp_ex||list[i].p_wp*$scope.unit[list[i].unit])+
                                (list[i].p_transmit_ex&&list[i].p_transmit_ex||list[i].p_transmit*$scope.unit[list[i].unit])+
                                (list[i].p_sl_ex&&list[i].p_sl_ex||list[i].p_sl*$scope.unit[list[i].unit])+
                                (list[i].p_qos_sl_ex&&list[i].p_qos_sl_ex||list[i].p_qos_sl*$scope.unit[list[i].unit])+
                                (list[i].p_local_j_ex&&list[i].p_local_j_ex||list[i].p_local_j*$scope.unit[list[i].unit])+
                                (list[i].p_i_dsu_ex&&list[i].p_i_dsu_ex||list[i].p_i_dsu*$scope.unit[list[i].unit])+
                                (list[i].p_ic_ex&&list[i].p_ic_ex||list[i].p_ic*$scope.unit[list[i].unit])

                            list[i].cm_total = list[i].s_total_ex - list[i].p_total_ex;

                            if ( list[i]['group'] == 'KKR LEAD' ||
                                list[i]['group'] == 'KDDI LEAD' ||
                                list[i]['group'] == 'TRANS' )
                            {
                                groupData[list[i]['group']] += list[i]['cm_total'];
                                groupData['TOTAL'] += list[i]['cm_total'];
                            }

                            if ( !contactData[list[i]['contact']] ) contactData[list[i]['contact']] = 0;
                            contactData[list[i]['contact']] += list[i]['cm_total'];

                            if ( !licenseeData[list[i]['licensee']] ) licenseeData[list[i]['licensee']] = 0;
                            licenseeData[list[i]['licensee']] += list[i]['cm_total'];

                            if ( !licenseeData[list[i]['licensee']+'_customer'] ) licenseeData[list[i]['licensee']+'_customer'] = {}
                            if ( !licenseeData[list[i]['licensee']+'_customer'][list[i]['customer']] ) licenseeData[list[i]['licensee']+'_customer'][list[i]['customer']] = 0;
                            licenseeData[list[i]['licensee']+'_customer'][list[i]['customer']] += list[i]['cm_total'];

                        }

                        //신규/변경/해지 추이
                        var data1 = {
                            owner : sharedService.user,
                            category : 'chart1',
                            month : $scope.selectedMonth,
                            data : flagData
                        }

                        //공헌이익 추이(KKR/KDDI/AVR/TOTAL??)
                        var data2 = {
                            owner : sharedService.user,
                            category : 'chart2',
                            month : $scope.selectedMonth,
                            data : groupData
                        }

                        //월별 담당자별 공헌이익 - 클러스터
                        //월별 담당자별 공헌이익 - 스택
                        var data3 = {
                            owner : sharedService.user,
                            category : 'chart3',
                            month : $scope.selectedMonth,
                            data : contactData
                        }

                        //월별 사업자/고객별 공헌이익(드릴다운)
                        var data4 = {
                            owner : sharedService.user,
                            category : 'chart4',
                            month : $scope.selectedMonth,
                            data : licenseeData
                        }

                        $scope.ContributionMargins.insert( data1 );
                        $scope.ContributionMargins.insert( data2 );
                        $scope.ContributionMargins.insert( data3 );
                        $scope.ContributionMargins.insert( data4 );


                        var title = jQuery.i18n.prop('common_information');
                        var msg = jQuery.i18n.prop('input_confirmed_data');
                        var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
                        var msgBox = $dialog.messageBox(title, msg, btns)
                        var open = msgBox.open();
                    }
                }
            });
        }
    }

    $scope.new = function()
    {
        $scope.newMode = true;

        $scope.newDisabled = false;
        $scope.saveDisabled = false;
        $scope.removeDisabled = true;

        $scope.group = $scope.groups[0];
        $scope.service = $scope.services[0];
        $scope.licensee = $scope.licensees[0];
        $scope.customer = $scope.customers[0];
        $scope.speed = $scope.speeds[0];
        $scope.bu = $scope.bus[0];
        $scope.contact = $scope.contacts[0];

        $scope.ps = {};
    }

    $scope.save = function()
    {
        var data = clone($scope.ps);

        var _id = data['_id']
        delete data['_id'];
        delete data['$$hashKey'];

        data.owner = sharedService.user;
        data.create_date = yyyymmdd(new Date());

        data.group = $scope.group['info1']
        data.service = $scope.service['info1']
        data.licensee = $scope.licensee['info1']
        data.customer = $scope.customer['info1']
        data.speed = $scope.speed['info1']
        data.bu = $scope.bu['info1']
        data.contact = $scope.contact['info1']
        data.unit = $scope.unitForForm['info2'];

        $scope.PurchaseSales = $meteor('purchasesales')
        if ( $scope.newMode )
        {
            var ps_id = $scope.PurchaseSales.insert( data );
        }
        else
        {
            $scope.PurchaseSales.update( { _id : _id }, data );
            $scope.visibleData[$scope.selectedIndex] = data;
        }

        var title = jQuery.i18n.prop('common_information');
        var msg = jQuery.i18n.prop('input_data_saved');
        var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
        var msgBox = $dialog.messageBox(title, msg, btns)
        var open = msgBox.open();
    }

    $scope.remove = function()
    {
        var title = jQuery.i18n.prop('common_information');
        var msg = jQuery.i18n.prop('input_data_remove_message');
        var btns = [{result:'cancel', label: jQuery.i18n.prop('common_cancel')}, {result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-primary'}];

        var msgBox = $dialog.messageBox(title, msg, btns)
        var open = msgBox.open();
        open.then(function(result){
            //alert('dialog closed with result: ' + result);
            if ( result == 'ok' )
            {
                $scope.PurchaseSales = $meteor('purchasesales');
                $scope.PurchaseSales.remove( { _id : $scope.ps['_id'] } );

                var title = jQuery.i18n.prop('common_information');
                var msg = jQuery.i18n.prop('input_data_removed');
                var btns = [{result:'ok', label : jQuery.i18n.prop('common_ok'), cssClass: 'btn-info'}];
                var msgBox = $dialog.messageBox(title, msg, btns)
                var open = msgBox.open();

                $scope.visibleData.splice($scope.selectedIndex,1);

                $scope.new()
            }
        });
    }


}]);

app.controller('MemoCtrl', ['$scope', 'dialog', function( $scope, dialog )
{
    sharedService.i18nApply( 'memo', $scope );

    $scope.result = sharedService.data['memo'];

    $scope.close = function()
    {
        dialog.close(null);
    };

    $scope.saveMemo = function()
    {
        dialog.close( $scope.result );
    };
}]);

app.controller('ListCtrl', ['$scope', '$meteor', '$routeParams', '$rootScope', '$dialog', '$window', '$timeout', '$route', '$filter', 'ngTableParams', function( $scope, $meteor, $routeParams, $rootScope, $dialog, $window, $timeout, $route, $filter, ngTableParams )
{
    if ( !didYouLogin('list') ) return;

    sharedService.i18nApply( 'list', $scope );
    sharedService.selectMenuBroadcast( 'list', $rootScope );

    $scope.Bases = $meteor('bases');
    $scope.bases = $scope.Bases.find( { category:'rates' } );

    $scope.$watch( 'bases', init, true );

    function init()
    {
        var baseInfos = $scope.baseInfos = getSpecificList( $scope.bases, 'category', [ 'rates' ] );
        $scope.rates = getSpecificList( $scope.baseInfos['rates'], 'info1', [$scope.selectedMonth] )[$scope.selectedMonth];
        $scope.units = clone($scope.rates);

        searchData();
    }

    var sDate = new Date(new Date().getFullYear(), new Date().getMonth()-12);
    $scope.fromMonth = yyyymmdd(sDate).substr(0,6);
    $('#dpMonthsFrom').datepicker( 'setValue', sDate );
    $('#dpMonthsFrom').datepicker()
        .on('changeDate', function(event){
            if ( event.viewMode == "months" )
            {
                $scope.fromMonth = yyyymmdd(event.date).substr(0,6);

                $scope.rates = getSpecificList( $scope.baseInfos['rates'], 'info1', [$scope.fromMonth] )[$scope.fromMonth];
                $scope.units = clone($scope.rates);
                $scope.unit = $scope.unit ? $scope.unit : {};
                $scope.unit[$scope.fromMonth] = {}
                for ( var i = 0; i < $scope.units.length; i++ )
                {
                    $scope.unit[$scope.fromMonth][$scope.units[i]['info2']] = $scope.units[i]['info3']
                }

                searchData();

                $('.datepicker.dropdown-menu').css('display', 'none');
            }
        });

    $scope.toMonth = yyyymmdd(new Date()).substr(0,6);
    $('#dpMonthsTo').datepicker( 'setValue', new Date() );
    $('#dpMonthsTo').datepicker()
        .on('changeDate', function(event){
            if ( event.viewMode == "months" )
            {
                $scope.toMonth = yyyymmdd(event.date).substr(0,6);

                $scope.rates = getSpecificList( $scope.baseInfos['rates'], 'info1', [$scope.toMonth] )[$scope.toMonth];
                $scope.units = clone($scope.rates);
                $scope.unit = $scope.unit ? $scope.unit : {};
                $scope.unit[$scope.toMonth] = {}
                for ( var i = 0; i < $scope.units.length; i++ )
                {
                    $scope.unit[$scope.toMonth][$scope.units[i]['info2']] = $scope.units[i]['info3']
                }

                searchData();

                $('.datepicker.dropdown-menu').css('display', 'none');
            }
        });

    function searchData()
    {
        sharedService.showLoading( $rootScope );

        $scope.PurchaseSales = $meteor('purchasesales');
        $scope.temp = $scope.PurchaseSales.find({ month : { $gte : $scope.fromMonth, $lte : $scope.toMonth } });

        var num = 1;
        for ( var i = 0; i < $scope.temp.length; i++ )
        {
            var row = $scope.temp[i]
            row['num'] = num++;
        }

        $scope.pss = $scope.temp;

        if ( $scope.tableParams == undefined )
        {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    num: 'asc'     // initial sorting
                }
            }, {
                total: $scope.pss.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.pss, params.orderBy()) : $scope.pss;

                    $scope.visibleData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                    $defer.resolve($scope.visibleData);
                }
            });
        }
        else
        {
            $scope.tableParams.reload();
        }


        $timeout( function(){ sharedService.hideLoading( $rootScope ); }, 1000);
    }
}]);

app.controller('TrendCtrl', ['$scope', '$meteor', '$routeParams', '$rootScope', '$dialog', '$window', '$timeout', '$route', '$filter', 'ngTableParams', function( $scope, $meteor, $routeParams, $rootScope, $dialog, $window, $timeout, $route, $filter, ngTableParams )
{
    if ( !didYouLogin('trend') ) return;

    sharedService.i18nApply( 'trend', $scope );
    sharedService.selectMenuBroadcast( 'trend', $rootScope );

    var sDate = new Date(new Date().getFullYear(), new Date().getMonth()-12);
    $scope.fromMonth = yyyymmdd(sDate).substr(0,6);
    $('#dpMonthsFrom').datepicker( 'setValue', sDate );
    $('#dpMonthsFrom').datepicker()
        .on('changeDate', function(event){
            if ( event.viewMode == "months" )
            {
                $scope.fromMonth = yyyymmdd(event.date).substr(0,6);

                $('.datepicker.dropdown-menu').css('display', 'none');
            }
        });

    $scope.toMonth = yyyymmdd(new Date()).substr(0,6);
    $('#dpMonthsTo').datepicker( 'setValue', new Date() );
    $('#dpMonthsTo').datepicker()
        .on('changeDate', function(event){
            if ( event.viewMode == "months" )
            {
                $scope.toMonth = yyyymmdd(event.date).substr(0,6);

                if ( $scope.flag == 'chart4' )
                    $scope.drawChart('chart4')

                $('.datepicker.dropdown-menu').css('display', 'none');
            }
        });

    $scope.drawChart = function(flag)
    {
        $scope.flag = flag
        $scope.chart4View = (flag == 'chart4')

        sharedService.showLoading( $rootScope );

        $scope.ContributionMargins = $meteor('contributionmargins');
        var list = $scope.ContributionMargins.find({ month : { $gte : $scope.fromMonth, $lte : $scope.toMonth }, category : flag });

        if ( flag == 'chart1' )
        {
            list.sort( function(x,y) { return x.month - y.month } )
            var monthData = [];
            var changeData = [];
            var newData = [];
            var cancelData = [];
            for ( var i = 0; i < list.length; i++ )
            {
                monthData.push('\''+list[i]['month'].substr(2,2)+'/'+list[i]['month'].substr(4));
                changeData.push( list[i]['data']['change'] )
                newData.push( list[i]['data']['new'] )
                cancelData.push( list[i]['data']['cancel'] )
            }
        }
        else if ( flag == 'chart2' )
        {
            list.sort( function(x,y) { return x.month - y.month } )
            var monthData = [];
            var kkrData = [];
            var kddiData = [];
            var transData = [];
            var totalData = [];
            var pieData = { 'KKR LEAD' : 0, 'KDDI LEAD' : 0, 'TRANS' : 0 }
            for ( var i = 0; i < list.length; i++ )
            {
                monthData.push('\''+list[i]['month'].substr(2,2)+'/'+list[i]['month'].substr(4));
                kkrData.push( list[i]['data']['KKR LEAD'] )
                kddiData.push( list[i]['data']['KDDI LEAD'] )
                transData.push( list[i]['data']['TRANS'] )
                totalData.push( list[i]['data']['TOTAL'] && list[i]['data']['TOTAL'] || list[i]['data']['total'] )

                pieData['KKR LEAD'] += list[i]['data']['KKR LEAD'];
                pieData['KDDI LEAD'] += list[i]['data']['KDDI LEAD'];
                pieData['TRANS'] += list[i]['data']['TRANS'];
            }
        }
        else if ( flag == 'chart3' )
        {
            list.sort( function(x,y) { return x.month - y.month } )
            var monthData = [];
            var chart3Series = [];
            for ( var i = 0; i < list.length; i++ )
            {
                monthData.push('\''+list[i]['month'].substr(2,2)+'/'+list[i]['month'].substr(4));

                var data = list[i]['data'];
                for ( var p in data )
                {
                    var existIdx = -1;
                    for ( var j = 0; j < chart3Series.length; j++ )
                    {
                        if ( chart3Series[j]['name'] == p )
                        {
                            existIdx = j;
                            break;
                        }
                    }
                    if ( existIdx < 0 )
                        chart3Series.push( { name: p, data: [data[p]] } )
                    else
                        chart3Series[existIdx]['data'].push(data[p])
                }
            }

//            var allValues = [];
//            for ( var i = 0; i < chart3Series.length; i++ )
//            {
//                allValues = allValues.concat(chart3Series[i].data);
//            }
//
//            var max = Math.max.apply(Math, allValues);
//            var min= Math.min.apply(Math, allValues);
//            for ( var i = 0; i < chart3Series.length; i++ )
//            {
//                var datas = chart3Series[i].data;
//                for ( var j = 0; j < datas.length; j++ )
//                {
//                    if ( datas[j] == max || datas[j] == min )
//                    {
//                        datas[j] = { y : datas[j], marker : { symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)' } }
//
//                    }
//                }
//                chart3Series[i].data = datas;
//            }

        }
        else if ( flag == 'chart4' )
        {
            var colors = Highcharts.getOptions().colors;

            var list = $scope.ContributionMargins.find({ month : $scope.toMonth, category : flag });
            var licenseeCategories = [];
            var licenseeDatas = [];

            if ( list && list.length > 0 )
            {
                var licensee = list[0]['data'];
                for ( var l in licensee )
                {
                    var customerCategories = [];
                    var customerDatas = [];

                    var cusIdx = l.indexOf('_customer');
                    if ( cusIdx == -1 )
                    {
                        licenseeCategories.push(l)

                        var licenseeData = { y: licensee[l], color: colors[licenseeDatas.length] };

                        var customer = licensee[l+'_customer']
                        for ( var c in customer )
                        {
                            customerCategories.push(c);
                            customerDatas.push(customer[c]);
                        }

                        licenseeData.drilldown = { name : l, categories : customerCategories, data : customerDatas, color: licenseeData.color}
                        licenseeDatas.push(licenseeData);
                    }
                }
            }

        }


        $timeout( function()
        {
            if ( flag == 'chart1' )
            {
                $('#container').highcharts({
                    chart: { type: 'line' },
                    title: { text: jQuery.i18n.prop('trend_chart1_title') },
                    xAxis: { categories: monthData },
                    yAxis: { title: { text: jQuery.i18n.prop('trend_chart1_yaxis') } },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name} : </td><td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>', shared: true, useHTML: true },
                    plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
                    series: [
                        { name: jQuery.i18n.prop('trend_chart1_name_change'), color : '#18bc9c', data: changeData },
                        { name: jQuery.i18n.prop('trend_chart1_name_new'), color : '#f39c12', data: newData },
                        { name: jQuery.i18n.prop('trend_chart1_name_cancel'), color : '#e74c3c', data: cancelData } ]
                });
            }
            else if ( flag == 'chart2' )
            {
                $('#container').highcharts({
                    chart: { },
                    title: { text: jQuery.i18n.prop('trend_chart2_title') },
                    xAxis: { categories: monthData },
                    tooltip: {
                        formatter: function() {
                            var s;
                            if (this.point.name) // the pie chart
                                s = ''+ this.point.name +' : KRW '+ this.y;
                            else
                                s = ''+ this.x  +' : KRW '+ this.y;
                            return s;
                        }
                    },
                    labels: { items: [{ html: jQuery.i18n.prop('trend_chart2_pie_title'), style: { left: '40px', top: '8px', color: 'black' } }] },
                    series: [{ type: 'column', name: jQuery.i18n.prop('trend_chart2_column_kkr'), data: kkrData },
                             { type: 'column', name: jQuery.i18n.prop('trend_chart2_column_kddi'), data: kddiData },
                             { type: 'column', name: jQuery.i18n.prop('trend_chart2_column_trans'), data: transData },
                             { type: 'spline', name: jQuery.i18n.prop('trend_chart2_column_total'), data: totalData, marker: { lineWidth: 2, lineColor: Highcharts.getOptions().colors[3], fillColor: 'white' } },
                             { type: 'pie', name: 'Total', data: [{ name: jQuery.i18n.prop('trend_chart2_column_kkr'), y: pieData['KKR LEAD'], color: Highcharts.getOptions().colors[0] },
                                                                  { name: jQuery.i18n.prop('trend_chart2_column_kddi'), y: pieData['KDDI LEAD'], color: Highcharts.getOptions().colors[1] },
                                                                  { name: jQuery.i18n.prop('trend_chart2_column_trans'), y: pieData['TRANS'], color: Highcharts.getOptions().colors[2] }],
                            center: [100, 80], size: 100, showInLegend: false, dataLabels: { enabled: false } }]

                });

            }
            else if ( flag == 'chart3' )
            {
                $('#container').highcharts({
                    chart: { type: 'column' },
                    title: { text: jQuery.i18n.prop('trend_chart3_title') },
                    xAxis: { categories: monthData },
                    yAxis: { title: { text: jQuery.i18n.prop('trend_chart3_yaxis') } },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name} : </td><td style="padding:0"><b>KRW {point.y}</b></td></tr>',
                        footerFormat: '</table>', shared: true, useHTML: true },
                    plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
                    series: chart3Series
                });
            }
            else if ( flag == 'chart4' )
            {
                function setChart(name, categories, data, color) {
                    chart.xAxis[0].setCategories(categories, false);
                    chart.series[0].remove(false);
                    chart.addSeries({
                        name: name,
                        data: data,
                        color: color || 'white'
                    }, false);
                    chart.redraw();
                }

                var chart = $('#container').highcharts({
                    chart: { type: 'column' },
                    title: { text: jQuery.i18n.prop('trend_chart4_title') },
                    xAxis: { categories: licenseeCategories },
                    yAxis: { title: { text: jQuery.i18n.prop('trend_chart4_yaxis') } },
                    plotOptions: { column: { cursor: 'pointer', point: { events: {
                                                                                    click: function()
                                                                                    {
                                                                                        var drilldown = this.drilldown;
                                                                                        if (drilldown) { // drill down
                                                                                            setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
                                                                                        } else { // restore
                                                                                            setChart(name, licenseeCategories, licenseeDatas);
                                                                                        }
                                                                                    }
                                                                                 } },
                                            dataLabels: {
                                                enabled: true,
                                                color: colors[0],
                                                style: {
                                                    fontWeight: 'bold'
                                                },
                                                formatter: function() {
                                                    return 'KRW '+this.y;
                                                }
                                            }
                                        } },
                    tooltip: {
                        formatter: function() {
                            var point = this.point, s = this.x +':<b>KRW '+ this.y +'</b><br/>';
                            if (point.drilldown)
                                s += 'Click to view '+ point.category +' versions';
                            else
                                s += 'Click to return to browser brands';
                            return s;
                        }
                    },
                    series: [{ name: name, data: licenseeDatas, color: 'white' }],
                    exporting: { enabled: false }
                }).highcharts(); // return chart
            }

            sharedService.hideLoading( $rootScope );
        }
        , 2000)
    }

    $scope.drawChart('chart1');

}]);