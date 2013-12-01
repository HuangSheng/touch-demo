Ext.define("LCTY.view.index.IndexMenuList", {
	extend: "LCTY.default.DefaultList",
	alias: "widget.indexMenuList",
	initialize: function() {
		this.callParent(arguments);
	},
	config: {
		title: '生产信息',
		itemHeight: 65,
		emptyText: '<div class="notes-list-empty-text">无菜单</div>',
		// onItemDisclosure: true,// 开启disclose事件
		grouped: false,
		// itemTpl: ['<a class="ui-link-inherit">', //
		// '<img src="{icon}" class="ui-li-thumb">',//
		// '<h3 class="ui-li-heading">{resourceName}</h3><p class="ui-li-desc">{resourceDesc}</p>',//
		// '</a>'],
		itemTpl: ['<span class="title">',//
		'<b class="{icon}"></b>{resourceName}', // 
		'</span>'],
		isHavePage: false,
		tbar: [{
			xtype: 'button',
			itemId: 'logout',
			text: '注销',
			ui: 'dark',
			align: 'right',
			handler: function() {
				console.log('logoutCommand');
				this.fireEvent('logoutCommand');
			}
		}],
		store: "IndexMenuList"
	}
	
});