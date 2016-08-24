// ==UserScript==
// @name        Forum Mafia Utilities
// @namespace   lrdwhyt
// @description Number of added functionalities to make playing forum mafia easier. Designed for Forums of Loathing.
// @include     http://forums.kingdomofloathing.com/vb/showthread.php?*
// @version     0.2.3
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

GM_addStyle(`
:root {
  --dark-color: #e91e63;
  --dark-color-highlighted: #d81b60;
  --med-color: #e1bee7;
  --med-color-highlighted: #ce93d8;
  --light-color: #eceff1;
  --light-color-highlighted: #cfd8dc;
  --dark-contrast-color: #546e7a;
  --dark-contrast-color-highlighted: #455a64;
  --med-contrast-color: #e91e63;
}
#script-manager {
  background-color: var(--light-color);
  margin-top: 10px;
}
#script-title {
  background-color: var(--dark-color);
  color: #fff;
  display: inline-block;
  margin-right: 5px;
  padding: 20px 10px;
}
#settings-display {
  display: none;
  padding: 10px;
}
#memory-usage {
  margin: 10px 0;
}
#help-link {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  background-color: #607d8b;
  box-shadow: 0 0 1px #333;
  color: #fff;
  display: inline-block;
  margin: 5px;
  padding: 9px;
  text-decoration: none;
}
#help-link:hover {
  background-color: #455a64;
}
#fmu-main-container {
  margin-bottom: 10px;
  padding-top: 10px;
}
#page-container {
  margin: 10px 0;
}
.page-link.full-save {
  background-color: var(--dark-color);
  color: #fff !important;
}
.full-save:hover {
  background-color: var(--dark-color-highlighted);
}
.partial-save {
  background-color: var(--med-color);
}
.partial-save:hover {
  background-color: var(--med-color-highlighted);
}
.empty-save {
  background-color: var(--light-color);
}
.empty-save:hover {
  background-color: var(--light-color-highlighted);
}
.full-data-day {
  background-color: var(--dark-color);
  color: #fff !important;
}
.full-data-day:hover {
  background-color: var(--dark-color-highlighted);
}
.day-tab.partial-data-day {
  background-color: var(--med-color);
}
.partial-data-day:hover {
  background-color: var(--med-color-highlighted);
}
.day-tab.empty-data-day {
  background-color: var(--light-color);
}
.empty-data-day:hover {
  background-color: var(--light-color-highlighted);
}
.page-link {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  color: #333 !important;
  display: inline-block;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  min-width: 18px;
}
.page-selected, .day-selected {
  padding-bottom: 2px !important;
  border-bottom: 3px solid var(--dark-contrast-color) !important;
}
#page-label {
  background-color: var(--dark-contrast-color);
  color: var(--dark-color);
  display: inline-block;
  padding: 5px 10px;
}
#script-manager button, #fmu-main-container button, #settings-display button {
  display: inline-block;
  font-family: Verdana, sans-serif;
  margin: 5px;
  padding: 9px;
}
.input-button {
  background-color: #fff;
  border: none;
}
.input-button:hover {
  -moz-transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  background-color: #f5f5f5 !important;
  border-color: #f5f5f5;
}
.function-button {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  background-color: #607d8b;
  border: none;
  box-shadow: 0 0 1px #333;
  color: #fff;
}
.function-button:hover {
  background-color: #455a64;
}
.function-button:active {
  background-color: #546e7a;
}
.day-tab {
  -moz-transition: background-color 0.5s;
  -webkit-transition: background-color 0.5s;
  cursor: pointer;
  display: inline-block;
  padding: 5px 10px;
}
#add-day {
  -moz-transition-duration: 0.5s;
  -webkit-transition-duration: 0.5s;
  background-color: var(--light-color);
  color: var(--dark-color);
  display: inline-block;
  padding: 5px;
  text-align: center;
  width: 17px;
}
#add-day:hover {
  background-color: var(--light-color-highlighted);
  cursor: pointer;
}
#remove-day {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  background-color: var(--dark-contrast-color);
  color: var(--light-color);
  display: inline-block;
  padding: 5px;
  text-align: center;
  width: 17px;
}
#remove-day:hover {
  background-color: var(--dark-contrast-color-highlighted);
  cursor: pointer;
}
#day-area {
  background-color: var(--light-color);
  padding: 10px;
}
#tally-body {
  padding: 10px 0;
}
#tally-body, #tally-controls {
  background-color: var(--light-color);
}
#tally-container.floating {
  left: 0;
  bottom: 0;
  opacity: 0.9;
  padding: 0 10px;
  position: fixed;
}
#tally-container.floating #tally-body {
  opacity: 0.1;
}
#tally-container.floating:hover #tally-body {
  opacity: 1;
}
.voter-name-list {
  margin: 5px;
}
.voter-wrap {
  display: inline-block;
  margin: 2px;
  position: relative;
}
.voter-name {
  background-color: white;
  display: inline-block;
  padding: 5px 8px;
}
.unrecognised-voter {
  background-color: #f00;
  color: #fff;
}
.vote-link {
  background-color: var(--dark-contrast-color);
  color: #fff !important;
  display: none;
  font-size: 7pt;
  opacity: 0.8;
  padding: 3px;
  position: absolute;
  right: 0;
  text-decoration: none;
}
.vote-link:hover {
  color: #333;
}
.voter-wrap:hover .vote-link {
  display: inline-block;
}
.voted-name {
  background-color: var(--dark-contrast-color);
  color: #fff;
  display: inline-block;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 8px;
}
.voted-name.no-vote {
  background-color: var(--light-color-highlighted);
  color: #333;
}
.vote-count {
  background-color: #e91e63;
  color: #fff;
  display: inline-block;
  font-weight: bold;
  padding: 8px;
}
.vote-count.no-vote {
  background-color: var(--med-color);
  color: #333;
}
#day-ranges button {
  border-bottom: 3px solid #fff;
  padding-bottom: 6px;
}
#day-ranges .input-button:hover {
  border-color: #f5f5f5;
}
#day-ranges .boundary-option-selected {
  border-color: var(--dark-contrast-color) !important;
}
#start-date, #end-date {
  display: inline-block;
  border-bottom: none;
  padding-bottom: 0px !important;
}
#day-ranges div.boundary-option-selected button.input-button {
  border-color: var(--dark-contrast-color) !important;
}
#start-year, #start-month, #start-day, #end-year, #end-month, #end-day {
  -moz-transition-duration: 0.4s;
  webkit-transition-duration: 0.4s;
  background-color: var(--light-color-highlighted);
  border-color: var(--light-color-highlighted) !important;
  margin: 0 !important;
  padding-left: 3px !important;
  padding-right: 3px !important;
}
#start-time, #end-time {
  margin: 0 !important;
  background-color: #fff;
  border-bottom: 3px solid #fff;
}
#data-container {
  height: 0;
  opacity: 0;
}
#toggle-game-configuration-container {
  background-color: var(--light-color);
  padding: 10px;
}
#game-configuration {
  background-color: var(--light-color);
  display: none;
  padding: 10px;
}
#toggle-game-configuration {
  margin: 5px 0 !important;
}
#paste-wrapper {
  display: none;
}
.alive-player .player-state {
  color: var(--dark-color);
}
.dead-player .player-state {
  color: #999;
}
.death-info {
  display: none;
}
.dead-player .death-info {
  display: inline-block;
}
.death-info .death-phase {
  background-color: var(--dark-contrast-color);
  color: #fff;
  margin-right: 0 !important;
}

.death-info .death-phase:hover {
  background-color: var(--dark-contrast-color-highlighted);
}

.death-info .death-time {
  margin-left: 0 !important;
}
.dead-player .player-name {
  text-decoration: line-through;
}
.player-block button {
  margin: 1px 5px !important;
}
.player-block button {
  margin: 2px 5px !important;
  padding: 5px 7px !important;
}
.player-name {
  cursor: text;
  font-weight: bold;
}
.input-button.edit-button {
  cursor: text;
}
.player-controls {
  display: none;
}
.remove-player {
  width: 29px;
}
li.player-block:hover .player-controls {
  display: inline;
}`);

monthNames = {
    "jan": 0,
    "feb": 1,
    "mar": 2,
    "apr": 3,
    "may": 4,
    "jun": 5,
    "jul": 6,
    "aug": 7,
    "sep": 8,
    "oct": 9,
    "nov": 10,
    "dec": 11
  }

