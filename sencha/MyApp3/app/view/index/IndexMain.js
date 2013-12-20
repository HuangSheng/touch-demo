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
		this.add([indexMenuList]);
	},
	config: {
		useTitleForBackButtonText: true,
		navigationBar: false
	},
	onIndexMenuListItemtap: function(list, index, target, record, e, eOpts) {
		this.fireEvent('menuCommand', this, record);
	}
});