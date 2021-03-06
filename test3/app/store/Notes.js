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