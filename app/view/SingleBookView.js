Ext.define('doweown.view.SingleBookView', {
    extend: 'Ext.tab.Panel',
    xtype: 'singlebookview',

    config: {
	items: [
		{ xtype: singlebook },
		{ xtype: availbook }
	]
    }

});
