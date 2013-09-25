Ext.define('doweown.model.History', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'title',         type: 'string', mapping: 'title'},
                {name: 'author',        type: 'string', mapping: 'author'},
                {name: 'publisher',     type: 'string', mapping: 'publisher'},
		{name: 'date',          type: 'string', mapping: 'date'},
		{name: 'thumbnail',     type: 'string', mapping: 'thumbnail', defaultValue: doweown.config.Config.getNoThumbnaillUrl() },
		{name: 'barcode', mapping: 'barcode'},
        ]
    }
});
