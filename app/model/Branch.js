Ext.define('doweown.model.Branch', {
    extend: 'Ext.data.Model',
    config: {
    	associations: [
    		{ type: 'hasOne', model: 'Repository' },
        	{ type: 'hasOne', model: 'Collection' },
        	{ type: 'hasOne', model: 'NoItems' }
    	]
     }
});
