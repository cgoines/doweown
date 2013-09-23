Ext.define('doweown.store.GbooksStore', {
        extend: 'Ext.data.Store',
        alias: 'store.GbooksStore',
	config: {
          model: 'doweown.model.Gbooks',
          autoLoad: false,
          proxy: {
            type: 'jsonp',
            callbackKey: 'callback',
	    url: '',
            reader: {
		type: 'json',
                rootProperty: 'items.volumeInfo'
            }
          }

	}
});
