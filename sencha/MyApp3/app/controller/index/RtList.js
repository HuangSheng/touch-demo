Ext.define("LCTY.controller.index.RtList", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			rtList: "rtList",
			indexMain: "indexMain"
		},
		control: {
			rtList: {
				rtListCommand: "onRtListCommand"
			}
		}
	},
	onRtListCommand: function(list, record) {
		var view = Ext.create('LCTY.view.index.RtInfoList', {
			view: this.getIndexMain(),
			params: {
				id: record.get("rtId")
			}
		});
		this.getIndexMain().push(view);
	}
});