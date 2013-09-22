Ext.define('doweown.view.SingleBook', {
    extend: 'Ext.List',
    xtype: 'singlebook',
    config: {
	   //title: 'Search Results',
	   title: 'Yes, we do! :)',
           xtype: 'list',
	   store: 'Biblio',
           pinHeaders: false,
	   itemTpl: '<img src="{thumb}"/><strong>{title}</strong> - {author} <br>{description}',
	   /*onItemDisclosure: function( record, btn, index ) {
                                this.getParent().push( {xtype: 'availview'} );
				this.deselectAll();
            },*/
	   listeners: {
		itemtap: function(list, index, target, record) {
			this.getParent().push( {xtype: 'availview'} );	
			this.deselectAll();
		}
	    }
     }


});
