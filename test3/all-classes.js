/*
Copyright(c) 2012 Company Name
*/
Ext.define("NotesApp.model.Note", {
	extend: "Ext.data.Model",
	config: {
		idProperty: 'id',
		fields: [{
			name: 'id',
			type: 'int'
		}, {
			name: 'dateCreated',
			type: 'date',
			dateFormat: 'c'
		}, {
			name: 'title',
			type: 'string'
		}, {
			name: 'narrative',
			type: 'string'
		}],
		validations: [{
			type: 'presence',
			field: 'id'
		}, {
			type: 'presence',
			field: 'dateCreated'
		}, {
			type: 'presence',
			field: 'title',
			message: 'Please enter a title for this note.'
		}]
	}
});
Ext.define("NotesApp.view.NotesList", {
	extend: "Ext.dataview.List",
	alias: "widget.noteslist",
	config: {
		scrollable: 'vertical'
	},
	config: {
		loadingText: "Loading Notes...",
		itemHeight: 65,
		emptyText: ['</pre>', '<div class="notes-list-empty-text">No notes found.</div>', '<pre>'],
		// onItemDisclosure: true,// 开启disclose事件
		grouped: true,
		plugins: [{
			xclass: 'Ext.plugin.PullRefresh'
		}],
		itemTpl: ['</pre>',// 子项样式
		'<div class="list-item-title">{title}</div>',// 标题栏样式
		'<div class="list-item-narrative">{narrative}</div>',// 叙述栏样式
		'<pre>']
	}
});
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
Ext.define("NotesApp.view.NoteEditor", {
	extend: "Ext.form.Panel",
	requires: "Ext.form.FieldSet",
	alias: "widget.noteeditor",
	config: {
		scrollable: 'vertical'
	},
	initialize: function() {
		this.callParent(arguments);
		var backButton = {
			xtype: "button",
			ui: "back",
			text: "Home",
			handler: this.onBackButtonTap,
			scope: this
		};
		var saveButton = {
			xtype: "button",
			ui: "action",
			text: "Save",
			handler: this.onSaveButtonTap,
			scope: this
		};
		var topToolbar = {
			xtype: "toolbar",
			docked: "top",
			title: "Edit Note",
			items: [backButton, {
				xtype: "spacer"
			}, saveButton]
		};
		var deleteButton = {
			xtype: "button",
			iconCls: "trash",
			iconMask: true,
			handler: this.onDeleteButtonTap,
			scope: this
		};
		var bottomToolbar = {
			xtype: "toolbar",
			docked: "bottom",
			items: [deleteButton]
		};
		var noteTitleEditor = {
			xtype: 'textfield',
			name: 'title',
			label: 'Title',
			required: true
		};
		var noteNarrativeEditor = {
			xtype: 'textareafield',
			name: 'narrative',
			label: 'Narrative'
		};
		this.add([topToolbar, {
			xtype: "fieldset",
			items: [noteTitleEditor, noteNarrativeEditor]
		}, bottomToolbar]);
	},
	onSaveButtonTap: function() {
		// console.log("saveNoteCommand");
		this.fireEvent("saveNoteCommand", this);
	},
	onDeleteButtonTap: function() {
		// console.log("deleteNoteCommand");
		this.fireEvent("deleteNoteCommand", this);
	},
	onBackButtonTap: function() {
		// console.log("backToHomeCommand");
		this.fireEvent("backToHomeCommand", this);
	}
});
Ext.define("NotesApp.controller.Notes", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			// We're going to lookup our views by xtype.
			notesListContainer: "noteslistcontainer",
			noteEditor: "noteeditor"
		},
		control: {
			notesListContainer: {
				// The commands fired by the notes list container.
				newNoteCommand: "onNewNoteCommand",
				editNoteCommand: "onEditNoteCommand"
			},
			noteEditor: {
				// The commands fired by the note editor.
				saveNoteCommand: "onSaveNoteCommand",
				deleteNoteCommand: "onDeleteNoteCommand",
				backToHomeCommand: "onBackToHomeCommand"
			}
		}
	},
	// Commands.
	onNewNoteCommand: function() {
		// console.log("onNewNoteCommand");
		// 给note设置一个id
		var now = new Date();
		var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
		// 创建一个新的note实例
		var newNote = Ext.create("NotesApp.model.Note", {
			// id: noteId,
			dateCreated: now,
			title: "",
			narrative: ""
		});
		// 激活NoteEditor按钮
		this.activateNoteEditor(newNote);
	},
	onEditNoteCommand: function(list, record) {
		// console.log("onEditNoteCommand");
		this.activateNoteEditor(record);
	},
	onSaveNoteCommand: function() {
		// console.log("onSaveNoteCommand");
		var noteEditor = this.getNoteEditor();
		var currentNote = noteEditor.getRecord();
		var newValues = noteEditor.getValues();
		// Update the current note's fields with form values.
		currentNote.set("title", newValues.title);
		currentNote.set("narrative", newValues.narrative);
		var errors = currentNote.validate();
		if (!errors.isValid()) {
			Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
			currentNote.reject();
			return;
		}
		var notesStore = Ext.getStore("Notes");
		if (null == notesStore.findRecord('id', currentNote.data.id)) {
			notesStore.add(currentNote);
		}
		notesStore.sync();
		notesStore.sort([{
			property: 'dateCreated',
			direction: 'DESC'
		}]);
		this.activateNotesList();
	},
	onDeleteNoteCommand: function() {
		// console.log("onDeleteNoteCommand");
		var noteEditor = this.getNoteEditor();
		var currentNote = noteEditor.getRecord();
		var notesStore = Ext.getStore("Notes");
		notesStore.remove(currentNote);
		notesStore.sync();
		this.activateNotesList();
	},
	onBackToHomeCommand: function() {
		// console.log("onBackToHomeCommand");
		this.activateNotesList();
	},
	activateNotesList: function() {
		Ext.Viewport.animateActiveItem(this.getNotesListContainer(), this.slideRightTransition);
	},
	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	activateNoteEditor: function(record) {
		var noteEditor = this.getNoteEditor();// 前面已经refs，自动生成此方法
		noteEditor.setRecord(record); // load() is deprecated.
		Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
	},
	slideLeftTransition: {
		type: 'slide',
		direction: 'left'
	},
	slideRightTransition: {
		type: 'slide',
		direction: 'right'
	},
	// init and launch functions omitted.
	launch: function() {
		this.callParent(arguments);
		var notesStore = Ext.getStore("Notes");
		notesStore.load();
		// console.log("launch");
	},
	init: function() {
		this.callParent();
		// console.log("init");
	}
});
Ext.define("NotesApp.store.Notes", {
	extend: "Ext.data.Store",
	requires: "Ext.data.proxy.Sql",
	config: {
		model: "NotesApp.model.Note",
		proxy: {
			type: 'sql',
			database: "CountriesDB"
			// id: 'notes-app-store'
		},
		// data: [{
		// title: "Note 1",
		// narrative: "narrative 1"
		// }, {
		// title: "Note 2",
		// narrative: "narrative 2"
		// }, {
		// title: "Note 3",
		// narrative: "narrative 3"
		// }, {
		// title: "Note 4",
		// narrative: "narrative 4"
		// }, {
		// title: "Note 5",
		// narrative: "narrative 5"
		// }, {
		// title: "Note 6",
		// narrative: "narrative 6"
		// }],
		sorters: [{
			property: 'dateCreated',
			direction: 'DESC'
		}],
		grouper: {
			sortProperty: "dateCreated",
			direction: "DESC",
			groupFn: function(record) {
				if (record && record.data.dateCreated) {
					return record.data.dateCreated.toDateString();
				} else {
					return '';
				}
			}
		}
	}
});

