Ext.define('doweown.model.WorldCatBooks', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'title',         type: 'string', mapping: 'title'},
                {name: 'author',        type: 'string', mapping: 'author'},
                {name: 'publisher',     type: 'string', mapping: 'publisher'},
		{name: 'date',          type: 'string', mapping: 'date'},
		{name: 'totalLibCount',	type: 'string', mapping: 'totalLibCount'},
		{name: 'ISBN', mapping: 'ISBN'},
		{name: 'library', mapping: 'library'}
        ]
    }
});