/*Represents script mode for the current thread
  0 - Off
  1 - On, game configuration is hidden
  2 - On, game configuration is shown*/
threadScriptMode = 0;
numberPostsPerPage = 60; //Maximum number of posts per page - Forum default is 60
ignoredPlayerList = ["TallyBot"]; //Usernames to ignore when retrieving data
nightKeywords = ["lynch", "kill", "day", "night", "someone", "die"]; //List of words associated with night posts (unimplemented)
includeGm = false; //Whether to include the GM when retrieving data
unvoteKeyword = "unvote"; //String used to signify unvote
voteKeyword = "vote"; //String used to signify vote
gmNameList = [];
playerNameList = [];
subNameList = {};
playerNicknameList = {};
playerStatusList = {};
savedTallyList = {};
recognisedVoteList = {};
unrecognisedVoterList = [];
threadId = 0;
currentPage = 0;
pageTotal = 0;
numberPostsOnPage = 0;
dayDataList = {};
dayDataList[1] = {
      "startDate": new Date(),
      "startPost": "1",
      "startSelected": "start-post",
      "endDate": new Date(),
      "endSelected": "end-date"
    };
numberDaysTotal = 1;
currentDay = 1; //The day that is selected by the user
nightfallTime = 2000; //Default time for nightfall
timeZone = 0;
isTallyPopout = false;

$(document).ready(function () {
  threadId = getThreadId();
  threadScriptMode = parseInt(localStorage.getItem("threadScriptMode" + threadId));
  timeZone = getTimeZone();
  $("<div />", {
    id: "script-manager"
  })
    .append($("<div />", {
      id: "manager-controls"
    })
      .append($("<div />", {
        id: "script-title",
        text: "Forum Mafia Utilities"
      }))
      .append($("<button />", {
        class: "function-button",
        id: "toggle-script",
        text: "Delete game"
      }))
      .append($("<button />", {
        class: "function-button",
        id: "edit-settings",
        text: "Settings"
      }))
      .append($("<button />", {
        class: "function-button",
        onclick: "window.open('https://github.com/Lrdwhyt/forum-mafia-utilities/wiki', '_blank')",
        text: "Help"
      })))
    .append($("<div />", {
      id: "settings-display"
    })
      .append($("<div />", {
        id: "memory-usage",
        text: "Local memory: ~" + Math.round(unescape(encodeURIComponent(JSON.stringify(localStorage))).length * 2 / 1024 / 1024 * 10000) / 10000 + " MB used of 5 MB"
      }))
      .append($("<button />", {
        class: "function-button",
        id: "clear-data",
        text: "Clear script data"
      })))
      .insertAfter("#qrform");
  $("#edit-settings").click(function() {
    $("#settings-display").slideToggle();
  });
  $("#toggle-script").click(function() {
    if ($(this).text() == "Start game") {
      localStorage.setItem("threadScriptMode" + threadId, "1");
      createInterface();
      $(this).text("Delete game");
    } else {
      resetData();
      resetScript();
    }
  });
  if (threadScriptMode) {
    createInterface();
  } else {
    resetScript();
  }
});

function getCurrentPageNumbers() {
  var pageString = $(".pagenav td.vbmenu_control:first-child").first().text();
  var pageArray = pageString.split(" ");
  currentPage = parseInt(pageArray[1]);
  pageTotal = parseInt(pageArray[3]);
  numberPostsOnPage = 1 + parseInt($(".thead > [id^=postcount]").last().attr("name")) - parseInt($(".thead > [id^=postcount]").first().attr("name"));
}

