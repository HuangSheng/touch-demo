# Native Packaging for Mobile Devices

This guide describes how to package a Sencha Touch app using
[Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download) to run 
natively on mobile devices using the Sencha Touch Native Packager tool. 
This tool supports packaging for iOS and Android. 

## Native App Packaging General Procedures

The app packaging process is similar whether you target iOS or Android devices. 
The main difference is that each environment requires that you prepare differently
and create a configuration file with platform-specific parameters.

Basic steps for app packaging:

1. [Provisioning](#provis) - For iOS, complete the iOS provisioning on the 
[Apple iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action) 
(requires an Apple ID and password) including creating certificates and devices 
set up through the provisioning portal. You also need Xcode and should have 
the Xcode simulator to test your app before installing on a device.<br>
For Android, provisioning requires that you obtain an Android ready 
certificate (debug or release) to sign your application.
2. [Create config file](#cfg) - Create a packaging configuration file 
for use with Sencha Cmd.
3. [Package your app](#pkg) - Run Sencha Cmd to create a 
packaged `\<application\>.app` file for iOS or an `.apk` file for Android.
  
This guide lists each step.

## Required Software

Before you begin, make sure your computer has this software:

 - **JRE** Sencha Cmd is written in Java and requires 
   [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html) 
   version 1.6 or 1.7 (best)
 - [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download)
 - **Ruby 1.9.3** (or earlier): Sencha Cmd does not work with Ruby 2.0. Ruby differs by OS:
  - **Windows**: Download Ruby 1.9.3.n from [rubyinstaller.org](http://rubyinstaller.org/downloads/).
    Get the .exe file version of the software and install it.
  - **Mac OS**: Ruby is pre-installed. You can test which version you have with the 
    **Ruby -v** command. If you have version 2.0, download the [Ruby version manager](https://rvm.io/) (rvm). 
    Use this command to download and install Ruby: **rvm install 1.9.3 --with-gcc=clang** and set 
    your PATH variable to point to the Ruby 1.9.3 install directory.
  - **Ubuntu**: Use **sudo apt-get install ruby1.9.3** to download Ruby 1.9.3.
 - **iOS Packaging**: Apple [Xcode](https://developer.apple.com/xcode/)
 - **Android Packaging**: [Android SDK Tools](http://developer.android.com/sdk/index.html) and [Eclipse](http://www.eclipse.org/) (optional).

<a name="provis"></a>
## Step 1: Provisioning

Provisioning differs by platform:

**iOS:** Refer to the [Native iOS Provisioning Guide](http://docs.sencha.com/touch/2/#!/guide/native_provisioning) 
and use the [Apple iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action) 
(requires an Apple ID and password) to get a development or distribution certificate and profiles. 
Create an App ID and provision your application. You need your App ID and App Name to package your app. 
Refer to the How-To section in the 
[Apple iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action) for help.

**Android:** Use the Android SDK Keytool to create a certificate to 
sign your Android application. The following example Keytool command 
generates a private key:

<pre>
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name
    -keyalg RSA -keysize 2048 -validity 10000
</pre>

For more information, see the 
Android [Signing Your Applications](http://developer.android.com/tools/publishing/app-signing.html).

<a name="cfg"></a>
## Step 2: Create a packaging configuration file

Create a configuration file template by running the following command in the Terminal:

    sencha app package generate <configTemplate.json>

`<configTemplate.json>` is the name of the configuration file. The file name cannot contain spaces.

These elements are required to have values--you can use the provided string or change the value:

 - `applicationName`
 - `versionString`
 - `versionCode`
 - `inputPath`
 - `outputPath`
 - `configuration`
 - `platform`
 - `deviceType`
 - `orientations`


### `applicationName` (Required)

The name of your application, which a device displays to the user after the app is installed. 

**iOS:** The application name should match the name provided in the 
[iOS Provisioning Portal](https://developer.apple.com/ios/manage/overview/index.action) 
(requires an Apple ID and password), in the App IDs section. 

This example iOS app ID shows both the name and the ID:

{@img idScreen.png App ID}

This example uses:

  - AppName: Sencha Touch Packaging
  - AppID: com.Sencha.TouchPackage

**Note** The App ID is the same as the one you put in the Identifier field in Xcode.

**Android:** The output file has the name \<AppName\>.apk.

### `applicationId` (Optional)
  
The ID for your app. Use a name space for your app such as `com.sencha.TouchPackage`, 
as shown in the previous example. For iOS, the ID can also be found in the provisioning portal.

### `bundleSeedId` (iOS only)
  
The ten-character string in front of the iOS application ID obtained from the 
[iOS Provisioning Portal](https://developer.apple.com/ios/manage/overview/index.action) 
(requires an Apple ID and password). In the example shown above under `applicationName`, it's `H8A8ADYR7H`.

### `versionString` (Required)
  
Indicates the version number of your application. This is a string and can have a value such as `1.0-beta`.

### `versionCode` (Android only - Required for Android)

Indicates the build number of an Android app, also called the integer version code.

### `icon` (Optional)

Indicates the icon that displays to a user along with your app name on the device's home screen.

**iOS:** 

 - Specify the icon file to be used for your application. 
 - Specify a Retina icon with `@2x` at the end of the icon name. 
 - A regular icon name looks like `icon.png`, while a Retina icon looks 
like `(regular) andicon@2x.png`. If a Retina icon with the `@2x.png` exists, 
the packager includes the Retina icon. 
- Refer to the 
[Apple documentation about icon sizes](https://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html).
 - iOS uses 57, 72, 114, and 144 pixel icons. 
- Specify a target device for your app:

<pre>
"icon": {
    "57": "resources/icons/Icon.png",
    "72": "resources/icons/Icon~ipad.png",
    "114": "resources/icons/Icon@2x.png",
    "144": "resources/icons/Icon~ipad@2x.png"
}
</pre>

**Android:** 

 - Refer to the [Google Launcher icons guide](http://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html).
 - Android uses 36, 48, 72, and 96 pixel icons. 
 - If you package for Android, you can omit iOS icons and vice versa.
 - Specify a target device for your app, Substitute the correct path
   for the resources/icon variable in the path. Icons reside in either
   the res/drawable or res/drawable-hdpi depending on whether the 
   device is hign density or not. 

<pre>
"icon": {
    "36":"resources/icons/Icon_Android36.png",
    "48":"resources/icons/Icon_Android48.png",
    "72":"resources/icons/Icon_Android72.png",
    "96":"resources/icons/Icon_Android96.png"
}
</pre>

Refer to the 
[Apple documentation](https://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html) 
for information about icon sizes.

**Android:** Specifies the launcher icon file to be used for your application. Refer to the 
[Android Launcher Icons guide](http://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html) 
for more information.

### `inputPath` (Required)

Indicates the location of your Sencha Touch application, relative to the configuration file.

### `outputPath` (Required)

Indicates the output location of the packaged application, where the built
application file is saved.

### `configuration` (Required)

Indicates whether you are building the debug or release configuration of your
application. Use `Debug` unless you are submitting your app to an online store, 
in which case, use `Release` to submit to an online store.

### `platform` (Required)

Indicates the platform on which your application runs.

- **iOS:** Options are `iOSSimulator` or `iOS`.
- **Android:** Options are `Android` or `AndroidEmulator`.

### `deviceType` (iOS only - Required for iOS)

Indicates the iOS device type on which your application runs. 

Available options are:

 - iPhone
 - iPad
 - Universal

### `certificatePath` (Optional)

Indicates the location of your certificate, which is required when you are 
developing for Android or Windows.

### `certificateAlias` (Optional)

Indicates the name of your certificate. If this is not specified when developing on
Mac OS X, the packaging tool automatically tries to find the certificate using the
applicationId. 

Can be just a simple matcher. For example, if your certificate name is 
"iPhone Developer: Polly Hedra (ABCDEFGHIJ)", you can just enter `iPhone Developer`.

Not required when using a `certificatePath` on Windows.

### `certificatePassword` (Optional)

Use only if a password was specified when generating certificate for 
release build of Android (iOS or Windows), or any iOS build on Windows. 
Indicates that a password is set for the certificate. 
If a password is not set, leave blank, or delete this parameter.

### `provisionProfile` (Optional)

Indicates a string for the path to the provision profile 
(APP_NAME.mobileprovision), which you can create 
and then download from Apple's provisioning portal.

### `URLScheme` (Optional)

Indicates a string for the URL scheme for communication with your application. 
Can be empty if you don't use a custom URL scheme in your project.

### `notificationConfiguration` (iOS only - Optional)

Optional for apps that use push notifications. Use `Debug` unless you 
are submitting your app to an online store, in which case use `Release`. 
If your app doesn't use push notifications, leave blank or remove this parameter.

### `sdkPath` (Android only - Optional)

Indicates the path to the Android SDK (string).

### `androidAPILevel` (Android only - Optional)

Indicates the Android API level, which is the version of the Android SDK 
to use. For more information, see 
[What is API Level?](http://developer.android.com/guide/appendix/api-levels.html) 
in the Android SDK documentation. Be sure to install the corresponding platform API 
in the Android SDK manager (*android_sdk/tools/android*). 

**Note** This parameter is optional, but the default is set to API level 8,
which is Android SDK 2.2 (Froyo). Set to one of the following if you're using a later
Android SDK version:

- API level 9 = Android SDK version 2.3 - 2.3.2 - Gingerbread
- API level 10 = Android SDK version 2.3.3 - 2.3.7 - Gingerbread
- API level 11 = Android SDK version 3.0 - Honeycomb
- API level 12 = Android SDK version 3.1 - Honeycomb
- API level 13 = Android SDK version 3.2 - Honeycomb
- API level 14 = Android SDK version 4.0 - 4.0.2 - Ice Cream Sandwich
- API level 15 = Android SDK version 4.0.3 - 4.0.4 - Ice Cream Sandwich
- API level 16 = Android SDK version 4.1.0 - 4.1.2 - Jelly Bean
- API level 17 = Android SDK version 4.2.0 - 4.2.2 - Jelly Bean

### `permissions` (Android only - Optional)

Array of permissions to use with services called from an Android app, 
including coarse location, fine location, information about networks, 
the camera, and so on. See the complete list of permissions in the Android
[Manifest.permission](http://developer.android.com/reference/android/Manifest.permission.html).

Default values are:

    "INTERNET",
    "ACCESS_NETWORK_STATE",
    "CAMERA",
    "VIBRATE",
    "ACCESS_FINE_LOCATION",
    "ACCESS_COARSE_LOCATION",
    "CALL_PHONE"

### `orientations`

Indicates the device orientations in which the application can run. 

Options are (all are enabled by default):

- portrait
- landscapeLeft
- landscapeRight
- portraitUpsideDown

**Note** If omitted, the default orientations setting is all four orientations.

<a name="pkg"></a>
## Step 3: Run the packager to create the packaged application

After creating the config file, package the app using these procedures 
for packaging debug and release versions of an app for iOS or Android.

### iOS: Package a Debug Application 

The appropriate `platform` and `configuration` settings need to be made 
in the config file, for example:

    platform: iOSSimulator
    configuration: Debug

If `platform` and `configuration` are not set, the packaged app will 
not run correctly.

With these configs set properly, issue the following command in Terminal:

    sencha app package run <configFile.json>

In this example, the iOS Simulator in the `platform` config parameter
(in the JSON config file) upon successful completion of the `package` command, 
launches the iOS simulator with the application running natively. 
See [Step 2](#cfg) for a complete list of variables
you can specify in the JSON config file.

**Note** Set the `deviceType` identifier in the JSON config file 
to `iPhone` or `iPad` to trigger the appropriate simulator.

### iOS: Package a Release Application 

To package a signed application to run on the device, issue this 
command in the terminal:

    sencha app package build <configFile.json>

**Note** This command creates the `<AppName.app>` in the directory 
indicated by the outputPath variable in the *configFile.json*. 
See [Step 2](#cfg) for a complete list of variables you can specify in 
the JSON config file. Deploy this application to the iOS device.

### Android: Package a Debug App and Run it on the Android Emulator

The appropriate `platform` and `configuration` settings need to be made in the config file, for example:

    platform: AndroidEmulator
    configuration: Debug

If `platform` and `configuration` are not set, the packaged app won't run correctly.

With these configs set properly, start the Android Emulator and issue this command:
    
    sencha app package run <configFile.json>

In this example, which targets the Android Emulator in the `platform` 
config parameter, successful completion of the `package` command launches 
the app in the already running emulator. 

If `package` is successful, an `.apk` is available in the application 
outputPath location for you to test on an Android Emulator or a device.

More information about the Android Emulator can be found in 
[Android Developer Guide: Using the Android Emulator](http://developer.android.com/tools/devices/emulator.html).

### Android: Package an application for distribution

To package a signed application to run on the device, issue the following command:

    sencha app package build <configFile.json>

This command creates the `<AppName.apk>` application file that 
you can use to release for distribution. The APK file is stored in the 
directory indicated by the outputPath variable 
in the configFile.json file. See [Step 2](#cfg) for a complete list of variables
you can specify in the JSON config file.

You can also use this command to create your APK file:

    sencha app build native

## Additional Resources

### iOS Resources

  1. [Native iOS Provisioning](http://docs.sencha.com/touch/#!/guide/native_provisioning)
  2. [Apple iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action) (requires an Apple ID and password)

### Android Resources

  1. [Signing Your Applications](http://developer.android.com/tools/publishing/app-signing.html)
  2. [Installing the ADT Plugin for Eclipse](http://developer.android.com/tools/sdk/eclipse-adt.html)
  3. [Eclipse](http://www.eclipse.org/)
  4. [Managing Virtual Devices for Android Emulator](http://developer.android.com/tools/publishing/app-signing.html), "Setting up Virtual Devices".
