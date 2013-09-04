Ext.define('doweown.model.Branch', {
    extend: 'Ext.data.Model',
    config: {
    	hasOne : [
    	  { model: 'doweown.model.Repository', name: 'repository', associationKey: 'repository', mapping: 'repository' },
          { model: 'doweown.model.NoItems',    name: 'noitems',    associationKey: 'noitems',    mapping: 'noitems' }
    	],
	hasMany : [
	  { model: 'doweown.model.Collection', name: 'collection', associationKey: 'collection', mapping: 'collection' }
	]
     }
});
