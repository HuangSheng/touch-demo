Ext.define("LCTY.controller.index.DefectList", {
	extend: "Ext.app.Controller",
	
	requires: ['LCTY.default.DefaultView', 'LCTY.view.index.InfoView'],
	config: {
		refs: {
			defectList: "defectList",
			indexMain: "indexMain",
			defectView: "defectView"
		},
		control: {
			defectList: {
				defectListCommand: "onDefectListCommand"
			},
			defectView: {
				defectViewCommand: "onTap"
			}
		}
	},
	onDefectListCommand: function(list, record) {
		var view = Ext.create('LCTY.default.DefaultView', {
			view: this.getIndexMain(),
			title: '缺陷数据',
			isHaveBack: true,
			backNum: 'defectList',
			items: [{
				xtype: 'defectView',
				defectId: record.get("defectId"),
				defectNo: record.get("defectNo"),
				defectTitle: record.get("defectTitle"),
				defectDate: record.get("defectDate")
			}]
		});
		this.getIndexMain().push(view);
	},
	onTap: function(v, e, target) {
		var view = Ext.create('LCTY.view.index.InfoView', {
			view: this.getIndexMain(),
			title: '设备信息',
			isHaveBack: true,
			isAutoLoad: true,
			loadParams: {
				id: Ext.fly(target).getAttribute('infoId')
			},
			loadUrl: 'data/index/infoView.json'
		});
		this.getIndexMain().push(view);
	}
});