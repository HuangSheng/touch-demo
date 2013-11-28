Ext.define("NotesApp.default.DefaultList", {
	extend: "Ext.dataview.List",
	alias: "widget.defaultList",
	requires: ["Ext.plugin.ListPaging"],
	initialize: function() {
		var plugins = this.getPlugins();
		this.setPlugins( [{
			xclass: 'Ext.plugin.ListPaging',
			autoPaging: true
		}, plugins[0].config]);
		// this.setGrouped(true);
		// this.setLoadingText("Loading Notes...");
		this.callParent(arguments);
	},
	config: {
		scrollable: 'vertical',
		grouped: true,
		loadingText: "正在加载中,请稍后......"
	}
});