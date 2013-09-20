Ext.define('doweown.view.AvailView', {
    extend: 'Ext.DataView',
    xtype: 'availview',

    config: {
           title: 'Availability',
           store: 'BranchStore',
           /*onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert( record.get('collection.collectionname'), Ext.emptyFn);
            },*/
            itemTpl: '<div><b> {repository.name}</b> <tpl for="collection"><br> <i>{collectionname}</i><tpl for="items"><br> <tpl switch="isavail"><tpl case="N" case="n"><font color="red"><strong>Not Available</strong></font><tpl default><font color="green"><strong>Available</strong></font></tpl>  :{stat}<br> Call#: {call}<br> <a href="{req.href}" onclick="window.open(this.href,\'_system\'); return false;">{req.content}</a></br></tpl> <tpl for="holdtag"><br> {availkey} <a href="{availval.url}" onclick="window.open(this.href,\'_system\'); return false;" >{availval.content}</a><br></tpl>  <tpl for="online"> <a href="{url}"  onclick="window.open(this.href,\'_system\'); return false;" >{content}</a><br></tpl> </tpl></div> <hr>'
     }


});
