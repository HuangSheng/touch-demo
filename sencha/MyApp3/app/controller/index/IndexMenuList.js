Ext.define("LCTY.controller.index.IndexMenuList", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			// We're going to lookup our views by xtype.
			indexMain: "indexMain"
		},
		control: {
			indexMain: {
				menuCommand: "onMenuCommand"
			}
		}
	},
	onMenuCommand: function(indexMain, record) {
		var view = Ext.create(record.get("extjsClass"));
		indexMain.push(view);
	},
	// init and launch functions omitted.
	launch: function() {
		this.callParent(arguments);
		// console.log("launch");
	},
	init: function() {
		this.callParent();
		// console.log("init");
	}
});