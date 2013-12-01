Ext.define("LCTY.controller.index.RtList", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			rtList: "rtList"
		},
		control: {
			rtList: {
				rtListCommand: "onRtListCommand"
			}
		}
	},
	onRtListCommand: function(list, record) {
		console.log(record);
	}
});