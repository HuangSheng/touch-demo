Ext.define("LCTY.default.DefaultList", {
	extend: "Ext.dataview.List",
	alias: "widget.defaultList",
	requires: ["Ext.plugin.ListPaging", "Ext.TitleBar", "LCTY.default.DefaultSearchForm"],
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
				ui: 'back',
				handler: function() {
					this.up("navigationview").pop();
				}
			});
		}
		if (this.getIsHaveSearch()) {
			var text = this.getDefaultSearchButtonText();
			tbar.push({
				xtype: 'button',
				text: '查询',
				ui: 'dark',
				align: 'right',
				scope: this,
				handler: function() {
					if (!this.searchWin) {
						this.searchWin = this.getSearchForm().call(this, this);
					}
					if (!this.searchWin.getParent()) {
						Ext.Viewport.add(this.searchWin);
					}
					this.searchWin.show();
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
		
		if (this.getIsAutoLoad()) {
			this.getStore().load();
		}
		this.callParent(arguments);
	},
	config: {
		scrollable: 'vertical',
		emptyText: '<div class="notes-list-empty-text">未有可查阅的数据</div>',
		defaultBackButtonText: "返回",
		defaultSearchButtonText: '查询',
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
		/**
		 * 列表查询按钮
		 * 
		 * @type Boolean
		 */
		isHaveSearch: true,
		loadingText: "正在加载中,请稍后......",
		/**
		 * 查询按钮点击事件
		 * 
		 * @type Function
		 */
		searchForm: function(list) {
			var searchItems = this.getSearchItems();
			searchItems = searchItems || [];
			var searchWin = Ext.create('LCTY.default.DefaultSearchForm', {
				title: '查询设置',
				items: [{
					xtype: "fieldset",
					items: searchItems
				}],
				listeners: {
					hide: function(panel, eOpts) {
						panel.defaultSearch(this);
					},
					scope: this
				}
			});
			return searchWin;
		},
		/**
		 * 查询窗口的items
		 * 
		 * @type Array
		 */
		searchItems: []
	},
	onBeforeLoad: function() {
		var loadingText = this.getLoadingText();
		// 增加默认loadingText
		if (!loadingText) {
			loadingText = '正在加载中,请稍后......';
		}
		if (this.isPainted()) {
			this.setMasked({
				xtype: 'loadmask',
				message: loadingText
			});
		}
		
		this.hideEmptyText();
	},
	destroy: function() {
		if (this.searchWin) {
			this.searchWin.destroy();
		}
		this.callParent(arguments);
	}
});