Ext.define("LCTY.store.index.DefectList", {
	extend: "LCTY.default.DefaultListStore",
	
	config: {
		model: "LCTY.model.index.DefectList",
		url: "data/index/defectList.json",
		getGroupString: function(record) {
			// return Ext.Date.format(record.data.defectDate, "Y-m-d");
			return record.data.defectDate.toLocaleDateString();
		},
		grouper: {
			property: "defectDate",
			direction: "DESC"
			// standardGroupFn: function(record) {
			// if (record && record.data.defectDate) {
			// // return record.data.defectDate.toLocaleDateString();
			// return Ext.Date.format(record.data.defectDate, "Y-m-d");
			// } else {
			// return '';
			// }
			// }
		}
	}
	
});