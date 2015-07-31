Meteor.startup(function () {
    try {
        var result = Meteor.http.get("https://ven01247.service-now.com/x_tori2_opd_aggregator_normalizations_list.do?JSONv2&sysparm_action=getRecords", {
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
                var normRecord = result.data.records[key];
                var norm = Normalizations.findOne({
                    sys_id: normRecord.sys_id
                });
                if (!norm)
                    Normalizations.insert(normRecord);
                //console.log(result.data.records[key]);
            }
        }

    } catch (e) {
        console.log(e);
        // Got a network error, time-out or HTTP error in the  400 or 500 range.
        return false;
    }
});
