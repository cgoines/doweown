Ext.define('doweown.config.Config', {
	singleton: true,

	config: {
		hollisIsbnUrl:    'http://webservices.lib.harvard.edu/rest/mods/hollis/isbn/',
		hollisAvailUrl:   'http://webservices.lib.harvard.edu/rest/hollis/avail/',
		hollisSimilarUrl: 'http://webservices.lib.harvard.edu/rest/hollis/search/dc/?q=title:',
		googleBooksUrl:   'https://www.googleapis.com/books/v1/volumes?q=isbn:',
		worldCatDevKey:   ''
	},


	constructor: function(config) {
    		this.initConfig(config);
    		return this;
  	}

});
