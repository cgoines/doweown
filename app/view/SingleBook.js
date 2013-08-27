Ext.define('doweown.view.SingleBook', {
    extend: 'Ext.List',
    xtype: 'singlebook',

    config: {
	   title: 'Search Results',
           xtype: 'list',
	   store: 'Biblio',
           pinHeaders: false,
           onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert('Tap', 'Go to mobile hollis for ' + record.get('title'), Ext.emptyFn);
            },
            itemTpl: '<img src="{thumb}"/><strong>{title}</strong> - {author} <br>{description}'
     }


});
