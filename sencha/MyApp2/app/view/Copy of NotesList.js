Ext.define("NotesApp.view.NotesList", {
	extend: "Ext.dataview.List",
	alias: "widget.noteslist",
	requires: ["Ext.plugin.PullRefresh", "Ext.plugin.ListPaging"],
	config: {
		scrollable: 'vertical'
	},
	initialize: function() {
		this.setPlugins( [{
			xclass: 'Ext.plugin.PullRefresh'
		}, {
			xclass: 'Ext.plugin.ListPaging', // Reference plugin by class
			autoPaging: true
		}]);
		this.callParent(arguments);
	},
	config: {
		loadingText: "Loading Notes...",
		itemHeight: 65,
		emptyText: ['</pre>', '<div class="notes-list-empty-text">No notes found.</div>', '<pre>'],
		// onItemDisclosure: true,// 开启disclose事件
		grouped: true,
		
		itemTpl: ['</pre>',// 子项样式
		'<div class="list-item-title">{title}</div>',// 标题栏样式
		'<div class="list-item-narrative">{narrative}</div>',// 叙述栏样式
		'<pre>']
	}
});