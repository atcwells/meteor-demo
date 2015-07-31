Meteor.publish("sources", function (options) {
    Counts.publish(this, 'numberOfSources', Sources.find({}), {
        noReady: true
    });
    return Sources.find({}, options);
});
