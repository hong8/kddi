objToString = function( obj )
{
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p))
            str += p + '::' + obj[p] + '\n';
    }
    return str;
}

didYouLogin = function(phase)
{
    if ( sharedService.user && sharedService.user['id'] )
    {
//        user ng-show="user['type']=='admin'"><a href="#user">{{main_user_navi_title}}</a></li>
//        <li ng-click="selectMenu('base')" ng-class="{active : naviSelected1}" ng-show="user['type']=='admin'"><a href="#base">{{main_base_navi_title}}</a></li>
//        <li ng-click="selectMenu('import')" ng-class="{active : naviSelected2}" ng-show="user['type']=='admin'||user['type']=='user'"><a href="#import">{{main_import_navi_title}}</a></li>
//        <li ng-click="selectMenu('input')" ng-class="{active : naviSelected3}" ng-show="user['type']=='admin'||user['type']=='user'"><a href="#input">
        var type = sharedService.user['type']

        if ( type == 'admin' )
            return true;
        else
        {
            if ( type == 'user' && (phase == 'user' || phase == 'base') )
                return true;
            else
                return false;
        }
    }
    else
        return false;
}

yyyymmdd = function( date ) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

loadBundles = function() {
    var language;
    if (navigator.language) {
        // 비 IE에서 작동
        language = navigator.language;
    } else {
        // IE에서 작동
        $.ajax({
            url: "http://ajaxhttpheaders.appspot.com",
            dataType: 'jsonp',
            success: function(headers) {
                language = headers['Accept-Language'];

            }
        });
    }

    jQuery.i18n.properties({
        name:'Messages',
        path:'bundle/',
        mode:'both',
        //language:'ko',
        language:language.substr(0,2),
        callback: function() {
            //alert('callback')
            if ( jQuery.i18n.map )
            {
                var map = jQuery.i18n.map;
                for ( var p in map )
                {
                    var ctrlName = p.substr(0, p.indexOf('_'));
                    if ( !sharedService.i18n[ctrlName] )
                        sharedService.i18n[ctrlName] = {};

                    sharedService.i18n[ctrlName][p] = map[p];
                }
            }
        }
    });
}

getBaseURL = function() {
    return location.protocol + "//" + location.hostname + ":9999";
}

getFilesURL = function() {
    return location.protocol + "//" + location.hostname + ":9999/cfs/wayfiles";
}

idxOf = function(arr, value, key) {
    for (var i = 0; i < arr.length; i++) {
        if ( arr[i][key] == value ) {
            return arr[i];
        }
    }
    return -1;
}

urls = [
    'js/bootstrap/bootstrap.min.js', /*for bottstrap*/
    'js/bootstrap/bootswatch.js',
    'js/datatimepicker/bootstrap-datetimepicker.min.js', /*for date/time picker*/
    'js/highchart/highcharts.js', /*for highcharts*/
    'js/fullcalendar/fullcalendar.min.js', /*for calendar*/
    'js/googlemap/map.js', /*for googlemap*/
    'js/bootstrap/ui-bootstrap-tpls-0.5.0.js', /*for angularjs bootstrap*/
    'js/i18n/jquery.i18n.properties-min-1.0.9.js', /*for i18n*/
    'js/checkbox/prettyCheckable.js', /*for checkbox*/
    'styles/bootstrap/bootstrap.css', /*for bottstrap*/
    'styles/bootstrap/font-awesome.min.css',
    'styles/bootstrap/bootswatch.min.css',
    'styles/datetimepicker/bootstrap-datetimepicker.min.css', /*for date/time picker*/
    'styles/fullcalendar/fullcalendar.css', /*for calendar*/
    'styles/chat/chat.css',
    'styles/main.css'
]

importSources = function( callbackFunc )
{
    var cnt = 0;
    var len = urls.length;
    for ( var i = 0; i < len; i++ )
    {
        var url = urls[i];
        if ( url.indexOf('.js') != -1 )
        {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.charset = "utf-8";
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);

            script.onload = function() {
                cnt++;
                if ( cnt == len )
                    callback();
            }
        }
        else if ( url.indexOf('.css') != -1 )
        {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);

            link.onload = function() {
                cnt++;
                if ( cnt == len )
                    callback();
            }
        }
    }

    function callback()
    {
        if ( callbackFunc != undefined )
            callbackFunc();
    }
}

calcDistance = function( target, location )
{
    var lat1 = target['lat'];
    var lon1 = target['lng'];
    var lat2 = location['lat'];
    var lon2 = location['lng'];

    var theta, dist;
    theta = lon1 - lon2;

    dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))
        * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515; // statute miles. 단위는 기본 마일.
    dist = dist * 1.609344; // to km~

    return dist;
}

function deg2rad(deg) // 주어진 도(degree) 값을 라디언으로 변환
{
    return deg * Math.PI / 180;
}

function rad2deg(rad) // 주어진 라디언(radian) 값을 도(degree) 값으로 변환
{
    return rad * 180 / Math.PI;
}

getSpecificList = function( origin, key, values )
{
    var retVal = {};
    for ( var i = 0; i < values.length; i++ )
    {
        retVal[values[i]] = [];
    }

    var len = origin.length;
    for ( var i = 0; i < len; i++ )
    {
        var item = retVal[origin[i][key]];
        if ( item != undefined )
        {
            item.push( origin[i] );
        }
    }

    return retVal;
}

clone = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

removeRougeChar = function(convertString){


    if(convertString.substring(0,1) == ","){

        return convertString.substring(1, convertString.length)

    }
    return convertString;

}

// forceNumeric() plug-in implementation
jQuery.fn.removeRougeChar = function () {

    return this.each(function () {
        $(this).keyup(function (event) {
            if(event.which >= 37 && event.which <= 40){
                event.preventDefault();
            }

            if(event.which == 13 )
            {
                var $this = $(this);

                var convertedValue = currencySymbol($this.val());

                $this.val(convertedValue);
            }
        });
    });
}

jQuery.fn.forceRemoveRougeChar = function () {

    return this.each(function () {
        var $this = $(this);

        var convertedValue = currencySymbol($this.val());

        $this.val(convertedValue);
    });
}

currencySymbol = function( originValue )
{
    var integer = parseInt(originValue.replace(/,/g,''), 10);
    var float = parseFloat(originValue.replace(/,/g,''), 10);
    var decimal = (float - integer).toFixed(2).substr(1);
    var num = integer.toString().replace(/,/gi, "").split("").reverse().join("");

    var num2 = convert(num.replace(/(.{3})/g,"$1,").split("").reverse().join(""));

    return num2+decimal;
}

convert = function(convertString){
    if(convertString.substring(0,1) == ","){
        return convertString.substring(1, convertString.length)
    }
    return convertString;
}

// forceNumeric() plug-in implementation
jQuery.fn.forceNumeric = function () {

    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                // numbers
                key >= 48 && key <= 57 ||
                // Numeric keypad
                key >= 96 && key <= 105 ||
                // comma, period and minus, . on keypad
                key == 190 || key == 188 || key == 109 || key == 110 ||
                // Backspace and Tab and Enter
                key == 8 || key == 9 || key == 13 ||
                // Home and End
                key == 35 || key == 36 ||
                // left and right arrows
                key == 37 || key == 39 ||
                // Del and Ins
                key == 46 || key == 45)
                return true;

            return false;
        });
    });
}

jQuery.fn.getColumnFields = function () {

    sharedService.data.importColumns = [];

    return this.each(function () {
        var field = $(this).data().$scope.column.sortable;
        if ( field != 'num' )
            sharedService.data.importColumns.push(field);
    });
}






















