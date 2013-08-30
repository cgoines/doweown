Ext.define('doweown.store.BranchStore', {
        extend: 'Ext.data.Store',
        alias: 'store.BranchStore',
        model: 'doweown.model.Branch',
        autoLoad: false,
        proxy: {
            type: 'jsonp',
            callbackKey: 'jsonp',
            reader: {
                rootProperty: 'branch'
            }
        }
});
