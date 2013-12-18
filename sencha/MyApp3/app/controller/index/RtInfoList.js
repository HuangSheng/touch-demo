Ext.define("LCTY.controller.index.RtInfoList", {
	extend: "Ext.app.Controller",
	
	requires: ['LCTY.default.Highstock'],
	config: {
		refs: {
			rtInfoList: "rtInfoList",
			indexMain: "indexMain"
		},
		control: {
			rtInfoList: {
				rtInfoListCommand: "onRtInfoListCommand"
			}
		}
	},
	onRtInfoListCommand: function(list, record) {
		var view = Ext.create("LCTY.default.Highstock", {
			title: '曲线图',
			isHaveBack: true,
			url: 'data/index/highstock.json',
			params: {
				rtInfoId: record.get("rtInfoId")
			},
			highstockConfig: {
				chart: {
					// zoomType: 'xy',
					events: {
						load: function() {
							var series = this.series, cht = this, serie = series[0];
							// console.log(serie);
							// me.times = 0;
							// me.task = Ext.TaskManager.start({
							// run: me.runningTask,
							// interval: 1000 * 120,
							// args: [shiftRuleId, cht, series],
							// scope: me
							// });
						}
					}
				},
				rangeSelector: {
					buttons: [],
					buttonTheme: {
						width: 45
					},
					inputEnabled: false,
					enabled: false,
					inputDateFormat: '%Y-%m-%d',
					selected: 0
				},
				title: {
					text: record.get("rtInfoTitle")
				},
				series: [{
					name: "测点:",
					type: 'spline'
				}],
				tooltip: {
					formatter: function() {
						var vDate = new Date(this.x);
						var vDate1 = new Date(new Date(this.x).getTime());
						var weekday = new Array(7);
						weekday[0] = "星期日";
						weekday[1] = "星期一";
						weekday[2] = "星期二";
						weekday[3] = "星期三";
						weekday[4] = "星期四";
						weekday[5] = "星期五";
						weekday[6] = "星期六";
						var s = '<span>' + weekday[vDate1.getDay()] + "," + Ext.Date.format(vDate1, "Y-m-d H:i") + '</span>';
						Ext.each(this.points, function(point) {
							s += '<br/><span style="color: ' + this.series.color + '">' + this.series.name + "</span>: <b>" + point.y + "</b>";
						});
						return s;
					}
				},
				navigator: {
					enabled: false
				},
				scrollbar: {
					enabled: false
				},
				legend: {
					enabled: false
				},
				exporting: {
					enabled: false
				},
				xAxis: {
					tickInterval: 1800 * 1000,
					// endOnTick: true,
					// startOnTick: true,
					tickPixelInterval: 100,
					labels: {
						formatter: function() {
							var vDate = new Date(this.value);
							return Ext.util.Format.date(vDate, "H:i");
						},
						align: 'center'
					}
				}
			}
		});
		this.getIndexMain().push(view);
	}
});