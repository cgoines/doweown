Ext.define('doweown.model.Items', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Collection',
	hasMany  : {model: 'ItemRecord', name: 'itemrecord'}
    }
});
