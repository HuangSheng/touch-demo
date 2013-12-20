Ext.define("LCTY.controller.index.RtInfoList", {
	extend: "Ext.app.Controller",
	
	requires: ['LCTY.view.index.RtChart'],
	config: {
		refs: {
			rtInfoList: "rtInfoList",
			indexMain: "indexMain"
		},
		control: {
			rtInfoList: {
				rtInfoListCommand: "onRtInfoListCommand"
			}
		}
	},
	onRtInfoListCommand: function(list, record) {
		var view = Ext.create("LCTY.view.index.RtChart", {
			view: this.getIndexMain(),
			params: {
				rtInfoId: record.get("rtInfoId")
			},
			rtInfoTitle: record.get("rtInfoTitle")
		});
		this.getIndexMain().push(view);
	}
});