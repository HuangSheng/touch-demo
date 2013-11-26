Ext.define("NotesApp.view.NotesListContainer", {
	extend: "Ext.Container",
	alias: "widget.noteslistcontainer",
	initialize: function() {
		this.callParent(arguments);
		var newButton = {
			xtype: "button",
			text: 'New',
			ui: 'action',
			handler: this.onNewButtonTap,// this代表此类，也就是这个container扩展（子类）
			scope: this
		};
		var topToolbar = {
			xtype: "toolbar",
			title: 'My Notes',
			docked: "top",
			items: [{
				xtype: 'spacer'
			}, newButton]
		};
		
		var notesList = {
			xtype: "noteslist",
			store: Ext.getStore("Notes"),// has no method getStore
			listeners: {
				itemtap: {
					fn: this.onNoteListItemtap,
					scope: this
				}
			}
		};
		this.add([topToolbar, notesList]);
	},
	onNewButtonTap: function() {
		// console.log("newNoteCommand");
		this.fireEvent("newNoteCommand", this);
	},
	onNoteListItemtap: function(list, index, target, record, e, eOpts) {
		// console.log("editNoteCommand");
		this.fireEvent('editNoteCommand', this, record);
	},
	onNotesListDisclose: function(list, record, target, index, evt, options) {
		// console.log("editNoteCommand");
		this.fireEvent('editNoteCommand', this, record);
	},
	config: {// config不在指定items
		layout: {
			type: 'fit'
		}
	}
});