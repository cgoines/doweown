Ext.define('doweown.view.WorldCatView', {
    extend: 'Ext.DataView',
    xtype: 'worldcatview',
    requires: [
	'Ext.form.Panel',
	'Ext.form.FieldSet',
	'Ext.field.Select',
	'doweown.store.LibraryStore'
    ],

    config: {
           //title: 'WorldCat Listings',
	   title: 'No, we don\'t, but...',
           store: 'WorldCatStore',
	   padding: 10,
           /*onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert( record.get('collection.collectionname'), Ext.emptyFn);
            },*/
	    itemTpl: '<tpl if="thumbnail"><img src="{thumbnail}" style="float:left; padding: 5px 5px 4px 5px"></tpl>'+
		'<b>{title}</b><br><i>{author}</i><br> {date}<br> {publisher}<br>{description}<p><br>'+
		'<tpl if="totalLibCount &gt; 0"><i>Available at Other Libraries:</i><br> '+
		   '<tpl for="library">{institutionName}<br> '+
		      '<a href="{opacUrl}" onclick="window.open(this.href,\'_system\'); return false;">View this library\'s catalog record</a> '+
		   '<hr></tpl></tpl>',
	listeners: {
                initialize: function() {
			var worldCat = Ext.getStore('WorldCatStore');
			var worldCatRec = worldCat.getAt(0);
			var totalLibCount = worldCatRec.get('totalLibCount');
			if (totalLibCount > 0) {
			  var borrowDirectBtn = new Ext.form.FieldSet({
			     title: 'Get It from Borrow Direct',
			     items: [
				{xtype: 'button', padding: '3 0 3 0', text: 'Go to Borrow Direct', ui: 'action', itemId: 'borrowDirectBtn'}
			     ]
			  });
			  this.add(borrowDirectBtn);
			}

			var prefsStore = Ext.getStore('PrefsStore');
			var idx = '1';
			if (prefsStore.getAllCount() > 0) {
				var pref =  prefsStore.getAt(0);
				idx = pref.get('library');
			}	
			var getIt = new Ext.form.FieldSet({
			   renderTo: 'feedbackPulldown',
			   title: 'Ask Us to Get It',
			   instructions: 'Select a library to send this request to',
			   items: [
				   {xtype: 'selectfield', name: 'feedbackPd', itemId: 'feedbackPd', label: 'Library', store: 'LibraryStore', displayField: 'name', valueField: 'libcode', value: idx}, 
				   {xtype: 'button', padding: '3 0 3 0', text: 'Send Request', ui: 'action', itemId: 'feedbackBtn' }
			    ]
			});
			this.add(getIt);

                        var rButton = new Ext.Button({text: 'Press Here to Scan Again', itemId: 'scanreset2', renderTo: 'renderResetButton2', padding: 10});
                        this.add(rButton);
                }
            }
     }


});
