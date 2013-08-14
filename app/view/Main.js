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

                items: [ 
		    {
                    	docked: 'top',
                    	xtype: 'titlebar',
                    	title: 'Do we own this?'
                    },

		    {
			xtype: 'button',
			text: 'scan',
			handler: function() {
				var scanner = cordova.require("cordova/plugin/BarcodeScanner");
				scanner.scan(
    					function(result) {
        				  if (result.cancelled)
            					Ext.Msg.alert("the user cancelled the scan");
        				  else
            					Ext.Msg.alert("we got a barcode: " + result.text);
						//presto search goes here
						var barcode = result.text;	
    					},
    					function(error) {
        					Ext.Msg.alert("Whoops! Scanning failed: " + error);
    					}
				);

			}
		    }


		]
	
            },
            {
		itemId: 'hitlist',
                title: 'Books',
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
