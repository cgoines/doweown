Ext.define('doweown.config.Config', {
	singleton: true,

	config: {
		emailSubject:	  'Patron Acquisition Request',
		emailTo:	  'doweownthis@hulmail.harvard.edu',
		emailSupport:	  'doweownthis@hulmail.harvard.edu',
		emailFooter:	  'Sent from the "Do We Own This?" App',
		emailCategory:	  'Patron Acquisition Request',
		borrowDirectUrl:  'http://access.harvard.edu/access/servlet/access?__hulaccess_gateway=bdirect&__hulaccess_resource=&query=isbn%3D%22_ISBN_%22',
		borrowDirectDefaultUrl: 'http://nrs.harvard.edu/urn-3:hul.eother:BD',
		feedbackUrl:	  'http://feedback.lib.harvard.edu/feedback/feedbackEmail?',
		feedbackTitle:	  'Mobile App Feedback',
		hollisIsbnUrl:    'http://webservices.lib.harvard.edu/rest/mods/hollis/isbn/',
		hollisAvailUrl:   'http://webservices.lib.harvard.edu/rest/hollis/avail/',
		hollisSimilarUrl: 'http://webservices.lib.harvard.edu/rest/hollis/search/dc/?q=title:',
		googleBooksUrl:   'https://www.googleapis.com/books/v1/volumes?q=',
		noThumbnailUrl:   'http://books.google.com/googlebooks/images/no_cover_thumb.gif',
		libraryListUrl:   'http://hul.harvard.edu/~chip/liblab/libraries.json',
		version:	  '0.99 beta',
		worldCatUrl:	  'http://www.worldcat.org/webservices/catalog/content/libraries/isbn/',
		worldCatLibs:     'COO,YUS,PUL,RBN,DRB,ZCU,ZCL,VVT,VYC,YUM,GXR,PAU,PAULM,DRP,PLL',
		worldCatHarvardLibs: 'HMM,HRA,HTV,BOH,HBS,CLS,HCH,FLL,BHA,HMG,HMZ,HFL,HLS,HHG,KSG,HVL,HMU,HMS,SLR,TOZ,HMY,SYS,MCS,SQD',
		worldCatDevKey:   ''
	},


	constructor: function(config) {
    		this.initConfig(config);
    		return this;
  	}

});
