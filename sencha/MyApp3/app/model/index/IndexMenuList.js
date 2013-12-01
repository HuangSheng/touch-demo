Ext.define("LCTY.model.index.IndexMenuList", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'resourceId',
		fields: [{
			name: 'resourceId',
			type: 'string'
		}, {
			name: 'resourceName',
			type: 'string'
		}, {
			name: 'resourceDesc',
			type: 'string'
		}, {
			name: 'icon',
			type: 'string'
		}, {
			name: 'extjsClass',
			type: 'string'
		}, {
			name: 'shortExtjsClass',
			type: 'string'
		}]
	}
});