//<debug>
Ext.Loader.setPath({
    'Ext': '../Lib/src',
    'NotesApp': 'app'
});
//</debug>
Ext.application({
	name: "NotesApp",
	controllers: ["Notes"],
	models: ["Note"],
	stores: ["Notes"],
	views: ["NotesList", "NotesListContainer", "NoteEditor"],
	launch: function() {
		var notesListContainer = {
			xtype: "noteslistcontainer"
		};
		var noteEditor = {
			xtype: "noteeditor"
		};
		Ext.Viewport.add([notesListContainer, noteEditor]);
		// var notesListContainer = Ext.create("NotesApp.view.NotesListContainer");
		// Ext.Viewport.add(notesListContainer);
	}
});