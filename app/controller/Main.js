Ext.define('doweown.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
	'Ext.data.proxy.JsonP',
	'Ext.navigation.View',
	'doweown.model.Isbn',
	'doweown.model.WorldCatBooks',
	'doweown.model.History',
	'doweown.model.Prefs',
	'doweown.store.Biblio',
	'doweown.store.BranchStore',
	'doweown.store.WorldCatStore',
	'doweown.store.HistoryStore',
	'doweown.store.PrefsStore'
    ],

    config: {
	views: ['doweown.view.Main', 'doweown.view.SingleBookView', 
	  'doweown.view.WorldCatView', 'doweown.view.History'],
        refs: { 'scanBtn': 'main #scanBtn',
		'mainScreen': 'main #mainscreen',
		'inputField': 'main #isbnField',
		'historyList': 'main #history',
		'historyNav': '#historynav',
		'resetBtn': 'main #resetBtn',
		'saveBtn': 'main #saveBtn',
		'prefsForm': 'main #prefsform',
		'scanResetBtn1': 'main #scanreset1',
		'scanResetBtn2': 'main #scanreset2',
		'feedbackBtn': 	 'main #feedbackBtn',
		'feedbackPd':	 'main #feedbackPd',
		'borrowDirectBtn': 'main #borrowDirectBtn',
		'tabBar': 'main'
		//'singleBookList': '#singleBookList'
        },
    	control: {
            scanBtn: { tap: 'scanImage' },
	    	inputField: { action: 'readIsbn' },
	    //singleBookList: { itemtap: 'showAvailability' },
	    	historyList: { itemtap: 'searchFromHistory' },
	    	saveBtn: { tap: 'savePrefs' },
	    	resetBtn: { tap: 'resetPrefs'},
	    	prefsForm: { show: 'loadPrefs'},
	    	scanResetBtn1: { tap: 'resetScan' },
	    	scanResetBtn2: { tap: 'resetScan' },
	    	feedbackBtn:  { tap: 'launchFeedbackForm' },
	    	borrowDirectBtn: { tap: 'launchBorrowDirect' }
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
	googleLookup: function(gBooksUrl, searchType, barcode, navListWindow) {
		var ms = navListWindow;
		var hl = this.getHistoryList();
		var title,thumb,description,date,publisher;
		//console.log('google lookup');
		//console.log('gbooks called url: ' + gBooksUrl);
		Ext.data.JsonP.request({
        	url: gBooksUrl,
			disableCaching: true,
            success: function(res, request) {
                	// Get the gbooks data from the json object result
                //console.log('google jsonp call successful');
                //console.log('res.totalItems: ' + res.totalItems);
				if (res.totalItems > 0) {
					gBooksResult = true;
				  	//console.log("google worked");
				  	if ( res.items[0].volumeInfo.imageLinks ) {
				  	  thumb = res.items[0].volumeInfo.imageLinks.smallThumbnail;
				  	}

				  	//console.log('thumb: ' + thumb);
				 	title =  res.items[0].volumeInfo.title;
				 	//console.log('title: ' + title);
				 	//console.log('author: ' + author);
	             	date =  res.items[0].volumeInfo.publishedDate;
	             	//console.log('date: ' + date);
	                publisher =  res.items[0].volumeInfo.publisher;
	                //console.log('publisher: ' + publisher);
	                description = res.items[0].volumeInfo.description;
	                //console.log('description: ' + description);

	                //update thumbs
			var historyStore = Ext.getStore('HistoryStore');
			var idx = historyStore.findExact('barcode', barcode);
                  	if ( idx > -1 ) {
                        	var historyRec = historyStore.getAt(idx);
				if (historyRec.get('title') == '' )
                              	   historyRec.set('title', title);
                if (thumb)
				   historyRec.set('thumbnail', thumb);
				historyRec.set('date', date);
				if (historyRec.get('publisher') == '')
				  historyRec.set('publisher', publisher);
				//console.log('history has ' + historyStore.getAllCount() + ' items');
				hl.refresh();
                  	}
	                if (searchType=='hollis') {
	                   var hollis = Ext.getStore('Biblio');
	                   var hollisRec = hollis.getAt(0);
			   if (thumb)
	                     hollisRec.set('thumb', thumb);
	                   if (description)
	                     hollisRec.set('description', description);
			   if (date)
	                     hollisRec.set('date', date);
	                   if (hollisRec.get('title') == '' ) 
	                      hollisRec.set('title', title);
	                   if (hollisRec.get('publisher') == '') 
	                     hollisRec.set('publisher', publisher);
	                   //console.log('showing singlebookview');
			   ms.setMasked(false);
	                   ms.push({ xtype: 'singlebook' });
	                }
	                else {
	                   var worldCat = Ext.getStore('WorldCatStore');
	                   //console.log("worldcat store loaded with " + worldCat.getAllCount() + " records");
	                   var worldCatRec = worldCat.getAt(0);
	                   //console.log("updating world cat record: " + worldCatRec.get('title') );
			   if (thumb)
	                      worldCatRec.set('thumbnail', thumb);
			   if (description)
	                     worldCatRec.set('description', description);
	                   //console.log('showing worldcatview');
			   ms.setMasked(false);
	                   ms.push({ xtype : 'worldcatview' });
	                }
	                                	
				}		
				else { // not found in gbooks, do worldcat lookup
				  //do worldcat lookup
				   //console.log('thumbnail not found in gbooks');	
				   if (searchType=='hollis') {
					ms.setMasked(false);
	                   		ms.push({ xtype: 'singlebook' });
				    }
	                	    else {
					ms.setMasked(false);
	                   		ms.push({ xtype : 'worldcatview' });			
				    }
				}
		    },
			failure: function(res, request) { //gBooks lookup req failed - try worldcat anyway
					//console.log("gbooks thumbnail lookup call failed");
					if (searchType=='hollis')  {
				ms.setMasked(false);
	                   	ms.push({ xtype: 'singlebook' });	
				}
	                else  {
			   ms.setMasked(false);
	                   ms.push({ xtype : 'worldcatview' });
			   }
			}
		});
	
	
	
	},
	
	 worldCatHollisLookup: function(barcode, navListWindow) {
	 	var ms = navListWindow;
  		var mainController = this;
		var worldCatURL = doweown.config.Config.getWorldCatUrl();
		var lookupURL = worldCatURL + barcode;
		var harvardBarcode = '';
		
		//show searching window
		navListWindow.setMasked({ xtype: 'loadmask', message: 'Searching...'});	
		Ext.data.JsonP.request({
		   url: lookupURL,
		   disableCaching: true,
		   callbackKey: 'callback',
		   params: {
		     wskey: doweown.config.Config.getWorldCatDevKey(),
		     oclcsymbol:  doweown.config.Config.getWorldCatHarvardLibs(),
		     format: 'json'
		   },
		   
		   success: function(res, request) {  //go to hollis to get avail info
		   	  if (typeof res.totalLibCount != 'undefined'){ 
		   	  	var library = res.library;
		   	  	// just get the first isbn. ideally this should be handled with
		   	  	// one call to presto, but most of the listings have the same isbn, so 
		   	  	// grabbing the first one seems to be ok.
		   	    var opacUrl = library[0].opacUrl;  
		   	    //console.log(opacUrl);
		   	    var harvardBarcode = (opacUrl.match(/request\%3D[0-9]+/))[0];
		   	    harvardBarcode = harvardBarcode.replace('request%3D','');
		   	    harvardBarcode = harvardBarcode.replace('%26','');
		   	    //console.log('harvard barcode found: ' + harvardBarcode );
	    	
		   	    //go to hollis for availability
		   	 	mainController.hollisLookup(harvardBarcode, navListWindow);
		   	  }
		   	  else {
		   	  	//mainController.worldCatLookup(barcode, navListWindow);
		   	  	//try hollis directly since not all harvard libraries are in worldcat
		   	  	mainController.hollisLookup(barcode, navListWindow);
		   	  }
		   
		   },
		   
		   failure: function(res, request) { // try hollis directly anyway
		   	  //mainController.worldCatLookup(barcode, navListWindow);
		   	  mainController.hollisLookup(barcode, navListWindow);	
		   }	   
		
		});
	 
	 },
   
    worldCatLookup: function(barcode, navListWindow) {
  	//console.log('commencing worldcat lookup for isbn: ' + barcode);
  	var ms = navListWindow;
  	var mainController = this;
	var hl = mainController.getHistoryList();
	var worldCatURL = doweown.config.Config.getWorldCatUrl();
	var gBooksURL = doweown.config.Config.getGoogleBooksUrl();
	var borrowDirectURL = doweown.config.Config.getBorrowDirectUrl().replace("_ISBN_", barcode);
	
	
	var lookupURL = worldCatURL + barcode;
	//console.log('worldcat url is: ' + lookupURL);
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
	          //console.log('worldcat jsonp call successful'); 
	          var title = res.title;
	          //console.log('title: ' + title);
	          var author = res.author;
	          var date = res.date;
	          var publisher = res.publisher;
	          var ISBN = res.ISBN;
	          var totalLibCount = res.totalLibCount;
	          var library = res.library;
	          var OCLCnumber = res.OCLCnumber;
	          //console.log('libraries: ' + library);
	          
	          
	          var emailISBN = '';
	          if (ISBN instanceof Array ) {
	             for ( var i in ISBN ) {
	             	emailISBN = emailISBN + ISBN[i] + '%0A';
	             }
	          } else {
	          	emailISBN = barcode;
	          }
	          var worldCatRec = Ext.create('doweown.model.WorldCatBooks', {
	            'title': title,
	            'author': author,
	            'date': date,
	            'publisher': publisher,
	            'ISBN': ISBN,
	            'OCLCnumber': OCLCnumber, 
	            'totalLibCount': totalLibCount,
		        'borrowDirectUrl': borrowDirectURL,
	            'library': library
	            //'mailto': mainController.generateMailto(title, author, date, publisher, emailISBN, OCLCnumber)     	            
	          });
	          //console.log('worldcat record created');
	          worldCatStore.add(worldCatRec);

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
              //console.log('isbnString: ' + isbnString);
              gBooksURL = gBooksURL + isbnString;
              //console.log('gbooks url: ' + gBooksURL);
		  var historyRec = Ext.create('doweown.model.History', {
			'title': title, 
			'author': author,
			'publisher': publisher,
			'date': date,
			'barcode': barcode,
			'owned': false
		  });
		  var historyStore = Ext.getStore('HistoryStore');
		  if ( historyStore.findExact('barcode', barcode) === -1 ) {
			historyStore.add(historyRec);
			hl.refresh();
		  }
	          mainController.googleLookup(gBooksURL,'worldcat', barcode, ms); 
	        }
	        else { //not in worldcat
			ms.setMasked(false);
	        	Ext.Msg.alert('ISBN Not Found', "Catalog info for ISBN " + barcode + " not found.");
	        }
	    },
	    failure: function(res, request) { //worldcat lookup  failed - goto email form
		ms.setMasked(false);
	    	Ext.Msg.alert('ISBN Not Found',"Catalog info for ISBN " + barcode + " not found.");	
	    }
	    
	
	});


    },
	

     hollisLookup: function(barcode, navListWindow) {
		//presto search goes here
		var mainController = this;
		var hl = mainController.getHistoryList();
		var gBooksURL = doweown.config.Config.getGoogleBooksUrl(); // + 'isbn:' + barcode;
		//console.log('commencing hollis lookup');
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
		//console.log('hollis url: ' + isbnURL);
		
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
			           //console.log("hollis lookup");
                         // Get the isbn data from the json object result
                         if (res.mods) {
                          isbnResult = true;
                          //console.log("isbn worked");
                          
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
                            if (res.mods.identifier.content instanceof String || 
                              typeof res.mods.identifier.content == 'string') {
                              var l = res.mods.identifier.content.split(' ',1);
                              isbnString = 'isbn:' + l;
                            }
                            else
                              isbnString = 'isbn:' + res.mods.identifier.content;
                          }
                          // append the original isbn barcode found in the gbooks url if 
                          // not in the hollis record, since its not always there. good grief
                          if (isbnString.indexOf(barcode) == -1) 
                          	isbnString = isbnString + '+OR+isbn:' + barcode;
                          if (isbnString.length == 0)
                             isbnString = 'isbn:' + barcode;
                          //console.log('isbnString: ' + isbnString);
                          gBooksURL = gBooksURL + isbnString;
                          //call google
	                      //console.log('gbooks url: ' + gBooksURL);
                                                                          
                          hollisId = res.mods.recordInfo.recordIdentifier.substring(0,9);
                          //console.log('hollis id is: ' + hollisId);
                                                                            
                          if ( typeof res.mods.titleInfo.title === 'string') 
                          	title = res.mods.titleInfo.title;
                          else if (res.mods.titleInfo instanceof Array) { 
                          	title = res.mods.titleInfo[0].title;
                          	if (res.mods.titleInfo[0].nonSort) 
                          	   title = res.mods.titleInfo[0].nonSort + ' ' +title;
                          	if (res.mods.titleInfo[0].subTitle) {
                          	   if ( (/^and/).test(res.mods.titleInfo[0].subTitle) ) 
                          	      title = title + ' ' + res.mods.titleInfo[0].subTitle;
                          	   else 
                          	      title = title + ': ' + res.mods.titleInfo[0].subTitle;
                          	 }
                          }	
                          else 
                          	title = '';
                          if (res.mods.titleInfo.nonSort) 
                             title = res.mods.titleInfo.nonSort + ' ' +title;
                          if (res.mods.titleInfo.subTitle) {
                             if ( (/^and/).test(res.mods.titleInfo.subTitle) ) 
                                title = title + ' ' + res.mods.titleInfo.subTitle;
                             else
                                title = title + ': ' + res.mods.titleInfo.subTitle;
                           }
                          //console.log('hollis title: ' + title);
                          if (res.mods.name) { 
                            if (res.mods.name instanceof Array ) {
                          	  if ( res.mods.name[0].namePart instanceof Array ) {
                              author = res.mods.name[0].namePart[0];
                              } else {
                            	   author = res.mods.name[0].namePart;
                        	  }
                            }
                            else {
                              if ( res.mods.name.namePart instanceof Array ) {
                                 author = res.mods.name.namePart[0];
                              } else {                        
                                author = res.mods.name.namePart;
                              }
                            }
                          }
                          //console.log('hollis author: ' + author);
                          
                          var originInfo;
                          if (res.mods.originInfo instanceof Array) {
                          	originInfo = res.mods.originInfo[0];
                          }
                          else {
                          	originInfo = res.mods.originInfo;
                          }
                          
                          if ( originInfo.place instanceof Array) {
                          	place = originInfo.place[1].placeTerm.content;
                          } else {
                          	place = 'unknown';
                          }
                          //console.log('hollis place: ' + place);
                          if ( originInfo.publisher ) {
                          	publisher = originInfo.publisher;
                          } else {
                           publisher = "Publisher unknown";
                          }
                          //console.log('hollis pub: ' + publisher);
                          if ( originInfo.dateIssued instanceof Array )
                          	date = originInfo.dateIssued[0];
                          else if ( originInfo.dateIssued.content) 
                             date = originInfo.dateIssued.content;
                          else
                             date = originInfo.dateIssued;
                          //console.log('hollis date: ' + date);
                    
                          
						  //call presto again for availabilty
						  availURL  = doweown.config.Config.getHollisAvailUrl() +hollisId;
                          //console.log(availURL);
                          Ext.data.JsonP.request({
                     	      url: availURL,
                              callbackKey: 'jsonp',
                              disableCaching: true,
                              success: function(res, request) {
                                // Get the availability data from the json object result
                                if (res.availability) {
                                  availResult = true;
								  //add book to books store and availability store						
						          var hollisRec = Ext.create('doweown.model.Isbn', {
						             'title' :   title,
						             'author':   author,
						             'date':     date,
						             'place':    place,
							     'isbn': 	barcode,
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
					var historyRec = Ext.create('doweown.model.History', {
                        			'title': title, 
                        			'author': author,
                        			'publisher': publisher,
                        			'date': date,
                        			'barcode': barcode,
                        			'owned': true
                  			});
                  			var historyStore = Ext.getStore('HistoryStore');
                  			if ( historyStore.findExact('barcode', barcode) === -1 ) {
                        			historyStore.add(historyRec);
						hl.refresh();
                  			}
                               	  mainController.googleLookup(gBooksURL,'hollis', barcode, navListWindow); 
								  //ms.push({ xtype : 'singlebook' });	
                                }
                              }
                          });
                	    }
            		   },
					   failure: function(res, request) { //not in hollis
			   			 //do worldcat lookup
			   			 mainController.worldCatLookup(barcode, navListWindow);
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
                		//mainController.hollisLookup(barcode, mainController.getMainScreen()); 
                		mainController.worldCatHollisLookup(barcode, mainController.getMainScreen());
                	}
                	else {
                		Ext.Msg.alert('Invalid barcode',"Invalid barcode " + barcode);
                	}	    
                }
            },
            function(error) {
               Ext.Msg.alert('FAIL', "Whoops! Scanning failed: " + error);
            }
		);
    },


    readIsbn: function() {
	var barcode = this.getInputField().getValue();
	var mainController = this;
	if (barcode.length > 0) {
	  if (mainController.validateBarcode(barcode)) {
		//mainController.hollisLookup(barcode, mainController.getMainScreen());
		mainController.worldCatHollisLookup(barcode, mainController.getMainScreen());
	  }
	  else {
	   	Ext.Msg.alert("Invalid barcode " + barcode);
	  }
	}
    },


    
    searchFromHistory: function(list, index, target, record) {
	var mainController = this;
	list.deselectAll();
	//mainController.hollisLookup(record.get('barcode'), mainController.getHistoryNav());
	mainController.worldCatHollisLookup(record.get('barcode'), mainController.getHistoryNav());
     },



     showAvailability: function() {
	var sb = this.getSingleBookList();
 	sb.getParent().push( {xtype: 'availview'} );
        sb.deselectAll();
     },
     
     
     
     savePrefs: function() {
     	var prefsStore = Ext.getStore('PrefsStore');
     	var formValues = this.getPrefsForm().getValues();
	    if (prefsStore.getAllCount() > 0) {
        		var pref = prefsStore.getAt(0);
        		pref.set('firstname', formValues.firstname);
        		pref.set('lastname', formValues.lastname);
        		pref.set('email', formValues.email);
        		pref.set('library', formValues.library);
        		pref.set('school', formValues.school);
        		pref.set('affiliation', formValues.affiliation);
				prefsStore.sync();
				Ext.Msg.alert("Settings saved.");
         }
         else {
         	var pref = Ext.create( 'doweown.store.PrefsStore', 
         	  {
         	  	'firstname': formValues.firstname,
         	  	'lastname': formValues.lastname,
         	  	'email': formValues.email,
         	  	'library': formValues.library,
         	  	'school': formValues.school,
         	  	'affiliation': formValues.affiliation
         	  });
         	 prefsStore.add(pref);
         	 
        }
     	
     },
     
     
     launch: function() {
     	var prefsStore = Ext.getStore('PrefsStore');
     	var prefsForm = this.getPrefsForm();
     	if (prefsStore.getAllCount() > 0) {
     		var pref =  prefsStore.getAt(0);
     		prefsForm.setRecord(pref);
     	}
     	else { //switch to prefs screen and ask for prefs
     		var tabBar = this.getTabBar();
     		tabBar.setActiveItem(2);
     		Ext.Msg.alert('Welcome!', 'Before you begin, please enter your email settings.');
     	}    	
     },
          
     
     resetPrefs: function() {
     	var prefsStore = Ext.getStore('PrefsStore');
     	var prefsForm = this.getPrefsForm();
     	if (prefsStore.getAllCount() > 0) {
     		var pref =  prefsStore.getAt(0);
     		prefsForm.setRecord(pref);
     	}
     	else {
     		this.getPrefsForm().reset();
     	}
     },
     
     resetScan: function() {
     	var tabBar = this.getTabBar();
     	var tab = tabBar.getActiveItem();
     	var navPanel = tab.child('navigationview');
     	navPanel.reset();
     	if (navPanel.getId() == 'historynav' ) {
     		tabBar.setActiveItem(0);
     		var tab2 = tabBar.getActiveItem();
     		var navPanel2 = tab2.child('navigationview');
     		navPanel2.reset();
     	}
     	
     },
     
     
     generateFeedbackUrl: function(title, author, date, publisher, emailISBN, 
     	OCLCnumber, libraryEmail, libraryName) {
     	var prefsStore = Ext.getStore('PrefsStore');
		var prefFirstName = '';
	    var prefLastName = '';
		var prefEmail = '';
	    var prefSchool = '';
	          
	    if (prefsStore.getAllCount() > 0) {
     		var pref =  prefsStore.getAt(0);
     		prefFirstName  = pref.get('firstname');
     		prefLastName = pref.get('lastname');
     		prefEmail = pref.get('email');
     		prefSchool = pref.get('school');
     		prefAffiliation = pref.get('affiliation');
     	}
     	
        
     	
     	return doweown.config.Config.getFeedbackUrl() + 
     	  'lbt=Do%20We%20Own%20This&refU=doweown%3A%2F%2Fharvard.edu%2F&' + 
     	  'pageTitle='+ encodeURIComponent(doweown.config.Config.getEmailSubject())+ 
     	  '%20for%20'+ encodeURIComponent(libraryName) +'&'+
     	  'repProb='+ libraryEmail +'&' +
     	  'repComm='+ libraryEmail +'&' +
     	  'title=' + encodeURIComponent(doweown.config.Config.getEmailCategory())+ 
     	    '%20for%20'+ encodeURIComponent(libraryName) +'&' +
     	  'PROJECTNAME=doweown&fromUser=true&'+
     	  'firstName='+ encodeURIComponent(prefFirstName) + '&' +
     	  'lastName=' + encodeURIComponent(prefLastName) + '&' +
     	  'FROM=' + encodeURIComponent(prefEmail) + '&' +
     	  'affil=' + encodeURIComponent(prefAffiliation) + '&' +
     	  'comment='+
     	   	'Title:%20' + encodeURIComponent(title) + '%0A' +
	    	'Author:%20' + encodeURIComponent(author) + '%0A' +
	        'Date:%20' + encodeURIComponent(date) + '%0A' +
	        'Publisher:%20' + encodeURIComponent(publisher) + '%0A' +
	        'ISBN:%20' + emailISBN +
	        'OCLC%20Number:%20' + OCLCnumber + '%0A' +
	        '------------------------%0A' +
	        'Requester%20information:%0A%0A' +
	        'Name:%20' + encodeURIComponent(prefFirstName) + '%20' + 
	           encodeURIComponent(prefLastName) +'%0A' +
	        'School%2FUnit:%20' + encodeURIComponent(prefSchool) + '%0A' +
	        'Affiliation:%20' + encodeURIComponent(prefAffiliation) + '%0A%0A' +
	        encodeURIComponent(doweown.config.Config.getEmailFooter());
     	            
     },
     
     
     launchFeedbackForm: function() {
     	var pulldown = this.getFeedbackPd();
     	var idx = pulldown.getValue();
     	if (typeof idx == 'undefined')  {
     		var prefsStore = Ext.getStore('PrefsStore');
     		var pref =  prefsStore.getAt(0);
     		idx = pref.get('library');   		
     	}
     	var libraryStore = Ext.getStore('LibraryStore');
        var libraryRec, libraryEmail, libraryName, url;
        libraryRec = libraryStore.findRecord('libcode', idx);
     	libraryEmail =  libraryRec.get('email');
     	libraryName = libraryRec.get('name');
     	var title = '', 
     		author = '', 
     		date = '', 
     		publisher = '', 
        	emailISBN = '', 
        	OCLCnumber = '';
        var worldCat = Ext.getStore('WorldCatStore');
        var worldCatRec = worldCat.getAt(0);
        author = worldCatRec.get('author');
        title = worldCatRec.get('title');
        date = worldCatRec.get('date');
        publisher = worldCatRec.get('publisher');
        var ISBN = worldCatRec.get('ISBN');
		if (ISBN instanceof Array ) {
	    	for ( var i in ISBN ) {
	    	  emailISBN = emailISBN + ISBN[i] + '%0A';
	        }
	    } else {
	          	emailISBN = ISBN;
	    }
        OCLCnumber = worldCatRec.get('OCLCnumber');
        url = this.generateFeedbackUrl(title, author, date, publisher, 
        	emailISBN, OCLCnumber, libraryEmail, libraryName);
        window.open(url, '_system');
     
     },
     
     
     launchBorrowDirect: function() {
     	var worldCat = Ext.getStore('WorldCatStore');
        var worldCatRec = worldCat.getAt(0);
     	var url = worldCatRec.get('borrowDirectUrl');
     	window.open(url, '_system');
     }
     

});
