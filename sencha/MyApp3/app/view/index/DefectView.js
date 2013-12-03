Ext.define("LCTY.view.index.DefectView", {
	extend: "Ext.Container",
	alias: "widget.defectView",
	constructor: function(config) {
		config = config || {};
		var me = this;
		var defectDate = config.defectDate || me.defectDate;
		if (defectDate) {
			defectDate = Ext.Date.format(defectDate, "Y-m-d H:i:s");
		}
		config.data = {
			defectId: config.defectId || me.defectId,
			defectNo: config.defectNo || me.defectNo,
			defectTitle: config.defectTitle || me.defectTitle,
			defectDate: defectDate
		};
		this.callParent(arguments);
	},
	initialize: function() {
		this.callParent();
		
		this.element.on({
			scope: this,
			tap: 'onTap'
		});
	},
	config: {
		defectId: null,
		defectNo: null,
		defectTitle: null,
		defectDate: null,
		tpl: ['<div class="ui-content" role="main">', //
		'<ul class="ui-listview ui-listview-inset ui-corner-all ui-shadow">', // 
		'<li class="ui-li ui-li-static ui-body-d ui-corner-top">缺陷编号&nbsp;:&nbsp;{defectNo}</li>', // 
		'<li class="ui-li ui-li-static ui-body-d">责任部门&nbsp;:&nbsp;燃料检修分公司</li>', // 
		'<li class="ui-li ui-li-static ui-body-d">申请日期&nbsp;:&nbsp;{defectDate}</li>', // 
		'<li class="ui-li ui-li-static ui-body-d">缺陷等级&nbsp;:&nbsp;3级</li>', // 
		'<li class="ui-li ui-li-static ui-body-d">缺陷内容&nbsp;:&nbsp;{defectTitle}</li>', // 
		'<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-bottom ui-btn-up-d" style="height: 42px;">', // 
		'<div class="ui-btn-inner ui-li">', // 
		'<div class="ui-btn-text">', // 
		'<a class="ui-link-inherit" infoId="{defectId}">设备信息</a>', // 
		'</div>', // 
		'<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>', // 
		'</div>', // 
		'</li>', // 
		'</ul>', // 
		'</div>'],
		layout: {
			type: 'fit'
		}
	},
	onTap: function(e, target) {
		if (Ext.fly(target).hasCls('ui-link-inherit')) {
			this.fireEvent('defectViewCommand', this, e, target);
		}
	}
});