Ext.define('doweown.view.AvailBook', {
    extend: 'Ext.List',
    xtype: 'availbook',

    config: {
           title: 'Availability',
           xtype: 'list',
           store: 'BranchStore',
           pinHeaders: false,
           /*onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert( record.get('collection.collectionname'), Ext.emptyFn);
            },*/
            //itemTpl: '{repository.name} <tpl for="collection"><br>{collectionname} {availkey}</tpl>'
	    itemTpl: '{repository.name} <tpl for="collection"><br>{collectionname}<tpl for="items"><br>is avail: {isavail}<br>{stat}<br>{call}<br>{req.content} {req.href}</br></tpl> <tpl for="holdtag"><br>{availkey} {availval.content}<br>{availval.url}</tpl>  <tpl for="online">{content}: {url}<br></tpl> </tpl><p> {noitems.content}'
     }


});
