Ext.define('doweown.view.SingleBook', {
    extend: 'Ext.List',
    xtype: 'singlebook',
    config: {
	   //title: 'Search Results',
	   title: 'Yes, we do!',
           xtype: 'list',
	   store: 'Biblio',
	   pinHeaders: false,
	   onItemDisclosure: false,
	   disableSelection: true,
	   itemTpl: '<img src="{thumb}" style="float:left; padding: 5px 5px 4px 5px"/><b>{title}</b><br><i>{author}</i><br>{publisher}, {date}<br>ISBN: {isbn}<br>{description}<p><br><i>Tap to see availability</i>',
	   /*onItemDisclosure: function( record, btn, index ) {
                                this.getParent().push( {xtype: 'availview'} );
				this.deselectAll();
            },*/
	   listeners: {
		itemtap: function(list, index, target, record) {
			this.getParent().push( {xtype: 'availview'} );	
			//this.deselectAll();
			//this.deselect(index);
		}
	    }
     }


});
