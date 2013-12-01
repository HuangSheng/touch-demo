Ext.define('LCTY.view.Main', {
	extend: 'Ext.tab.Panel',
	xtype: 'main',
	requires: ['Ext.TitleBar', 'Ext.Video'],
	config: {
		tabBarPosition: 'bottom',
		items: [{
			iconCls: 'home',
			title: '生产信息',
			xtype: 'indexMain'
		}, {
			title: '管理信息',
			iconCls: 'home',
			
			styleHtmlContent: true,
			scrollable: true,
			
			items: {
				docked: 'top',
				xtype: 'titlebar',
				title: '管理信息'
			},
			
			html: ["You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ", "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ", "and refresh to change what's rendered here."]
					.join("")
		}, {
			title: '办公信息',
			iconCls: 'action',
			
			styleHtmlContent: true,
			scrollable: true,
			
			items: {
				docked: 'top',
				xtype: 'titlebar',
				title: '管理信息'
			},
			
			html: ["You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ", "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ", "and refresh to change what's rendered here."]
					.join("")
		}]
	}
});
