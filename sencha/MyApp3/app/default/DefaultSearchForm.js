Ext.define('LCTY.default.DefaultSearchForm', {
	
	extend: 'Ext.form.Panel',
	alias: 'widget.searchform',
	initialize: function() {
		var title = this.getTitle(), tbar = this.getTbar();
		
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
		modal: true,
		hideOnMaskTap: true,
		top: '10%',
		left: Ext.filterPlatform('ie10') ? 0 : '10%',
		right: Ext.filterPlatform('ie10') ? 0 : '10%',
		bottom: '10%',
		scrollable: true,
		tbar: [],
		title: null
	},
	defaultSearch: function(list) {
		var newParams = this.getValues();
		var store = list.getStore();
		// list.resetPage();
		var params = store.getProxy().getExtraParams();
		Ext.apply(params, newParams);
		store.load();
	}
	
});
