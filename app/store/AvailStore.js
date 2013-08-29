Ext.define('doweown.store.AvailStore', {
        extend: 'Ext.data.Store',
        alias: 'store.AvailStore',
        model: 'doweown.model.Availability',
        autoLoad: false,
	proxy: {
            type: 'jsonp',
            callbackKey: 'jsonp',
	    reader: {
	    	rootProperty: 'availability'
	    }
        }
});
