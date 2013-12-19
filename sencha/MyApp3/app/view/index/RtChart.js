Ext.define('LCTY.view.index.RtChart', {
	
	extend: 'LCTY.default.Highstock',
	
	requires: ["Ext.ux.DelayedTask"],
	
	initialize: function() {
		this.getHighstockConfig().title = {
			text: this.getRtInfoTitle()
		}
		this.callParent(arguments);
	},
	config: {
		rtInfoTitle: '',
		title: '曲线图',
		isHaveBack: true,
		url: 'data/index/highstock.json',
		series: [{
			name: "测点2",
			type: 'spline'
		}],
		highstockConfig: {
			chart: {
				// zoomType: 'xy',
				events: {
					load: function() {
						var series = this.series, cht = this, serie = series[0], me = Highcharts.StockChart.getHighstockClass();
						if (!me.task) {
							me.task = Ext.create('Ext.ux.DelayedTask', me.runningTask, me, [me.getParams(), cht, serie]);
						}
						me.task.delay(1000 * 10);
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
			series: [{
				name: "测点",
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
		},
		listeners: {
			destroy: function() {
				if (this.task) {
					this.task.cancel();
				}
			}
		}
	},
	runningTask: function(params, cht, serie) {
		var last = serie.options.data[serie.options.data.length - 1], totalDetails, values;
		serie.addPoint([last[0] + 1000 * 60, Math.random() * (295 - 285) + 285], false);
		// totalDetails = data.totalDetails[i];
		// values = data.values[i + 1];
		// for (var m = 0; m < totalDetails.length; m++) {
		// if (totalDetails[m][0] >= last[0] + 1000 * 60) {
		// serie.addPoint(totalDetails[m], false);
		// }
		// }
		cht.redraw();
		this.task.delay(this.task.getDelay());
	}
	
});