Ext.define('doweown.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
	'Ext.form.Panel',
	'Ext.form.FieldSet',
	'Ext.field.Select',
        'doweown.view.History',
	'doweown.store.LibraryStore'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'Scan',
                iconCls: 'search',
                //styleHtmlContent: false,
                scrollable: false,
		layout: 'fit',

                items: [{
			   xtype: 'navigationview',
                	   itemId: 'mainscreen',
                	   id: 'mainscreen',
			   items: [{
			     	title: 'Do We Own This?',
				padding: '5 10 10 10',
		    	     	items: [ 
				  { xtype: 'container', html: '<center><b>Do We Own This?</b></center> is an app that you can use to see if a book is in the Harvard Library. Simply scan a book\'s barcode or enter in its ISBN number to find out!' , padding: '10 5 10 5'},
				  { xtype: 'spacer' , padding: 10},
				  { xtype: 'container', html: 'Scan a book\'s ISBN barcode:', padding: '0 10 0 10'},
			 	  { xtype: 'spacer' , padding: 10},
				  { xtype: 'button', itemId: 'scanBtn', text: 'Press Here to Scan', padding: '0 10 0 10'},
				  { xtype: 'spacer', padding: 10},
				  { xtype: 'container', html: 'Or enter an ISBN number below:', padding: '0 10 0 10'},
				  { xtype: 'spacer', padding: 10 },
				  { xtype: 'textfield', itemId: 'isbnField', label: 'ISBN:', maxLength: 13, padding: '0 10 5 10'}
				] 
			    }]
		  }]
	
            },
            {
		itemId: 'hitlist',
                title: 'History',
                iconCls: 'bookmarks',
		//styleHtmlContent: false,
		layout: 'fit',

               items: [{
			xtype: 'navigationview',
			itemId: 'historynav',
			id: 'historynav',
			title: 'History',
			items: [
				{ xtype: 'history'}
			]
                    
               }]
            },
	    {
		itemId: 'prefs',
		title: 'Prefs',
		iconCls: 'settings',
		layout: 'fit',
		
		items: [{
			xtype: 'formpanel',
			itemId: 'prefsform',
			items: [
			  { xtype: 'titlebar', title: 'Settings', docked: 'top' }, 
		   	  { xtype: 'fieldset',
			    title: 'Enter your email settings here.',
	            	    items: [		
				{xtype: 'textfield', name: 'firstname', label: 'First <br>Name'},
				{xtype: 'textfield', name: 'lastname', label: 'Last <br>Name'},
				{xtype: 'textfield', name: 'email', label: 'E-mail'},
				{xtype: 'selectfield', name: 'library', label: 'Library', store: 'LibraryStore', displayField: 'name', valueField: 'libcode'},
                                {xtype: 'textfield', name: 'school', label: 'School /<br>Unit'},
                                {xtype: 'selectfield', name: 'affiliation', label: 'Affiliation',
				 options: [
				   {text: 'Harvard Faculty', value: 'Harvard Faculty' },
				   {text: 'Harvard Undergraduate Student', value: 'Harvard Undergraduate Student' },
				   {text: 'Harvard Graduate Student', value: 'Harvard Graduate Student' },
                                   {text: 'Harvard Staff', value: 'Harvard Staff' },
				   {text: 'Harvard Alumnus/a', value: 'Harvard Alumnus/a' },
                                   {text: 'Harvard Other', value: 'Harvard Other' },
                                   {text: 'Other Institution Faculty', value: 'Other Institution Faculty' },
                                   {text: 'Other Institution Undergraduate Student', value: 'Other Institution Undergraduate Student' },
				   {text: 'Other Institution Graduate Student', value: 'Other Institution Graduate Student' },
                                   {text: 'High School Student', value: 'High School Student' },
				   {text: 'Independent Researcher', value: 'Independent Researcher' },
                                   {text: 'Other', value: 'Other' }
				 ]
				}
			   ]
		   	  },
			  { xtype: 'toolbar', 
			    layout: { pack: 'center' },
			    ui: 'plain',
			    items: [
				{ xtype: 'spacer'},
				{xtype: 'button', text: 'Reset', ui: 'decline', itemId: 'resetBtn' },
				{ xtype: 'spacer'},
				{xtype: 'button', text: 'Save', ui: 'confirm', itemId: 'saveBtn' },
				{ xtype: 'spacer'}
			    ]
			  }
			]
		}]
	     },
	     {
		itemId: 'about',
                title: 'About',
                iconCls: 'info',
                layout: 'fit',
		scrollable: true,
		
		items: [
			{ xtype: 'titlebar', title: 'About', docked: 'top' },
			{ xtype: 'spacer'},
			{ xtype: 'panel', styleHtmlContent: true, scrollable: true,
			  html: '<p><b>Do we own this?</b><br>' +
				'A mobile app for library collection development' +
                      		'<p>Version: ' + doweown.config.Config.getVersion() +
				'<p><i>Project Team:</i><br>' +
				'Thomas Ma, Bibliographic Services Manager, Information and Technical Services<br>' +
				'Chip Goines, Digital Library Software Engineer, Library Technology Services<br>' + 
				'Donna Viscuglia, Senior Cataloger, ITS<br>' + 
				'Mariko Honshuku, Librarian for Japanese Law, Law Library<p/>' +
                      		'<p>Produced by: The Harvard Library Lab, ' + 
				   '<a href="https://osc.hul.harvard.edu/liblab" onclick="window.open(this.href,\'_system\'); return false;" >https://osc.hul.harvard.edu/liblab</a></p>' +
				'Contact us:<br> ' + 
				'<a href="mailto:doweownthis@hulmail.harvard.edu' +  
				   '?subject=%5Bdoweown%5D%20App%20Feedback" onclick="window.open(this.href,\'_system\'); return false;"><b>General Questions</b></a> | ' +
				'<a href="mailto:doweownthis-dev@hulmail.harvard.edu' +  
				   '?subject=%5Bdoweown%5D%20Technical%20Support%20Question" onclick="window.open(this.href,\'_system\'); return false;"><b>Technical Support</b></a> <p> <br>' +
				'License: GNU GPL v3.0<p>' 

			 }
		]

	     }
        ]
    }
});
