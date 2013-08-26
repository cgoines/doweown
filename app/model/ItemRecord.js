Ext.define('doweown.model.ItemRecord', {
    extend: 'Ext.data.Model',
    config: {
	belongsTo: 'Items',
        fields: [
                {name: 'isavail',     type: 'string'},
                {name: 'call',        type: 'string'},
		{name: 'stat',        type: 'string'},
		{name: 'barcode',     type: 'string'},
		{name: 'req',         type: 'string'}
        ]
    }
});
