Meteor.publish("configurations", function (options) {
    Counts.publish(this, 'configurationsCount', Configurations.find({}), {
        noReady: true
    });
    return Configurations.find({}, options);
});
