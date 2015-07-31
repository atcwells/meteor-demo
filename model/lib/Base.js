Base = Astro.Class({
  name: 'Base',
  fields: {
    'modCount': {
      type: 'number',
      default: 0
    },
    'createdBy': {
      type: 'string',
      default: 'unknown'
    },
    'createdOn': {
      type: 'date',

    },
    'updatedBy': {
      type: 'string',
      default: 'unknown'
    },
    'updatedOn': {
      type: 'date',
    }
  },
  events: {
    beforesave: function () {
      //this.system.modCount = parseInt(this.system.modCount) + 1;
    }
  }
});
