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

	//get thumb and optional descriptive blurb info
	googleLookup: function(gBooksUrl, searchType) {
		var ms = this.getMainScreen();
		var title,thumb,description,date,author,publisher;
		console.log('google lookup');
		console.log('gbooks called url: ' + gBooksUrl);
		Ext.data.JsonP.request({
        	url: gBooksUrl,
			disableCaching: true,
            success: function(res, request) {
                	// Get the gbooks data from the json object result
                console.log('google jsonp call successful');
                console.log('res.totalItems: ' + res.totalItems);
				if (res.totalItems > 0) {
					gBooksResult = true;
				  	console.log("google worked");
				  	thumb = res.items[0].volumeInfo.imageLinks.smallThumbnail
				  	if ( thumb == null ) {
				  	  thumb = 'http://books.google.com/googlebooks/images/no_cover_thumb.gif';
				  	}

				  	console.log('thumb: ' + thumb);
				 	title =  res.items[0].volumeInfo.title;
				 	console.log('title: ' + title);
				 	//author =  res.items[0].volumeInfo.author;
				 	//console.log('author: ' + author);
	             	date =  res.items[0].volumeInfo.publishedDate;
	             	console.log('date: ' + date);
	                publisher =  res.items[0].volumeInfo.publisher;
	                console.log('publisher: ' + publisher);
	                description = res.items[0].volumeInfo.description;
	                console.log('description: ' + description);
	                //return {thumb: thumb, description: description};
	                //update thumbs
	                if (searchType=='hollis') {
	                   var hollis = Ext.getStore('Biblio');
	                   var hollisRec = hollis.getAt(0);
	                   hollisRec.set('thumb', thumb);
	                   hollisRec.set('description', description);
	                   hollisRec.set('date', date);
	                   if (hollisRec.get('title') == '' ) 
	                      hollisRec.set('title', title);
	                   //if (hollisRec.get('author') == '' ) 
	                   //   hollisRec.set('author', author);
	                   //hollis.sync();
	                   console.log('showing singlebookview');
	                   ms.push({ xtype: 'singlebook' });
	                }
	                else {
	                   var worldCat = Ext.getStore('WorldCatStore');
	                   console.log("worldcat store loaded with " + worldCat.getAllCount() + " records");
	                   var worldCatRec = worldCat.getAt(0);
	                   console.log("updating world cat record: " + worldCatRec.get('title') );
	                   worldCatRec.set('thumbnail', thumb);
	                   worldCatRec.set('description', description);
	                   console.log('showing worldcatview');
	                   ms.push({ xtype : 'worldcatview' });
	                }
	                                	
				}		
				else { // not found in gbooks, do worldcat lookup
						//do worldcat lookup
						console.log('thumbnail not found in gbooks');	
						if (searchType=='hollis') 
	                   		ms.push({ xtype: 'singlebook' });
	                	else 
	                   		ms.push({ xtype : 'worldcatview' });			
				}
		    },
			failure: function(res, request) { //gBooks lookup req failed - try worldcat anyway
					console.log("gbooks thumbnail lookup call failed");
					if (searchType=='hollis') 
	                   	ms.push({ xtype: 'singlebook' });
	                else 
	                   ms.push({ xtype : 'worldcatview' });
			}
		});
	
	
	
	},
   
    worldCatLookup: function(barcode) {
  	console.log('commencing worldcat lookup for isbn: ' + barcode);
  	var ms = this.getMainScreen();
  	var mainController = this;
	var worldCatURL = doweown.config.Config.getWorldCatUrl();
	var gBooksURL = doweown.config.Config.getGoogleBooksUrl();
	
	
	var lookupURL = worldCatURL + barcode;
	console.log('worldcat url is: ' + lookupURL);
	var worldCatStore = Ext.getStore('WorldCatStore');
	if (worldCatStore.getAllCount() > 0) {
        worldCatStore.removeAll();
    }
	Ext.data.JsonP.request({
	    url: lookupURL,
	    disableCaching: true,
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
	            'library': library
	          });
	          console.log('worldcat record created');
	          worldCatStore.add(worldCatRec);
	          //worldCatStore.sync();
	          console.log('worldcat record added');
	        //worldCatStore.sync();
	        //console.log('worldcat store synced');
	          console.log("worldcat store loaded with " + 
	           worldCatStore.getAllCount() + " records");
	          //lookup google for thumbnail & go to worldcat result list
	          var isbnString = '';
	          if (ISBN instanceof Array ) {
                for (var i=0; i < ISBN.length; i++) {
			  	  isbnString = isbnString + 'isbn:' + ISBN[i];
                  if (i < (ISBN.length-1)) 
                	  isbnString = isbnString + '+OR+';       	
                 }
              }
              else { // instance of String
                isbnString = "isbn:" + ISBN;
              }
              console.log('isbnString: ' + isbnString);
              gBooksURL = gBooksURL + isbnString;
              console.log('gbooks url: ' + gBooksURL);
	          mainController.googleLookup(gBooksURL,'worldcat'); 
	          //ms.push({ xtype : 'worldcatview' });
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
		var mainController = this;
		var gBooksURL = doweown.config.Config.getGoogleBooksUrl(); // + 'isbn:' + barcode;
		console.log('commencing hollis lookup');
		var ms = this.getMainScreen();
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
		console.log('hollis url: ' + isbnURL);
		
		var gBooksStore = Ext.getStore('GbooksStore');
	    if (gBooksStore.getAllCount() > 0) {
        		gBooksStore.removeAll();
         }
		
		//new direct hollis call
		Ext.data.JsonP.request({
                       url: isbnURL,
                       callbackKey: 'jsonp',
                       disableCaching: true,
                       success: function(res, request) {
			           console.log("hollis lookup");
                         // Get the isbn data from the json object result
                         if (res.mods) {
                          isbnResult = true;
                          console.log("isbn worked");
                          //console.log('gbooks url: ' + gBooksURL);
                          
                          
                          var isbnString = '';
                          var isbnList = res.mods.identifier;
                          if (isbnList instanceof Array) {
                            for (var i=0; i < isbnList.length; i++) {
                          	  if (res.mods.identifier[i].type == 'isbn') {
                          	      var l = res.mods.identifier[i].content;
                          	      if (typeof l == 'string' || l instanceof String){
                          	          l = l.split(' ',1);
                          	       } 
                          		  isbnString = isbnString + 'isbn:' + l;
                          		  if (i < (isbnList.length-2)) {
                          		     isbnString = isbnString + '+OR+';
                          		  }
                          	  }
                            }
                          } else { //single isbn
                            if (res.mods.identifier.content instanceof String) 
                              isbnString = 'isbn:' + res.mods.identifier.content.split(' ',1);
                            else
                              isbnString = 'isbn:' + res.mods.identifier.content;
                          }
                          // append the original isbn barcode found in the gbooks url if 
                          // not in the hollis record, since its not always there. good grief
                          if (isbnString.indexOf(barcode) == -1) 
                          	isbnString = isbnString + '+OR+isbn:' + barcode;
                          if (isbnString.length == 0)
                             isbnString = 'isbn:' + barcode;
                          console.log('isbnString: ' + isbnString);
                          gBooksURL = gBooksURL + isbnString;
                          //call google
	                      console.log('gbooks url: ' + gBooksURL);
                                                                          
                          hollisId = res.mods.recordInfo.recordIdentifier.substring(0,9);
                          console.log('hollis id is: ' + hollisId);
                                                                            
                          if (res.mods.titleInfo.title instanceof String) 
                          	title = res.mods.titleInfo.title;
                          else if (res.mods.titleInfo instanceof Array) 
                          	title = res.mods.titleInfo[0].title;
                          else 
                          	title = '';
                          if (res.mods.titleInfo.nonSort) 
                             title = res.mods.titleInfo.nonSort + ' ' +title;
                          if (res.mods.titleInfo.subTitle)
                             title = title + ': ' + res.mods.titleInfo.subTitle;
                          console.log('hollis title: ' + title);                          
                          author = res.mods.name.namePart;
                          console.log('hollis author: ' + author);
                          place = res.mods.originInfo.place[1].placeTerm.content;
                          console.log('hollis place: ' + place);
                          publisher = res.mods.originInfo.publisher;
                          console.log('hollis pub: ' + publisher);
                          if (res.mods.originInfo.dateIssued.content) 
                             date = res.mods.originInfo.dateIssued.content;
                          else
                             date = res.mods.originInfo.dateIssued;
                          console.log('hollis date: ' + date);
                    
                          
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
						             'hollisId': hollisId     
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
                               	  // lookup google for thumbnail & switch to result view
                               	  mainController.googleLookup(gBooksURL,'hollis'); 
								  //ms.push({ xtype : 'singlebook' });	
                                }
                              }
                          });
                	    }
            		   },
					   failure: function(res, request) { //not in hollis
			   			 //do worldcat lookup
			   			 //Ext.Msg.alert(barcode + " not in hollis. sorry.");
			   			 console.log(barcode + " not in hollis. sorry.");
			   			 mainController.worldCatLookup(barcode);
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
