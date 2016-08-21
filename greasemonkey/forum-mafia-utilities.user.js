// ==UserScript==
// @name        Forum Mafia Utilities
// @namespace   lrdwhyt
// @description Number of added functionalities to make playing forum mafia easier. Designed for Forums of Loathing.
// @include     http://forums.kingdomofloathing.com/vb/showthread.php?*
// @version     0.2.2
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
.partial-data-day {
  background-color: var(--med-color);
}
.partial-data-day:hover {
  background-color: var(--med-color-highlighted);
}
.empty-data-day {
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
.page-selected, .day-tabed {
  padding-bottom: 2px !important;
  border-bottom: 3px solid var(--dark-contrast-color);
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
  background-color: #f5f5f5;
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
  -moz-transition-duration: 0.5s;
  -webkit-transition-duration: 0.5s;
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
#toggle-game-configuration-container {
  background-color: var(--light-color);
  padding: 10px;
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
#data-container {
  height: 0;
  opacity: 0;
}
#game-configuration {
  background-color: var(--light-color);
  display: none;
  padding: 10px;
}
.boundary-option {
  border-bottom: 3px solid #fff;
  padding-bottom: 6px !important;
}
.boundary-option.boundary-option-selected {
  border-bottom: 3px solid var(--dark-contrast-color);
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
numberDaysTotal = 1;
currentDay = 1; //The day that is selected by the user
nightfallTime = 2000; //Default time for nightfall
isTallyPopout = false;

$(document).ready(function () {
  threadId = getThreadId();
  threadScriptMode = parseInt(localStorage.getItem("threadScriptMode" + threadId));
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
    .append($("<span />", {
      text: "Start"
    }))
    .append($("<button />", {
      id: "start-post",
      class: "boundary-option input-button edit-button"
    }))
    .append($("<button />", {
      id: "start-time",
      class: "boundary-option input-button edit-button"
    }))
    .append($("<br />"))
    .append($("<span />", {
      text: "End"
    }))
    .append($("<button />", {
      id: "end-post",
      class: "boundary-option input-button edit-button"
    }))
    .append($("<button />", {
      id: "end-time",
      class: "boundary-option input-button edit-button"
    }))
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
      text: nightfallTime
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
  for (var pg = 1; pg <= pageTotal; pg++) {
    pageStatus = getPageStatus(threadId, pg);
    newBlock = $("<a />", {
      class: "page-link",
      href: getPageLink(threadId, pg),
      page: pg,
      text: pg
    }).appendTo($("#page-controls"));
    if (pg == currentPage) {
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
      if (playerStatusList.hasOwnProperty(playerNameList[i])) {
        var playerStatus = playerStatusList[playerNameList[i]];
        $(".player-block[name='" + playerNameList[i] + "'] .player-state").text(getLifeStatus(playerStatus));
        $(".player-block[name='" + playerNameList[i] + "'] .death-phase").text(getPhaseName(playerStatus));
        $(".player-block[name='" + playerNameList[i] + "'] .death-time").text(getDeathTime(playerStatus));
        if (playerStatusList[playerNameList[i]] == -1) {
          playerEle.addClass("alive-player");
        } else {
          playerEle.addClass("dead-player");
        }
      } else {
        playerEle.addClass("alive-player");
      }
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
  $("#update-tally").click(function() {
    if (playerNameList.length > 0) {
      generateNicknames();
    }
    var start = 1;
    var end = 200000;
    if (dayDataList[currentDay] && dayDataList[currentDay]["startSelected"] == "start-post") {
      start = parseInt(dayDataList[currentDay]["startPost"]);
    }
    if (dayDataList[currentDay] && dayDataList[currentDay]["endSelected"] == "end-post") {
      end = parseInt(dayDataList[currentDay]["endPost"]);
    }
    var tally = getTallyForRange(start, end);
    savedTallyList[currentDay] = tally;
    localStorage.setItem("savedTallyList" + threadId, JSON.stringify(savedTallyList));
    $("#tally-body").html(tallyToHtml(tally));
  });
  $("#copy-tally").click(function () {
    if (savedTallyList[currentDay]) {
      $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
      $("#data-container").val(tallyToBbcode(savedTallyList[currentDay]));
      $("#data-container").select();
      document.execCommand("copy");
      $("#data-container").remove();
    }
  });
  $("#copy-vote-log").click(function() {
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
  })
  $("#toggle-tally-display").click(function() {
    if (isTallyPopout == true) {
      isTallyPopout = false;
      localStorage.setItem("tallyDisplay" + threadId, "");
      $("#tally-container").removeClass("floating");
      $(this).text("Pop out");
    } else {
      isTallyPopout = true;
      localStorage.setItem("tallyDisplay" + threadId, "1");
      $("#tally-container").addClass("floating");
      $(this).text("Close");
    }
  });
  if (localStorage.getItem("tallyDisplay" + threadId)) {
    $("#toggle-tally-display").click();
  }
  $("#toggle-game-configuration").click(function() {
    if ($("#game-configuration").is(":visible")) {
      localStorage.setItem("threadScriptMode" + threadId, "1");
      $("#game-configuration").slideUp(function() {
        $("#toggle-game-configuration").text("Show game configuration");
      });
    } else {
      localStorage.setItem("threadScriptMode" + threadId, "2");
      $("#game-configuration").slideDown();
      $(this).text("Hide game configuration");
    }
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
  $("#start-post").click(function() {
    if (dayDataList[currentDay] && dayDataList[currentDay]["startPost"]) {
      post = prompt("Enter the post number to start from", dayDataList[currentDay]["startPost"]);
    } else {
      post = prompt("Enter the post number to start from");
    }
    if (post && parseInt(post) > 0) {
      if (!dayDataList[currentDay]) {
        dayDataList[currentDay] = {};
      }
      if (dayDataList[currentDay]["endPost"]) {
        if (parseInt(post) > dayDataList[currentDay]["endPost"]) {
          return true;
        }
      }
      dayDataList[currentDay]["startPost"] = post;
      dayDataList[currentDay]["startSelected"] = "start-post";
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      colourDayTab(currentDay);
      switchDay(currentDay);
    }
  });
  $("#end-post").click(function() {
    if (dayDataList[currentDay] && dayDataList[currentDay]["endPost"]) {
      post = prompt("Enter the post number to end on", dayDataList[currentDay]["endPost"]);
    } else {
      post = prompt("Enter the post number to end on");
    }
    if (post && parseInt(post) > 0) {
      if (!dayDataList[currentDay]) {
        dayDataList[currentDay] = {};
      }
      if (dayDataList[currentDay]["startPost"]) {
        if (parseInt(post) < dayDataList[currentDay]["startPost"]) {
          return true;
        }
      }
      dayDataList[currentDay]["endPost"] = post;
      dayDataList[currentDay]["endSelected"] = "end-post";
      localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
      colourDayTab(currentDay);
      switchDay(currentDay);
    }
  });
  $("#add-gm").click(function() {
    newGm = prompt("Enter the name of the GM you want to add");
    if (newGm) {
      addGm(newGm);
    }
  });
  $("#gm-names").on("click", ".gm-name", function() {
    gmNameList.splice($.inArray($(this).text(), gmNameList), 1);
    localStorage.setItem("gmNameList" + threadId, JSON.stringify(gmNameList));
    $(this).remove();
  });
  $("#nightfall-time").click(function() {
    nightfallTime = prompt("Enter new time for night");
    $(this).text(nightfallTime);
    if (nightfallTime) {
      localStorage.setItem("nightfallTime" + threadId, nightfallTime);
      nightfallTime = parseInt(nightfallTime);
    }
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
  $("#confirm-paste").click(function() {
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
  });
  $("#reset-players").click(function() {
    clearPlayers();
  });
  $("#player-list").on("click", ".player-name", function() {
    var oldName = $(this).text();
    var newName = prompt("Enter new player name.", oldName);
    if (newName) {
      editPlayerName(oldName, newName);
      $(this).text(newName);
      $(this).parents(".player-block").attr("name", newName);
    } else if (newName == "") {
      removePlayer(oldName);
    }
  });
  $("#player-list").on("click", ".player-state", function() {
    if ($(this).text() == "alive") {
      if ($(this).closest(".player-block").find(".death-phase").text() == "night") {
        playerStatusList[$(this).parent().attr("name")] = currentDay * 2;
      } else {
        playerStatusList[$(this).parent().attr("name")] = currentDay * 2 - 1;
      }
      localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
      $(this).closest(".player-block").removeClass("alive-player").addClass("dead-player");
      $(this).text(getLifeStatus(currentDay));
      $(this).closest(".player-block").find(".death-time").text(currentDay);
      
    } else {
      playerStatusList[$(this).parent().attr("name")] = -1;
      localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
      $(this).closest(".player-block").removeClass("dead-player").addClass("alive-player");
      $(this).text(getLifeStatus(-1));
    }
  });
  $("#player-list").on("click", ".death-phase", function() {
    if ($(this).text() == "night") {
      $(this).text(getPhaseName(playerStatusList[$(this).closest(".player-block").attr("name")]));
      playerStatusList[$(this).closest(".player-block").attr("name")] -= 1;
      localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
      $(this).text("day");
    } else {
      $(this).text(getPhaseName(playerStatusList[$(this).closest(".player-block").attr("name")]));
      playerStatusList[$(this).closest(".player-block").attr("name")] += 1;
      localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
      $(this).text("night");
    }
  });
  $("#player-list").on("click", ".death-time", function() {
    var newState = prompt("Enter the night of death.");
    if (newState) {
      newState = parseInt(newState);
      if (newState > 0) {
        if ($(this).closest(".death-info").find(".death-phase").text() == "night") {
          playerStatusList[$(this).closest(".player-block").attr("name")] = newState * 2;
        } else {
          playerStatusList[$(this).closest(".player-block").attr("name")] = newState * 2 - 1;
        }
        localStorage.setItem("playerStatusList" + threadId, JSON.stringify(playerStatusList));
        $(this).text(newState);
      }
    }
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

function getLifeStatus(state) {
  if (state == -1) {
    return "alive";
  } else {
    return "dead";
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
  $(".day-tab").removeClass("day-tabed");
  $(".day-tab[name='" + day + "']").addClass("day-tabed");
  if (dayDataList[day]) {
    $(".boundary-option").removeClass("boundary-option-selected");
    if (dayDataList[day]["startPost"]) {
      $("#start-post").text("Post #" + dayDataList[day]["startPost"]);
    } else {
      $("#start-post").text("Post #?");
    }
    if (dayDataList[day]["startSelected"]) {
      $("#" + dayDataList[day]["startSelected"]).addClass("boundary-option-selected");
    }
    $("#start-time").text(nightfallTime + 1);
    if (dayDataList[day]["endSelected"]) {
      $("#" + dayDataList[day]["endSelected"]).addClass("boundary-option-selected");
    }
    if (dayDataList[day]["endPost"]) {
      $("#end-post").text("Post #" + dayDataList[day]["endPost"]);
    } else {
      $("#end-post").text("Post #?");
    }
    $("#end-time").text(nightfallTime);
  } else {
    $(".boundary-option").removeClass("boundary-option-selected");
    $("#start-post").text("Post #?");
    $("#start-time").text(nightfallTime + 1);
    $("#end-post").text("Post #?");
    $("#end-time").text(nightfallTime);
  }
  if (savedTallyList[day]) {
    $("#tally-body").html(tallyToHtml(savedTallyList[day]));
  } else {
    $("#tally-body").html("");
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

function changeDayCount(change) {
  if (change > 0) {
    numberDaysTotal++;
    addDayTabGui(numberDaysTotal);
    colourDayTab(numberDaysTotal);
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
  dayTab.removeClass("partial-data-day").removeClass("full-data-day").removeClass("empty-data-day");
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
    jQuery.extend(combinedData, getPageData(pg));
  });
  return combinedData;
}

function parseAllVotes() {
  var fulldata = combinedData();
  Object.keys(fulldata).forEach(function(post) {
    var raw = "";
    Object.keys(fulldata[post]["v"]).forEach(function(vote) {
      raw += fulldata[post]["v"][vote];
    });
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

function getTallyForRange(start, end) {
  parseAllVotes();
  var playerVotes = {};
  var totalVotes = {};
  Object.keys(recognisedVoteList).forEach(function(post) {
    post = parseInt(post);
    if (post >= start && post <= end) {
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
    }
  });
  for (var i in playerNameList) {
    if (playerStatusList[playerNameList[i]] != -1 && playerStatusList[playerNameList[i]] < currentDay * 2) {
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
    bbcode += "[b]Yet to vote (" + voterList.length + ")[b] - " + voterList.join(", ");
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

function parseDataFromString(string) {
  string = string.replace(/,/g, "");
  if (string.indexOf("Today") >= 0) {
    string = string.replace("Today", "");
  } else if (string.indexOf("Yesterday") >= 0) {
    string = string.replace("Yesterday", "");
  } else {
    var arr = string.split(" ");
    var month = arr[1];
    var day = arr[2].replace("s","").replace("t","").replace("h","").replace("r","").replace("n","").replace("d","");
    var year = arr[3];
    var time = arr[4]
    time = time.split(":");
    var hour = time[0];
    var minutes = time[1];
    if (arr[5] == "PM") {
      hour += 12;
    }
  }
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

function generateData() {
  var data = {};
  $("#posts").find(".page").each(function (i) {
    var username = $(this).find(".alt2 .bigusername").text();
    if ($(this).find("[id^='post_message_'] > b").length > 0 || (includeGm && $.inArray(username, gmNameList) > -1)) {
      if ($.inArray(username, ignoredPlayerList) > -1 || !includeGm && $.inArray(username, gmNameList) > -1) {
        return true;
      }
      var votingData = {};
      var i = 0;
      if (!includeGm || $.inArray(username, gmNameList) > -1) {
        $(this).find(".alt1 > div > b").each(function () {
          var content = $(this).html().replace(/(['"])/g, '\\$1').replace(/\n/g, ' ').trim().toLowerCase();
          if (content.indexOf(voteKeyword) >= 0 || content.indexOf(unvoteKeyword) >= 0) {
            votingData[i] = content;
            i++;
          }
        });
        if (jQuery.isEmptyObject(votingData)) {
          return true;
        }
        postData = {
          "u": username, //User
          "t": $(this).find(".thead:first").text().trim(), //Time
          "v": votingData, //Voting candidates
          "l": $(this).find(".thead > [id^=postcount]").attr("id").replace("postcount","")
        };
      } else {
        //Post content
        postData.c = $(this).find("[id^='post_message_']").html().replace(/(['"])/g, '\\$1').replace(/\n/g, " ").trim();
      }
      //Post number
      data[$(this).find(".thead > [id^=postcount]").attr("name")] = postData;
    }
  });
  if (currentPage > 0 && threadId > 0) {
    localStorage.setItem("pageStatus" + threadId + "-" + currentPage, numberPostsOnPage + "");
    localStorage.setItem("pageData" + threadId + "-" + currentPage, JSON.stringify(data));
    $(".page-link[page='" + currentPage + "']").removeClass("partial-save").removeClass("empty-save").addClass("full-save");
  } else {
    console.log("Could not save data - page is " + currentPage + " and thread id is " + threadId);
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