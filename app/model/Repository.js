Ext.define('doweown.model.Repository', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
        fields: [
		{name: 'name',     type: 'string', mapping: 'name' },
		{name: 'type',     type: 'string', mapping: 'type' },
                {name: 'id',	   type: 'string', mapping: 'id' },
                {name: 'libLink',  type: 'string', mapping: 'libLink' }
        ]
    }
});
