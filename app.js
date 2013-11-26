Ext.require("Ext.MessageBox");
Ext.application({
	name: 'PersonnelAttendanceSystem',
	useLoadMask: true,
	launch: function() {
		// get the configuration for the list
		var listConfiguration = this.getListConfiguration();
		// if the device is not a phone, we want to create a centered panel and put the list
		// into that
		Ext.Viewport.add(listConfiguration);
		// if (!Ext.os.is.Phone) {
		// // use Ext.Viewport.add to add a new component into the viewport
		// Ext.Viewport.add({
		// // give it an xtype of panel
		// xtype: 'panel',
		// // give it a fixed witdh and height
		// width: 350,
		// height: 370,
		// // make it centered
		// centered: true,
		// // make the component modal so there is a mask around the panel
		// //modal: true,
		// // set hideOnMaskTap to false so the panel does not hide when you tap on the mask
		// //hideOnMaskTap: false,
		// // give it a layout of fit so the list stretches to the size of this panel
		// layout: 'fit',
		// // insert the listConfiguration as an item into this panel
		// items: [listConfiguration]
		// });
		// } else {
		// // if we are a phone, simply add the list as an item to the viewport
		// Ext.Viewport.add(listConfiguration);
		// }
	},
	/**
	 * Returns a configuration object to be used when adding the list to the viewport.
	 */
	getListConfiguration: function() {
		// create a store instance
		var store = Ext.create('Ext.data.Store', {
			// give the store some fields
			fields: ['noteTitle', 'noteDes'],
			// filter the data using the firstName field
			sorters: [{
				property: "noteTitle",
				direction: "ASC"
			}],
			// autoload the data from the server
			autoLoad: true,
			// setup the grouping functionality to group by the first letter of the firstName field
			grouper: {
				groupFn: function(record) {
					return record.get('noteTitle');
				}
			},
			// setup the proxy for the store to use an ajax proxy and give it a url to load
			// the local contacts.json file
			proxy: {
				type: 'ajax',
				url: 'test.json',
				reader: Ext.create('Ext.data.reader.Json', {
					type: 'json',
					rootProperty: 'data',
					totalProperty: 'totalCount',
					successProperty: 'success'
				}),
				simpleSortMode: true
			}
		});
		return Ext.create('Ext.List', {
			fullscreen: true,
			itemTpl: '{noteTitle} {noteDes}',
			disclosure: true,
			// group the list
			grouped: true,
			// enable the indexBar
			// indexBar: {
			// listPrefix: '#',
			// listeners: {
			// index: function(inBar, html, target, eOpts) {
			// //console.log(inBar);
			// //console.log(html);
			// //console.log(target);
			// }
			// }
			// },
			infinite: true,
			useSimpleItems: true,
			variableHeights: true,
			striped: true,
			// ui: 'round',
			plugins: [{
				xclass: 'Ext.plugin.ListPaging',
				autoPaging: true
			}, {
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: '下拉可以更新',
				releaseRefreshText: '松开开始更新',
				loading: '正在刷新……',
				refreshFn: function(loaded, arguments) {
					console.log(loaded);
					loaded.getList().getStore().getProxy().setExtraParam('q', '参数'); // 设置proxy参数
					loaded.getList().getStore().loadPage(1, {
						callback: function(record, operation, success) {
							Ext.Viewport.unmask();
						},
						scope: this
					});
				}
			}],
			// set the function when a user taps on a disclsoure icon
			onItemDisclosure: function(record, item, index, e) {
				// show a messagebox alert which shows the persons firstName
				e.stopEvent();
				Ext.Msg.alert('Disclose', 'Disclose more info for ' + record.get('noteTitle'));
			},
			// bind the store to this list
			store: store,
			grouped: true,
			emptyText: '<div style="margin-top: 20px; text-align: center">No Matching Items</div>',
			disableSelection: true,
			items: [{
				xtype: 'toolbar',
				docked: 'top',
				items: [{
					xtype: 'spacer'
				}, {
					xtype: 'searchfield',
					placeHolder: 'Search...'
				}, {
					xtype: 'spacer'
				}]
			}]
		});
	}
})