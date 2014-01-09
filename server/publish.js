KddiUsers = new Meteor.Collection("kddiusers");
Meteor.publish('kddiusers', function () {
    return KddiUsers.find({});
});

Bases = new Meteor.Collection("bases");
Meteor.publish('bases', function () {
    return Bases.find({});
});

PurchaseSales = new Meteor.Collection("purchasesales");
Meteor.publish('purchasesales', function () {
    return PurchaseSales.find({});
});

ContributionMargins = new Meteor.Collection("contributionmargins");
Meteor.publish('contributionmargins', function () {
    return ContributionMargins.find({});
});
