Ext.define("LCTY.view.index.InfoView", {
	extend: "LCTY.default.DefaultForm",
	requires: ["Ext.form.FieldSet", "Ext.field.TextArea", "Ext.field.Text"],
	alias: "widget.infoView",
	initialize: function() {
		this.callParent(arguments);
	},
	config: {
		items: [{
			xtype: "fieldset",
			items: [{
				xtype: 'textfield',
				name: 'infoNo',
				label: '设备编码',
				readOnly: true
				// required: true,
				// requiredCls: 'st-field-required'
			}, {
				xtype: 'textareafield',
				name: 'infoDesc',
				readOnly: true,
				label: '设备描述'
			}, {
				xtype: 'textfield',
				name: 'infoAddr',
				label: '位置',
				readOnly: true
				// required: true,
				// requiredCls: 'st-field-required'
			}]
		}]
	}
	
});