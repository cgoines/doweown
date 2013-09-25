Ext.define('doweown.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
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
			     	title: 'Do we own this?',
		    	     	items: [ 
				  { xtype: 'container', html: '<center><b>Do We Own this?</b></center> is an app that you can use to see if a book is in the Harvard Library. Simply scan a book\'s barcode or enter in its ISBN number to find out!' , padding: '10 5 10 5'},
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

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }
        ]
    }
});
