Ext.define('doweown.view.History', {
    extend: 'Ext.List',
    xtype: 'history',
    config: {
	   //title: 'Search Results',
	   title: 'Search History',
           xtype: 'list',
	   store: 'HistoryStore',
           pinHeaders: false,
	   itemTpl: '<img src="{thumbnail}" style="float:left; padding: 5px 5px 4px 5px"/><b>{title}</b><br><i>{author}</i><br>{date}<br><b>ISBN:</b> {barcode}'
	   /*onItemDisclosure: function( record, btn, index ) {
                                this.getParent().push( {xtype: 'availview'} );
				this.deselectAll();
            },*/
	   /*
	   listeners: {
		itemtap: function(list, index, target, record) {
			this.getParent().push( {xtype: 'availview'} );	
			this.deselectAll();
		}
	    }*/
     }


});
