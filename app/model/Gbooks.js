Ext.define('doweown.model.Gbooks', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
		{name: 'description',	type: 'string'},
                {name: 'thumb',         type: 'string', mapping: 'imageLinks.smallThumbnail'}
        ]
    }
});
