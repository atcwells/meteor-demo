Meteor.startup(function () {
    try {
        var result = Meteor.http.get("https://ven01247.service-now.com/x_tori2_opd_aggregator_configurations_list.do?JSONv2&sysparm_action=getRecords", {
            auth: 'alex.wells:alex',
            npmRequestOptions: {
                auth: {
                    username: 'alex.wells',
                    password: 'alex',
                    sendImmediately: false
                }
            },
        });
        if (result && result.data && result.data.records) {
            for (var key in result.data.records) {
                var configRecord = result.data.records[key];
                var config = Configurations.findOne({
                    sys_id: configRecord.sys_id
                });
                if (!config)
                    Configurations.insert(configRecord);
            }
        }

    } catch (e) {
        console.log(e);
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
    }
});
