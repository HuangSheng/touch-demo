Ext.define('LCTY.view.index.ProductLog', {
	extend: 'LCTY.default.DefaultView',
	config: {
		title: '生产日报',
		isHaveBack: true,
		isHaveSearch: true,
		items: [{
			xtype: 'tabpanel',
			ui: 'light',
			tabBar: {
				// ui: 'light',
				layout: {
					pack: 'center'
				}
			},
			activeTab: 1,
			defaults: {
				scrollable: true
			},
			items: [{
				title: '运行',
				html: '运行',
				cls: 'card dark'
			}, {
				title: '生产',
				html: '生产',
				cls: 'card'
			}, {
				title: '电量',
				html: '<span class="action">电量</span>',
				cls: 'card dark'
			}, {
				title: '燃料',
				html: '<span class="action">燃料</span>',
				cls: 'card dark'
			}]
		}]
	}
});
