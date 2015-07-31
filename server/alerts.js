Meteor.publish("alerts", function (options) {
    Counts.publish(this, 'numberOfAlerts', Alerts.find({}), {
        noReady: true
    });
    return Alerts.find({}, options);
});
