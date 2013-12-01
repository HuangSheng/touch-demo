Ext.define("LCTY.default.DefaultList", {
	extend: "Ext.dataview.List",
	alias: "widget.defaultList",
	requires: ["Ext.plugin.ListPaging", "Ext.TitleBar"],
	initialize: function() {
		
		if (this.getIsHavePage()) {
			var plugins = this.getPlugins(), plugs = [], i = 0;
			
			plugs.push({
				xclass: 'Ext.plugin.ListPaging',
				loadMoreText: '加载更多...',
				noMoreRecordsText: '全部加载完毕',
				autoPaging: true
			});
			
			if (plugins) {
				for (; i < plugins.length; i++) {
					plugs.push(plugins[i].config);
				}
			}
			
			this.setPlugins(plugs);
		}
		
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
			this.add( [{
				xtype: 'titlebar',
				title: title,
				docked: 'top',
				ui: 'dark',
				items: tbar
			}]);
		}
		
		if (this.getIsAutoLoad()) {
			this.getStore().load();
		}
		this.callParent(arguments);
	},
	config: {
		scrollable: 'vertical',
		emptyText: '<div class="notes-list-empty-text">未有可查阅的数据</div>',
		defaultBackButtonText: "返回",
		lastTitle: '',
		useTitleForBackButtonText: false,
		tbar: [],
		title: null,
		grouped: true,
		/**
		 * 是否翻页
		 * 
		 * @type Boolean
		 */
		isHavePage: true,
		/**
		 * 是否自动加载列表数据
		 * 
		 * @type Boolean
		 */
		isAutoLoad: true,
		/**
		 * 返回按钮,适用于navigationview
		 * 
		 * @type Boolean
		 */
		isHaveBack: false,
		loadingText: "正在加载中,请稍后......"
	}
});