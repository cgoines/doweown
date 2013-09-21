Ext.define('doweown.model.WorldCatBooks', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'title',         type: 'string', mapping: 'title'},
                {name: 'author',        type: 'string', mapping: 'author'},
                {name: 'publisher',     type: 'string', mapping: 'publisher'},
		{name: 'date',          type: 'string', mapping: 'date'},
		{name: 'thumbnail',     type: 'string', mapping: 'thumbnail'},
		{name: 'ISBN', mapping: 'ISBN'},
		{name: 'totalLibCount',	type: 'string', mapping: 'totalLibCount'},
		{name: 'library', mapping: 'library'}
        ]
    }
});
