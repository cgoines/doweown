Ext.define('doweown.view.WorldCatView', {
    extend: 'Ext.DataView',
    xtype: 'worldcatview',

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
		'<hr></tpl><p><b>'+
		'<a href="{borrowDirectUrl}" onclick="window.open(this.href,\'_system\'); return false;">Get It from Borrow Direct</a></b><p> '+
		'or <br> </tpl><p><b><a href="{mailto}" onclick="window.open(this.href,\'_system\'); return false;">Ask Us to Get It</a></b>'+
		'<p></br> <hr> <div id="renderResetButton2"></div> <p> <br> <p>',
	listeners: {
                initialize: function() {
			var btns = Ext.ComponentQuery.query('#scanreset2'); 
                        var rButton = new Ext.Button({text: 'Press Here to Scan Again', itemId: 'scanreset2', renderTo: 'renderResetButton2'});
                        this.add(rButton);
                }
            }
     }


});
