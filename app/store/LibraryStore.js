Ext.define('doweown.store.LibraryStore', {
        extend: 'Ext.data.Store',
        alias: 'store.LibraryStore',
	config: {
	   model: 'doweown.model.Library',
	   autoLoad: true,
	   data: [
		{name: 'Lamont', email: 'doweownthis@hulmail.harvard', libcode: '1'},
		{name: 'Widener', email: 'doweownthis@hulmail.harvard', libcode: '2'},
		{name: 'Schelsinger', email: 'doweownthis@hulmail.harvard', libcode: '3'},
		{name: 'Law Library', email: 'acquistn@law.harvard', libcode: '4'},
                {name: 'Cabot', email: 'doweownthis@hulmail.harvard', libcode: '5'},
                {name: 'Countway Library of Medicine', email: 'doweownthis@hulmail.harvard', libcode: '6'},
		{name: 'Baker', email: 'doweownthis@hulmail.harvard', libcode: '7'},
                {name: 'Fine Arts Library', email: 'doweownthis@hulmail.harvard', libcode: '8'},
		{name: 'Gutman', email: 'doweownthis@hulmail.harvard', libcode: '9'},
		{name: 'Houghton', email: 'doweownthis@hulmail.harvard', libcode: '10'},
		{name: 'Harvard-Yenching', email: 'doweownthis@hulmail.harvard', libcode: '11'},
		{name: 'Andover-Harvard Theological Library', email: 'doweownthis@hulmail.harvard', libcode: '12'},
		{name: 'Kennedy School Library', email: 'doweownthis@hulmail.harvard', libcode: '13'},
		{name: 'Loeb', email: 'doweownthis@hulmail.harvard', libcode: '14'},	
		{name: 'Grossman', email: 'doweownthis@hulmail.harvard', libcode: '15'},
		{name: 'Ernst Mayr Library', email: 'doweownthis@hulmail.harvard', libcode: '16'},
		{name: 'Chemistry', email: 'doweownthis@hulmail.harvard', libcode: '17'},
		{name: 'Physics Research Library', email: 'doweownthis@hulmail.harvard', libcode: '18'},
		{name: 'Philosophy Library', email: 'doweownthis@hulmail.harvard', libcode: '19'},
		{name: 'Loeb', email: 'doweownthis@hulmail.harvard', libcode: '20'},
		{name: 'Fung', email: 'doweownthis@hulmail.harvard', libcode: '21'},
		{name: 'I Tatti', email: 'doweownthis@hulmail.harvard', libcode: '22'},
		{name: 'African and African American Studies Reading Room', email: 'doweownthis@hulmail.harvard', libcode: '23'},
                {name: 'Other', email: 'doweownthis@hulmail.harvard', libcode: '24'}
	   ]
	}
});
