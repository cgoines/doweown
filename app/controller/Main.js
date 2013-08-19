Ext.define('doweown.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: { 'scanBtn': 'main #scanBtn' },
    	control: {
            scanBtn: { tap: 'scanImage' }
         }
    },
 

    scanImage: function() {
	/*Ext.data.JsonP.request({
                                url: doweown.config.Config.getHollisIsbnUrl() + '1930110960',
                                callbackKey: 'jsonp',
                                success: function(result2, request) {
                                        // Get the isbn data from the json object result
                                        isbnResult = result2.mods;
                                        Ext.Msg.alert("isbn test call worked");
                                }
                            }); */
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
        	function(result) {
                 	if (result.text)
			{
                  	    //Ext.Msg.alert(result.text);
                  	    //presto search goes here
                  	    var barcode = result.text;
			    var gBooksURL = doweown.config.Config.getGoogleBooksUrl() + barcode;
			    var availURL;
			    var isbnURL = doweown.config.Config.getHollisIsbnUrl() + barcode;
			    var similarURL = doweown.config.Config.getHollisSimilarUrl();

			    var gBooksResult = false;
			    var availResult = false;
			    var isbnResult = false;
			    var similarResult = false; 

			    var hollisId = 0;
			    
			    Ext.data.JsonP.request({
                    		url: gBooksURL,
                    		success: function(res, request) {
                        		// Get the gbooks data from the json object result
                        		gBooksResult = res;
					console.log("google worked");
					console.log(gBooksResult.items[0].volumeInfo.imageLinks.smallThumbnail);
                    		}
                	    });

			
			   Ext.data.JsonP.request({
                                url: isbnURL,
                                callbackKey: 'jsonp',
                                success: function(res, request) {
                                        // Get the isbn data from the json object result
                                        isbnResult = res.mods;
					console.log("isbn worked");
					console.log(isbnResult.recordInfo.recordIdentifier.substring(0,9));
					hollisId = isbnResult.recordInfo.recordIdentifier.substring(0,9);
                                }
                            }); 

			    availURL  = doweown.config.Config.getHollisAvailUrl() + hollisId;
			    Ext.data.JsonP.request({
                                url: availURL,
                                callbackKey: 'jsonp',
                                success: function(res, request) {
                                        // Get the availability data from the json object result
                                        availResult = res.availability;
					console.log("avail worked");
					console.log(availResult);
                                }
                            }); 




			    if (  (gBooksResult)  && (isbnResult) && (availResult)  ) {


				console.log(gBooksResult.items[0].volumeInfo.imageLinks.thumbnail);

			    }
		            else {
				Ext.Msg.alert("lookups failed.");
			    }






			
			}
                 },
                 function(error) {
                 	Ext.Msg.alert("Whoops! Scanning failed: " + error);
                 }
	);
    }




});
