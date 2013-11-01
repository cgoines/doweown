Ext.define('doweown.model.Prefs', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'firstname',     type: 'string'},
                {name: 'lastname',      type: 'string'},
                {name: 'email',         type: 'string'},
		{name: 'library',       type: 'string'},
		{name: 'school',	type: 'string'},
		{name: 'affilation', type: 'string'}
        ]
    }
});
