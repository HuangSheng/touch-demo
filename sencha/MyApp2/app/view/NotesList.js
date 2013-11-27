Ext.define("NotesApp.view.NotesList", {
	extend: "NotesApp.default.DefaultList",
	alias: "widget.noteslist",
	requires: ["Ext.plugin.PullRefresh"],
	initialize: function() {
		this.callParent(arguments);
	},
	config: {
		scrollable: 'vertical',
		plugins: [{
			xclass: 'Ext.plugin.PullRefresh'
		}],
		loadingText: "正在加载中,请稍后......",
		itemHeight: 65,
		emptyText: ['</pre>', '<div class="notes-list-empty-text">No notes found.</div>', '<pre>'],
		onItemDisclosure: true,// 开启disclose事件
		grouped: false,
		itemTpl: ['</pre>',// 子项样式
		'<div class="list-item-title">{title}</div>',// 标题栏样式
		'<div class="list-item-narrative">{narrative}</div>',// 叙述栏样式
		'<pre>'],
		store: "Notes"
	}
	
});