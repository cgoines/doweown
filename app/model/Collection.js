Ext.define('doweown.model.Collection', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
	hasMany: { model: 'ItemRecord', name: 'items' },
	hasOne: { model: 'HoldTag', name: 'holdtag' },
        fields: [
                {name: 'collectionname',     type: 'string'},
                {name: 'callnumber',        type: 'string'}
        ]
    }
});
