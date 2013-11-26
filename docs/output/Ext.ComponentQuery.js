Ext.data.JsonP.Ext_ComponentQuery({"parentMixins":[],"uses":["Ext.ComponentManager"],"html":"<div><pre class=\"hierarchy\"><h4>Uses</h4><div class='dependency'><a href='#!/api/Ext.ComponentManager' rel='Ext.ComponentManager' class='docClass'>Ext.ComponentManager</a></div><h4>Files</h4><div class='dependency'><a href='source/ComponentQuery.html#Ext-ComponentQuery' target='_blank'>ComponentQuery.js</a></div></pre><div class='doc-contents'><p>Provides searching of Components within <a href=\"#!/api/Ext.ComponentManager\" rel=\"Ext.ComponentManager\" class=\"docClass\">Ext.ComponentManager</a> (globally) or a specific\n<a href=\"#!/api/Ext.Container\" rel=\"Ext.Container\" class=\"docClass\">Ext.Container</a> on the document with a similar syntax to a CSS selector.</p>\n\n<p>Components can be retrieved by using their <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">xtype</a> with an optional '.' prefix</p>\n\n<ul>\n<li><code>component</code> or <code>.component</code></li>\n<li><code>gridpanel</code> or <code>.gridpanel</code></li>\n</ul>\n\n\n<p>An itemId or id must be prefixed with a #</p>\n\n<ul>\n<li><code>#myContainer</code></li>\n</ul>\n\n\n<p>Attributes must be wrapped in brackets</p>\n\n<ul>\n<li><code>component[autoScroll]</code></li>\n<li><code>panel[title=\"Test\"]</code></li>\n</ul>\n\n\n<p>Member expressions from candidate Components may be tested. If the expression returns a <em>truthy</em> value,\nthe candidate Component will be included in the query:</p>\n\n<pre><code>var disabledFields = myFormPanel.query(\"{isDisabled()}\");\n</code></pre>\n\n<p>Pseudo classes may be used to filter results in the same way as in <a href=\"#!/api/Ext.DomQuery\" rel=\"Ext.DomQuery\" class=\"docClass\">DomQuery</a>:</p>\n\n<pre><code>// Function receives array and returns a filtered array.\nExt.ComponentQuery.pseudos.invalid = function(items) {\n    var i = 0, l = items.length, c, result = [];\n    for (; i &lt; l; i++) {\n        if (!(c = items[i]).isValid()) {\n            result.push(c);\n        }\n    }\n    return result;\n};\n\nvar invalidFields = myFormPanel.query('field:invalid');\nif (invalidFields.length) {\n    invalidFields[0].getEl().scrollIntoView(myFormPanel.body);\n    for (var i = 0, l = invalidFields.length; i &lt; l; i++) {\n        invalidFields[i].getEl().frame(\"red\");\n    }\n}\n</code></pre>\n\n<p>Default pseudos include:</p>\n\n<ul>\n<li>not</li>\n</ul>\n\n\n<p>Queries return an array of components.\nHere are some example queries.</p>\n\n<pre><code>// retrieve all Ext.Panels in the document by xtype\nvar panelsArray = <a href=\"#!/api/Ext.ComponentQuery-method-query\" rel=\"Ext.ComponentQuery-method-query\" class=\"docClass\">Ext.ComponentQuery.query</a>('panel');\n\n// retrieve all Ext.Panels within the container with an id myCt\nvar panelsWithinmyCt = <a href=\"#!/api/Ext.ComponentQuery-method-query\" rel=\"Ext.ComponentQuery-method-query\" class=\"docClass\">Ext.ComponentQuery.query</a>('#myCt panel');\n\n// retrieve all direct children which are Ext.Panels within myCt\nvar directChildPanel = <a href=\"#!/api/Ext.ComponentQuery-method-query\" rel=\"Ext.ComponentQuery-method-query\" class=\"docClass\">Ext.ComponentQuery.query</a>('#myCt &gt; panel');\n\n// retrieve all grids and trees\nvar gridsAndTrees = <a href=\"#!/api/Ext.ComponentQuery-method-query\" rel=\"Ext.ComponentQuery-method-query\" class=\"docClass\">Ext.ComponentQuery.query</a>('gridpanel, treepanel');\n</code></pre>\n\n<p>For easy access to queries based from a particular Container see the <a href=\"#!/api/Ext.Container-method-query\" rel=\"Ext.Container-method-query\" class=\"docClass\">Ext.Container.query</a>,\n<a href=\"#!/api/Ext.Container-method-down\" rel=\"Ext.Container-method-down\" class=\"docClass\">Ext.Container.down</a> and <a href=\"#!/api/Ext.Container-method-child\" rel=\"Ext.Container-method-child\" class=\"docClass\">Ext.Container.child</a> methods. Also see\n<a href=\"#!/api/Ext.Component-method-up\" rel=\"Ext.Component-method-up\" class=\"docClass\">Ext.Component.up</a>.</p>\n        <p>Available since: <b>1.1.0</b></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-execute' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ComponentQuery'>Ext.ComponentQuery</span><br/><a href='source/ComponentQuery.html#Ext-ComponentQuery-method-execute' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ComponentQuery-method-execute' class='name expandable'>execute</a>( <span class='pre'>root</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Executes this Query upon the selected root. ...</div><div class='long'><p>Executes this Query upon the selected root.\nThe root provides the initial source of candidate Component matches which are progressively\nfiltered by iterating through this Query's operations cache.\nIf no root is provided, all registered Components are searched via the ComponentManager.\nroot may be a Container who's descendant Components are filtered\nroot may be a Component with an implementation of getRefItems which provides some nested Components such as the\ndocked items within a Panel.\nroot may be an array of candidate Components to filter using this Query.</p>\n        <p>Available since: <b>2.0.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>root</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-is' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ComponentQuery'>Ext.ComponentQuery</span><br/><a href='source/ComponentQuery.html#Ext-ComponentQuery-method-is' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ComponentQuery-method-is' class='name expandable'>is</a>( <span class='pre'>component, selector</span> ) : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Tests whether the passed Component matches the selector string. ...</div><div class='long'><p>Tests whether the passed Component matches the selector string.</p>\n        <p>Available since: <b>2.0.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>component</span> : <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a><div class='sub-desc'><p>The Component to test.</p>\n</div></li><li><span class='pre'>selector</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The selector string to test against.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><div class='sub-desc'><p><code>true</code> if the Component matches the selector.</p>\n</div></li></ul><h3 class='pa'>Fires</h3><ul></ul></div></div></div><div id='method-query' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ComponentQuery'>Ext.ComponentQuery</span><br/><a href='source/ComponentQuery.html#Ext-ComponentQuery-method-query' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ComponentQuery-method-query' class='name expandable'>query</a>( <span class='pre'>selector, root</span> ) : <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a>[]<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns an array of matched Components from within the passed root object. ...</div><div class='long'><p>Returns an array of matched Components from within the passed root object.</p>\n\n<p>This method filters returned Components in a similar way to how CSS selector based DOM\nqueries work using a textual selector string.</p>\n\n<p>See class summary for details.</p>\n        <p>Available since: <b>2.0.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>selector</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The selector string to filter returned Components</p>\n</div></li><li><span class='pre'>root</span> : <a href=\"#!/api/Ext.Container\" rel=\"Ext.Container\" class=\"docClass\">Ext.Container</a><div class='sub-desc'><p>The Container within which to perform the query.\nIf omitted, all Components within the document are included in the search.</p>\n\n<p>This parameter may also be an array of Components to filter according to the selector.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a>[]</span><div class='sub-desc'><p>The matched Components.</p>\n</div></li></ul><h3 class='pa'>Fires</h3><ul></ul></div></div></div></div></div></div></div>","alternateClassNames":[],"autodetected":{"uses":true,"alternateClassNames":true,"aliases":true,"members":true,"mixins":true,"code_type":true,"requires":true},"aliases":{},"members":[{"meta":{"private":true},"owner":"Ext.ComponentQuery","name":"execute","id":"method-execute","tagname":"method"},{"meta":{},"owner":"Ext.ComponentQuery","name":"is","id":"method-is","tagname":"method"},{"meta":{},"owner":"Ext.ComponentQuery","name":"query","id":"method-query","tagname":"method"}],"short_doc":"Provides searching of Components within Ext.ComponentManager (globally) or a specific\nExt.Container on the document w...","meta":{},"superclasses":[],"component":false,"mixins":[],"singleton":true,"extends":null,"name":"Ext.ComponentQuery","mixedInto":[],"subclasses":[],"id":"class-Ext.ComponentQuery","code_type":"ext_define","since":"1.1.0","requires":[],"files":[{"filename":"ComponentQuery.js","href":"ComponentQuery.html#Ext-ComponentQuery"}],"tagname":"class"});