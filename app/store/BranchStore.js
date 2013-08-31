Ext.define('doweown.store.BranchStore', {
        extend: 'Ext.data.Store',
        alias: 'store.BranchStore',
	config: {
          model: 'doweown.model.Branch',
          autoLoad: true,
          proxy: {
            type: 'jsonp',
            callbackKey: 'jsonp',
	    url: 'http://webservices.lib.harvard.edu/rest/hollis/avail/011573107',
            reader: {
		type: 'json',
                rootProperty: 'availability.branch'
            }
          }
	}
});
