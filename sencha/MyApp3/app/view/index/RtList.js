Ext.define("LCTY.view.index.RtList", {
	extend: "LCTY.default.DefaultList",
	alias: "widget.rtList",
	initialize: function() {
		this.on("itemtap", this.onRtListItemtap, this);
		this.callParent(arguments);
	},
	config: {
		title: '实时数据列表',
		itemHeight: 65,
		grouped: false,
		itemTpl: ['<h3>{title}</h3>'],
		isHavePage: false,
		isHaveBack: true,
		store: "RtList",
		searchItems: [{
			xtype: 'textfield',
			name: 'infoNo',
			label: '日期'
		}, {
			xtype: 'textareafield',
			name: 'infoDesc',
			label: '描述'
		}, {
			xtype: 'textfield',
			name: 'infoAddr',
			label: '位置'
		}],
		searchFn: function(list) {
			var me = this;
			if (!me.searchForm || !me.searchForm.element) {
				this.searchForm = Ext.Viewport.add({
					xtype: 'defaultForm',
					title: '查询条件',
					scrollable: true,
					modal: true,
					hideOnMaskTap: true,
					showAnimation: {
						type: 'popIn',
						duration: 250,
						easing: 'ease-out'
					},
					hideAnimation: {
						type: 'popOut',
						duration: 250,
						easing: 'ease-out'
					},
					centered: true,
					top: '10%',
					left: Ext.filterPlatform('ie10') ? 0 : '10%',
					right: Ext.filterPlatform('ie10') ? 0 : '10%',
					bottom: '10%',
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
			}
			this.searchForm.show();
		}
	},
	onRtListItemtap: function(list, index, target, record, e, eOpts) {
		this.fireEvent('rtListCommand', this, record);
	}
	
});