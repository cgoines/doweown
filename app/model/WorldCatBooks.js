Ext.define('doweown.model.WorldCatBooks', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'title',         type: 'string'},
                {name: 'author',        type: 'string'},
                {name: 'publisher',     type: 'string'},
		{name: 'date',          type: 'string'},
		{name: 'totalLibCount',	type: 'string'},
		{name: 'ISBN',		type: 'array'},
		{name: 'library'} //this is an array that the view will iterate through
        ]
    }
});
