Ext.define('doweown.model.NoItems', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
	fields: [
                {name: 'id',     type: 'string'},
                {name: 'url',    type: 'string'}
        ]
    }
});
