Ext.define("NotesApp.store.NotesList", {
	extend: "Ext.data.Store",
	requires: ["Ext.data.reader.Reader", "Ext.data.reader.Json", "Ext.data.ResultSet"],
	config: {
		model: "NotesApp.model.Note",
		proxy: {
			type: 'ajax',
			timeout: 180000,
			url: 'data/notes.json',
			reader: Ext.create('Ext.data.reader.Json', {
				type: 'json',
				root: 'data',
				totalProperty: 'totalCount',
				successProperty: 'success'
			})
		},
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