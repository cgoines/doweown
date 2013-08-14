Ext.define('doweown.model.Gbooks', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
		{name: 'title',		type: 'string'},
                {name: 'thumb',         type: 'string'},
                {name: 'smallThumb',        type: 'string'}
        ]
    }
});
