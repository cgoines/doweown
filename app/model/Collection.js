Ext.define('doweown.model.Collection', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
	hasMany: { model: 'doweown.model.ItemRecord', name: 'items', associationKey: 'items' },
	hasOne:  { model: 'doweown.model.HoldTag', name: 'holdtag', associationKey: 'holdtag'  },
	hasOne:  { model: 'doweown.model.Online', name: 'online', associationKey: 'online' },
        fields: [
                {name: 'collectionname', type: 'string', mapping: 'collectionname'},
                {name: 'callnumber',     type: 'string', mapping: 'callnumber'}
        ]
    }
});
