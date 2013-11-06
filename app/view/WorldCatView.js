Ext.define('doweown.view.WorldCatView', {
    extend: 'Ext.DataView',
    xtype: 'worldcatview',

    config: {
           //title: 'WorldCat Listings',
	   title: 'No, we don\'t, but...',
           store: 'WorldCatStore',
           /*onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert( record.get('collection.collectionname'), Ext.emptyFn);
            },*/
            //itemTpl: '<div><b> {repository.name}</b> <tpl for="collection"><br> <i>{collectionname}</i><tpl for="items"><br> <tpl switch="isavail"><tpl case="N" case="n"><font color="red"><strong>Not Available</strong></font><tpl default><font color="green"><strong>Available</strong></font></tpl>  :{stat}<br> Call#: {call}<br> <a href="{req.href}" onclick="window.open(this.href,\'_system\'); return false;">{req.content}</a></br></tpl> <tpl for="holdtag"><br> {availkey} <a href="{availval.url}" onclick="window.open(this.href,\'_system\'); return false;" >{availval.content}</a><br></tpl>  <tpl for="online"> <a href="{url}"  onclick="window.open(this.href,\'_system\'); return false;" >{content}</a><br></tpl> </tpl></div> <hr>'
	itemTpl: '<div><tpl if="thumbnail"><img src="{thumbnail}" style="float:left; padding: 5px 5px 4px 5px"></tpl> <b>{title}</b><br><i>{author}</i><br> {date}<br> {publisher}<br>{description}<p><br><tpl if="totalLibCount &gt; 0"><i>Available at Other Libraries:</i><br> <tpl for="library">{institutionName}<br> <a href="{opacUrl}" onclick="window.open(this.href,\'_system\'); return false;">View this library\'s catalog record</a> <hr></tpl><p><b><a href="{borrowDirectUrl}" onclick="window.open(this.href,\'_system\'); return false;">Get It from Borrow Direct</a></b><p> or <br> </tpl><p><b><a href="{mailto}" onclick="window.open(this.href,\'_system\'); return false;">Ask Us to Get It</a></b><p></br></div> <hr> <p/> <div id="renderResetButton2"></div> <p/> <br>',
	listeners: {
                initialize: function() {
			var btns = Ext.ComponentQuery.query('#scanreset2'); 
                        var rButton = new Ext.Button({text: 'Press Here to Scan Again', itemId: 'scanreset2', renderTo: 'renderResetButton2'});
                        this.add(rButton);
                }
            }
     }


});
