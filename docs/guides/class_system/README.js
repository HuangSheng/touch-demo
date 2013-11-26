Ext.data.JsonP.class_system({"guide":"<h1 id='class_system-section-how-to-use-classes-in-sencha-touch'>How to Use Classes in Sencha Touch</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/class_system-section-dependencies-and-dynamic-loading'>Dependencies and Dynamic Loading</a></li>\n<li><a href='#!/guide/class_system-section-naming-conventions'>Naming Conventions</a></li>\n<li><a href='#!/guide/class_system-section-working-with-classes-in-sencha-touch-2'>Working with Classes in Sencha Touch 2</a></li>\n<li><a href='#!/guide/class_system-section-error-handling-and-debugging'>Error Handling and Debugging</a></li>\n<li><a href='#!/guide/class_system-section-further-reading'>Further Reading</a></li>\n</ol>\n</div>\n\n<p><a href=\"#!/video/class-system\">Watch the Class System video from SenchaCon 2011</a></p>\n\n<p>Sencha Touch uses the state-of-the-art class system developed for Ext JS 4. This class system makes it easy to create new classes in JavaScript, providing inheritance, dependency loading, mixins, powerful configuration options, and lots more.</p>\n\n<p>At its simplest, a class is just an object with some functions and properties attached to it. For instance, here is a class for an animal, recording its name and a function that makes it speak:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Animal', {\n    config: {\n        name: null\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n    },\n\n    speak: function() {\n        alert('grunt');\n    }\n});\n</code></pre>\n\n<p>This defines a class called <code>Animal</code>, where each animal can have a name and speak. To create a new instance of animal, we just use <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>:</p>\n\n<pre><code>var bob = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Animal', {\n    name: 'Bob'\n});\n\nbob.speak(); //alerts 'grunt'\n</code></pre>\n\n<p>We created an Animal called Bob and commanded it to speak. Now that we have created a class and instantiated it, we can start improving what we have. At the moment we do not know Bob's species, so let us clear that up with a <code>Human</code> subclass:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Human', {\n    extend: 'Animal',\n\n    speak: function() {\n        alert(this.getName());\n    }\n});\n</code></pre>\n\n<p>Now we have got a new class that inherits from Animal, therefore gaining all of its functions and configurations. We actually overrode the speak function because most humans are smart enough to say their name instead of grunt. Now, let us make Bob a human:</p>\n\n<pre><code>var bob = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Human', {\n    name: 'Bob'\n});\n\nbob.speak(); //alerts 'Bob'\n</code></pre>\n\n<p>In the previous example we used a magical function when adding the Human subclass. You will notice that we did not actually define a getName function for our Animal class, so where did it come from? Part of the class system is the ability to give classes configuration options, which each automatically give you the following functionality:</p>\n\n<ul>\n<li>a getter function that returns the current value, in this case <code>getName()</code>.</li>\n<li>a setter function that sets a new value, in this case <code>setName()</code>.</li>\n<li>an applier function called by the setter that lets you run a function when a configuration changes, in this case <code>applyName()</code>.</li>\n<li>an updater function called by the setter than runs when the value for a configuration changes, in this case <code>updateName()</code>.</li>\n</ul>\n\n\n<p>The getter and setter functions are generated for free and represent the recommended way to store data in a class. Every component in Sencha Touch uses the class system and the generated functions always follow the same pattern, so if you know a config, you already know how to get and set its value.</p>\n\n<p>This approach also makes your code cleaner. For example, if you wanted to always ask the user if he or she really wants to change Bob's name, you can just define an <code>applyName</code> function that will be called automatically:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Human', {\n    extend: 'Animal',\n\n    applyName: function(newName, oldName) {\n        return confirm('Are you sure you want to change name to ' + newName + '?')? newName : oldName;\n    }\n});\n</code></pre>\n\n<p>The previous code sample uses the browser's built in confirm function, which opens a dialog asking the user the question and offering \"Yes\" and \"No\" as answers. The applier functions allow you to cancel the name change if the confirm call returned false. As it happens, the confirm function returns either the new or old name, depending on whether the user clicks Yes or No.</p>\n\n<p>If we create a new Bob instance and try to change his name, but then click No when prompted, his name will not change after all:</p>\n\n<pre><code>var bob = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Human', {\n    name: 'Bob'\n});\n\nbob.setName('Fred'); //opens a confirm box, but we click No\n\nbob.speak(); //still alerts 'Bob'\n</code></pre>\n\n<p>The apply function is also a good place where to <em>transform</em> your value. Remember that whatever this returns, this will be the new value for this configuration. A good example of this would be to prepend a title to the name, as shown in the following code sample:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Human', {\n    extend: 'Animal',\n\n    applyName: function(newName, oldName) {\n        return 'Mr. ' + newName;\n    }\n});\n</code></pre>\n\n<p>Another config method is update. The update method (<code>updateName()</code> in this case) is only called when the value of the config <strong>changes</strong>. For example, given the following code, the <code>updateName()</code> will <em>not</em> be called:</p>\n\n<pre><code>var bob = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Human', {\n    name: 'Bob'\n});\n\nbob.setName('Bob'); // The name is the same, so update is not called\n</code></pre>\n\n<p>Consequently, when we use the update method, the config is changing. This function should be the place where you update your component, or do whatever you need to do when the value of your config changes. The following  example shows an <code>alert</code>:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Human', {\n    extend: 'Animal',\n\n    updateName: function(newName, oldName) {\n        alert('Name changed. New name is: ' + newName);\n    }\n});\n</code></pre>\n\n<p>Remember that the update and apply methods get called on component instantiation too, such that in the following example we would get two alerts:</p>\n\n<pre><code>// creating this will cause the name config to update, therefor causing the alert\nvar bob = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('Human', {\n    name: 'Bob'\n});\n\n// changing it will cause the alert to show again\nbob.setName('Ed');\n</code></pre>\n\n<p>We have basically already learned the following important behavior of classes:</p>\n\n<ul>\n<li>All classes are defined using <code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a></code>, including your own classes</li>\n<li>Most classes extend other classes, using the <code>extend</code> syntax</li>\n<li>Classes are created using <code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a></code>, for example <code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('SomeClass', {some: 'configuration'})</code></li>\n<li>Always use the <code>config</code> syntax to get automatic getters and setters and have a much cleaner codebase</li>\n</ul>\n\n\n<p>At this point you can already go about creating classes in your app, but the class system takes care of a few more things that will be helpful to learn.</p>\n\n<h2 id='class_system-section-dependencies-and-dynamic-loading'>Dependencies and Dynamic Loading</h2>\n\n<p>Most of the time, classes depend on other classes. The Human class described previously depends on the Animal class because it extends it - we depend on Animal being present to be able to define Human. Sometimes you make use of other classes inside a class, so you need to guarantee that those classes are on the page. This is accomplished using the <code>requires</code> syntax, as shown in the following code sample:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Human', {\n    extend: 'Animal',\n\n    requires: '<a href=\"#!/api/Ext.MessageBox\" rel=\"Ext.MessageBox\" class=\"docClass\">Ext.MessageBox</a>',\n\n    speak: function() {\n        <a href=\"#!/api/Ext.Msg-method-alert\" rel=\"Ext.Msg-method-alert\" class=\"docClass\">Ext.Msg.alert</a>(this.getName(), \"Speaks...\");\n    }\n});\n</code></pre>\n\n<p>When you create a class this way, Sencha Touch verifies if <code><a href=\"#!/api/Ext.MessageBox\" rel=\"Ext.MessageBox\" class=\"docClass\">Ext.MessageBox</a></code> is already loaded and if not, it immediately loads the required class file with AJAX.</p>\n\n<p><code><a href=\"#!/api/Ext.MessageBox\" rel=\"Ext.MessageBox\" class=\"docClass\">Ext.MessageBox</a></code> itself may also have classes it depends on, which are then also loaded automatically in the background. Once all the required classes are loaded, the Human class is defined and you can start using <code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a></code> to instantiate people. This works well in development mode, as it means you do not have to manage the loading of all your scripts yourself, but not as well in production, because loading files one by one over an internet connection is rather slow.</p>\n\n<p>In production, we want to load a single JavaScript file, ideally containing only the classes that our application actually uses. This is done in Sencha Touch using the JSBuilder tool, which analyzes your app and creates a single file build that contains all of your classes and only the framework classes your app actually uses. See the <a href=\"#!/guide/building\">Building guide</a> for details on how to use the JSBuilder.</p>\n\n<p>Each approach has its pros and cons, but can we have the good parts of both without the drawbacks, too? The answer is yes, and we have implemented the solution in Sencha Touch.</p>\n\n<h2 id='class_system-section-naming-conventions'>Naming Conventions</h2>\n\n<p>Using consistent naming conventions throughout your code base for classes, namespaces, and filenames helps keep your code organized, structured, and readable.</p>\n\n<h3 id='class_system-section-1%29-classes'>1) Classes</h3>\n\n<p>Class names may only contain <strong>alphanumeric</strong> characters. Numbers are permitted but are discouraged in most cases, unless they belong to a technical term. Do not use underscores, hyphens, or any other non-alphanumeric character. For example:</p>\n\n<ul>\n<li><code>MyCompany.useful_util.Debug_Toolbar</code> is discouraged</li>\n<li><code>MyCompany.util.Base64</code> is acceptable</li>\n</ul>\n\n\n<p>Where appropriate, class names should be grouped into packages and should be properly namespaced using the object property dot notation ( . ). At the minimum, there should be one unique top level namespace followed by the class name. For example:</p>\n\n<pre><code>MyCompany.data.CoolProxy\nMyCompany.Application\n</code></pre>\n\n<p>The top level namespaces and the actual class names should be in CamelCase, everything else should be all lower-cased. For example:</p>\n\n<pre><code>MyCompany.form.action.AutoLoad\n</code></pre>\n\n<p>Classes that are not distributed by Sencha should never use <code>Ext</code> as the top-level namespace.</p>\n\n<p>Acronyms should also follow the CamelCase convention, as illustrated by the following naming examples:</p>\n\n<ul>\n<li><code>Ext.data.JsonProxy</code> instead of <code>Ext.data.JSONProxy</code></li>\n<li><code>MyCompany.util.HtmlParser</code> instead of <code>MyCompary.parser.HTMLParser</code></li>\n<li><code>MyCompany.server.Http</code> instead of <code>MyCompany.server.HTTP</code></li>\n</ul>\n\n\n<h3 id='class_system-section-2%29-source-files'>2) Source Files</h3>\n\n<p>The names of the classes map directly to the file paths in which they are stored. As a result, there must only be one class per file. For example:</p>\n\n<ul>\n<li><code><a href=\"#!/api/Ext.mixin.Observable\" rel=\"Ext.mixin.Observable\" class=\"docClass\">Ext.mixin.Observable</a></code> is stored in <code>path/to/src/Ext/mixin/Observable.js</code></li>\n<li><code>Ext.form.action.Submit</code> is stored in <code>path/to/src/Ext/form/action/Submit.js</code></li>\n<li><code>MyCompany.chart.axis.Numeric</code> is stored in <code>path/to/src/MyCompany/chart/axis/Numeric.js</code></li>\n</ul>\n\n\n<p>where <code>path/to/src</code> is the directory of your application's classes. All classes should stay under this common root and should be properly namespaced for the best development, maintenance, and deployment experience.</p>\n\n<h3 id='class_system-section-3%29-methods-and-variables'>3) Methods and Variables</h3>\n\n<p>Similarly to class names, method and variable names may only contain <strong>alphanumeric</strong> characters. Numbers are permitted but are discouraged in most cases, unless they belong to a technical term. Do not use underscores, hyphens, or any other nonalphanumeric character.</p>\n\n<p>Method and variable names should always use CamelCase. This also applies to acronyms.</p>\n\n<p>Here are a few examples:</p>\n\n<ul>\n<li><p>Acceptable method names:</p>\n\n<pre><code>encodeUsingMd5()\ngetHtml() instead of getHTML()\ngetJsonResponse() instead of getJSONResponse()\nparseXmlContent() instead of parseXMLContent()\n</code></pre></li>\n<li><p>Acceptable variable names:</p>\n\n<pre><code>var isGoodName\nvar base64Encoder\nvar xmlReader\nvar httpServer\n</code></pre></li>\n</ul>\n\n\n<h3 id='class_system-section-4%29-properties'>4) Properties</h3>\n\n<p>Class property names follow the same convention as method and variable names, except the case when they are static constants. Static class properties that are constants should be all upper-cased, for example:</p>\n\n<ul>\n<li><code><a href=\"#!/api/Ext.MessageBox-static-property-YES\" rel=\"Ext.MessageBox-static-property-YES\" class=\"docClass\">Ext.MessageBox.YES</a> = \"Yes\"</code></li>\n<li><code><a href=\"#!/api/Ext.MessageBox-static-property-NO\" rel=\"Ext.MessageBox-static-property-NO\" class=\"docClass\">Ext.MessageBox.NO</a>  = \"No\"</code></li>\n<li><code>MyCompany.alien.Math.PI = \"4.13\"</code></li>\n</ul>\n\n\n<h2 id='class_system-section-working-with-classes-in-sencha-touch-2'>Working with Classes in Sencha Touch 2</h2>\n\n<h3 id='class_system-section-1.-declaration'>1. Declaration</h3>\n\n<h4 id='class_system-section-1.1.-the-old-way'>1.1. The Old Way</h4>\n\n<p>If you have developed apps with Sencha Touch 1.x, you are certainly familiar with the  <code><a href=\"#!/api/Ext-method-extend\" rel=\"Ext-method-extend\" class=\"docClass\">Ext.extend</a></code> function that creates a class:</p>\n\n<pre><code>var MyPanel = <a href=\"#!/api/Ext-method-extend\" rel=\"Ext-method-extend\" class=\"docClass\">Ext.extend</a>(Object, {\n    // ...\n});\n</code></pre>\n\n<p>This approach is easy to follow when creating a new class that inherits from another. Other than direct inheritance, however, there was not a fluent API for other aspects of class creation, such as configuration, statics, and mixins. We will be reviewing these items in detail shortly.</p>\n\n<p>Let us take a look at the following example:</p>\n\n<pre><code>My.cool.Panel = <a href=\"#!/api/Ext-method-extend\" rel=\"Ext-method-extend\" class=\"docClass\">Ext.extend</a>(<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>, {\n    // ...\n});\n</code></pre>\n\n<p>In this example we want to namespace our new class and make it extend from <code><a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a></code>. There are two concerns we need to address:</p>\n\n<ol>\n<li> <code>My.cool</code> needs to be an existing object before we can assign <code>Panel</code> as its property.</li>\n<li> <code><a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a></code> needs to exist or to be loaded on the page before it can be referenced.</li>\n</ol>\n\n\n<p>The first concern is usually solved by using <code><a href=\"#!/api/Ext-method-namespace\" rel=\"Ext-method-namespace\" class=\"docClass\">Ext.namespace</a></code> (aliased by <code><a href=\"#!/api/Ext-method-ns\" rel=\"Ext-method-ns\" class=\"docClass\">Ext.ns</a></code>). This method recursively traverses the object/property tree and creates them if they do not exist yet. The drawback is that you need to remember adding this function call above <code><a href=\"#!/api/Ext-method-extend\" rel=\"Ext-method-extend\" class=\"docClass\">Ext.extend</a></code> all the time, as shown in the following example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-ns\" rel=\"Ext-method-ns\" class=\"docClass\">Ext.ns</a>('My.cool');\nMy.cool.Panel = <a href=\"#!/api/Ext-method-extend\" rel=\"Ext-method-extend\" class=\"docClass\">Ext.extend</a>(<a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a>, {\n    // ...\n});\n</code></pre>\n\n<p>The second issue, however, is not easy to address because <code><a href=\"#!/api/Ext.Panel\" rel=\"Ext.Panel\" class=\"docClass\">Ext.Panel</a></code> might depend on many other classes that it directly or indirectly inherits from, and in turn, these dependencies might depend on other classes to exist. For that reason, applications written before Sencha Touch 2 usually include the whole library in the form of <code>ext-all.js</code>, even though they might only need a small portion of the framework.</p>\n\n<h4 id='class_system-section-1.2.-the-new-way'>1.2. The New Way</h4>\n\n<p>Sencha Touch 2 eliminates all these drawbacks with a single method you need to remember for class creation: <code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a></code>. Its basic syntax is as follows:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>(className, members, onClassCreated);\n</code></pre>\n\n<p>Let us look at each part of method call:</p>\n\n<ul>\n<li><code>className</code> is the class name</li>\n<li><code>members</code> is an object that represents a collection of class members in key-value pairs</li>\n<li><code>onClassCreated</code> is an optional function callback to be invoked when all dependencies of this class are ready, and when the class itself is fully created. Due to the <a href=\"#!/guide/class_system-section-%22%3Enew+asynchronous+nature%3C%2Fa%3E+of+class+creation%2C+this+callback+can+be+useful+in+many+situations.+These+will+be+discussed+further+in+%3Ca+href%3D\"#\">Section IV</a>.</li>\n</ul>\n\n\n<p><strong>Example</strong></p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.sample.Person', {\n    name: 'Unknown',\n\n    constructor: function(name) {\n        if (name) {\n            this.name = name;\n        }\n    },\n\n    eat: function(foodType) {\n        alert(this.name + \" is eating: \" + foodType);\n    }\n});\n\nvar aaron = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('My.sample.Person', 'Aaron');\naaron.eat(\"Salad\"); // alert(\"Aaron is eating: Salad\");\n</code></pre>\n\n<p>Note that we created a new instance of <code>My.sample.Person</code> using the <code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>()</code> method.  We could have used the <code>new</code> keyword (<code>new My.sample.Person()</code>). However it is recommended that you always use <code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a></code>, since it allows you to take advantage of dynamic loading. For more info on dynamic loading see the <a href=\"#/guide/getting_started\">Getting Started guide</a>.</p>\n\n<h3 id='class_system-section-2.-configuration'>2. Configuration</h3>\n\n<p>In Sencha Touch 2, we introduce a dedicated <code>config</code> property that is processed by the powerful <code><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></code> preprocessors before the class is created. The <code>config</code> features include the following:</p>\n\n<ul>\n<li>Configurations are completely encapsulated from other class members.</li>\n<li>Getter and setter functions, methods for every config property are automatically generated into the class prototype during class creation, if the class does not have these methods already defined.</li>\n<li><p>An <code>apply</code> method is also generated for every config property.  The auto-generated setter method calls the <code>apply</code> method internally before setting the value.  Override the <code>apply</code> method for a config property if you need to run custom logic before setting the value. If <code>apply</code> method does not return a value, then the setter will not set the value. For an example see the following <code>applyTitle</code> code sample:</p>\n\n<p> <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.own.Window', {</p>\n\n<pre><code> /** @readonly */\n isWindow: true,\n\n config: {\n     title: 'Title Here',\n\n     bottomBar: {\n         enabled: true,\n         height: 50,\n         resizable: false\n     }\n },\n\n constructor: function(config) {\n     this.initConfig(config);\n },\n\n applyTitle: function(title) {\n     if (!<a href=\"#!/api/Ext-method-isString\" rel=\"Ext-method-isString\" class=\"docClass\">Ext.isString</a>(title) || title.length === 0) {\n         console.log('Error: Title must be a valid non-empty string');\n     }\n     else {\n         return title;\n     }\n },\n\n applyBottomBar: function(bottomBar) {\n     if (bottomBar &amp;&amp; bottomBar.enabled) {\n         if (!this.bottomBar) {\n             return <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('My.own.WindowBottomBar', bottomBar);\n         }\n         else {\n             this.bottomBar.setConfig(bottomBar);\n         }\n     }\n }\n</code></pre>\n\n<p> });</p></li>\n</ul>\n\n\n<p>The following code illustrates the use of the previously defined My.own.Window class:</p>\n\n<pre><code>var myWindow = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('My.own.Window', {\n    title: 'Hello World',\n    bottomBar: {\n        height: 60\n    }\n});\n\nconsole.log(myWindow.getTitle()); // logs \"Hello World\"\n\nmyWindow.setTitle('Something New');\nconsole.log(myWindow.getTitle()); // logs \"Something New\"\n\nmyWindow.setTitle(null); // logs \"Error: Title must be a valid non-empty string\"\n\nmyWindow.setBottomBar({ height: 100 }); // Bottom bar's height is changed to 100\n</code></pre>\n\n<h3 id='class_system-section-3.-statics'>3. Statics</h3>\n\n<p>Static members can be defined using the <code>statics</code> config, as shown in the followind example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Computer', {\n    statics: {\n        instanceCount: 0,\n        factory: function(brand) {\n            // 'this' in static methods refer to the class itself\n            return new this({brand: brand});\n        }\n    },\n\n    config: {\n        brand: null\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n\n        // the 'self' property of an instance refers to its class\n        this.self.instanceCount ++;\n    }\n});\n\nvar dellComputer = Computer.factory('Dell');\nvar appleComputer = Computer.factory('Mac');\n\nalert(appleComputer.getBrand()); // using the auto-generated getter to get the value of a config property. Alerts \"Mac\"\n\nalert(Computer.instanceCount); // Alerts \"2\"\n</code></pre>\n\n<h2 id='class_system-section-error-handling-and-debugging'>Error Handling and Debugging</h2>\n\n<p>Sencha Touch 2 includes some useful features that help you with debugging and error handling.</p>\n\n<p>You can use the <code><a href=\"#!/api/Ext-method-getDisplayName\" rel=\"Ext-method-getDisplayName\" class=\"docClass\">Ext.getDisplayName</a>()</code> call to get the display name of any method.  This is especially useful for throwing errors that have the class name and the method name in their description, as shown in the following code sample:</p>\n\n<pre><code>throw new Error('['+ <a href=\"#!/api/Ext-method-getDisplayName\" rel=\"Ext-method-getDisplayName\" class=\"docClass\">Ext.getDisplayName</a>(arguments.callee) +'] Some message here');\n</code></pre>\n\n<p>When an error is thrown in any method of any class defined using <code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>()</code>, you should see the method and class names in the call stack if you are using a WebKit based browser (Chrome or Safari). For example, here is what it would look like in Chrome:</p>\n\n<p><p class='screenshot'><img src='guides/class_system/call-stack.png' alt=''><span></span></p></p>\n\n<h2 id='class_system-section-further-reading'>Further Reading</h2>\n\n<p>Classes are only a part of the Sencha Touch 2 ecosystem. To understand more about the framework and how it works, we recommend reading the following guides:</p>\n\n<ul>\n<li><a href=\"#!/guide/components\">Components and Containers</a></li>\n<li><a href=\"#!/guide/data\">The Data Package</a></li>\n<li><a href=\"#!/guide/layouts\">The Layout System</a></li>\n<li><a href=\"#!/guide/getting_started\">Getting Started</a></li>\n</ul>\n\n","title":"The Class System"});