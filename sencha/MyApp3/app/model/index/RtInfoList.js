Ext.define("LCTY.model.index.RtInfoList", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'rtInfoId',
		fields: [{
			name: 'rtInfoId',
			type: 'string'
		}, {
			name: 'rtInfoTitle',
			type: 'string'
		}, {
			name: 'rtInfoValue',
			type: 'double'
		}, {
			name: 'valueUnit',
			type: 'string'
		}, {
			name: 'rtInfoDate',
			type: 'date',
			dateFormat: 'c'
		}]
	}
});