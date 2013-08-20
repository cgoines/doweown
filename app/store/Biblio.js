Ext.define('doweown.store.Biblio', {
	extend: 'Ext.data.Store',
    	alias: 'store.Biblio',
	config: {
          model: 'doweown.model.Isbn',
	  autoLoad: false
        }
});
