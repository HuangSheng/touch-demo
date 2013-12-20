Ext.define("LCTY.default.DefaultList", {
	extend: "Ext.dataview.List",
	alias: "widget.defaultList",
	requires: ["Ext.plugin.ListPaging", "Ext.plugin.PullRefresh", "Ext.TitleBar"],
	initialize: function() {
		
		if (this.getIsHavePage() || this.getIsHaveReload()) {
			var plugins = this.getPlugins(), plugs = [], i = 0;
			if (this.getIsHavePage()) {
				
				plugs.push({
					xclass: 'Ext.plugin.ListPaging',
					loadMoreText: '上拉显示下10条',
					noMoreRecordsText: '全部加载完毕',
					autoPaging: true
				});
				
			}
			if (this.getIsHaveReload()) {
				plugs.push({
					xclass: 'Ext.plugin.PullRefresh',
					lastUpdatedText: '最后更新时间',
					pullRefreshText: '下拉刷新',
					loadingText: '正在加载中,请稍后......',
					loadedText: '加载完毕',
					releaseRefreshText: '释放刷新',
					lastUpdatedDateFormat: 'Y-m-d H:i:s'
				});
			}
			if (plugins) {
				console.log(plugins);
				for (; i < plugins.length; i++) {
					plugs.push(plugins[i].config);
				}
			}
			
			this.setPlugins(plugs);
		}
		
		var title = this.getTitle(), tbar = this.getTbar();
		
		if (this.getIsHaveBack()) {
			tbar.push({
				xtype: "button",
				text: this.getBackButtonText(),
				ui: 'back',
				scope: this,
				handler: function() {
					this.getBackFn().call(this, this);
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
			this.on({
				show: function() {
					this.load({}, true);
				},
				scope: this,
				single: true
			});
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
		view: null,
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
		 * 是否下拉刷新
		 * 
		 * @type Boolean
		 */
		isHaveReload: false,
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
		 * 返回按钮动作
		 * 
		 * @type Function
		 */
		backFn: function(list) {
			if (this.getBackNum() != null) {
				this.up("navigationview").pop(this.getBackNum());
			} else {
				this.up("navigationview").pop();
			}
		},
		/**
		 * 返回按钮到第几页 <br>
		 * <p>
		 * If a Number, the number of views you want to pop. <br>
		 * If a String, the pops to a matching component query. <br>
		 * If an Object, the pops to a matching view instance.
		 * </p>
		 * 
		 * @default null
		 * @type Mixed
		 */
		backNum: null,
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
	resetPage: function() {
		this.getStore().currentPage = 1;
	},
	load: function(obj, isResetPage) {
		var newParams = this.getParams(), store = this.getStore(), params = store.getProxy().getExtraParams();
		Ext.apply(params, newParams);
		if (!this.getLoadingText()) {
			this.setLoadingText('正在加载中,请稍后......');
		}
		if (isResetPage) {
			this.resetPage();
		}
		store.load(obj);
	},
	/**
	 * 默认查询按钮动作
	 */
	defaultSearch: function(list) {
		var me = this, parent = me.up();
		if (!me.searchForm || !me.searchForm.element) {
			parent.getLayout().setAnimation({
				type: 'flip'
			});
			me.searchForm = parent.push({
				xtype: 'defaultForm',
				isHaveBack: true,
				view: parent,
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
					parent.getLayout().setAnimation({
						duration: 300,
						easing: 'ease-out',
						type: 'slide',
						direction: 'left'
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
	},
	getBackButtonText: function() {
		var nBar = this.getView() ? this.getView().getNavigationBar() : null, text = nBar ? nBar.backButtonStack[nBar.backButtonStack.length - 1] : '', useTitle = this.getUseTitleForBackButtonText();
		if (!useTitle) {
			if (text) {
				text = this.getDefaultBackButtonText();
			}
		}
		return text;
	}
});