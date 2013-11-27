Ext.define("NotesApp.store.Notes", {
	extend: "Ext.data.Store",
	requires: ["Ext.data.proxy.Sql"],
	config: {
		model: "NotesApp.model.Note",
		proxy: {
			type: 'sql',
			database: "CountriesDB"
			// id: 'notes-app-store'
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