function createInterface() {
  getCurrentPageNumbers();
  if (localStorage.getItem("dayCount" + threadId)) {
    numberDaysTotal = parseInt(localStorage.getItem("dayCount" + threadId));
  }
  if (localStorage.getItem("gmNameList" + threadId)) {
    gmNameList = JSON.parse(localStorage.getItem("gmNameList" + threadId));
  }
  if (currentPage == 1 && gmNameList.length == 0) {
    gmNameList.push($(".bigusername").first().text());
    localStorage.setItem("gmNameList" + threadId, JSON.stringify(gmNameList));
  }
  if (localStorage.getItem("playerNameList" + threadId)) {
    playerNameList = JSON.parse(localStorage.getItem("playerNameList" + threadId));
  }
  if (localStorage.getItem("subNameList" + threadId)) {
    subNameList = JSON.parse(localStorage.getItem("subNameList" + threadId));
  }
  if (localStorage.getItem("nightfallTime" + threadId)) {
    nightfallTime = parseInt(localStorage.getItem("nightfallTime" + threadId));
  }
  if (localStorage.getItem("selectedDay" + threadId)) {
    currentDay = parseInt(localStorage.getItem("selectedDay" + threadId));
  }
  if (localStorage.getItem("dayDataList" + threadId)) {
    dayDataList = JSON.parse(localStorage.getItem("dayDataList" + threadId));
  }
  if (localStorage.getItem("savedTallyList" + threadId)) {
    savedTallyList = JSON.parse(localStorage.getItem("savedTallyList" + threadId));
  }
  if (localStorage.getItem("playerStatusList" + threadId)) {
    playerStatusList = JSON.parse(localStorage.getItem("playerStatusList" + threadId));
  }
  if (localStorage.getItem("unrecognisedVoterList" + threadId)) {
    unrecognisedVoterList = JSON.parse(localStorage.getItem("unrecognisedVoterList" + threadId));
  }
  $("#script-manager").before("<div id='fmu-main-container'></div>");
  $("<div />", {
    id: "page-container"
  })
    .append($("<span />", {
      id: "page-label",
      text: "Page"
    })).append($("<span />", {
      id: "page-controls"
    })).appendTo("#fmu-main-container");
  $("<div />", {
    id: "day-controls"
  })
    .append($("<div />", {
      id: "add-day",
      text: "+"
    }))
    .append($("<span />", {
      id: "day-tab-container"
    }))
    .append($("<div />", {
      id: "remove-day",
      text: "-"
    })).appendTo("#fmu-main-container");
  $("<div />", {
    id: "day-area"
  })
    .append($("<div />", {
      id: "tally-container"
    })
    .append($("<div />", {
      id: "tally-body"
    }))
    .append($("<div />", {
      id: "tally-controls"
    })
    .append($("<button />", {
      class: "function-button",
      id: "update-tally",
      text: "Update tally"
    }))
    .append($("<button />", {
      class: "function-button",
      id: "copy-tally",
      text: "Copy BBcode"
    }))
    .append($("<button />", {
      class: "function-button",
      id: "copy-vote-log",
      text: "Copy vote log"
    }))
    .append($("<button />", {
      class: "function-button",
      id: "toggle-tally-display",
      text: "Pop out"
    }))))
    .append($("<br />"))
    .append($("<div />", {
      id: "day-ranges"
    })
    .append($("<span />", {
      text: "Start"
    }))
    .append($("<button />", {
      id: "start-post",
      class: "boundary-option input-button edit-button"
    }))
    .append($("<div />", {
      class: "boundary-option",
      id: "start-date"
    })
    .append($("<button />", {
      class: "input-button",
      id: "start-year"
    }))
    .append($("<button />", {
      class: "input-button",
      id: "start-month"
    }))
    .append($("<button />", {
      class: "input-button",
      id: "start-day"
    }))
    .append($("<button />", {
      id: "start-time",
      class: "input-button edit-button"
    })))
    .append($("<br />"))
    .append($("<span />", {
      text: "End"
    }))
    .append($("<button />", {
      id: "end-post",
      class: "boundary-option input-button edit-button"
    }))
    .append($("<div />", {
      class: "boundary-option",
      id: "end-date"
    })
    .append($("<button />", {
      class: "input-button",
      id: "end-year"
    }))
    .append($("<button />", {
      class: "input-button",
      id: "end-month"
    }))
    .append($("<button />", {
      class: "input-button",
      id: "end-day"
    }))
    .append($("<button />", {
      id: "end-time",
      class: "input-button edit-button"
    }))))
    .appendTo("#fmu-main-container");
  $("<div />", {
    id: "toggle-game-configuration-container"
  })
    .append($("<button />", {
      class: "function-button",
      id: "toggle-game-configuration",
      text: "Show game configuration"
    }))
    .appendTo("#fmu-main-container");
  $("<div />", {
    id: "game-configuration"
  })
    .append($("<span />", {
      text: "GM names"
    }))
    .append($("<span />", {
      id: "gm-names"
    }))
    .append($("<button />", {
      class: "function-button",
      id: "add-gm",
      text: "+"
    }))
    .append($("<br />"))
    .append($("<span />", {
      text: "Night time"
    }))
    .append($("<button />", {
      class: "input-button edit-button",
      id: "nightfall-time",
      text: padTime(nightfallTime)
    }))
    .append($("<br />"))
    .append($("<span />", {
      text: "Player names"
    }))
    .append($("<button />", {
      class: "function-button",
      id: "add-player",
      text: "+"
    }))
    .append($("<button />", {
      class: "function-button",
      id: "import-players",
      text: "Paste..."
    }))
    .append($("<button />", {
      class: "function-button",
      id: "reset-players",
      text: "Reset"
    }))
    .append($("<div />", {
      id: "paste-wrapper"
    })
    .append($("<textarea />", {
      id: "paste-area"
    }))
    .append($("<br />"))
    .append($("<button />", {
      class: "function-button",
      id: "confirm-paste",
      text: "Import players"
    })))
    .append($("<div />", {
      id: "player-wrapper"
    })
    .append($("<ol />", {
      id: "player-list"
    })))
    .appendTo($("#fmu-main-container"));
  for (var page = 1; page <= pageTotal; page++) {
    pageStatus = getPageStatus(threadId, page);
    newBlock = $("<a />", {
      class: "page-link",
      href: getPageLink(threadId, page),
      page: page,
      text: page
    }).appendTo($("#page-controls"));
    if (page == currentPage) {
      newBlock.addClass("page-selected");
    }
    if (pageStatus == numberPostsPerPage || (currentPage == pageTotal && pageStatus == numberPostsOnPage)) {
      newBlock.addClass("full-save");
    } else if (pageStatus > 0) {
      newBlock.addClass("partial-save");
    } else {
      newBlock.addClass("empty-save");
    }
  }
  for (var day = 1; day <= numberDaysTotal; day++) {
    addDayTabGui(day);
    colourDayTab(day);
  }
  switchDay(currentDay);
  if (gmNameList.length > 0) {
    for (var i = 0; i < gmNameList.length; i++) {
      addGmGui(gmNameList[i]);
    }
  }
  if (playerNameList.length > 0) {
    for (var i = 0; i < playerNameList.length; i++) {
      var playerEle = addPlayerGui(playerNameList[i]);
      updatePlayerState(playerEle, playerNameList[i]);
      if (subNameList[playerNameList[i]]) {
        for (var j = 0; j < subNameList[playerNameList[i]].length; j++) {
          addSubGui(playerNameList[i], subNameList[playerNameList[i]][j]);
        }
      }
    }
  }
  if (threadScriptMode == 2) {
    $("#game-configuration").show();
    $("#toggle-game-configuration").text("Hide game configuration");
  }
  $("#tally-body").on("click",".unrecognised-voter", function() {
    addPlayer($(this).attr("name"));
  })
  $("#update-tally").click(updateTally);
  $("#copy-tally").click(copyBbcodeTally);
  $("#copy-vote-log").click(copyVoteLog);
  $("#toggle-tally-display").click(function() {
    toggleTallyDisplay($(this));
  });
  if (localStorage.getItem("tallyDisplay" + threadId)) {
    toggleTallyDisplay($("#toggle-tally-display"));
  }
  $("#toggle-game-configuration").click(function() {
    toggleGameConfig($(this));
  });
  $("#add-day").click(function() {
    changeDayCount(1);
  });
  $("#remove-day").click(function() {
    changeDayCount(-1);
  });
  $("#day-tab-container").on("click", ".day-tab", function() {
    switchDay($(this).attr("name"));
  });
  $("#start-post").click(switchStartPost);
  $("#start-year").click(switchStartYear);
  $("#start-month").click(switchStartMonth);
  $("#start-day").click(switchStartDay);
  $("#start-time").click(switchStartTime);
  $("#end-post").click(switchEndPost);
  $("#end-year").click(switchEndYear);
  $("#end-month").click(switchEndMonth);
  $("#end-day").click(switchEndDay);
  $("#end-time").click(switchEndTime);
  $("#add-gm").click(promptAddGm);
  $("#gm-names").on("click", ".gm-name", function() {
    gmNameList.splice($.inArray($(this).text(), gmNameList), 1);
    localStorage.setItem("gmNameList" + threadId, JSON.stringify(gmNameList));
    $(this).remove();
  });
  $("#nightfall-time").click(function() {
    changeNightfallTime($(this));
  });
  $("#add-player").click(function() {
    newPlayer = prompt("Enter the name of the player you want to add");
    if (newPlayer) {
      addPlayer(newPlayer);
    }
  });
  $("#import-players").click(function() {
    $("#paste-wrapper").slideToggle();
    $("#paste-area").focus();
  })
  $("#confirm-paste").click(confirmPaste);
  $("#reset-players").click(clearPlayers);
  $("#player-list").on("click", ".player-name", function() {
    handleRemovePlayer($(this))
  });
  $("#player-list").on("click", ".player-state", function() {
    togglePlayerState($(this));
  });
  $("#player-list").on("click", ".death-phase", function() {
    toggleDeathPhase($(this));
  });
  $("#player-list").on("click", ".death-time", function() {
    changeDeathTime($(this));
  });
  $("#player-list").on("click", ".add-sub", function() {
    player = $(this).parents(".player-block").children(".player-name").text();
    newSub = prompt("Enter alternative name for player - e.g. subs or nicknames");
    if (newSub) {
      addSub(player, newSub);
    }
  });
  $("#player-list").on("click", ".sub-name", function() {
    player = $(this).parents(".player-block").attr("name");
    sub = $(this).text();
    removeSub(player, sub);
  });
  $("#player-list").on("click", ".remove-player", function() {
    player = $(this).parents(".player-block").attr("name");
    removePlayer(player);
  });
  $("#clear-data").click(function() {
    if (confirm("Are you sure you want to reset all data?")) {
      resetData();
      localStorage.clear();
      resetScript();
    }
  });
  if (gmNameList.length > 0) {
    generateData();
  }
}

function updatePlayerState(playerBlock, playerName) {
  if (playerStatusList.hasOwnProperty(playerName)) {
    var playerStatus = playerStatusList[playerName];
    $(".player-block[name='" + playerName + "'] .player-state").text(getLifeStatus(playerStatus));
    $(".player-block[name='" + playerName + "'] .death-phase").text(getPhaseName(playerStatus));
    $(".player-block[name='" + playerName + "'] .death-time").text(getDeathTime(playerStatus));
    if (playerStatusList[playerName] == 0) {
      playerBlock.addClass("alive-player");
    } else {
      playerBlock.addClass("dead-player");
    }
  } else {
    playerBlock.addClass("alive-player");
  }
}

function changeNightfallTime(nightfallTimeButton) {
  nightfallTime = prompt("Enter new time for night");
  nightfallTime = validateTime(nightfallTime);
  if (nightfallTime > -1) {
    nightfallTimeButton.text(padTime(nightfallTime));
    localStorage.setItem("nightfallTime" + threadId, nightfallTime);
    switchDay(currentDay);
  }
}

function switchStartPost() {
  var post;
  if (!dayDataList[currentDay]) {
    dayDataList[currentDay] = {};
  }
  if (dayDataList[currentDay]["startSelected"] == "start-post" || !dayDataList[currentDay]["startPost"]) {
    if (dayDataList[currentDay]["startPost"] > 0) {
      post = prompt("Enter the post number to start from", dayDataList[currentDay]["startPost"]);
    } else {
      post = prompt("Enter the post number to start from");
    }
    if (!post || parseInt(post) < 0 || dayDataList[currentDay]["endPost"] && parseInt(post) > dayDataList[currentDay]["endPost"]) {
      return true;
    }
    dayDataList[currentDay]["startPost"] = parseInt(post);
  }
  dayDataList[currentDay]["startSelected"] = "start-post";
  localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
  switchDay(currentDay);
  colourDayTab(currentDay);  
}

function switchStartDate() {
  if (!dayDataList[currentDay]) {
    dayDataList[currentDay] = {};
  }
  dayDataList[currentDay]["startSelected"] = "start-date";
  localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
  switchDay(currentDay);
  colourDayTab(currentDay);
}

