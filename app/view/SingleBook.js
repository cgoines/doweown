Ext.define('doweown.view.SingleBook', {
    extend: 'Ext.tab.Panel',
    xtype: 'singlebook',
    scrollable: true,
    styleHtmlContent: true,
    layout: {
      type: 'fit',
      align: 'center'
     },

    items: [
        {
	   title: 'Search Results',
           xtype: 'list',
	   store: 'Biblio',
           pinHeaders: false,
           onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert('Tap', 'Go to mobile hollis for ' + record.get('title'), Ext.emptyFn);
            },
            itemTpl: '<img src="{thumb}"/><strong>{title}</strong> - {author} <br>{description}'
         }

    ]

});
