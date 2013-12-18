Ext.define("LCTY.view.index.RtInfoList", {
	extend: "LCTY.default.DefaultList",
	alias: "widget.rtInfoList",
	initialize: function() {
		this.on("itemtap", this.onRtInfoListItemtap, this);
		this.callParent(arguments);
	},
	config: {
		title: '实时数据列表',
		itemHeight: 65,
		grouped: false,
		itemTpl: [// 子项样式
		'<div class="list-item-title">{rtInfoTitle}</div>',// 标题栏样式
		'<div class="list-item-narrative">',// 
		'<span style="color: red;">{rtInfoValue} {valueUnit}</span>&nbsp;&nbsp;{[this.dateFmt(values.rtInfoDate)]}', // 值及日期样式
		'</div>', //
		{
			dateFmt: function(rtInfoDate) {
				// return Ext.Date.format(defectDate, "Y-m-d");
				return rtInfoDate.toLocaleDateString();
			}
		}],
		isHaveBack: true,
		store: "RtInfoList",
		searchItems: [{
			xtype: 'textfield',
			name: 'infoNo',
			label: '日期'
		}]
	},
	onRtInfoListItemtap: function(list, index, target, record, e, eOpts) {
		this.fireEvent('rtInfoListCommand', this, record);
	}
	
});