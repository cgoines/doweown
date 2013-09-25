Ext.define('doweown.store.HistoryStore', {
        extend: 'Ext.data.Store',
        alias: 'store.HistoryStore',
	config: {
          model: 'doweown.model.History',
          autoLoad: true,
          proxy: {
            type: 'localstorage'
          }

	}
});
