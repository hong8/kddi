// if the database is empty on server start, create some sample data.
Meteor.startup( function ()
{
    if ( KddiUsers.find().count() == 0 )
    {
        var users = [
            { id : 'admin', password :'admin', desc : 'admin', type : 'admin' },
            { id : 'kddi1', password :'kddi1', desc : 'user', type : 'user' },
            { id : 'kddi2', password :'kddi2', desc : 'viewer', type : 'viewer' }
        ];

        for ( var i = 0; i < users.length; i++ ) {
            //var id = Meteor.users.insert(users[i]);
            var id = KddiUsers.insert(users[i]);
        }

        var n1 = 1;
        var n2 = 10;
        var rnd = Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );

        var today = yyyymmdd(new Date());

        var base = [
            {
                owner : users[0],
                category : 'groups',
                info1 : 'KKR LEAD',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'groups',
                info1 : 'KDDI LEAD',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'groups',
                info1 : 'TRANS',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'services',
                info1 : 'IPLC',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'services',
                info1 : 'GPEN',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'services',
                info1 : 'SI',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'services',
                info1 : 'IPVPN',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'services',
                info1 : 'MPLS-VPN',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'licensees',
                info1 : 'SK',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'licensees',
                info1 : 'KT',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'licensees',
                info1 : 'IBM',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'customers',
                info1 : 'SK-11111',
                info2 : '201311111',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'customers',
                info1 : 'KT-22222',
                info2 : '201322222',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'customers',
                info1 : 'IBM-33333',
                info2 : '201333333',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'customers',
                info1 : 'IBM-44444',
                info2 : '201344444',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'customers',
                info1 : 'IBM-55555',
                info2 : '201355555',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'speeds',
                info1 : '768K',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'speeds',
                info1 : '155M',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'speeds',
                info1 : '622M',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'speeds',
                info1 : '256K',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'speeds',
                info1 : 'ADSL',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'bus',
                info1 : 'GN-A',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'bus',
                info1 : 'MNC',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'bus',
                info1 : 'SI',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'bus',
                info1 : 'ICT',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'bus',
                info1 : 'GN-B',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'contacts',
                info1 : 'HJ LEE',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'contacts',
                info1 : 'JW KIM',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'contacts',
                info1 : 'JY YANG',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'contacts',
                info1 : 'MS SEO',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'contacts',
                info1 : 'JY HWANG',
                info2 : '',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'LOCAL',
                info2 : 's_local',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'DSU',
                info2 : 's_dsu',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'ONE TIME',
                info2 : 's_one_time',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'QoS W.P',
                info2 : 's_qos_wp',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'W.P',
                info2 : 's_wp',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'TAX',
                info2 : 's_tax',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'SL',
                info2 : 's_sl',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'LOCAL-J',
                info2 : 's_local_j',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'sales',
                info1 : 'I.C.',
                info2 : 's_ic',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'LOCAL',
                info2 : 'p_local',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'N DSU',
                info2 : 'p_n_dsu',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'TRAS-DC',
                info2 : 'p_tras_dc',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'W.P',
                info2 : 'p_wp',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'TRANSMIT',
                info2 : 'p_transmit',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'SL',
                info2 : 'p_sl',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'QoS SL',
                info2 : 'p_qos_sl',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'LOCAL-J',
                info2 : 'p_local_j',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'I DSU',
                info2 : 'p_i_dsu',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            },
            {
                owner : users[0],
                category : 'purchases',
                info1 : 'I.C.',
                info2 : 'p_ic',
                info3 : '',
                info4 : '',
                info5 : '',
                create_date : today
            }

//            {
//                owner : users[0],
//                category : 'rates',
//                info1 : '201310',
//                info2 : '$',
//                info3 : 1075.60,
//                info4 : '',
//                info5 : '',
//                create_date : today
//            },
//            {
//                owner : users[0],
//                category : 'rates',
//                info1 : '201310',
//                info2 : '￥',
//                info3 : 1098.67,
//                info4 : '',
//                info5 : '',
//                create_date : today
//            }
        ]

        var months = ['201301','201302','201303','201304','201305','201306','201307','201308','201309','201310']

        var n1 = 1000;
        var n2 = 1100;
        for ( var i = 0; i < months.length; i++ )
        {
            var rate = (Math.random() * (n2 - n1 + 1)) + n1;
            base.push(
                {
                    owner : users[0],
                    category : 'rates',
                    info1 : months[i],
                    info2 : '$',
                    info3 : rate,
                    info4 : '',
                    info5 : '',
                    create_date : today
                }
            )

            rate = (Math.random() * (n2 - n1 + 1)) + n1;
            base.push(
                {
                    owner : users[0],
                    category : 'rates',
                    info1 : months[i],
                    info2 : '￥',
                    info3 : rate,
                    info4 : '',
                    info5 : '',
                    create_date : today
                }
            )
        }

        for ( var i = 0; i < base.length; i++ )
        {
            Bases.insert( base[i] );
        }

        var baseInfos = getSpecificList( base, 'category', [ 'groups', 'services', 'licensees', 'customers', 'speeds', 'bus', 'contacts', 'rates', 'sales', 'purchases' ] )

        for ( var i = 0; i < 150; i++ )
        {
            var n1 = 0;
            var n2 = baseInfos['rates'].length-1;
            var rnd = Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
            var rate = baseInfos['rates'][rnd];

            var licensee = getRndValue(baseInfos['licensees']);
            var data = {
                owner : users[0],
                month : '201301',
                group : getRndValue(baseInfos['groups']),
                service : getRndValue(baseInfos['services']),
                licensee : licensee,
                customer : licensee + '-' + (1000+i),
                customer_no : (20130000 + (i+1)).toString(),
                speed : getRndValue(baseInfos['speeds']),
                bu : getRndValue(baseInfos['bus']),
                contact : getRndValue(baseInfos['contacts']),
                unit : rate['info2'],
                flag : '',
                s_local : getRndAmt(),
                s_dsu : getRndAmt(),
                s_one_time : getRndAmt(),
                s_qos_wp : getRndAmt(),
                s_wp : getRndAmt(),
                s_tax : getRndAmt(),
                s_sl : getRndAmt(),
                s_local_j : getRndAmt(),
                s_ic : getRndAmt(),
                p_local : getRndAmt(),
                p_n_dsu : getRndAmt(),
                p_tras_dc : getRndAmt(),
                p_wp : getRndAmt(),
                p_transmit : getRndAmt(),
                p_sl : getRndAmt(),
                p_qos_sl : getRndAmt(),
                p_local_j : getRndAmt(),
                p_i_dsu : getRndAmt(),
                p_ic : getRndAmt(),
                create_date : today
            }

//            for ( var p in data )
//            {
//                if ( p.indexOf('s_') != -1 )
//                {
//                    if ( data.hasOwnProperty('s_total') ) data['s_total'] = 0;
//
//                    var value = data.hasOwnProperty(p+'_ex') ? data[p+'_ex'] : data[p];
//                    data['s_total'] += value
//                }
//                else if ( p.indexOf('p_') != -1 )
//                {
//                    if ( data.hasOwnProperty('p_total') ) data['p_total'] = 0;
//
//                    var value = data.hasOwnProperty(p+'_ex') ? data[p+'_ex'] : data[p];
//                    data['p_total'] += value
//                }
//            }
//            data['cm_total'] = data['s_total'] - data['p_total']

            PurchaseSales.insert( data );
        }

        for ( var i = 0; i < months.length-1; i++ )
        {
            var preDatas = PurchaseSales.find({ month : months[i] });
            var curDatas = [];

            preDatas.forEach( function( data )
                {
                    var n1 = 0;
                    var n2 = baseInfos['rates'].length-1;
                    var rnd = Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
                    var rate = baseInfos['rates'][rnd];

                    delete data['_id'];
                    data['month'] = months[i+1];
                    data['flag'] = '';
                    data['unit'] = rate['info2'],

                    data['s_local'] = getRndAmt1();
                    data['s_dsu'] = getRndAmt1();
                    data['s_one_time'] = getRndAmt1();
                    data['s_qos_wp'] = getRndAmt1();
                    data['s_wp'] = getRndAmt1();
                    data['s_tax'] = getRndAmt1();
                    data['s_sl'] = getRndAmt1();
                    data['s_local_j'] = getRndAmt1();
                    data['s_ic'] = getRndAmt1();
                    data['p_local'] = getRndAmt();
                    data['p_n_dsu'] = getRndAmt();
                    data['p_tras_dc'] = getRndAmt();
                    data['p_wp'] = getRndAmt();
                    data['p_transmit'] = getRndAmt();
                    data['p_sl'] = getRndAmt();
                    data['p_qos_sl'] = getRndAmt();
                    data['p_local_j'] = getRndAmt();
                    data['p_i_dsu'] = getRndAmt();
                    data['p_ic'] = getRndAmt();

                    if ( i == months.length-2)
                    {
                        for ( var p in data )
                        {
                            if ( (p.indexOf('s_') != -1||p.indexOf('p_') != -1) && data[p] > 0 )
                            {
                                if ( Math.random() > 0.7 )
                                {
                                    data[p+'_ex'] = Math.floor(data[p] * rate['info3']/100) * 100;
                                    data[p+'_memo'] = p + "\'s orginal exchange value : " + Math.round(data[p] * rate['info3'])
                                }
                            }
                        }
                    }

//                    for ( var p in data )
//                    {
//                        if ( p.indexOf('s_') != -1 )
//                        {
//                            if ( data.hasOwnProperty('s_total') ) data['s_total'] = 0;
//
//                            var value = data.hasOwnProperty(p+'_ex') ? data[p+'_ex'] : data[p];
//                            data['s_total'] += value
//                        }
//                        else if ( p.indexOf('p_') != -1 )
//                        {
//                            if ( data.hasOwnProperty('p_total') ) data['p_total'] = 0;
//
//                            var value = data.hasOwnProperty(p+'_ex') ? data[p+'_ex'] : data[p];
//                            data['p_total'] += value
//                        }
//                    }
//                    data['cm_total'] = data['s_total'] - data['p_total']

                    var _id = PurchaseSales.insert( data )
                    curDatas.push( _id );
                }
            )

            for ( var j = 0; j < 10; j++ )
            {
                var n1 = 0;
                var n2 = curDatas.length-1;
                var rnd = Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
                var rndObj = PurchaseSales.findOne({_id : curDatas[rnd]});

                var flag = getRndFlag();
                if ( flag == 'change' || flag == 'cancel' )
                {
                    PurchaseSales.update( {_id : curDatas[rnd] }, {$set : {flag : flag}} );
                }
                else if ( flag == 'new' )
                {
                    delete rndObj['_id'];
                    rndObj['flag'] = flag;
                    PurchaseSales.insert( rndObj );
                }
            }
        }
        localStorage = null;
    }

});

yyyymmdd = function( date ) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

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

getRndValue = function( list )
{
    var retVal = null;

    var n1 = 0;
    var n2 = list.length-1;
    var rnd = Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );

    var rndObj = list[rnd];
    if ( rndObj['category'] == 'rates' || rndObj['category'] == 'purchases' || rndObj['category'] == 'sales' )
        retVal = rndObj['info2']
    else
        retVal = rndObj['info1']

    return retVal
}

var num1 = 1;
var num2 = 1;
getRndAmt = function()
{
    var rnd = Math.random()
    if ( rnd < 0.3 )
        return (num1+1)*1000+(num2++);
    else
        return 0;
}
getRndAmt1 = function()
{
    var rnd = Math.random()
    if ( rnd < 0.3 )
        return (num1+1)*2000+(num2++);
    else
        return 0;
}

getRndFlag = function()
{
    var rnd = Math.random()
    if ( rnd < 0.3333 )
        return 'new';
    else if ( rnd > 0.6666 )
        return 'change';
    else
        return 'cancel';
}
