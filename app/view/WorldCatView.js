Ext.define('doweown.view.WorldCatView', {
    extend: 'Ext.DataView',
    xtype: 'worldcatview',

    config: {
           //title: 'WorldCat Listings',
	   title: 'Sorry, we don\'t own it but...',
           store: 'WorldCatStore',
           /*onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert( record.get('collection.collectionname'), Ext.emptyFn);
            },*/
            //itemTpl: '<div><b> {repository.name}</b> <tpl for="collection"><br> <i>{collectionname}</i><tpl for="items"><br> <tpl switch="isavail"><tpl case="N" case="n"><font color="red"><strong>Not Available</strong></font><tpl default><font color="green"><strong>Available</strong></font></tpl>  :{stat}<br> Call#: {call}<br> <a href="{req.href}" onclick="window.open(this.href,\'_system\'); return false;">{req.content}</a></br></tpl> <tpl for="holdtag"><br> {availkey} <a href="{availval.url}" onclick="window.open(this.href,\'_system\'); return false;" >{availval.content}</a><br></tpl>  <tpl for="online"> <a href="{url}"  onclick="window.open(this.href,\'_system\'); return false;" >{content}</a><br></tpl> </tpl></div> <hr>'
	itemTpl: '<div><tpl if="thumbnail"><img src="{thumbnail}"></tpl> <b>{title}</b><br> {author}<br> {date}<br> {publisher}<p> <b><a href="{borrowDirectUrl}" onclick="window.open(this.href,\'_system\'); return false;">Search on Borrow Direct</a></b><p><br><b>Libraries:</b><br><tpl for="library"><i>{institutionName}</i><br> <a href="comgooglemaps://?q={streetAddress1}, {city},{state} {postalCode}" onclick="window.open(this.href,\'_system\'); return false;">map</a> | <a href="{opacUrl}" onclick="window.open(this.href,\'_system\'); return false;">catalog link</a> <hr></tpl></div>'
     }


});
