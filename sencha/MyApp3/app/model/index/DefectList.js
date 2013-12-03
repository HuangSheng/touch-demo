Ext.define("LCTY.model.index.DefectList", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'defectId',
		fields: [{
			name: 'defectId',
			type: 'string'
		}, {
			name: 'defectNo',
			type: 'string'
		}, {
			name: 'defectTitle',
			type: 'string'
		}, {
			name: 'defectDate',
			type: 'date',
			dateFormat: 'c'
		}]
	}
});