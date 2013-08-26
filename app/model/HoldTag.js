Ext.define('doweown.model.HoldTag', {
    extend: 'Ext.data.Model',
    config: {
	belongsTo: 'Collection',
        fields: [
                {name: 'availkey',   type: 'string'},
                {name: 'availval',   type: 'string'},
		{name: 'url',        type: 'string', mapping:'availval.url'}
        ]
    }
});
