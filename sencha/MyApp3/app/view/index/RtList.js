Ext.define("LCTY.view.index.RtList", {
	extend: "LCTY.default.DefaultList",
	alias: "widget.rtList",
	initialize: function() {
		this.on("itemtap", this.onRtListItemtap, this);
		this.callParent(arguments);
	},
	config: {
		title: '实时数据列表',
		itemHeight: 65,
		grouped: false,
		itemTpl: ['<h3>{title}</h3>'],
		isHavePage: false,
		isHaveBack: true,
		store: "RtList"
	},
	onRtListItemtap: function(list, index, target, record, e, eOpts) {
		this.fireEvent('rtListCommand', this, record);
	}
	
});