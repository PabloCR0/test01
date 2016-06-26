Meteor.publish('shorterurl', function publichFunction() {
    return ShorterUrl.find();
});