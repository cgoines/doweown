Ext.define('doweown.store.LibraryStore', {
        extend: 'Ext.data.Store',
        alias: 'store.LibraryStore',
	config: {
	   storeId: 'libraries',
	   model: 'doweown.model.Library',
	   autoLoad: true,
	   data: [
		{name: 'Lamont', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Widener', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Schelsinger', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Law Library', email: 'acquistn@law.harvard.edu'},
                {name: 'Cabot', email: 'doweownthis@hulmail.harvard.edu'},
                {name: 'Countway Library of Medicine', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Baker', email: 'doweownthis@hulmail.harvard.edu'},
                {name: 'Fine Arts Library', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Gutman', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Houghton', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Harvard-Yenching', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Andover-Harvard Theological Library', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Kennedy School Library', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Loeb', email: 'doweownthis@hulmail.harvard.edu'},	
		{name: 'Grossman', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Ernst Mayr Library', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Chemistry', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Physics Research Library', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Philosophy Library', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Loeb', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'Fung', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'I Tatti', email: 'doweownthis@hulmail.harvard.edu'},
		{name: 'African and African American Studies Reading Room', email: 'doweownthis@hulmail.harvard.edu'},
                {name: 'Other', email: 'doweownthis@hulmail.harvard.edu'}
	   ]
	}
});
