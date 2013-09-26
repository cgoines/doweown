Ext.define('doweown.store.HistoryStore', {
        extend: 'Ext.data.Store',
        alias: 'store.HistoryStore',
	requires: ['Ext.data.proxy.LocalStorage'],
	config: {
          model: 'doweown.model.History',
          autoLoad: true
          /*proxy: {
            type: 'localstorage'
          }*/

	}
});
