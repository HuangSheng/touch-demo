Ext.require("Ext.MessageBox");
Ext.application({
	name: "PersonnelAttendanceSystem",
	launch: function() {
		var dockedItems = [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
				text: '退出',
				ui: 'back',
				handler: function() {}
			}, {
				xtype: 'spacer'
			}, {
				text: '注册',
				ui: 'action',
				handler: function() {}
			}]
		}];
		var mainPanel = Ext.create('Ext.Container', {
			fullscreen: true,
			layout: 'vbox',
			items: [{
				dockedItems: dockedItems
			}, {
				xtype: 'spacer'
			}, {
				xtype: 'panel',
				style: 'text-align:center;font-size: 24pt;',
				html: '人事考勤系统',
				id: 'form',
				flex: 2
			}, {
				xtype: 'panel',
				flex: 4,
				items: [{
					xtype: 'fieldset',
					items: [{
						xtype: 'emailfield',
						labelAlign: 'left',
						name: 'username',
						id: 'username',
						label: '用户名：',
						placeHolder: '输入用户名'
					}, {
						xtype: 'passwordfield',
						labelAlign: 'left',
						name: 'password',
						id: 'password',
						label: '密码：',
						placeHolder: '输入密码'
					}]
				}]
			}, {
				layout: 'hbox',
				items: [{
					xtype: 'button',
					name: 'login',
					id: 'login',
					text: '登录',
					style: 'margin-left:10px;',
					ui: 'action',
					width: 150,
					handler: function() {
						var usernameProxy = Ext.getCmp('username').getValue();
						var passwordProxy = Ext.getCmp('password').getValue();
						if (usernameProxy == '') {
							Ext.Msg.alert("错误信息", "用户名不能为空.");
						} else if (passwordProxy == '') {
							Ext.Msg.alert("错误信息", "密码不能为空.");
						}
					}
				}, {
					xtype: 'panel',
					style: 'margin-left:10px;padding-top:10px;',
					html: "<a href='#'>忘记密码?</a>"
				}]
			}, {
				xtype: 'spacer'
			}]
		});
		Ext.Viewport.add(mainPanel);
	}
});