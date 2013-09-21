Ext.define('doweown.store.WorldCatStore', {
        extend: 'Ext.data.Store',
        alias: 'store.WorldCatStore',
	config: {
          model: 'doweown.model.WorldCatBooks',
          autoLoad: false,
          proxy: {
            type: 'jsonp',
            callbackKey: 'callback',
	    extraParams: {
		wskey: doweown.config.Config.getWorldCatDevKey(),
		oclcsymbol:  doweown.config.Config.getWorldCatLibs(),
		format: 'json'
	    },
	    url: '',
            reader: {
		type: 'json'
            }
          }

	}
});
