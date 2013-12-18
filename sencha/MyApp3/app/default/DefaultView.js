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
				ui: 'back',
				scope: this,
				handler: function() {
					this.getBackFn().call(this, this);
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
		/**
		 * 返回按钮动作
		 * 
		 * @type Function
		 */
		backFn: function(list) {
			if (this.getBackNum() != null) {
				this.up("navigationview").pop(this.getBackNum());
			} else {
				this.up("navigationview").pop();
			}
		},
		/**
		 * 返回按钮到第几页 <br>
		 * <p>
		 * If a Number, the number of views you want to pop. <br>
		 * If a String, the pops to a matching component query. <br>
		 * If an Object, the pops to a matching view instance.
		 * </p>
		 * 
		 * @default null
		 * @type Mixed
		 */
		backNum: null,
		layout: {
			type: 'fit'
		}
	}
});