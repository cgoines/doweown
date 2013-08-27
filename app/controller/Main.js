Ext.define('doweown.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
	'doweown.model.Isbn',
	'doweown.store.Biblio',
	'doweown.store.AvailStore'
    ],

    config: {
	views: ['doweown.view.Main', 'doweown.view.SingleBook'],
        refs: { 'scanBtn': 'main #scanBtn',
		'mainScreen': 'main #mainscreen'
        },
    	control: {
            scanBtn: { tap: 'scanImage' }
         }
    },
 

    scanImage: function() {
	var ms = this.getMainScreen();
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
        	function(result) {
                 	if (result.text)
			{
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

			    var title = '';
			    var publisher = '';
			    var place = '';
			    var description = '';
			    var author = '';
			    var thumb = '';
			    var date = '';
			    var hollisId = 0;

			    
			    Ext.data.JsonP.request({
                    		url: gBooksURL,
				disableCaching: true,
                    		success: function(res, request) {
                        		// Get the gbooks data from the json object result
					if (res.totalItems > 0) {
						gBooksResult = true;
						console.log("google worked");
						thumb = res.items[0].volumeInfo.imageLinks.smallThumbnail;
						title =  res.items[0].volumeInfo.title;
	                                	date =  res.items[0].volumeInfo.publishedDate;
	                                	publisher =  res.items[0].volumeInfo.publisher;
	                                	description = res.items[0].volumeInfo.description;

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

									//call preto again for availabilty
									availURL  = doweown.config.Config.getHollisAvailUrl() + hollisId;
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
                                						   console.log ('title: ' +  title);
						                                   console.log ('author: ' + author);
						                                   console.log ('date: ' +  date);
						                                   console.log ('place: ' + place);
						                                   console.log ('publisher: ' + publisher);
						                                   console.log ('hollisId: ' + hollisId);
						                                   console.log ('description: ' + description);
						                                   console.log ('thumb: ' + thumb);
						
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
						
						                                   if (Biblio.getCount > 0) {
						                                        Biblio.removeAll();
						                                    }

										   var AvailStore = Ext.getStore('AvailStore');
						                                    if (AvailStore.getCount > 0)
						                                        AvailStore.removeAll();
										    AvailStore.proxy.url = availURL;
										    AvailStore.load();
										    console.log ('availability info loaded');

                                						    Biblio.add(hollisRec);
										    console.log ('bibrec added');


                               						            //switch to result view
										    ms.push({ xtype : 'singlebook' });
										    Ext.Msg.alert('Yes, we do own it!');
										
                                        					}
                                					    }
                            						});
                                        			}
                                			},
							failure: function(res, request) {
								Ext.Msg.alert("Not in hollis. sorry.");
							}
                            			});
					}
					else {
						Ext.Msg.alert("ISBN " + barcode + " not found.");
					}
                    		},
				failure: function(res, request) {
					Ext.Msg.alert("No information found for \nISBN: " + barcode);
				}
                	    });

			



			
			}
                 },
                 function(error) {
                 	Ext.Msg.alert("Whoops! Scanning failed: " + error);
                 }
	);
    }




});
