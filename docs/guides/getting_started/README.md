# Getting Started with Sencha Touch

## What is Sencha Touch?

Sencha Touch is a high-performance HTML5 mobile application framework. You can use 
Sencha Touch to produce a native-app-like experience inside a browser or in a hybrid shell.
Sencha Touch supports Android, iOS, Windows Phone, Microsoft Surface Pro and RT, and BlackBerry devices.

## Required Software

<ol>
 <li><a href="http://www.sencha.com/products/sencha-cmd/download">Sencha Cmd</a>.</li>
 <li><a href="http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html">Java Runtime Environment</a> 
  version 1.7 (1.6 also works, but 1.7 is best). Sencha Cmd is written in Java and needs the JRE to run.</li>
 <li><a href="http://www.ruby-lang.org/en/downloads/">Ruby version 1.9.3</a> to create the 
 compiled CSS used by Touch.
		(Ruby version 2.0 doesn't work correctly with Sencha Cmd.)
		<ul>
		<li>Windows: Download Ruby 1.9.3.n from <a href="http://rubyinstaller.org/downloads/">rubyinstaller.org</a>. 
		Download the RubyInstaller .exe file and run it.</li>
		<li>Mac: Ruby is pre-installed. You can test which version 
		you have with the <b>ruby -v</b> command. If you have version 2.0, 
		download the <a href="https://rvm.io/">Ruby version manager</a> (rvm) and use this command to
		download and install Ruby:&nbsp;<b>rvm install 1.9.3 --with-gcc=clang</b><br>
		Set your PATH variable to point to the Ruby 1.9.3 install directory.</li>
 		<li>Ubuntu: Use <b>sudo apt-get install ruby1.9.3</b> to download and install Ruby 1.9.3.</li>
		</ul>
	</li>
	<li>For optimal debugging, use a modern web browser such as 
		<a href="https://www.google.com/intl/en/chrome/browser">Chrome</a> 
		or <a href="http://www.apple.com/safari/">Safari</a>.</li>
	<li>To view Sencha Cmd options after installing Sencha Cmd, type <b>sencha</b> from the command line:<br>
		Windows: Press the Windows&nbsp;key&nbsp;+&nbsp;<b>r</b> and type <b>cmd</b> to get a Command Prompt.<br>
		Mac: Open a Terminal from Finder, Go, Utilities, Terminal.<br>
		Ubuntu: Click the Ubuntu Dashboard and type <b>terminal</b> in the search box.<br></li>	
	<li>Create a project directory where you want to serve applications and ensure the directory is 
  writable:<br>
		Windows: Right-click the directory name, click <b>Properties</b>, and uncheck <b>Read-only</b> 
		on the General tab.<br>
		Mac or Ubuntu: Use <b>chmod o+w</b> <i>&lt;dir_name&gt;</i></li>	
	<li>Start the Sencha Cmd web server to serve the project directory: 
		<br><b>sencha fs web -port 8000 start -map</b> <i>&lt;dir_name&gt;</i><br> 
		(You can use any port number.) You can access the Sencha Cmd web server using: 
		<i>http://localhost:8000/&lt;dir_name&gt;/&lt;app_name&gt;</i></li>
</ol>

If you are running the IIS web server on Windows, manually add `application/x-json` 
as a MIME Type for Sencha Touch to work properly. For information on adding this MIME type 
see the following link: [http://stackoverflow.com/a/1121114/273985](http://stackoverflow.com/a/1121114/273985).

## Installing Sencha Touch

Extract the SDK zip file to your projects directory. Ideally, this folder is accessible 
to your HTTP server. For example, you should be able to navigate to the installed 
http://localhost/sencha-touch-2.n directory from your browser and see the Sencha Touch documentation.


## Generating Your First App

Now that you have Sencha Touch and Sencha Cmd installed, you can generate an application. 
While still in the Sencha Touch SDK folder, type the following:

    $ sencha generate app MyApp ../MyApp
    [INFO] Created file ...
    ...

This generates a skeleton Sencha Touch application namespaced to the `MyApp` variable 
and located in the `../MyApp` directory (one level up from the Sencha Touch SDK directory). 
The skeleton app contains all the files you need to create a Sencha Touch application, 
including the default index.html file, a copy of the Touch SDK, the CSS file, images 
and configuration files for creating native packages for your app.

You can verify if your application has generated successfully by opening it in a 
web browser. Assuming that you extracted the SDK to your webroot folder, you should 
be able to navigate to `http://localhost/MyApp`.

## Explore the Code

The following listing provides a short description of each file and directory, 
the complete list of the generated files can be found in the 
[Sencha Cmd](http://docs.sencha.com/cmd/3.1.2/#!/guide/command) documentation:

  - **`app`** - The directory containing the Models, Views, Controllers, and Stores for your app.
  - **`app.js`** - The main JavaScript entry point for your app.
  - **`app.json`** - The configuration file for your app. 
  - **`index.html`** - The HTML file for your app.
  - **`packager.json`** - The configuration file used by Sencha Cmd for 
creating native packages for your application.
  - **`resources`** - The directory containing the CSS and the images for your app

Open `app.js`, the main entry point for your app, in your editor.

The `launch` function is the entry point to your application. 
In the default application, hide the application loading indicator, 
and create an instance of our Main view and add it to the Viewport.

The Viewport is a {@link Ext.layout.Card Card layout} to which 
you can add application components. The default app adds the 
`Main` view to the viewport so it becomes visible on the screen. 

Look at the code inside the Main view.

Open `app/view/Main.js` in your code editor and change a title line to:

    title: 'Home Tab'

Then change another line as follows:

    title: 'Woohoo!'

Also, change lines as follows:

    html: [
        "I changed the default <b>HTML Contents</b> to something different!"
    ].join("")

Refresh the app in your browser to see the effects of your changes.


## Next Steps

The next step is to follow the [First Application guide](#!/guide/first_app), 
which builds on this guide, and which guides you through 
creating a simple but powerful app in around 15 minutes. 

If you would like to skip ahead or find out more detailed information about 
other aspects of the framework, view the following guides and resources:

### Guides

* [What's New in Sencha Touch](#!/guide/whats_new)
* [Components and Containers](#!/guide/components)
* [Intro to Applications](#!/guide/apps_intro)
* [The Layout System](#!/guide/layouts)
* [The Data Package](#!/guide/data)

### Application Examples

* [Kitchen Sink](#!/example/kitchen-sink)
* [Twitter](#!/example/twitter)
* [Kiva](#!/example/kiva)

### Component Examples

* [Carousel](#!/example/carousel)
* [Forms](#!/example/forms)
* [Date Picker](#!/example/pickers)
