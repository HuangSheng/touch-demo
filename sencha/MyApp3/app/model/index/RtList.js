Ext.define("LCTY.model.index.RtList", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'rtId',
		fields: [{
			name: 'rtId',
			type: 'string'
		}, {
			name: 'title',
			type: 'string'
		}]
	}
});