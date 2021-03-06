Ext.define('doweown.model.History', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'title',         type: 'string'},
                {name: 'author',        type: 'string'},
                {name: 'publisher',     type: 'string'},
		{name: 'date',          type: 'string'},
		{name: 'thumbnail',     type: 'string', defaultValue: doweown.config.Config.getNoThumbnailUrl() },
		{name: 'barcode', 	type: 'string'},
		{name: 'owned',		type: 'boolean', defaultValue: false}
        ]
    }
});
