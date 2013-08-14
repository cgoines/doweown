Ext.define('doweown.model.Isbn', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'title',         type: 'string'},
                {name: 'author',        type: 'string'},
                {name: 'date',          type: 'string'},
		{name: 'place',         type: 'string'},
		{name: 'publisher',     type: 'string'},
		{name: 'hollisId',	type: 'string'},
                {name: 'abstract',      type: 'string'}
        ]
    }
});
