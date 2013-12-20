Ext.define("LCTY.default.DefaultView", {
	extend: "Ext.Container",
	alias: "widget.defaultView",
	requires: ["Ext.TitleBar"],
	initialize: function() {
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
			Ext.create('Ext.navigation.Bar', {
				title: title,
				docked: 'top',
				ui: 'dark',
				view: '',
				items: tbar
			});
			this.add([{
				xtype: 'titlebar',
				title: title,
				docked: 'top',
				ui: 'dark',
				items: tbar
			}]);
		}
		this.callParent(arguments);
	},
	config: {
		tbar: [],
		title: null,
		view: null,
		lastTitle: '',
		useTitleForBackButtonText: false,
		defaultBackButtonText: "返回",
		defaultSearchButtonText: '查询',
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
		 * @default false
		 * @type Boolean
		 */
		isHaveSearch: false,
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
		searchFn: function(view) {
			this.defaultSearch(view);
		},
		layout: {
			type: 'fit'
		}
	},
	/**
	 * 默认查询按钮动作
	 */
	defaultSearch: function(view) {
		var me = this, parent = me.up();
		if (!me.searchForm || !me.searchForm.element) {
			parent.getLayout().setAnimation({
				type: 'flip'
			});
			me.searchForm = parent.push({
				xtype: 'defaultForm',
				isHaveBack: true,
				title: '查询条件',
				view: parent,
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