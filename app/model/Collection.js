Ext.define('doweown.model.Collection', {
    extend: 'Ext.data.Model',
    config: {
        belongsTo: 'Branch',
	//hasMany: { model: 'doweown.model.ItemRecord', name: 'items', associationKey: 'items', mapping: 'items.itemrecord' },
	//hasOne:  { model: 'doweown.model.HoldTag', name: 'holdtag', associationKey: 'holdtag', mapping: 'holdtag' },
	//hasOne:  { model: 'doweown.model.Online', name: 'online', associationKey: 'online', mapping: 'online' },
        fields: [
                {name: 'collectionname', type: 'string', mapping: 'collectionname'},
		//{name: 'availkey', type: 'string', mapping: 'holdtag.availkey'},
                {name: 'callnumber',     type: 'string', mapping: 'callnumber', convert: 
			function(value, record) {
			  if (value instanceof Object) 
			    return '';
		  	  else
			    return value;
			}	
		},
		{name: 'items', convert:
            		function(value, record) {
                	  if (value.itemrecord) {
                    	     if (value.itemrecord instanceof Array) {
                        	return value.itemrecord;
                    	      } else {
                                 return [value.itemrecord]; // Convert to an Array
                     	      }
                	   }

                	   return value.itemrecord;
            		}
        	},
		//{ model: 'doweown.model.HoldTag', name: 'holdtag', associationKey: 'holdtag', mapping: 'holdtag' }
		{name: 'holdtag'},
		{name: 'online'}
        ]
    }
});
