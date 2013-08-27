Ext.define('doweown.view.AvailBook', {
    extend: 'Ext.List',
    xtype: 'availbook',

    config: {
           title: 'Search Results',
           xtype: 'list',
           store: 'AvailStore',
           pinHeaders: false,
           onItemDisclosure: function( record, btn, index ) {
                                Ext.Msg.alert('Tap', 'Go to mobile hollis for ' + record.get('title'), Ext.emptyFn);
            },
            itemTpl: '<img src="{thumb}"/><strong>{title}</strong> - {author} <br>{description}'
     }


});
