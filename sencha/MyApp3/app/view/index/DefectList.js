Ext.define("LCTY.view.index.DefectList", {
	extend: "LCTY.default.DefaultList",
	alias: "widget.defectList",
	initialize: function() {
		this.on({
			itemtap: this.onDefectListItemtap,
			show: this.onShow,
			scope: this
		});
		console.log(this.getLastTitle());
		this.callParent(arguments);
	},
	config: {
		title: '缺陷数据列表',
		itemHeight: 65,
		// grouped: false,
		itemTpl: [// 子项样式
		'<div class="list-item-title">{defectTitle}</div>',// 标题栏样式
		'<div class="list-item-narrative">{[this.dateFmt(values.defectDate)]}</div>',// 日期样式
		{
			dateFmt: function(defectDate) {
				// return Ext.Date.format(defectDate, "Y-m-d");
				return defectDate.toLocaleDateString();
			}
		}],
		isHaveBack: true,
		searchItems: [{
			xtype: 'textfield',
			name: 'infoNo',
			label: '设备编码'
		}, {
			xtype: 'textareafield',
			name: 'infoDesc',
			label: '设备描述'
		}, {
			xtype: 'textfield',
			name: 'infoAddr',
			label: '位置'
		}],
		store: "DefectList"
	},
	onDefectListItemtap: function(list, index, target, record, e, eOpts) {
		this.fireEvent('defectListCommand', this, record);
	},
	onShow: function() {
		console.log(this.getLastTitle());
	}
	
});