function switchStartYear() {
  if (dayDataList[currentDay]["startSelected"] == "start-date") {
    var year = parseInt(prompt("Enter new year"));
    if (year > 0) {
      var newDate = new Date(dayDataList[currentDay]["startDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCFullYear(year);
      dayDataList[currentDay]["startDate"] = getOffsetDate(newDate, 0, -timeZone);
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      switchDay(currentDay);
    }
  } else {
    switchStartDate();
  }
}

function switchStartMonth() {
  if (dayDataList[currentDay]["startSelected"] == "start-date") {
    var month = parseInt(prompt("Enter new month"));
    if (month > 0 && month <= 12) {
      var newDate = new Date(dayDataList[currentDay]["startDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCMonth(month - 1);
      dayDataList[currentDay]["startDate"] = getOffsetDate(newDate, 0, -timeZone);
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      switchDay(currentDay);
    }
  } else {
    switchStartDate();
  }
}

function switchStartDay() {
  if (dayDataList[currentDay]["startSelected"] == "start-date") {
    var day = parseInt(prompt("Enter new day"));
    if (day > 0 && day <= 31) {
      var newDate = new Date(dayDataList[currentDay]["startDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCDate(day);
      dayDataList[currentDay]["startDate"] = getOffsetDate(newDate, 0, -timeZone);
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      switchDay(currentDay);
    }
  } else {
    switchStartDate();
  }
}

function switchStartTime() {
  if (dayDataList[currentDay]["startSelected"] == "start-date") {
    var time = prompt("Enter new time");
    var actualTime = validateTime(time);
    if (actualTime > -1) {
      var hours = Math.floor(actualTime / 100);
      var minutes = actualTime % 100;
      var newDate = new Date(dayDataList[currentDay]["startDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCHours(hours);
      newDate.setUTCMinutes(minutes);
      dayDataList[currentDay]["startDate"] = getOffsetDate(newDate, 0, -timeZone);
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      switchDay(currentDay);
    }
  } else {
    switchStartDate();
  }
}

function switchEndPost() {
  var post;
  if (!dayDataList[currentDay]) {
    dayDataList[currentDay] = {};
  }
  if (dayDataList[currentDay]["endSelected"] == "end-post" || !dayDataList[currentDay]["endPost"]) {
    if (dayDataList[currentDay]["endPost"] > 0) {
      post = prompt("Enter the post number to end on", dayDataList[currentDay]["endPost"]);
    } else {
      post = prompt("Enter the post number to end on");
    }
    if (!post || parseInt(post) < 0 || dayDataList[currentDay]["startPost"] && parseInt(post) < dayDataList[currentDay]["startPost"]) {
      return true;
    }
    dayDataList[currentDay]["endPost"] = parseInt(post);
  }
  dayDataList[currentDay]["endSelected"] = "end-post";
  localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
  switchDay(currentDay);
  colourDayTab(currentDay);  
}

function switchEndDate() {
  var post;
  if (!dayDataList[currentDay]) {
    dayDataList[currentDay] = {};
  }
  dayDataList[currentDay]["endSelected"] = "end-date";
  localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
  switchDay(currentDay);
  colourDayTab(currentDay);
}

function switchEndYear() {
  if (dayDataList[currentDay]["endSelected"] == "end-date") {
    var year = parseInt(prompt("Enter new year"));
    if (year > 0) {
      var newDate = new Date(dayDataList[currentDay]["endDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCFullYear(year);
      dayDataList[currentDay]["endDate"] = getOffsetDate(newDate, 0, -timeZone);
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      switchDay(currentDay);
    }
  } else {
    switchEndDate();
  }
}

function switchEndMonth() {
  if (dayDataList[currentDay]["endSelected"] == "end-date") {
    var month = parseInt(prompt("Enter new month"));
    if (month > 0 && month <= 12) {
      var newDate = new Date(dayDataList[currentDay]["endDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCMonth(month - 1);
      dayDataList[currentDay]["endDate"] = getOffsetDate(newDate, 0, -timeZone);
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      switchDay(currentDay);
    }
  } else {
    switchEndDate();
  }
}

function switchEndDay() {
  if (dayDataList[currentDay]["endSelected"] == "end-date") {
    var day = parseInt(prompt("Enter new day"));
    if (day > 0 && day <= 31) {
      var newDate = new Date(dayDataList[currentDay]["endDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCDate(day);
      dayDataList[currentDay]["endDate"] = getOffsetDate(newDate, 0, -timeZone);
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      switchDay(currentDay);
    }
  } else {
    switchEndDate();
  }
}

function switchEndTime() {
  if (dayDataList[currentDay]["endSelected"] == "end-date") {
    var time = prompt("Enter new time");
    var actualTime = validateTime(time);
    if (actualTime > -1) {
      var hours = Math.floor(actualTime / 100);
      var minutes = actualTime % 100;
      var newDate = new Date(dayDataList[currentDay]["endDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCHours(hours);
      newDate.setUTCMinutes(minutes);
      dayDataList[currentDay]["endDate"] = getOffsetDate(newDate, 0, -timeZone);
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      switchDay(currentDay);
    }
  } else {
    switchEndDate();
  }
}

function promptAddGm() {
  newGm = prompt("Enter the name of the GM you want to add");
  if (newGm) {
    addGm(newGm);
  }
}

function confirmPaste() {
  $("#paste-wrapper").slideUp();
  importedPlayers = $("#paste-area").val().split("\n");
  for (var i = 0; i < importedPlayers.length; i++) {
    if (importedPlayers[i].indexOf(".") >= 0) {
      importedPlayers[i] = importedPlayers[i].split(".")[1];
    }
    if (importedPlayers[i].indexOf(")") >= 0) {
      importedPlayers[i] = importedPlayers[i].split(")")[1];
    }
    importedPlayers[i] = importedPlayers[i].trim();
  }
  importedPlayers = importedPlayers.filter(Boolean);
  for (var i = 0; i < importedPlayers.length; i++) {
    addPlayer(importedPlayers[i]);
  }
}

function handleRemovePlayer(removePlayerButton) {
  var oldName = removePlayerButton.text();
  var newName = prompt("Enter new player name.", oldName);
  if (newName) {
    editPlayerName(oldName, newName);
    removePlayerButton.text(newName);
    removePlayerButton.parents(".player-block").attr("name", newName);
  } else if (newName == "") {
    removePlayer(oldName);
  }
}

function editPlayerName(oldName, newName) {
  var i = $.inArray(oldName, playerNameList);
  playerNameList[i] = newName;
  localStorage.setItem("playerNameList" + threadId, JSON.stringify(playerNameList));
  if (subNameList.hasOwnProperty(oldName)) {
    subNameList[newName] = subNameList[oldName];
    delete subNameList[oldName];
    localStorage.setItem("subNameList" + threadId, JSON.stringify(subNameList));
  }
  if (playerStatusList.hasOwnProperty(oldName)) {
    playerStatusList[newName] = playerStatusList[oldName];
    delete playerStatusList[oldName];
    localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
  }
  for (var i in unrecognisedVoterList) {
    $(".unrecognised-voter[name='" + oldName + "']").attr("name", newName);
    if (diceCoefficient(unrecognisedVoterList[i], newName) > 0.9) {
      unrecognisedVoterList.splice(i, 1);
      localStorage.setItem("unrecognisedVoterList" + threadId, JSON.stringify(unrecognisedVoterList));
      $(".unrecognised-voter[name='" + newName + "']").removeClass("unrecognised-voter");
      break;
    }
  }
}

function getTimeString(date) {
  var hours = date.getUTCHours() + "";
  var minutes = date.getUTCMinutes() + "";
  if (hours.length == 1) {
    hours = "0" + hours;
  }
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}

function getLifeStatus(state) {
  if (state == 0) {
    return "alive";
  } else if (state > 0) {
    return "dead";
  } else {
    return "resurrected";
  }
}

function getPhaseName(state) {
  if (state % 2 == 1) {
    return "day";
  } else {
    return "night";
  }
}

function getDeathTime(state) {
  return Math.ceil(state / 2);
}

function switchDay(day) {
  currentDay = day;
  localStorage.setItem("selectedDay" + threadId, day);
  $(".day-tab").removeClass("day-selected");
  $(".day-tab[name='" + day + "']").addClass("day-selected");
  if (dayDataList[day]) {
    $(".boundary-option").removeClass("boundary-option-selected");
    if (dayDataList[day]["startPost"]) {
      $("#start-post").text("Post #" + dayDataList[day]["startPost"]);
    } else {
      $("#start-post").text("Post #?");
    }
    var startTime = getOffsetDate(new Date(dayDataList[day]["startDate"]), 0, timeZone);
    $("#start-year").text(startTime.getUTCFullYear());
    $("#start-month").text(startTime.getUTCMonth() + 1);
    $("#start-day").text(startTime.getUTCDate());
    $("#start-time").text(getTimeString(startTime));
    if (dayDataList[day]["startSelected"]) {
      $("#" + dayDataList[day]["startSelected"]).addClass("boundary-option-selected");
    }
    if (dayDataList[day]["endSelected"]) {
      $("#" + dayDataList[day]["endSelected"]).addClass("boundary-option-selected");
    }
    if (dayDataList[day]["endPost"]) {
      $("#end-post").text("Post #" + dayDataList[day]["endPost"]);
    } else {
      $("#end-post").text("Post #?");
    }
    var endTime = getOffsetDate(new Date(dayDataList[day]["endDate"]), 0, timeZone);
    $("#end-year").text(endTime.getUTCFullYear());
    $("#end-month").text(endTime.getUTCMonth() + 1);
    $("#end-day").text(endTime.getUTCDate());
    $("#end-time").text(getTimeString(endTime));
  } else {
    alert("Error");
    $(".boundary-option").removeClass("boundary-option-selected");
    $("#start-post").text("Post #?");
    $("#start-time").text(padTime(nightfallTime + 1));
    $("#end-post").text("Post #?");
    $("#end-time").text(padTime(nightfallTime));
  }
  if (savedTallyList[day]) {
    $("#tally-body").html(tallyToHtml(savedTallyList[day]));
  } else {
    $("#tally-body").html("");
  }
}

function toggleTallyDisplay(toggleButton) {
  if (isTallyPopout == true) {
    isTallyPopout = false;
    localStorage.setItem("tallyDisplay" + threadId, "");
    $("#tally-container").removeClass("floating");
    toggleButton.text("Pop out");
  } else {
    isTallyPopout = true;
    localStorage.setItem("tallyDisplay" + threadId, "1");
    $("#tally-container").addClass("floating");
    toggleButton.text("Close");
  }
}

function addDayTabGui(day) {
  $("<div />", {
    class: "day-tab",
    name: day,
    text: "Day " + day
  }).appendTo("#day-tab-container");
}

function deleteDayData(day) {
  if (dayDataList[day]) {
    delete dayDataList[day];
    localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
  }
  if (savedTallyList[day]) {
    delete savedTallyList[day];
    localStorage.setItem("savedTallyList" + threadId, JSON.stringify(savedTallyList));
  }
}

function updateTally() {
  if (playerNameList.length > 0) {
    generateNicknames();
  }
  var start = 1;
  var end = 200000;
  if (dayDataList[currentDay]["startSelected"] == "start-post") {
    start = parseInt(dayDataList[currentDay]["startPost"]);
  } else if (dayDataList[currentDay]["startSelected"] == "start-date") {
    start = dayDataList[currentDay]["startDate"];
  }
  if (dayDataList[currentDay] && dayDataList[currentDay]["endSelected"] == "end-post") {
    end = parseInt(dayDataList[currentDay]["endPost"]);
  } else if (dayDataList[currentDay]["endSelected"] == "end-date") {
    end = dayDataList[currentDay]["endDate"];
  }
  var tally = getTallyForRange(start, end);
  savedTallyList[currentDay] = tally;
  localStorage.setItem("savedTallyList" + threadId, JSON.stringify(savedTallyList));
  $("#tally-body").html(tallyToHtml(tally));
}

function copyBbcodeTally() {
  if (savedTallyList[currentDay]) {
    $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
    $("#data-container").val(tallyToBbcode(savedTallyList[currentDay]));
    $("#data-container").select();
    document.execCommand("copy");
    $("#data-container").remove();
  }
}

function copyVoteLog() {
  $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
  var start = 1;
  var end = 200000;
  if (dayDataList[currentDay] && dayDataList[currentDay]["startSelected"] == "start-post") {
    start = parseInt(dayDataList[currentDay]["startPost"]);
  }
  if (dayDataList[currentDay] && dayDataList[currentDay]["endSelected"] == "end-post") {
    end = parseInt(dayDataList[currentDay]["endPost"]);
  }
  var voteLog = getVoteLogForRange(start, end);
  $("#data-container").val(voteLog);
  $("#data-container").select();
  document.execCommand("copy");
  $("#data-container").remove();
}

function toggleGameConfig(toggleButton) {
  if ($("#game-configuration").is(":visible")) {
    localStorage.setItem("threadScriptMode" + threadId, "1");
    $("#game-configuration").slideUp(function() {
      $("#toggle-game-configuration").text("Show game configuration");
    });
  } else {
    localStorage.setItem("threadScriptMode" + threadId, "2");
    $("#game-configuration").slideDown();
    toggleButton.text("Hide game configuration");
  }
}

function togglePlayerState(toggleButton) {
  if (toggleButton.text() == "alive") {
    if (toggleButton.closest(".player-block").find(".death-phase").text() == "night") {
      playerStatusList[toggleButton.parent().attr("name")] = currentDay * 2;
    } else {
      playerStatusList[toggleButton.parent().attr("name")] = currentDay * 2 - 1;
    }
    localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
    toggleButton.closest(".player-block").removeClass("alive-player").addClass("dead-player");
    toggleButton.text(getLifeStatus(currentDay));
    toggleButton.closest(".player-block").find(".death-time").text(currentDay);
    
  } else {
    playerStatusList[toggleButton.parent().attr("name")] = 0;
    localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
    toggleButton.closest(".player-block").removeClass("dead-player").addClass("alive-player");
    toggleButton.text(getLifeStatus(0));
  }
}

function toggleDeathPhase(toggleButton) {
  if (toggleButton.text() == "night") {
    toggleButton.text(getPhaseName(playerStatusList[toggleButton.closest(".player-block").attr("name")]));
    playerStatusList[toggleButton.closest(".player-block").attr("name")] -= 1;
    localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
    toggleButton.text("day");
  } else {
    toggleButton.text(getPhaseName(playerStatusList[toggleButton.closest(".player-block").attr("name")]));
    playerStatusList[toggleButton.closest(".player-block").attr("name")] += 1;
    localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
    toggleButton.text("night");
  }
}

function changeDeathTime(toggleButton) {
  var newState = prompt("Enter the night of death.");
  if (newState) {
    newState = parseInt(newState);
    if (newState > 0) {
      if (toggleButton.closest(".death-info").find(".death-phase").text() == "night") {
        playerStatusList[toggleButton.closest(".player-block").attr("name")] = newState * 2;
      } else {
        playerStatusList[toggleButton.closest(".player-block").attr("name")] = newState * 2 - 1;
      }
      localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
      toggleButton.text(newState);
    }
  }
}

function changeDayCount(change) {
  if (change > 0) {
    numberDaysTotal++;
    addDayTabGui(numberDaysTotal);
    dayDataList[numberDaysTotal] = {
      "startDate": new Date(),
      "startPost": "1",
      "startSelected": "start-post",
      "endDate": new Date(),
      "endSelected": "end-date"
    };
    colourDayTab(numberDaysTotal);
    switchDay(numberDaysTotal);
  } else {
    if (numberDaysTotal > 1) {
      deleteDayData(numberDaysTotal);
      numberDaysTotal--;
      if (currentDay > numberDaysTotal) {
        switchDay(numberDaysTotal);
      }
      $("#day-tab-container .day-tab[name='" + (numberDaysTotal + 1) + "']").remove();
    }
  }
  localStorage.setItem("dayCount" + threadId, numberDaysTotal + "");
}

function colourDayTab(day) {
  var dayTab = $(".day-tab[name='" + day + "']");
  dayTab.removeClass("partial-data-day full-data-day empty-data-day");
  if (dayDataList[day]) {
    if (dayDataList[day]["startSelected"] && dayDataList[day]["endSelected"]) {
      dayTab.addClass("full-data-day")
    } else if (dayDataList[day]["startSelected"] || dayDataList[day]["endSelected"]) {
      dayTab.addClass("partial-data-day");
    } else {
      dayTab.addClass("empty-data-day");
    }
  } else {
    dayTab.addClass("empty-data-day");
  }
}

function combinedData() {
  var combinedData = {};
  $(".full-save, .partial-save").each(function() {
    pg = $(this).text();
    //This 'concatenates' two objects
    jQuery.extend(combinedData, getPageData(pg));
  });
  return combinedData;
}

function parseAllVotes() {
  var fulldata = combinedData();
  Object.keys(fulldata).forEach(function(post) {
    var raw = fulldata[post]["r"];
    var voteType = getVoteType(raw);
    var voteTarget = getVoteTarget(raw);
    if (voteType != 0) {
      recognisedVoteList[post] = {};
      recognisedVoteList[post]["user"] = fulldata[post]["u"];
      recognisedVoteList[post]["type"] = voteType;
      recognisedVoteList[post]["target"] = voteTarget;
      recognisedVoteList[post]["time"] = fulldata[post]["t"];
      recognisedVoteList[post]["link"] = fulldata[post]["l"];
      recognisedVoteList[post]["raw"] = raw;
    }
  });
}

function getVoteType(vote) {
  var hasVote = false;
  var hasUnvote = false;
  var lastUnvote = vote.lastIndexOf(unvoteKeyword);
  var lastVote = vote.lastIndexOf(voteKeyword);
  var char_diffs = unvoteKeyword.length - voteKeyword.length;
  if (vote.indexOf(unvoteKeyword) >= 0) {
    hasUnvote = true;
  }
  if (vote.replace(new RegExp(unvoteKeyword, "g"), "").indexOf(voteKeyword) >= 0) {
    hasVote = true;
  }
  if (hasVote == true) {
    if (hasUnvote == true) {
      if (lastUnvote >= lastVote - char_diffs) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 2;
    }
  } else if (hasUnvote == true) {
    return -1;
  } else {
    return 0;
  }
}

function getVoteTarget(vote) {
  var voteTarget = vote.split(":").pop().split(unvoteKeyword).pop().split(voteKeyword).pop().trim();
  if (voteTarget == "") {
    return null;
  } else if (playerNameList.length > 0) {
    return matchPlayer(voteTarget);
  } else {
    return voteTarget;
  }
}

function compareDates(a, b) {
  var date1 = new Date(a).getTime();
  var date2 = new Date(b).getTime();
  if (date1 == date2) {
    return 0;
  } else if (date1 > date2) {
    return 1;
  } else {
    return -1;
  }
}

function getTallyForRange(start, end) {
  parseAllVotes();
  var playerVotes = {};
  var totalVotes = {};
  Object.keys(recognisedVoteList).forEach(function(post) {
    post = parseInt(post);
    if (typeof start === "string" || start instanceof Date) {
      start = new Date(start);
      if (compareDates(start, recognisedVoteList[post]["time"]) > 0) {
        return;
      }
    } else {
      if (start > post) {
        return;
      }
    }
    if (typeof end === "string" || end instanceof Date) {
      end = new Date(end);
      if (compareDates(end, recognisedVoteList[post]["time"]) < 0) {
        return;
      }
    } else {
      if (end < post) {
        return;
      }
    }
    var vote = recognisedVoteList[post];
    var type = vote["type"];
    if (!playerVotes[vote["user"]]) {
      if (playerNameList.length > 0 && $.inArray(vote["user"], playerNameList) == -1) {
        registerUnrecognisedVoter(vote["user"]);
      }
      playerVotes[vote["user"]] = {};
    }
    if (!playerVotes[vote["user"]]["post"] || parseInt(post) > playerVotes[vote["user"]]["post"]) {
      playerVotes[vote["user"]]["post"] = post;
      playerVotes[vote["user"]]["link"] = vote["link"];
      if (type == 2 || type == 1) {
        playerVotes[vote["user"]]["target"] = vote["target"];
      } else if (type == -1) {
        playerVotes[vote["user"]]["target"] = "";
      }
    }
  });
  for (var i in playerNameList) {
    if (playerStatusList[playerNameList[i]] != 0 && playerStatusList[playerNameList[i]] < currentDay * 2) {
      continue;
    }
    if (!playerVotes.hasOwnProperty(playerNameList[i])) {
      playerVotes[playerNameList[i]] = {
        "target": "",
        "post": 0,
        "link": ""
      };
    }
  }
  Object.keys(playerVotes).sort(function(a, b) {
    return playerVotes[a]["post"] - playerVotes[b]["post"];
  }).forEach(function(user) {
    var target = playerVotes[user]["target"];
    if (!totalVotes[target]) {
      totalVotes[target] = [];
    }
    totalVotes[target].push([user, playerVotes[user]["post"], playerVotes[user]["link"]]);
  });
  return totalVotes;
}

function getVoteLogForRange(start, end) {
  parseAllVotes();
  var voteLog = "";
  Object.keys(recognisedVoteList).sort(function(a, b) {
    return a - b;
  }).filter(function(post) {
    return post >= start && post <= end;
  }).forEach(function(post) {
    var type = recognisedVoteList[post]["type"];
    voteLog += "[" + post + "] ";
    voteLog += recognisedVoteList[post]["user"];
    if (type == 2) {
      voteLog += " votes " + recognisedVoteList[post]["target"];
    } else if (type == 1) {
      voteLog += " unvotes and votes " + recognisedVoteList[post]["target"];
    } else if (type == -1) {
      voteLog += " unvotes" + (recognisedVoteList[post]["target"] != null ? " " + recognisedVoteList[post]["target"] : "");
    } else {
      //Should not happen
      voteLog += " exposes a bug in this script";
    }
    voteLog += " (" + getPostLink(recognisedVoteList[post]["link"]) + ")\n";
  });
  return voteLog;
}

function tallyToBbcode(tally) {
  var bbcode = "";
  Object.keys(tally).filter(function(target) {
    return (target == "" ? false : true);
  }).sort(function(a, b) {
    return tally[b].length - tally[a].length;
  }).forEach(function(target) {
    var voterList = [];
    for (var voter in tally[target]) {
      voterList.push(tally[target][voter][0]);
    }
    bbcode += "[b]" + target + " (" + tally[target].length + ")[/b] - " + voterList.join(", ") + "\n";
  });
  if (tally.hasOwnProperty("")) {
    var voterList = [];
    for (var i in tally[""]) {
      voterList.push(tally[""][i][0]);
    }
    bbcode += "[b]Yet to vote (" + voterList.length + ")[/b] - " + voterList.join(", ");
  }
  return bbcode;
}

function tallyToHtml(tally) {
  var html = "";
  Object.keys(tally).filter(function(target) {
    return (target == "" ? false : true);
  }).sort(function(a, b) {
    //This sorts tally by the length of each voter list - how many people are voting for user a vs how many people are voting for user b
    return tally[b].length - tally[a].length;
  }).forEach(function(target) {
    var voterList = "";
    for (var voter in tally[target]) {
      if ($.inArray(tally[target][voter][0], unrecognisedVoterList) >= 0) {
        voterList += "<span class='voter-wrap'><a class='vote-link' href='" + getPostLink(tally[target][voter][2]) + "'>" + tally[target][voter][1] + "</a><span class='voter-name unrecognised-voter' name='" + tally[target][voter][0] + "'>" + tally[target][voter][0] + "</span></span>";
      } else {
        voterList += "<span class='voter-wrap'><a class='vote-link' href='" + getPostLink(tally[target][voter][2]) + "'>" + tally[target][voter][1] + "</a><span class='voter-name'>" + tally[target][voter][0] + "</span></span>";
      }
    }
    html += "<span class='vote-count'>" + tally[target].length + "</span><span class='voted-name'>" + target + "</span><span class='voter-name-list'>" + voterList + "</span><br>";
  });
  if (tally.hasOwnProperty("")) {
    var voterList = "";
    for (var i in tally[""]) {
      voterList += "<span class='voter-wrap'><span class='voter-name'>" + tally[""][i][0] + "</span></span>";
    }
    html += "<span class='vote-count no-vote'>" + tally[""].length + "</span><span class='voted-name no-vote'>No vote</span><span class='voter-name-list'>" + voterList + "</span><br>";
  }
  return html;
}

function registerUnrecognisedVoter(user) {
  if ($.inArray(user, unrecognisedVoterList) == -1) {
    var recognisedVoter = false;
    for (var i in playerNameList) {
      if (diceCoefficient(playerNameList[i], user) > 0.9) {
        $(".player-block[name='" + playerNameList[i] + "'] .player-name").text(user);
        $(".player-block[name='" + playerNameList[i] + "']").attr("name", user);
        editPlayerName(playerNameList[i], user);
        recognisedVoter = true;
        return;
      }
    }
    if (!recognisedVoter) {
      unrecognisedVoterList.push(user);
      localStorage.setItem("unrecognisedVoterList" + threadId, JSON.stringify(unrecognisedVoterList));
    }
  }
}

function getBigrams(string) {
  var getBigrams = [];
  for (var i = 0; i < string.length - 1; i++) {
    getBigrams.push(string.slice(i, i+2));
  }
  return getBigrams;
}

function diceCoefficient(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a == b) {
    return 1;
  }
  var pairs1 = getBigrams(a);
  var pairs2 = getBigrams(b);
  var totalSize = pairs1.length + pairs2.length;
  var score = 0;
  for (a in pairs1) {
    for (b in pairs2) {
      if (pairs1[a] == pairs2[b]) {
        score++;
        pairs2.splice(b, 1);
        break;
      }
    }
  }
  return 2 * score / totalSize;
}

function matchPlayer(string) {
  var closestMatch = "No lynch";
  var highestScore = diceCoefficient(string, "No lynch");
  if (highestScore == 1) {
    return closestMatch;
  }
  for (var i in playerNameList) {
    var score = diceCoefficient(string, playerNameList[i]);
    if (score == 1) {
      return playerNameList[i];
    }
    if (score > highestScore) {
      closestMatch = playerNameList[i];
      highestScore = score;
    }
    if (playerNicknameList.hasOwnProperty(playerNameList[i])) {
      for (var j in playerNicknameList[playerNameList[i]]) {
        var score = diceCoefficient(string, playerNicknameList[playerNameList[i]][j]);
        if (score > highestScore) {
          closestMatch = playerNameList[i];
          highestScore = score;
        }
      }
    }
  }
  for (var i in subNameList) {
    for (var j in subNameList[i]) {
      var score = diceCoefficient(string, subNameList[i][j]);
      if (score == 1) {
        return i;
      }
      if (score >= highestScore) {
        closestMatch = i;
        highestScore = score;
      }
    }
  }
  return closestMatch;
}

function matchPlayerByDay(string, day) {
  return matchPlayer(string);
}

function isAlive(player, day) {
  return true;
}

function addGm(gmName) {
  if ($.inArray(gmName, gmNameList) == -1) {
    gmNameList.push(gmName);
    localStorage.setItem("gmNameList" + threadId, JSON.stringify(gmNameList));
    addGmGui(gmName);
    if (gmNameList.length == 1) {
      generateData();
    }
  }
}

function addGmGui(gmName) {
  $("<button />", {
    class: "gm-name input-button",
    text: gmName
  }).appendTo($("#gm-names"));
}

function addPlayer(playerName) {
  if ($.inArray(playerName, playerNameList) == -1) {
    playerNameList.push(playerName);
    localStorage.setItem("playerNameList" + threadId, JSON.stringify(playerNameList));
    for (var i in unrecognisedVoterList) {
      if (diceCoefficient(unrecognisedVoterList[i], playerName) > 0.9) {
        unrecognisedVoterList.splice(i, 1);
        localStorage.setItem("unrecognisedVoterList" + threadId, JSON.stringify(unrecognisedVoterList));
        $(".unrecognised-voter[name='" + playerName + "']").removeClass("unrecognised-voter");
        break;
      }
    }
    addPlayerGui(playerName);
  }
}

function addPlayerGui(playerName) {
  return $("<li />", {
    class: "player-block alive-player",
    name: playerName
  })
    .append($("<button />", {
      class: "player-name input-button edit-button",
      text: playerName
    }))
    .append($("<button />", {
      class: "player-state input-button",
      text: "alive"
    }))
    .append($("<div />", {
      class: "death-info"
    })
    .append($("<button />", {
      class: "death-phase input-button",
      text: "night"
    }))
    .append($("<button />", {
      class: "death-time input-button",
      text: "1"
    })))
    .append($("<span />", {
      class: "sub-list"
    }))
    .append($("<span />", {
      class: "player-controls"
    })
    .append($("<button />", {
      class: "add-sub function-button",
      text: "+Alias"
    }))
    .append($("<button />", {
      class: "remove-player function-button",
      text: "-"
    })))
    .appendTo("#player-list");
}

function removePlayer(playerName) {
  index = $.inArray(playerName, playerNameList);
  if (index >= 0) {
    playerNameList.splice(index, 1);
    localStorage.setItem("playerNameList" + threadId, JSON.stringify(playerNameList));
    if (subNameList.hasOwnProperty(playerName)) {
      delete subNameList[playerName];
      localStorage.setItem("subNameList" + threadId, JSON.stringify(subNameList));
    }
    if (playerStatusList.hasOwnProperty(playerName)) {
      delete playerStatusList[playerName];
      localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
    }
    $(".player-block[name='" + playerName + "']").remove();
  }
}

function clearPlayers() {
  playerNameList = [];
  subNameList = {};
  playerNicknameList = {};
  playerStatusList = {};
  localStorage.setItem("playerNameList" + threadId, JSON.stringify(playerNameList));
  localStorage.setItem("subNameList" + threadId, JSON.stringify(subNameList));
  localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
  $("#player-list").text("");
}

function addSub(playerName, subName) {
  if (!subNameList[playerName]) {
    subNameList[playerName] = [];
  }
  if ($.inArray(subName, subNameList[playerName]) >= 0) {
    return;
  }
  subNameList[playerName].push(subName);
  localStorage.setItem("subNameList" + threadId, JSON.stringify(subNameList));
  addSubGui(playerName, subName);
}

function addSubGui(playerName, subName) {
  if ($(".player-block[name='" + playerName + "'] .sub-list").text().length > 0) {
    $(".player-block[name='" + playerName + "'] .sub-list").append("<button class='sub-name input-button'>" + subName + "</button>");
  } else {
    $(".player-block[name='" + playerName + "'] .sub-list").append("subbing for<button class='sub-name input-button'>" + subName + "</button>");
  }
}

function removeSub(playerName, subName) {
  index = $.inArray(subName, subNameList[playerName]);
  if (index >= 0) {
    subNameList[playerName].splice(index, 1);
    if (subNameList[playerName].length == 0) {
      subNameList[playerName] = "";
      $(".player-block[name='" + playerName + "']").children(".sub-list").text("");
    }
    localStorage.setItem("subNameList" + threadId, JSON.stringify(subNameList));
    $(".player-block[name='" + playerName + "']").find(".sub-name").filter(function() {return $(this).text() == subName;}).remove();
  }
}

function generateNicknames() {
  for (var i in playerNameList) {
    var player = playerNameList[i];
    if (!playerNicknameList.hasOwnProperty(player)) {
      playerNicknameList[player] = [];
    }
    if (player.indexOf(" ") >= 0) {
      var newNick = "";
      var splitName = player.split(" ");
      for (var c in splitName) {
        newNick += splitName[c].charAt(0);
      }
      playerNicknameList[player].push(newNick);
    }
    if (player.indexOf("_") >= 0) {
      var newNick = "";
      var splitName = player.split("_");
      for (var c in splitName) {
        newNick += splitName[c].charAt(0);
      }
      if ($.inArray(newNick, playerNicknameList[player]) == -1) {
        playerNicknameList[player].push(newNick);
      }
    }
    var uppercaseName = getUpperCase(player);
    var nonLowercaseName = getNonLowerCase(player);
    var lowercaseName = getLowerCase(player);
    if (uppercaseName.length > 1 && lowercaseName.length > 2) {
      if ($.inArray(nonLowercaseName, playerNicknameList[player]) == -1) {
        playerNicknameList[player].push(nonLowercaseName);
      }
    } else if(nonLowercaseName.length > 5 && lowercaseName.length > 1) {
      if ($.inArray(lowercaseName, playerNicknameList[player]) == -1) {
        playerNicknameList[player].push(lowercaseName);
      }
    }
  }
}

function getUpperCase(string) {
  var result = "";
  for (var i in string) {
    var c = string.charAt(i);
    if (c.toUpperCase() == c.toLowerCase()) {
      continue;
    } else if (c == c.toUpperCase()) {
      result += c;
    }
  }
  return result;
}

function getNonLowerCase(string) {
  var result = "";
  for (var i in string) {
    var c = string.charAt(i);
    if (c == c.toUpperCase()) {
      result += c;
    }
  }
  return result;
}

function getLowerCase(string) {
  var result = "";
  for (var i in string) {
    var c = string.charAt(i);
    if (c.toUpperCase() == c.toLowerCase()) {
      continue;
    } else if (c == c.toLowerCase()) {
      result += c;
    }
  }
  return result;
}

function validateTime(time) {
  var validTime = parseInt(time.replace(":","").replace(" ","").replace("h","").replace(".",""));
  if (validTime >= 100) {
    var hour = Math.floor(validTime / 100);
    var minute = validTime % 100;
    if (minute < 60) {
      if (hour < 24) {
        if (hour <= 11 && time.toLowerCase().indexOf("pm") >= 0) {
          return validTime + 1200;
        } else if (hour >= 12 && time.toLowerCase().indexOf("am") >= 0) {
          return validTime - 1200;
        } else {
          return validTime;
        }
      }
    }
  } else if (validTime < 24) {
    if (validTime <= 11 && time.toLowerCase().indexOf("pm") >= 0) {
      return (validTime + 12) * 100;
    } else if (validTime >= 12 && time.toLowerCase().indexOf("am") >= 0) {
      return (validTime - 12) * 100;
    } else {
      return validTime * 100;
    }
  }
  return -1;
}

function padTime(time) {
  var paddedTime = time + "";
  while (paddedTime.length < 4) {
    paddedTime = "0" + paddedTime;
  }
  return paddedTime.substr(0, 2) + ":" + paddedTime.substr(2);
  return paddedTime;
}

function getTimeZone() {
  var timeString = $("div.page div.smallfont").last().text(); //Gets string at bottom which tells time zone
  timeString = timeString.split("GMT")[1].split(". ")[0]; //Get between "GMT " and ". "
  return parseFloat(timeString.replace("+","").trim());
}

function getOffsetDate(date, days, hours) {
  return new Date(date.getTime() + (days * 24 + hours) * 60 * 60 * 1000);
}

function parseDateFromString(string) {
  string = string.replace(/,/g, "");
  var date = new Date();
  var stringArr = string.split(" ");
  var timeArr = stringArr.slice(-2);
  var time = timeArr[0].split(":");
  var hours = parseInt(time[0]);
  var minutes = parseInt(time[1]);
  if (timeArr[1] == "PM") {
    hours += 12;
  }
  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);
  var dateToday = new Date();
  if (stringArr[0] == "Today") {
    var relativeDate = getOffsetDate(dateToday, 0, timeZone);
    date.setUTCFullYear(relativeDate.getUTCFullYear());
    date.setUTCMonth(relativeDate.getUTCMonth());
    date.setUTCDate(relativeDate.getUTCDate());
  } else if (stringArr[0] == "Yesterday") {
    var relativeDate = getOffsetDate(dateToday, -1, timeZone); //Get yesterday's date in current time zone
    date.setUTCFullYear(relativeDate.getUTCFullYear());
    date.setUTCMonth(relativeDate.getUTCMonth());
    date.setUTCDate(relativeDate.getUTCDate());
  } else {
    var dateArr = stringArr.slice(1, -2);
    var month = monthNames[dateArr[0].toLowerCase()];
    var day = parseInt(dateArr[1].replace("s","").replace("t","").replace("h","").replace("r","").replace("n","").replace("d",""));
    date.setUTCDate(day);
    date.setUTCMonth(month);
    date.setUTCFullYear(parseInt(dateArr[2]));
  }
  date = getOffsetDate(date, 0, -timeZone); //Converting to UTC time
  return date;
}

function getThreadId() {
  return parseInt($("a.smallfont").first().attr("href").split("&")[0].split("=")[1]);
}

function getPageLink(thread, page) {
  return "http://forums.kingdomofloathing.com/vb/showthread.php?t=" + thread + "&page=" + page;
}

function getPostLink(postId) {
  return "http://forums.kingdomofloathing.com/vb/showthread.php?p=" + postId;
}

function getPageStatus(thread, page) {
  numSaved = localStorage.getItem("pageStatus" + thread + "-" + page)
  if (!numSaved) {
    return 0;
  } else {
    return parseInt(numSaved);
  }
}

function getPageData(page) {
  return JSON.parse(localStorage.getItem("pageData" + threadId + "-" + page));
}

function getPostUsername(post) {
  return post.find(".bigusername").text();
}

function getPostTime(post) {
  return post.find(".thead").first().text().trim();
}

function getPostBody(post) {
  return post.find(".alt1").children("div");
}

function getPostBoldText(post) {
  return post.find(".alt1").children("div").children("b");
}

function getPostId(post) {
  return post.find(".thead").children("[id^=postcount]").attr("id").replace("postcount","");
}

function getPostNumber(post) {
  return post.find(".thead").children("[id^=postcount]").attr("name");
}

function generateData() {
  var data = {};
  $("#posts").find(".page").each(function () {
    var username = getPostUsername($(this));
    var boldPost = getPostBoldText($(this));
    if (boldPost.length > 0 || (includeGm && $.inArray(username, gmNameList) > -1)) {
      if ($.inArray(username, ignoredPlayerList) > -1 || !includeGm && $.inArray(username, gmNameList) > -1) {
        return true;
      }
      var boldedContent = "";
      if (!includeGm || $.inArray(username, gmNameList) == -1) {
        boldPost.each(function () {
          var content = $(this).html().replace(/(['"])/g, '\\$1').replace(/\n/g, " ").toLowerCase();
          if (content.indexOf(voteKeyword) >= 0 || content.indexOf(unvoteKeyword) >= 0) {
            boldedContent += content.trim();
          }
        });
        if (boldedContent.length == 0) {
          return true;
        }
        var postData = {
          "u": username, //User
          "t": parseDateFromString(getPostTime($(this))), //Time
          "r": boldedContent, //Raw vote: Parts of post that involve voting
          "l": getPostId($(this)) //Used to link to post
        };
      } else {
        //Post content
        postData.c = getPostContent($(this)).html().replace(/(['"])/g, '\\$1').replace(/\n/g, " ").trim();
      }
      //Post number
      data[getPostNumber($(this))] = postData;
    }
  });
  if (currentPage > 0 && threadId > 0) {
    localStorage.setItem("pageStatus" + threadId + "-" + currentPage, numberPostsOnPage + "");
    localStorage.setItem("pageData" + threadId + "-" + currentPage, JSON.stringify(data));
    $(".page-link[page='" + currentPage + "']").removeClass("partial-save empty-save").addClass("full-save");
  }
}

function resetData() {
  localStorage.removeItem("threadScriptMode" + threadId);
  localStorage.removeItem("gmNameList" + threadId);
  localStorage.removeItem("playerNameList" + threadId);
  localStorage.removeItem("subNameList" + threadId);
  localStorage.removeItem("dayDataList" + threadId);
  localStorage.removeItem("dayCount" + threadId);
  localStorage.removeItem("savedTallyList" + threadId);
  localStorage.removeItem("dayDataList" + threadId);
  localStorage.removeItem("selectedData" + threadId);
  localStorage.removeItem("nightfallTime" + threadId);
  localStorage.removeItem("playerStatusList" + threadId);
  localStorage.removeItem("tallyDisplay" + threadId);
  localStorage.removeItem("unrecognisedVoterList" + threadId);
  $(".full-save, .partial-save").each(function() {
    pg = $(this).text();
    localStorage.removeItem("pageData" + threadId + "-" + pg);
    localStorage.removeItem("pageStatus" + threadId + "-" + pg);
  });
  threadScriptMode = 0;
  includeGm = false;
  unvoteKeyword = "unvote";
  voteKeyword = "vote";
  gmNameList = [];
  playerNameList = [];
  subNameList = {};
  playerNicknameList = {};
  playerStatusList = {};
  savedTallyList = {};
  recognisedVoteList = {};
  unrecognisedVoterList = [];
  dayDataList = {};
  numberDaysTotal = 1;
  currentDay = 1;
  nightfallTime = 2000;
  isTallyPopout = false;
}

function resetScript() {
  $("#fmu-main-container").remove();
  $("#toggle-script").text("Start game");
}