Ext.define('doweown.model.ItemRecord', {
    extend: 'Ext.data.Model',
    config: {
	belongsTo: 'Collections',
        fields: [
                {name: 'isavail',     type: 'string', mapping: 'isavail'},
                {name: 'call',        type: 'string', mapping: 'call'},
		{name: 'stat',        type: 'string', mapping: 'stat'},
		{name: 'barcode',     type: 'string', mapping: 'barcode'},
		{name: 'request',     type: 'string', mapping: 'req.content'},
		{name: 'requestlink', type: 'string', mapping: 'req.href' }
        ]
    }
});
