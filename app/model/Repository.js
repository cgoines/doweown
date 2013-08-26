Ext.define('doweown.model.Repository', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
        fields: [
		{name: 'name',     type: 'string'},
		{name: 'type',     type: 'string'},
                {name: 'id',	   type: 'string'},
                {name: 'libLink',  type: 'string'}
        ]
    }
});
