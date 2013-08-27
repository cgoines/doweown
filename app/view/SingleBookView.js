Ext.define('doweown.view.SingleBookView', {
    extend: 'Ext.tab.Panel',
    xtype: 'singlebookview',
    requires: ['doweown.view.AvailBook', 'doweown.view.SingleBook'],

    config: {
	layout:'vbox',
	items: [
		{ xtype: 'singlebook', flex: 1 },
		{ xtype: 'availbook', flex: 1 }
	]
    }

});
