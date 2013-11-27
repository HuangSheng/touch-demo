Ext.define("NotesApp.default.DefaultList", {
	extend: "Ext.dataview.List",
	alias: "widget.defaultList",
	requires: ["Ext.plugin.ListPaging"],
	initialize: function() {
		this.getPlugins();
		// this.setPlugins({
		// xclass: 'Ext.plugin.ListPaging',
		// autoPaging: true
		// });
		// this.setGrouped(true);
		// this.setLoadingText("Loading Notes...");
		this.callParent(arguments);
		console.log("parent");
	},
	config: {
		plugins: [{
			xclass: 'Ext.plugin.ListPaging',
			autoPaging: true
		}],
		grouped: true,
		loadingText: "正在加载中,请稍后......"
	}
});