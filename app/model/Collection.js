Ext.define('doweown.model.Collection', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
	hasMany: { model: 'ItemRecord', name: 'items', associationKey: 'itemrecord' },
	hasOne:  { model: 'HoldTag', name: 'holdtag', associationKey: 'holdtag' },
	hasOne:  { model: 'Online', name: 'online', associationKey: 'online' },
        fields: [
                {name: 'collectionname', type: 'string', mapping: 'collectionname'},
                {name: 'callnumber',     type: 'string', mapping: 'callnumber'}
        ]
    }
});
