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
				text: text,
				ui: 'dark',
				align: 'right',
				scope: this,
				handler: function() {
					this.getSearchFn().call(this, this);
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
		loadingText: "正在加载中,请稍后......",
		defaultBackButtonText: "返回",
		defaultSearchButtonText: '查询',
		lastTitle: '',
		useTitleForBackButtonText: false,
		tbar: [],
		title: null,
		grouped: true,
		/**
		 * 列表携带的查询条件
		 * 
		 * @type Objcet
		 */
		params: {},
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
		 * 查询按钮
		 * 
		 * @type Boolean
		 */
		isHaveSearch: true,
		/**
		 * 查询集合
		 * 
		 * @type Array
		 */
		searchItems: [],
		/**
		 * 查询按钮动作
		 * 
		 * @type Function
		 */
		searchFn: function(list) {
			this.defaultSearch(list);
		}
	},
	load: function() {
		var newParams = this.getParams(), store = this.getStore(), params = store.getProxy().getExtraParams();
		Ext.apply(params, newParams);
		if (!this.getLoadingText()) {
			this.setLoadingText('正在加载中,请稍后......');
		}
		store.load();
	},
	/**
	 * 默认查询按钮动作
	 */
	defaultSearch: function(list) {
		var me = this, parent = me.up();
		if (!me.searchForm) {
			me.searchForm = parent.add({
				xtype: 'defaultForm',
				isHaveBack: true,
				title: '查询条件',
				scrollable: true,
				// modal: true,
				// hideOnMaskTap: true,
				// showAnimation: {
				// type: 'popIn',
				// duration: 250,
				// easing: 'ease-out'
				// },
				// hideAnimation: {
				// type: 'popOut',
				// duration: 250,
				// easing: 'ease-out'
				// },
				// centered: true,
				// top: '10%',
				// left: Ext.filterPlatform('ie10') ? 0 : '10%',
				// right: Ext.filterPlatform('ie10') ? 0 : '10%',
				// bottom: '10%',
				// styleHtmlContent: true,
				backHandler: function() {
					parent.animateActiveItem(me, {
						type: 'flip'
					});
				},
				items: [{
					xtype: "fieldset",
					items: me.getSearchItems()
				}],
				listeners: {
					hide: function() {
						console.log('hide');
						// Ext.apply(list.getParams(), this.getValues());
						// list.load();
					}
				}
			});
			// this.searchForm = Ext.Viewport.add();
		}
		// this.searchForm.show();
		parent.animateActiveItem(me.searchForm, {
			type: 'flip'
		});
	},
	destroy: function() {
		if (this.searchForm) {
			this.searchForm.destroy();
		}
		this.callParent(arguments);
	}
});