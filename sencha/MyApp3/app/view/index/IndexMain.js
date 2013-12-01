Ext.define("LCTY.view.index.IndexMain", {
	extend: "Ext.navigation.View",
	
	requires: ["Ext.Button"],
	
	alias: "widget.indexMain",
	id: "indexMain",
	initialize: function() {
		this.callParent(arguments);
		
		var indexMenuList = {
			xtype: "indexMenuList",
			listeners: {
				itemtap: {
					fn: this.onIndexMenuListItemtap,
					scope: this
				}
			}
		};
		this.add( [indexMenuList]);
		this.on("pop", this.onPop, this);
		this.addBeforeListener("push", this.onBeforePush, this);
	},
	config: {
		useTitleForBackButtonText: true,
		navigationBar: false
	},
	onBeforePush: function(indexMain, view, eOpts) {
		console.log(indexMain.title);
	},
	onPop: function(indexMain, view, eOpts) {
		var navigationBar = this.getNavigationBar();
		// navigationBar.removeAt(navigationBar.getItems().length - 1);
		// console.log(navigationBar.getItems().length);
	},
	onIndexMenuListItemtap: function(list, index, target, record, e, eOpts) {
		// console.log("editNoteCommand");
		this.fireEvent('menuCommand', this, record);
	}
});