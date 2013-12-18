Ext.define('LCTY.default.Highstock', {
	
	extend: 'Ext.Container',
	requires: ["Ext.TitleBar"],
	style: {
		"background": '#fff'
	},
	
	initialize: function() {
		this.on("show", this.onShow, this);
		
		var title = this.getTitle(), tbar = this.getTbar();
		
		if (this.getIsHaveBack()) {
			var text = this.getUseTitleForBackButtonText() ? this.getLastTitle() : this.getDefaultBackButtonText();
			tbar.push({
				xtype: "button",
				text: text,
				ui: 'back',
				scope: this,
				handler: function() {
					this.getBackFn().call(this, this);
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
		this.callParent(arguments);
	},
	
	config: {
		/**
		 * highstock配置
		 * 
		 * @default null
		 * @type Object
		 */
		highstockConfig: null,
		loadingText: "正在加载中,请稍后......",
		defaultBackButtonText: "返回",
		lastTitle: '',
		useTitleForBackButtonText: false,
		tbar: [],
		title: null,
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
		 * 加载数据的url
		 * 
		 * @type String
		 */
		url: null,
		/**
		 * 加载数据时的参数
		 * 
		 * @type
		 */
		params: {},
		items: [{
			xtype: "container",
			itemId: "center",
			top: '3%',
			left: Ext.filterPlatform('ie10') ? 0 : '3%',
			right: Ext.filterPlatform('ie10') ? 0 : '3%',
			bottom: '3%'
		}],
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
		layout: {
			type: 'fit'
		}
	},
	// private
	onShow: function() {
		var me = this, el, config, id = me.down("#center").id;
		el = Ext.fly(id);
		if (el && el.getWidth() != 0 && !this.chart) {
			// Create a new chart
			config = me.getHighstockConfig();
			if (config) {
				Ext.apply(config, {
					credits: {
						enabled: false
					}
				});
				if (config.chart) {
					Ext.apply(config.chart, {
						renderTo: id
					});
				} else {
					config.chart = {
						renderTo: id
						// 指向的div的id属性
					}
				}
			}
			if (this.getUrl()) {
				Ext.Ajax.request({
					url: this.getUrl(),
					params: this.getParams(),
					success: function(response, opts) {
						var json = Ext.decode(response.responseText);
						for (var i = 0; i < config.series.length; i++) {
							var serie = config.series[i], data = serie.data || [];
							for (var j = 0; j < json.length; j++) {
								data.push([parseFloat(json[j].tim), parseFloat(json[j].value)]);
							}
							serie.data = data;
						}
						this.series = config.series;
						this.chart = new Highcharts.StockChart(config);
					}
				});
			} else {
				this.series = config.series;
				this.chart = new Highcharts.StockChart(config);
			}
		}
	},
	visible: function(visible, index, redraw) {
		var series = this.chart.series;
		if (series && series[index]) {
			if (redraw === false) {
				series[index].setVisible(visible, redraw);
			} else {
				series[index].setVisible(visible);
			}
			return true;
		}
		return false;
	},
	addSeries: function(options, redraw, animation) {
		if (this.chart) {
			this.chart.addSeries(options, redraw, animation);
		}
	},
	redraw: function() {
		if (this.chart) {
			this.chart.redraw();
		}
	},
	putData: function(dataArr) {
		if (this.series) {}
	}
});