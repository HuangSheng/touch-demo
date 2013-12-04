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
	icon: {
		'57': 'resources/icons/Icon.png',
		'72': 'resources/icons/Icon~ipad.png',
		'114': 'resources/icons/Icon@2x.png',
		'144': 'resources/icons/Icon~ipad@2x.png'
	},
	
	isIconPrecomposed: true,
	
	startupImage: {
		'320x460': 'resources/startup/320x460.jpg',
		'640x920': 'resources/startup/640x920.png',
		'768x1004': 'resources/startup/768x1004.png',
		'748x1024': 'resources/startup/748x1024.png',
		'1536x2008': 'resources/startup/1536x2008.png',
		'1496x2048': 'resources/startup/1496x2048.png'
	},
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
