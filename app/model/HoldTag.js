Ext.define('doweown.model.HoldTag', {
    extend: 'Ext.data.Model',
    config: {
	belongsTo: 'Collection',
        fields: [
                {name: 'availkey',   type: 'string', mapping: 'availkey'},
                {name: 'availval',   type: 'string', mapping: 'availval.content'},
		{name: 'url',        type: 'string', mapping: 'availval.url'}
        ]
    }
});
