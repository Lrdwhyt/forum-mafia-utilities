# Forum Mafia Utilities

Forum Mafia Utilities is a client-side script written for the Forums of Loathing.
It changes the forum interface and offers various features to make playing, following, or hosting forum mafia games more streamlined.
It is written in JavaScript and mainly uses the jQuery library.

## Installation

### Firefox

Forum Mafia Utilities for Firefox requires the Greasemonkey add-on, which can be downloaded [here](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
With Greasemonkey,  install Forum Mafia Utilities via the Releases page or by [clicking here](https://github.com/Lrdwhyt/forum-mafia-utilities/releases/download/v0.1.0/forum-mafia-utilities.user.js).

### Chrome

Forum Mafia Utilities is available as a Chrome extension, which can be downloaded from the Releases page or by [clicking here](https://github.com/Lrdwhyt/forum-mafia-utilities/releases/download/v0.1.0/forum-mafia-utilities.crx). After downloading, you'll need to drag the file onto Chrome's Extensions tab **while developer mode is enabled** to install it. If you install it without developer mode, Chrome will automatically deactivate it and you'll have to delete the extension before reinstalling. Developer mode can be disabled after you install the extension and the extension will continue to work normally.

## Features
- Generates voting tallies for lynches
- Displays information about the game in one place for easy access
- Saves all data locally for use across sessions
- Can be turned on or off for each individual thread

![preview image](http://i.imgur.com/NuvkOV5.png)

## Usage
Forum Mafia Utilities only works on the Forums of Loathing, located at http://forums.kingdomofloathing.com/vb/index.php.
Specifically, it'll only run on URLs that are prefixed with http://forums.kingdomofloathing.com/vb/showthread.php?.

The main interface for the utility is located at the bottom of each page, under the Quick Reply box.
To enable it for a particular thread, click the button labeled "Turn on Forum Mafia Utilities for this thread".
It can be disabled again by opening the game configuration options and clicking the button labeled "Reset game".
A more detailed guide can be found on the [wiki](https://github.com/Lrdwhyt/forum-mafia-utilities/wiki).
