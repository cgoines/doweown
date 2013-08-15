Ext.define('doweown.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: { 'scanBtn': 'main #scanBtn' },
    	control: {
            scanBtn: { tap: 'scanImage' }
         }
    },
 

    scanImage: function() {
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
        	function(result) {
                 	if (result.cancelled)
                    		Ext.Msg.alert("Scan cancelled.");
                  	else
                  		Ext.Msg.alert("we got a barcode: " + result.text);
                  	//presto search goes here
                  	//var barcode = result.text;
                 },
                 function(error) {
                 	Ext.Msg.alert("Whoops! Scanning failed: " + error);
                 }
	);
    }


});
