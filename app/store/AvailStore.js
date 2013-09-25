Ext.define('doweown.store.AvailStore', {
        extend: 'Ext.data.Store',
        alias: 'store.AvailStore',
	config: {
          model: 'doweown.model.Availability',
          autoLoad: false,
	  proxy: {
            type: 'jsonp',
            callbackKey: 'jsonp',
	    url: '',
	    reader: {
		type: 'json',
	    	rootProperty: 'availability'
	    }
          }
	}
});
