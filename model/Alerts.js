Alerts = new Mongo.Collection("alerts");
Alert = Base.extend({
  name: 'Alert',
  collection: Alerts,
  fields: {
    "Scenario": {
      type: 'string',
      default: ''
    },
    "Description": {
      type: 'string',
      default: ''
    },
    "psp_source": {
      type: 'string',
      default: ''
    },
    "node_name": {
      type: 'string',
      default: ''
    },
    "alert_name": {
      type: 'string',
      default: ''
    },
    "alert_message": {
      type: 'string',
      default: ''
    },
    "alert_details": {
      type: 'string',
      default: ''
    },
    "psp_object": {
      type: 'string',
      default: ''
    },
    "alert_severity": {
      type: 'string',
      default: ''
    },
    "object_type": {
      type: 'string',
      default: ''
    },
    "node_details_url": {
      type: 'string',
      default: ''
    },
    "alert_def_id": {
      type: 'string',
      default: ''
    },
    "active": {
      type: 'string',
      default: ''
    }
  }
});
