// <debug>
Ext.Loader.setPath({
	'Ext': 'touch/src',
	'LCTY': 'app'
});
// </debug>

Ext.application({
	
	name: "LCTY",
	controllers: ["index.IndexMenuList", "index.RtList", "index.DefectList"],
	models: ["index.IndexMenuList", "index.RtList", "index.DefectList"],
	stores: ["index.IndexMenuList", "index.RtList", "index.DefectList"],
	views: ["Main", "index.IndexMain", "index.IndexMenuList", "index.RtList", "index.DefectList", "index.DefectView"],
	// viewport: {
	// autoMaximize: true
	// },
	launch: function() {
		Ext.Date.defaultFormat = "Y-m-d";
		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();
		var main = {
			xtype: "main"
		}
		Ext.Viewport.add([main]);
		// var notesListContainer = Ext.create("LCTY.view.NotesListContainer");
		// Ext.Viewport.add(notesListContainer);
	}
});
