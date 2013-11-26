Ext.data.JsonP.tabs({"guide":"<h1 id='tabs-section-using-tabpanels-in-sencha-touch'>Using TabPanels in Sencha Touch</h1>\n\n<p><a href=\"#!/video/list\">Watch the Tabs and Toolbars video</a></p>\n\n<p><a href=\"#!/api/Ext.tab.Panel\" rel=\"Ext.tab.Panel\" class=\"docClass\">Tab Panels</a> enable users to switch between several pages that are displayed full screen. Each Component in the Tab Panel gets its own Tab, which shows the Component when tapped on. Tabs can be positioned at the top or the bottom of the Tab Panel, and can optionally accept title and icon configurations.</p>\n\n<p>The following code sample shows you how to set up a simple Tab Panel with tabs at the bottom. Use the controls at the top left of the example to toggle between code mode and live preview mode (you can also edit the code and see your changes in the live preview mode):</p>\n\n<pre class='inline-example miniphone preview'><code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.tab.Panel\" rel=\"Ext.tab.Panel\" class=\"docClass\">Ext.TabPanel</a>', {\n    fullscreen: true,\n    tabBarPosition: 'bottom',\n\n    defaults: {\n        styleHtmlContent: true\n    },\n\n    items: [\n        {\n            title: 'Home',\n            iconCls: 'home',\n            html: 'Home Screen'\n        },\n        {\n            title: 'Contact',\n            iconCls: 'user',\n            html: 'Contact Screen'\n        }\n    ]\n});\n</code></pre>\n\n<p>In this example, a tab was created for each of the <a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">panels</a> defined in the items array. Each tab automatically uses the title and icon defined on the item configuration, and switches to that item when tapped on. You can also position the tab bar at the top, which changes the Tab Panel example as follows:</p>\n\n<pre class='inline-example miniphone preview'><code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.tab.Panel\" rel=\"Ext.tab.Panel\" class=\"docClass\">Ext.TabPanel</a>', {\n    fullscreen: true,\n\n    defaults: {\n        styleHtmlContent: true\n    },\n\n    items: [\n        {\n            title: 'Home',\n            html: 'Home Screen'\n        },\n        {\n            title: 'Contact',\n            html: 'Contact Screen'\n        }\n    ]\n});\n</code></pre>\n\n<h2 id='tabs-section-animations'>Animations</h2>\n\n<p>Tab Panels have a default slide animation, so when you tap on a tab it slides the new item into view. Since TabPanel uses a <a href=\"#!/api/Ext.layout.Card\" rel=\"Ext.layout.Card\" class=\"docClass\">Card Layout</a> internally, you can change this animation by specifying the layout's animation configuration - in this case to use 'fade':</p>\n\n<pre class='inline-example miniphone preview'><code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.tab.Panel\" rel=\"Ext.tab.Panel\" class=\"docClass\">Ext.TabPanel</a>', {\n    fullscreen: true,\n\n    defaults: {\n        styleHtmlContent: true\n    },\n\n    layout: {\n        type: 'card',\n        animation: {\n            type: 'fade'\n        }\n    },\n\n    items: [\n        {\n            title: 'Home',\n            html: 'Home Screen'\n        },\n        {\n            title: 'Contact',\n            html: 'Contact Screen'\n        }\n    ]\n});\n</code></pre>\n","title":"Using TabPanel"});