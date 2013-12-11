Ext.define("LCTY.default.DefaultForm", {
	extend: "Ext.form.Panel",
	alias: "widget.defaultForm",
	requires: ["Ext.TitleBar"],
	initialize: function() {
		var title = this.getTitle(), tbar = this.getTbar();
		if (this.getIsHaveBack()) {
			var text = this.getUseTitleForBackButtonText() ? this.getLastTitle() : this.getDefaultBackButtonText(),
			// 返回按钮点击事件
			handler = Ext.Function.bind(this.getBackHandler() || function() {
				this.up("navigationview").pop();
			}, this.scope || this || Ext.global);
			tbar.push({
				xtype: "button",
				text: text,
				ui: 'back',
				scope: this,
				handler: handler
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
				show: {
					fn: this.onShow,
					scope: this,
					single: true
				}
			});
		}
		this.callParent(arguments);
	},
	config: {
		tbar: [],
		title: null,
		lastTitle: '',
		useTitleForBackButtonText: false,
		defaultBackButtonText: "返回",
		/**
		 * 返回按钮事件
		 * 
		 * @type Function
		 */
		backHandler: null,
		/**
		 * 返回按钮,适用于navigationview
		 * 
		 * @type Boolean
		 */
		isHaveBack: false,
		/**
		 * 是否自动加载
		 * 
		 * @type Boolean
		 */
		isAutoLoad: false,
		/**
		 * 加载时的请求参数
		 * 
		 * @type Object
		 */
		loadParams: null,
		/**
		 * 加载时的请求url
		 * 
		 * @type String
		 */
		loadUrl: null,
		/**
		 * 
		 * @type Function
		 * @param {}
		 *            form
		 * @param {}
		 *            response
		 */
		doSuccess: null,
		scrollable: 'vertical'
	},
	/**
	 * 从服务器读取数据
	 * 
	 * @param {}
	 *            option
	 */
	load: function(option) {
		option = option || {};
		var me = this;
		option.timeout = 180000;
		var doSuccess = Ext.Function.bind(option.success || Ext.emptyFn, option.scope || me.scope || Ext.global);
		option.success = function(response, options) {
			me.setMasked(false);
			var json = Ext.decode(response.responseText);
			if (json.success) {
				me.setValues(json.data);
			} else {
				console.log(json.msg);
			}
			doSuccess(me, response);
		};
		option.failure = function(response) {
			me.setMasked(false);
			console.log('链接服务器失败');
		}
		if (me.getMasked() == null) {
			me.setMasked({
				xtype: 'loadmask',
				message: '正在加载中，请稍后......'
			});
		} else {
			me.setMasked(true);
		}
		Ext.Ajax.request(option);
	},
	onShow: function() {
		var me = this;
		if (me.getLoadUrl()) {
			me.load({
				url: me.getLoadUrl(),
				params: me.getLoadParams(),
				success: me.getDoSuccess()
			});
		}
	}
});