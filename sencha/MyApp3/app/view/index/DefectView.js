Ext.define("LCTY.view.index.DefectView", {
	extend: "Ext.Container",
	alias: "widget.defectView",
	requires: ["Ext.Toolbar"],
	initialize: function() {
		this.callParent(arguments);
	},
	config: {
		tpl: [],
		layout: {
			type: 'fit'
		}
	}
});