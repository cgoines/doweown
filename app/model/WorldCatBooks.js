Ext.define('doweown.model.WorldCatBooks', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'title',         type: 'string', mapping: 'title'},
                {name: 'author',        type: 'string', mapping: 'author'},
                {name: 'publisher',     type: 'string', mapping: 'publisher'},
		{name: 'date',          type: 'string', mapping: 'date'},
		{name: 'thumbnail',     type: 'string', mapping: 'thumbnail', defaultValue: doweown.config.Config.getNoThumbnailUrl() },
		{name: 'ISBN', mapping: 'ISBN'},
		{name: 'OCLCnumber', mapping: 'OCLCnumber'},
		{name: 'totalLibCount',	type: 'int', mapping: 'totalLibCount'},
		{name: 'borrowDirectUrl', type: 'string', defaultValue: doweown.config.Config.getBorrowDirectDefaultUrl() },
		{name: 'library', mapping: 'library'},
		{name: 'description', type: 'string'}
        ]
    }
});
