Ext.define('doweown.model.Collection', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
	hasMany: { model: 'ItemRecord', name: 'items' },
        fields: [
                {name: 'collectionname',     type: 'string'},
                {name: 'callnumber',        type: 'string'}
        ]
    }
});
