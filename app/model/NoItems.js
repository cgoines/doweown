Ext.define('doweown.model.NoItems', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
	fields: [
                {name: 'id',      type: 'string', mapping: 'id'},
		{name: 'content', type: 'string', mapping: 'content'},	
                {name: 'url',     type: 'string', mapping: 'url'}
        ]
    }
});
