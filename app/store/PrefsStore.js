Ext.define('doweown.store.PrefsStore', {
        extend: 'Ext.data.Store',
        alias: 'store.PrefsStore',
	requires: ['Ext.data.proxy.LocalStorage'],
	config: {
          model: 'doweown.model.Prefs',
          autoLoad: true,
          proxy: {
            type: 'localstorage'
          }

	}
});
