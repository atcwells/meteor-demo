Meteor.startup(function () {
  try {
    var alertsJson = JSON.parse(Assets.getText("alerts.json"));

    var alerts = Alerts.findOne({});
    if (!alerts) {
      for (var key in alertsJson) {
        var ciSource = Sources.findOne({
          name: alertsJson[key].psp_source
        })
        if (!ciSource)
          Sources.insert({
            name: alertsJson[key].psp_source,
            active: true
          });
        alertsJson[key].active = true;
        new Alert(alertsJson[key]).save();
      }
    }

  } catch (e) {
    console.log(e);
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    return false;
  }
});
