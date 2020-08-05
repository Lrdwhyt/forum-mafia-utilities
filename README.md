# Forum Mafia Utilities

Forum Mafia Utilities is a client-side script written for the Forums of Loathing.
It alters the forum interface and offers various features to make playing, following, or hosting forum mafia games more streamlined.
It is written in JavaScript and mainly uses the jQuery library.

## Installation

### Firefox

Forum Mafia Utilities for Firefox requires the Violetmonkey add-on, which can be downloaded [here](https://addons.mozilla.org/en/firefox/addon/violentmonkey/).
With Violentmonkey,  install Forum Mafia Utilities via the Releases page or by [clicking here](https://github.com/Lrdwhyt/forum-mafia-utilities/releases/download/v0.5.1/forum-mafia-utilities.user.js).

### Chrome

Forum Mafia Utilities is available as a Chrome extension, which can be downloaded from the Chrome Web Store [here](https://chrome.google.com/webstore/detail/forum-mafia-utilities/medflogpihpikljkkpjpeoijooblipgg?authuser=0).

## Features
- Generates voting tallies for lynches
- Group players together and colour them
- Saves all data locally for use across sessions
- Can be turned on or off for each individual thread

![preview image](http://i.imgur.com/NuvkOV5.png)

## Usage
Forum Mafia Utilities only works on the Forums of Loathing, located at http://forums.kingdomofloathing.com/vb/index.php.
Specifically, it'll only run on URLs that are prefixed with http://forums.kingdomofloathing.com/vb/showthread.php?.

The main interface for the utility is located at the bottom of each page, under the Quick Reply box.
To enable it for a particular thread, click the button labeled "Start game".
It can be disabled again by clicking the (same) button now labeled "Delete game".
A more detailed guide can be found on the [wiki](https://github.com/Lrdwhyt/forum-mafia-utilities/wiki).

## Troubleshooting
If updating from an earlier version, it may be necessary to reset the script. If the script interface won't load at all, you can do this by opening the developer console, going to the console tab and entering `localStorage.clear()` (case sensitive)
