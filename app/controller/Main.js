Ext.define('doweown.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
	'Ext.data.proxy.JsonP',
	'Ext.navigation.View',
	'doweown.model.Isbn',
	'doweown.store.Biblio',
	'doweown.store.AvailStore',
	'doweown.store.BranchStore',
	'doweown.store.WorldCatStore'
    ],

    config: {
	views: ['doweown.view.Main', 'doweown.view.SingleBookView', 
	  'doweown.view.WorldCatView'],
        refs: { 'scanBtn': 'main #scanBtn',
		'mainScreen': 'main #mainscreen'
        },
    	control: {
            scanBtn: { tap: 'scanImage' }
         }
    },
    
    validateBarcode: function(barcode) {
       var sum, i;
       
       if (barcode.length == 13) {
          barcode.replace(/[-\s]/g,'');
 
    	  sum = 0;
    	  for (i = 0; i < 13; i += 2) {
      	    sum += +barcode[i];
    	   }
    	  for (i = 1; i < 12; i += 2){
      		sum += 3 * +barcode[i];
    		}
    	  return sum % 10 === 0; 
       }
       else if (barcode.length == 10) {
          barcode = barcode.replace(/[^\dX]/gi, ''); 
		  var chars = barcode.split(''); 
		  if(chars[9].toUpperCase() == 'X'){ 
  			chars[9] = 10; 
  		  }	 
  		  sum = 0; 
		  for (i = 0; i < chars.length; i++) { 
		  	sum += ((10-i) * parseInt(chars[i])); 
  		  } 
		  return ((sum % 11) == 0); 
       }
       else {
       	  return false;
       }		
    
    },

   
    worldCatLookup: function(bcode, thumbnail) {
  	console.log('commencing worldcat lookup for isbn: ' + bcode);
  	var ms = this.getMainScreen();
	var worldCatURL = doweown.config.Config.getWorldCatUrl();
	
	
	/* just call jsonp req instread
	var WorldCatStore = Ext.getStore('WorldCatStore');
	    if (WorldCatStore.getAllCount() > 0) {
                //WorldCatStore.removeAll();
                console.log("worldcatstore has items");
        }
	var lookupURL = worldCatURL + bcode;
 	
	WorldCatStore.getProxy().setUrl(lookupURL);
  	console.log("proxy url set to: " + lookupURL);
	WorldCatStore.load(); */
	
	var lookupURL = worldCatURL + bcode;
	console.log('worldcat url is: ' + lookupURL);
	var worldCatStore = Ext.getStore('WorldCatStore');
	if (worldCatStore.getAllCount() > 0) {
        worldCatStore.removeAll();
    }
	Ext.data.JsonP.request({
	    url: lookupURL,
	    callbackKey: 'callback',
	    params: {
        	wskey: doweown.config.Config.getWorldCatDevKey(),
            oclcsymbol:  doweown.config.Config.getWorldCatLibs(),
            format: 'json'
        },
	    success: function(res, request) {
	        if (typeof res.title != 'undefined'){
	          console.log('worldcat jsonp call successful'); 
	          var title = res.title;
	          console.log('title: ' + title);
	          var author = res.author;
	          var date = res.date;
	          var publisher = res.publisher;
	          var ISBN = res.ISBN;
	          var totalLibCount = res.totalLibCount;
	          var library = res.library;
	          console.log('libraries: ' + library);
	          var worldCatRec = Ext.create('doweown.model.WorldCatBooks', {
	            'title': title,
	            'author': author,
	            'date': date,
	            'publisher': publisher,
	            'ISBN': ISBN,
	            'library': library,
	            'thumbnail': thumbnail
	          });
	          console.log('worldcat record created');
	          worldCatStore.add(worldCatRec);
	          console.log('worldcat record added');
	        //worldCatStore.sync();
	        //console.log('worldcat store synced');
	          console.log("worldcat store loaded with " + 
	           worldCatStore.getAllCount() + " records");
	        //go to worldcat result list
	          ms.push({ xtype : 'worldcatview' });
	        }
	        else { //not in worldcat
	        	Ext.Msg.alert("Catalog info for ISBN " + barcode + " not found.");
	        }
	    },
	    failure: function(res, request) { //worldcat lookup  failed - goto email form
	    	Ext.Msg.alert("Catalog info for ISBN " + barcode + " not found.");	
	    }
	    
	
	});


    },

	

     hollisLookup: function(barcode) {
		//presto search goes here
		console.log('commencing hollis lookup');
		console.log('nothumbs is: ' + 'http://books.google.com/googlebooks/images/no_cover_thumb.gif' );
		var ms = this.getMainScreen();
		var gBooksURL = doweown.config.Config.getGoogleBooksUrl() + barcode;
		var availURL;
		var isbnURL = doweown.config.Config.getHollisIsbnUrl() + barcode;
		var similarURL = doweown.config.Config.getHollisSimilarUrl();

		var gBooksResult = false;
		var availResult = false;
		var isbnResult = false;
		var similarResult = false; 

		var title = '';
		var publisher = '';
		var place = '';
		var description = '';
		var author = '';
		var thumb = '';
		var date = '';
		var hollisId = 0;
		console.log('gbooks url: ' + gBooksURL);
			    
		Ext.data.JsonP.request({
        	url: gBooksURL,
			disableCaching: true,
            success: function(res, request) {
                // Get the gbooks data from the json object result
				if (res.totalItems > 0) {
					gBooksResult = true;
				  	console.log("google worked");
				  	if ( res.items[0].volumeInfo.imageLinks != null ) {
				  	  thumb = res.items[0].volumeInfo.imageLinks.smallThumbnail;
				  	}
				  	else {
				  	   thumb = 'http://books.google.com/googlebooks/images/no_cover_thumb.gif';
				  	}
				  	console.log('thumb: ' + thumb);
				 	title =  res.items[0].volumeInfo.title;
				 	console.log('title: ' + title);
	             	date =  res.items[0].volumeInfo.publishedDate;
	             	console.log('date: ' + date);
	                publisher =  res.items[0].volumeInfo.publisher;
	                console.log('publisher: ' + publisher);
	                description = res.items[0].volumeInfo.description;
	                console.log('description: ' + description);
	                                	
					//call hollis
					Ext.data.JsonP.request({
                       url: isbnURL,
                       callbackKey: 'jsonp',
                       disableCaching: true,
                       success: function(res, request) {
                         // Get the isbn data from the json object result
                         if (res.mods) {
                          isbnResult = true;
                          console.log("isbn worked");
                          hollisId = res.mods.recordInfo.recordIdentifier.substring(0,9);
                          console.log(hollisId);
                          author = res.mods.name.namePart;
                          place = res.mods.originInfo.place[1].placeTerm.content;

						  //call presto again for availabilty
						  availURL  = doweown.config.Config.getHollisAvailUrl() +hollisId;
                          console.log(availURL);
                          Ext.data.JsonP.request({
                     	      url: availURL,
                              callbackKey: 'jsonp',
                              disableCaching: true,
                              success: function(res, request) {
                                // Get the availability data from the json object result
                                if (res.availability) {
                                  availResult = true;
                                  console.log("avail worked");
                                  //console.log(availResult);
								  //add book to books store and availability store						
						          var hollisRec = Ext.create('doweown.model.Isbn', {
						             'title' :   title,
						             'author':   author,
						             'date':     date,
						             'place':    place,
						             'publisher': publisher,
						             'hollisId': hollisId,
						             'description': description,
						             'thumb':    thumb      
						          });						
						          var Biblio = Ext.getStore('Biblio');
						
						          if (Biblio.getAllCount() > 0) {
						              Biblio.removeAll();
						          }
								  Biblio.add(hollisRec);
								  var BranchStore = Ext.getStore('BranchStore');
								  if (BranchStore.getAllCount() > 0) {
                                      BranchStore.removeAll();
                                  }
								  BranchStore.getProxy().setUrl(availURL);
                                  BranchStore.load();
								  BranchStore.sync();
                               	  //switch to result view
								  ms.push({ xtype : 'singlebook' });	
                                }
                              }
                          });
                	    }
            		   },
					   failure: function(res, request) { //not in hollis
			   			 //do worldcat lookup
			   			 //Ext.Msg.alert(barcode + " not in hollis. sorry.");
			   			 mainController.worldCatLookup(barcode, thumb);
					   }
        			});
				}		
				else { // not found in gbooks, do worldcat lookup
						//do worldcat lookup
						var t = 'http://books.google.com/googlebooks/images/no_cover_thumb.gif';
						mainController.worldCatLookup(barcode, t);
						//Ext.Msg.alert("ISBN " + barcode + " not found.");					
				}
		    },
			failure: function(res, request) { //gBooks lookup req failed - try worldcat anyway
					Ext.Msg.alert("something failed");
					var t = 'http://books.google.com/googlebooks/images/no_cover_thumb.gif';
					mainController.worldCatLookup(barcode, t);
			}
		});

     }, //end hollis
 

    scanImage: function() {
	  var scanner = cordova.require("cordova/plugin/BarcodeScanner");
	  mainController = this;

        scanner.scan(
        	function(result) {
        	   var barcode = result.text;
               if (result.text)
			    {
			    	if (mainController.validateBarcode(barcode)) {
			    		console.log("valid barcode");
                		mainController.hollisLookup(barcode); 
                	}
                	else {
                		Ext.Msg.alert("Invalid barcode " + barcode);
                	}	    
                }
            },
            function(error) {
               Ext.Msg.alert("Whoops! Scanning failed: " + error);
            }
		);
    }




});
