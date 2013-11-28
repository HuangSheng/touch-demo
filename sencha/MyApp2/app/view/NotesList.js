Ext.define("NotesApp.view.NotesList", {
	extend: "NotesApp.default.DefaultList",
	alias: "widget.noteslist",
	requires: ["Ext.plugin.PullRefresh"],
	initialize: function() {
		this.callParent(arguments);
	},
	config: {
		plugins: [{
			xclass: 'Ext.plugin.PullRefresh',
			// onLatestFetched: function(operation) {
			// var list = this.getList(), store = list.getStore(), scroller = list.getScrollable().getScroller(), scrollerOffsetX = scroller.position.x, scrollerOffsetY = scroller.position.y;
			// // list.serverStore.load({
			// // callback: function(records, operation, success) {
			// // // the operation object contains all of the details of the load operation
			// // console.log(records);
			// // },
			// // scope: this
			// // });
			// // store.fireEvent('load', store, null, null, operation);
			// // store.insert(0, toInsert);
			// scroller.scrollTo(scrollerOffsetX, scrollerOffsetY);
			//				
			// this.setViewState('loaded');
			// this.fireEvent('latestfetched');
			// if (this.getAutoSnapBack()) {
			// this.snapBack();
			// }
			// },
			listeners: {
				latestfetched: function(eOpts) {
					// console.log(this);
				}
			}
		}],
		itemHeight: 65,
		emptyText: ['</pre>', '<div class="notes-list-empty-text">No notes found.</div>', '<pre>'],
		onItemDisclosure: true,// 开启disclose事件
		grouped: false,
		itemTpl: ['</pre>',// 子项样式
		'<div class="list-item-title">{title}</div>',// 标题栏样式
		'<div class="list-item-narrative">{narrative}</div>',// 叙述栏样式
		'<pre>'],
		store: "NotesList"
	}
	
});