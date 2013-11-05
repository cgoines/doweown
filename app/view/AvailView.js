Ext.define('doweown.view.AvailView', {
    extend: 'Ext.DataView',
    xtype: 'availview',

    config: {
           title: 'Availability',
           store: 'BranchStore',
	   pinHeaders: false,
           /*onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert( record.get('collection.collectionname'), Ext.emptyFn);
            },*/
            itemTpl: '<div style="padding: 5px 5px 4px 5px"><b> {repository.name}</b> <tpl for="collection"><br> <i>{collectionname}</i><br><tpl if="callnumber">{callnumber}</tpl><tpl for="items"><br> <tpl switch="isavail"><tpl case="N" case="n"><font color="red"><b>Not Available</b></font><tpl default><font color="green"><b>Available</b></font></tpl>: {stat}<br>  <tpl if="call">Call#: {call}<br></tpl> <b><a href="{req.href}" onclick="window.open(this.href,\'_system\'); return false;">{req.content}</a></b></br></tpl> <tpl for="holdtag"><br> {availkey} <b><a href="{availval.url}" onclick="window.open(this.href,\'_system\'); return false;" >{availval.content}</a></b><br></tpl>  <tpl for="online"> <b><a href="{url}"  onclick="window.open(this.href,\'_system\'); return false;" >{content}</a></b><br></tpl> </tpl></div> <hr> <div id="renderResetButton1"></div> <p/> ',
	    listeners: {
		show: function() {
			var btns = Ext.ComponentQuery.query('#scanreset1');
			var rButton = new Ext.Button({text: 'Press Here to Scan Again', itemId: 'scanreset1', renderTo: 'renderResetButton1'});
			this.add(rButton);
		}
	    }
     }


});
