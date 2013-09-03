Ext.define('doweown.model.Online', {
    extend: 'Ext.data.Model',
    config: {
	belongsTo: 'Collection',
        fields: [
                {name: 'content',   type: 'string', mapping: 'content'},
		{name: 'url',       type: 'string', mapping: 'url'}
        ]
    }
});
