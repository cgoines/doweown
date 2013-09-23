Ext.define('doweown.config.Config', {
	singleton: true,

	config: {
		borrowDirectUrl:  'http://nrs.harvard.edu/urn-3:hul.eother:BD',
		hollisIsbnUrl:    'http://webservices.lib.harvard.edu/rest/mods/hollis/isbn/',
		hollisAvailUrl:   'http://webservices.lib.harvard.edu/rest/hollis/avail/',
		hollisSimilarUrl: 'http://webservices.lib.harvard.edu/rest/hollis/search/dc/?q=title:',
		googleBooksUrl:   'https://www.googleapis.com/books/v1/volumes?q=',
		noThumbnaillUrl:  'http://books.google.com/googlebooks/images/no_cover_thumb.gif',
		worldCatUrl:	  'http://www.worldcat.org/webservices/catalog/content/libraries/isbn/',
		worldCatLibs:     'COO,YUS,PUL,RBN,DRB,ZCU,ZCL,VVT,VYC,YUM,GXR,PAU,PAULM,DRP,PLL',
		worldCatDevKey:   ''
	},


	constructor: function(config) {
    		this.initConfig(config);
    		return this;
  	}

});
