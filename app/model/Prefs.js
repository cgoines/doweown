Ext.define('doweown.model.Prefs', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'firstname',     type: 'string'},
                {name: 'lastname',      type: 'string'},
                {name: 'email',         type: 'string'},
		{name: 'library',       type: 'string'},
		{name: 'affiliation',	type: 'string'},
		{name: 'affiliationType', type: 'string'}
        ]
    }
});
