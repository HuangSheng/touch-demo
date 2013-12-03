Ext.define("LCTY.default.DefaultView", {
	extend: "Ext.Container",
	alias: "widget.defaultView",
	requires: ["Ext.TitleBar"],
	initialize: function() {
		var title = this.getTitle(), tbar = this.getTbar();
		if (this.getIsHaveBack()) {
			var text = this.getUseTitleForBackButtonText() ? this.getLastTitle() : this.getDefaultBackButtonText();
			tbar.push({
				xtype: "button",
				text: text,
				ui: 'dark',
				handler: function() {
					this.up("navigationview").pop();
				}
			});
		}
		if (title || tbar.length > 0) {
			this.add([{
				xtype: 'titlebar',
				title: title,
				docked: 'top',
				ui: 'dark',
				items: tbar
			}]);
		}
		this.callParent(arguments);
	},
	config: {
		tbar: [],
		title: null,
		lastTitle: '',
		useTitleForBackButtonText: false,
		defaultBackButtonText: "返回",
		/**
		 * 返回按钮,适用于navigationview
		 * 
		 * @type Boolean
		 */
		isHaveBack: false,
		layout: {
			type: 'fit'
		}
	}
});