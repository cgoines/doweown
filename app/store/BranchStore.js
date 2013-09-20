Ext.define('doweown.store.BranchStore', {
        extend: 'Ext.data.Store',
        alias: 'store.BranchStore',
	config: {
          model: 'doweown.model.Branch',
          autoLoad: false,
          proxy: {
            type: 'jsonp',
            callbackKey: 'jsonp',
	    url: '',
            reader: {
		type: 'json',
                rootProperty: 'availability.branch'
            }
          }

	}
});
