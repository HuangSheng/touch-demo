Ext.define("LCTY.controller.index.DefectList", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			defectList: "defectList"
		},
		control: {
			defectList: {
				defectListCommand: "onDefectListCommand"
			}
		}
	},
	onDefectListCommand: function(list, record) {
		console.log(record);
	}
});