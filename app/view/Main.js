Ext.define('doweown.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'doweown.view.History'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Scan',
                iconCls: 'search',
                styleHtmlContent: true,
                scrollable: false,
		layout: 'fit',

                items: [{
			   xtype: 'navigationview',
                	   itemId: 'mainscreen',
                	   id: 'mainscreen',
			   items: [{
			     	title: 'Do We Own This?',
		    	     	items: [ 
				  { xtype: 'container', html: '<center><b>Do We Own This?</b></center> is an app that you can use to see if a book is in the Harvard Library. Simply scan a book\'s barcode or enter in its ISBN number to find out!' , padding: '10 5 10 5'},
				  { xtype: 'spacer' , padding: 10},
				  { xtype: 'container', html: 'Scan a book\'s ISBN barcode:', padding: '0 10 0 10'},
			 	  { xtype: 'spacer' , padding: 10},
				  { xtype: 'button', itemId: 'scanBtn', text: 'Scan Barcode', padding: '0 10 0 10'},
				  { xtype: 'spacer', padding: 10},
				  { xtype: 'container', html: 'Or enter a ISBN number below:', padding: '0 10 0 10'},
				  { xtype: 'spacer', padding: 10 },
				  { xtype: 'textfield', itemId: 'isbnField', label: 'ISBN:', maxLength: 13, padding: '0 10 5 10'}
				] 
			    }]
		  }]
	
            },
            {
		itemId: 'hitlist',
                title: 'History',
                iconCls: 'bookmarks',
		styleHtmlContent: true,
		layout: 'fit',

               items: [{
			xtype: 'navigationview',
			itemId: 'historynav',
			id: 'historynav',
			title: 'History',
			items: [
				{ xtype: 'history', id: 'history', itemId: 'history' }
			]
                    
               }]
            }
        ]
    }
});
