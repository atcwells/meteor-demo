Meteor.publish("normalizations", function (options) {
    Counts.publish(this, 'normalizationsCount', Normalizations.find({}), {
        noReady: true
    });
    return Normalizations.find({}, options);
});
