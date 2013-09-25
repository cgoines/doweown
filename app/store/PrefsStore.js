Ext.define('doweown.store.PrefsStore', {
        extend: 'Ext.data.Store',
        alias: 'store.PrefsStore',
	config: {
          model: 'doweown.model.Prefs',
          autoLoad: true,
          proxy: {
            type: 'localstorage'
          }

	}
});
