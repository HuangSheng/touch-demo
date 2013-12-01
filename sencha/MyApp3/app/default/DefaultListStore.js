Ext.define("LCTY.default.DefaultListStore", {
	extend: "Ext.data.Store",
	requires: ["Ext.data.reader.Json", "Ext.data.ResultSet"],
	config: {
		url: null,
		remoteSort: true,
		remoteGroup: true,
		pageSize: 10
	},
	constructor: function(config) {
		config = config || {};
		var me = this;
		config.proxy = {
			type: 'ajax',
			timeout: 180000,
			url: me.config.url || me.url,
			reader: Ext.create('Ext.data.reader.Json', {
				type: 'json',
				rootProperty: 'data',
				totalProperty: 'totalCount',
				successProperty: 'success'
			}),
			simpleSortMode: true
		};
		this.callParent(arguments);
	}
});