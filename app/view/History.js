Ext.define('doweown.view.History', {
    extend: 'Ext.List',
    xtype: 'history',
    config: {
	   title: 'Search History',
           xtype: 'list',
	   id: 'history', 
	   itemId: 'history',
	   store: 'HistoryStore',
	   disableSelection: true,
	   itemTpl: '<img src="{thumbnail}" style="float:left; padding: 5px 5px 4px 5px"/><b>{title}</b><br><i>{author}</i><br>{publisher}, {date}<br>ISBN: {barcode}'
	   /*onItemDisclosure: function( record, btn, index ) {
                                this.getParent().push( {xtype: 'availview'} );
				this.deselectAll();
            },*/
     }


});
