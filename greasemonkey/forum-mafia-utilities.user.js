// ==UserScript==
// @name        Forum Mafia Utilities
// @namespace   lrdwhyt
// @description Number of added functionalities to make playing forum mafia easier. Designed for Forums of Loathing.
// @include     http://forums.kingdomofloathing.com/vb/showthread.php?*
// @version     1
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

GM_addStyle(":root {\
  --dark-color: #e91e63;\
  --dark-color-highlighted: #d81b60;\
  --med-color: #e1bee7;\
  --med-color-highlighted: #ce93d8;\
  --light-color: #eceff1;\
  --light-color-highlighted: #cfd8dc;\
  --dark-contrast-color: #546e7a;\
  --dark-contrast-color-highlighted: #455a64;\
  --med-contrast-color: #e91e63;\
}\
#fmu-main-container {\
  margin-bottom: 10px;\
  padding-top: 10px;\
}\
#page-container {\
  margin: 10px 5px;\
}\
.page-link.full-save {\
  background-color: var(--dark-color);\
  color: #fff !important;\
}\
.full-save:hover {\
  background-color: var(--dark-color-highlighted);\
}\
.partial-save {\
  background-color: var(--med-color);\
}\
.partial-save:hover {\
  background-color: var(--med-color-highlighted);\
}\
.empty-save {\
  background-color: var(--light-color);\
}\
.empty-save:hover {\
  background-color: var(--light-color-highlighted);\
}\
.full-data-day {\
  background-color: var(--dark-color);\
  color: #fff !important;\
}\
.full-data-day:hover {\
  background-color: var(--dark-color-highlighted);\
}\
.partial-data-day {\
  background-color: var(--med-color);\
}\
.partial-data-day:hover {\
  background-color: var(--med-color-highlighted);\
}\
.empty-data-day {\
  background-color: var(--light-color);\
}\
.empty-data-day:hover {\
  background-color: var(--light-color-highlighted);\
}\
.page-link {\
  color: #333 !important;\
  display: inline-block;\
  padding: 5px;\
  text-align: center;\
  text-decoration: none;\
  min-width: 18px;\
}\
.page-selected, .day-selected {\
  padding-bottom: 2px !important;\
  border-bottom: 3px solid var(--dark-contrast-color);\
}\
#page-label {\
  background-color: var(--dark-contrast-color);\
  color: var(--dark-color);\
  display: inline-block;\
  padding: 5px 10px;\
}\
#fmu-main-container button, #start-tally {\
  display: inline-block;\
  height: 27px;\
  margin: 5px;\
}\
#day-controls {\
  margin: 0 5px;\
}\
.day-select {\
  display: inline-block;\
  padding: 5px 10px;\
}\
.day-select:hover {\
  cursor: pointer;\
}\
#add-day {\
  background-color: var(--light-color);\
  color: var(--dark-color);\
  display: inline-block;\
  padding: 5px;\
  text-align: center;\
  width: 17px;\
}\
#add-day:hover {\
  background-color: var(--light-color-highlighted);\
  cursor: pointer;\
}\
#remove-day {\
  background-color: var(--dark-contrast-color);\
  color: var(--light-color);\
  display: inline-block;\
  padding: 5px;\
  text-align: center;\
  width: 17px;\
}\
#remove-day:hover {\
  background-color: var(--dark-contrast-color-highlighted);\
  cursor: pointer;\
}\
#day-area {\
  background-color: var(--light-color);\
  margin: 0 5px;\
  padding: 10px;\
}\
#tally-body {\
  padding: 10px 0;\
}\
#tally-container.floating {\
  background-color: var(--light-color);\
  left: 0;\
  bottom: 0;\
  opacity: 0.1;\
  padding: 0 10px;\
  position: fixed;\
}\
#tally-container.floating:hover {\
  opacity: 0.9;\
}\
.voter-name-list {\
  margin: 5px;\
}\
.voter-wrap {\
  display: inline-block;\
  margin: 2px;\
  position: relative;\
}\
.voter-name {\
  background-color: white;\
  display: inline-block;\
  padding: 5px 8px;\
}\
.unrecognised-voter {\
  background-color: #f00;\
  color: #fff;\
}\
.vote-link {\
  background-color: var(--dark-contrast-color);\
  color: #fff !important;\
  display: none;\
  font-size: 7pt;\
  opacity: 0.8;\
  padding: 3px;\
  position: absolute;\
  right: 0;\
  text-decoration: none;\
}\
.vote-link:hover {\
  color: #333;\
}\
.voter-wrap:hover .vote-link {\
  display: inline-block;\
}\
.voted-name {\
  background-color: var(--dark-contrast-color);\
  color: #fff;\
  display: inline-block;\
  font-weight: bold;\
  margin-top: 5px;\
  margin-bottom: 5px;\
  padding: 8px;\
}\
.voted-name.no-vote {\
  background-color: var(--light-color-highlighted);\
  color: #333;\
}\
.vote-count {\
  background-color: #e91e63;\
  color: #fff;\
  display: inline-block;\
  font-weight: bold;\
  padding: 8px;\
}\
.vote-count.no-vote {\
  background-color: var(--med-color);\
  color: #333;\
}\
#data-container {\
  height: 0;\
  opacity: 0;\
}\
#game-configuration {\
  background-color: var(--light-color);\
  display: none;\
  margin: 5px;\
  padding: 10px;\
}\
#start-post, #start-time, #end-post, #end-time, .gm-name, #nighttime-set {\
  background-color: #fff;\
  border: none;\
}\
.boundary-option {\
  border-bottom: 3px solid #fff;\
}\
.boundary-option-selected {\
  border-bottom: 3px solid var(--dark-contrast-color) !important;\
}\
#paste-wrapper {\
  display: none;\
}\
.alive-player .player-state {\
  color: var(--dark-color);\
}\
.dead-player .player-state {\
  color: #999;\
}\
.dead-player .edit-player{\
  text-decoration: line-through;\
}\
.player-name button {\
  background-color: white;\
  border: none;\
  margin: 2px 5px !important;\
  padding: 2px 5px;\
}\
.player-number {\
  background-color: #d09;\
  color: red;\
  display: inline-block;\
}\
.edit-player {\
  cursor: text;\
  font-weight: bold;\
}\
.player-controls {\
  display: none;\
}\
.player-controls button:hover {\
  background-color: #f5f5f5;\
}\
.remove-player {\
  width: 27px;\
}\
li.player-name:hover .player-controls {\
  display: inline;\
}\
");

pageSize = 60;
ignoredPlayers = ["TallyBot"];
nightKeywords = ["lynch", "kill", "day", "night", "someone", "die"];
includeGm = false;
unvotingWord = "unvote";
votingWord = "vote";
gmNames = [];
playerNames = [];
alivePlayerNames = [];
savedTallies = {};
subNames = {};
nicknames = {};
recognisedVotes = {};
playerStates = {};
curPage = 0;
threadId = 0;
postTotal = 0;
tallyStatus = 0;
dayTotal = 1;
currentDay = 1;
nightTime = 2000;
dayOptions = {};
popoutTally = false;

unrecognisedVoters = [];

$(document).ready(function () {
  threadId = getThreadId();
  tallyStatus = parseInt(localStorage.getItem("tallyStatus" + threadId));
  if (tallyStatus) {
    createInterface();
  } else {
    resetScript();
  }
});

function createInterface() {
  pageString = $(".pagenav td.vbmenu_control:first-child").first().text();
  pageArray = pageString.split(" ");
  curPage = parseInt(pageArray[1]);
  pageTotal = parseInt(pageArray[3]);
  postTotal = 1 + parseInt($(".thead > [id^=postcount]").last().attr("name")) - parseInt($(".thead > [id^=postcount]").first().attr("name"));
  if (localStorage.getItem("dayCount" + threadId)) {
    dayTotal = parseInt(localStorage.getItem("dayCount" + threadId));
  }
  if (localStorage.getItem("gmNames" + threadId)) {
    gmNames = JSON.parse(localStorage.getItem("gmNames" + threadId));
  } else if (curPage == 1) {
    gmNames.push($(".bigusername").first().text());
    localStorage.setItem("gmNames" + threadId, JSON.stringify(gmNames));
  }
  if (localStorage.getItem("playerNames" + threadId)) {
    playerNames = JSON.parse(localStorage.getItem("playerNames" + threadId));
  }
  if (localStorage.getItem("subNames" + threadId)) {
    subNames = JSON.parse(localStorage.getItem("subNames" + threadId));
  }
  if (localStorage.getItem("nightTime" + threadId)) {
    nightTime = parseInt(localStorage.getItem("nightTime" + threadId));
  }
  if (localStorage.getItem("dayView" + threadId)) {
    currentDay = parseInt(localStorage.getItem("dayView" + threadId));
  }
  if (localStorage.getItem("dayOptions" + threadId)) {
    dayOptions = JSON.parse(localStorage.getItem("dayOptions" + threadId));
  }
  if (localStorage.getItem("savedTallies" + threadId)) {
    savedTallies = JSON.parse(localStorage.getItem("savedTallies" + threadId));
  }
  if (localStorage.getItem("playerStates" + threadId)) {
    playerStates = JSON.parse(localStorage.getItem("playerStates" + threadId));
  }
  if (localStorage.getItem("unrecognisedVoters" + threadId)) {
    unrecognisedVoters = JSON.parse(localStorage.getItem("unrecognisedVoters" + threadId));
  }
  $("#qrform").after("<div id='fmu-main-container'></div>");
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
      id: "update-tally",
      text: "Update tally"
    }))
    .append($("<button />", {
      id: "copy-tally",
      text: "Copy BBcode"
    }))
    .append($("<button />", {
      id: "copy-vote-log",
      text: "Copy vote log"
    }))
    .append($("<button />", {
      id: "toggle-tally-display",
      text: "Pop out"
    }))))
    .append($("<br />"))
    .append($("<span />", {
      text: "Start"
    }))
    .append($("<button />", {
      id: "start-post",
      class: "boundary-option"
    }))
    .append($("<button />", {
      id: "start-time",
      class: "boundary-option"
    }))
    .append($("<br />"))
    .append($("<span />", {
      text: "End"
    }))
    .append($("<button />", {
      id: "end-post",
      class: "boundary-option"
    }))
    .append($("<button />", {
      id: "end-time",
      class: "boundary-option"
    }))
    .appendTo("#fmu-main-container");
  $("<button />", {
    id: "toggle-game-configuration",
    text: "Show game configuration"
  }).appendTo("#fmu-main-container");
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
      id: "add-gm",
      text: "+"
    }))
    .append($("<br />"))
    .append($("<span />", {
      text: "Night time"
    }))
    .append($("<button />", {
      id: "nighttime-set",
      text: nightTime
    }))
    .append($("<br />"))
    .append($("<span />", {
      text: "Player names"
    }))
    .append($("<button />", {
      id: "add-player",
      text: "+"
    }))
    .append($("<button />", {
      id: "import-players",
      text: "Paste..."
    }))
    .append($("<button />", {
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
      id: "confirm-paste",
      text: "Import players"
    })))
    .append($("<div />", {
      id: "player-wrapper"
    })
    .append($("<ol />", {
      id: "player-list"
    })))
    .append($("<br />"))
    .append($("<button />", {
      id: "reset-game",
      text: "Reset game"
    }))
    .append($("<button />", {
      id: "reset-script",
      text: "Clear script data"
    }))
    .appendTo($("#fmu-main-container"));
  for (var pg = 1; pg <= pageTotal; pg++) {
    pageStatus = getPageStatus(threadId, pg);
    newBlock = $("<a />", {
      class: "page-link",
      href: getForumLink(threadId, pg),
      page: pg,
      text: pg
    }).appendTo($("#page-controls"));
    if (pg == curPage) {
      newBlock.addClass("page-selected");
    }
    if (pageStatus == pageSize || (curPage == pageTotal && pageStatus == postTotal)) {
      newBlock.addClass("full-save");
    } else if (pageStatus > 0) {
      newBlock.addClass("partial-save");
    } else {
      newBlock.addClass("empty-save");
    }
  }
  for (var day = 1; day <= dayTotal; day++) {
    $("<div />", {
      class: "day-select",
      name: day,
      text: "Day " + day
    }).appendTo($("#day-tab-container"));
    colourDayTab(day);
  }
  switchDay(currentDay);
  if (gmNames.length > 0) {
    for (var i = 0; i < gmNames.length; i++) {
      $("#gm-names").append("<button class='gm-name'>" + gmNames[i] + "</button>");
    }
  }
  if (playerNames.length > 0) {
    for (var i = 0; i < playerNames.length; i++) {
      var playerEle = addPlayerGui(playerNames[i]);
      if (playerStates.hasOwnProperty(playerNames[i])) {
        $(".player-name[name='" + playerNames[i] + "'] .player-state").text(getPlayerState(playerStates[playerNames[i]]));
        if (playerStates[playerNames[i]] == -1) {
          playerEle.addClass("alive-player");
        } else {
          playerEle.addClass("dead-player");
        }
      } else {
        playerEle.addClass("alive-player");
      }
      if (subNames[playerNames[i]]) {
        for (var j = 0; j < subNames[playerNames[i]].length; j++) {
          addSubGui(playerNames[i], subNames[playerNames[i]][j]);
        }
      }
    }
  }
  if (tallyStatus == 2) {
    $("#game-configuration").show();
    $("#toggle-game-configuration").text("Hide game configuration");
  }
  $("#update-tally").click(function() {
    if (playerNames.length > 0) {
      generateNicknames();
    }
    var start = 1;
    var end = 200000;
    if (dayOptions[currentDay] && dayOptions[currentDay]["startSelected"] == "start-post") {
      start = parseInt(dayOptions[currentDay]["startPost"]);
    }
    if (dayOptions[currentDay] && dayOptions[currentDay]["endSelected"] == "end-post") {
      end = parseInt(dayOptions[currentDay]["endPost"]);
    }
    var tally = getTallyForRange(start, end);
    savedTallies[currentDay] = tally;
    localStorage.setItem("savedTallies" + threadId, JSON.stringify(savedTallies));
    $("#tally-body").html(tallyToHtml(tally));
  });
  $("#copy-tally").click(function () {
    if (savedTallies[currentDay]) {
      $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
      $("#data-container").val(tallyToBbcode(savedTallies[currentDay]));
      $("#data-container").select();
      document.execCommand("copy");
      $("#data-container").remove();
    }
  });
  $("#copy-vote-log").click(function() {
    $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
    var start = 1;
    var end = 200000;
    if (dayOptions[currentDay] && dayOptions[currentDay]["startSelected"] == "start-post") {
      start = parseInt(dayOptions[currentDay]["startPost"]);
    }
    if (dayOptions[currentDay] && dayOptions[currentDay]["endSelected"] == "end-post") {
      end = parseInt(dayOptions[currentDay]["endPost"]);
    }
    var voteLog = getVoteLogForRange(start, end);
    $("#data-container").val(voteLog);
    $("#data-container").select();
    document.execCommand("copy");
    $("#data-container").remove();
  })
  $("#toggle-tally-display").click(function() {
    if (popoutTally == true) {
      popoutTally = false;
      localStorage.setItem("tallyDisplay" + threadId, "");
      $("#tally-container").removeClass("floating");
      $(this).text("Pop out");
    } else {
      popoutTally = true;
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
      localStorage.setItem("tallyStatus" + threadId, "1");
      $("#game-configuration").slideUp(function() {
        $("#toggle-game-configuration").text("Show game configuration");
      });
    } else {
      localStorage.setItem("tallyStatus" + threadId, "2");
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
  $("#day-tab-container").on("click", ".day-select", function() {
    switchDay($(this).attr("name"));
  });
  $("#start-post").click(function() {
    if (dayOptions[currentDay] && dayOptions[currentDay]["startPost"]) {
      post = prompt("Enter the post number to start from", dayOptions[currentDay]["startPost"]);
    } else {
      post = prompt("Enter the post number to start from");
    }
    if (post && parseInt(post) > 0) {
      if (!dayOptions[currentDay]) {
        dayOptions[currentDay] = {};
      }
      if (dayOptions[currentDay]["endPost"]) {
        if (parseInt(post) > dayOptions[currentDay]["endPost"]) {
          return true;
        }
      }
      dayOptions[currentDay]["startPost"] = post;
      dayOptions[currentDay]["startSelected"] = "start-post";
      localStorage.setItem("dayOptions" + threadId, JSON.stringify(dayOptions));
      colourDayTab(currentDay);
      switchDay(currentDay);
    }
  });
  $("#end-post").click(function() {
    if (dayOptions[currentDay] && dayOptions[currentDay]["endPost"]) {
      post = prompt("Enter the post number to end on", dayOptions[currentDay]["endPost"]);
    } else {
      post = prompt("Enter the post number to end on");
    }
    if (post && parseInt(post) > 0) {
      if (!dayOptions[currentDay]) {
        dayOptions[currentDay] = {};
      }
      if (dayOptions[currentDay]["startPost"]) {
        if (parseInt(post) < dayOptions[currentDay]["startPost"]) {
          return true;
        }
      }
      dayOptions[currentDay]["endPost"] = post;
      dayOptions[currentDay]["endSelected"] = "end-post";
      localStorage.setItem("dayOptions" + threadId, JSON.stringify(dayOptions));
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
    gmNames.splice($.inArray($(this).text(), gmNames), 1);
    localStorage.setItem("gmNames" + threadId, JSON.stringify(gmNames));
    $(this).remove();
  });
  $("#nighttime-set").click(function() {
    nightTime = prompt("Enter new time for night");
    $(this).text(nightTime);
    if (nightTime) {
      localStorage.setItem("nightTime" + threadId, nightTime);
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
  $("#player-list").on("click", ".edit-player", function() {
    var oldName = $(this).text();
    var newName = prompt("Enter new player name", oldName);
    if (newName) {
      updatePlayerName(oldName, newName);
      $(this).text(newName);
      $(this).parents(".player-name").attr("name", newName);
    } else if (newName == "") {
      removePlayer(oldName);
    }
  });
  $("#player-list").on("click", ".player-state", function() {
    var newState = prompt("Enter the night/day of death. Leave blank to mark player as alive.");
    if (newState != null) {
      if (newState == "") {
        playerStates[$(this).parent().attr("name")] = -1;
        localStorage.setItem("playerStates" + threadId, JSON.stringify(playerStates));
        $(this).closest(".player-name").removeClass("dead-player").addClass("alive-player");
        $(this).text(getPlayerState(-1));
      } else {
        newState = parseInt(newState);
        if (newState > 0) {
          playerStates[$(this).parent().attr("name")] = newState;
          localStorage.setItem("playerStates" + threadId, JSON.stringify(playerStates));
          $(this).closest(".player-name").removeClass("alive-player").addClass("dead-player");
          $(this).text(getPlayerState(newState));
        }
      }
    }
  });
  $("#player-list").on("click", ".add-sub", function() {
    player = $(this).parents(".player-name").children(".edit-player").text();
    newSub = prompt("Enter alternative name for player - e.g. subs or nicknames");
    if (newSub) {
      addSub(player, newSub);
    }
  });
  $("#player-list").on("click", ".sub-name", function() {
    player = $(this).parents(".player-name").attr("name");
    sub = $(this).text();
    removeSub(player, sub);
  });
  $("#player-list").on("click", ".remove-player", function() {
    player = $(this).parents(".player-name").attr("name");
    removePlayer(player);
  });
  $("#reset-game").click(function() {
    resetData();
    resetScript();
  });
  $("#reset-script").click(function() {
    if (confirm("Are you sure you want to reset everything?")) {
      resetData();
      localStorage.clear();
      resetScript();
    }
  });
  if (gmNames.length > 0) {
    generateData();
  }
}

function updatePlayerName(oldName, newName) {
  var i = $.inArray(oldName, playerNames);
  playerNames[i] = newName;
  localStorage.setItem("playerNames" + threadId, JSON.stringify(playerNames));
  if (subNames.hasOwnProperty(oldName)) {
    subNames[newName] = subNames[oldName];
    delete subNames[oldName];
    localStorage.setItem("subNames" + threadId, JSON.stringify(subNames));
  }
  if (playerStates.hasOwnProperty(oldName)) {
    playerStates[newName] = playerStates[oldName];
    delete playerStates[oldName];
    localStorage.setItem("playerStates" + threadId, JSON.stringify(playerStates));
  }
  for (var i in unrecognisedVoters) {
    $(".unrecognised-voter[name='" + oldName + "']").attr("name", newName);
    if (diceCoefficient(unrecognisedVoters[i], newName) > 0.9) {
      unrecognisedVoters.splice(i, 1);
      localStorage.setItem("unrecognisedVoters" + threadId, JSON.stringify(unrecognisedVoters));
      $(".unrecognised-voter[name='" + newName + "']").removeClass("unrecognised-voter");
      break;
    }
  }
}

function getPlayerState(state) {
  if (state == -1) {
    return "alive";
  } else {
    return "died day " + state;
  }
}

function switchDay(day) {
  currentDay = day;
  localStorage.setItem("dayView" + threadId, day);
  $(".day-select").removeClass("day-selected");
  $(".day-select[name='" + day + "']").addClass("day-selected");
  if (dayOptions[day]) {
    $(".boundary-option").removeClass("boundary-option-selected");
    if (dayOptions[day]["startPost"]) {
      $("#start-post").text("Post #" + dayOptions[day]["startPost"]);
    } else {
      $("#start-post").text("Post #?");
    }
    if (dayOptions[day]["startSelected"]) {
      $("#" + dayOptions[day]["startSelected"]).addClass("boundary-option-selected");
    }
    $("#start-time").text(nightTime + 1);
    if (dayOptions[day]["endSelected"]) {
      $("#" + dayOptions[day]["endSelected"]).addClass("boundary-option-selected");
    }
    if (dayOptions[day]["endPost"]) {
      $("#end-post").text("Post #" + dayOptions[day]["endPost"]);
    } else {
      $("#end-post").text("Post #?");
    }
    $("#end-time").text(nightTime);
  } else {
    $(".boundary-option").removeClass("boundary-option-selected");
    $("#start-post").text("Post #?");
    $("#start-time").text(nightTime + 1);
    $("#end-post").text("Post #?");
    $("#end-time").text(nightTime);
  }
  if (savedTallies[day]) {
    $("#tally-body").html(tallyToHtml(savedTallies[day]));
  } else {
    $("#tally-body").html("");
  }
}

function changeDayCount(change) {
  if (change > 0) {
    dayTotal++;
    $("#day-tab-container").append("<div class='day-select' name='" + dayTotal + "'>Day " + dayTotal + "</div>")
    colourDayTab(dayTotal);
  } else {
    if (dayTotal > 1) {
      dayTotal--;
      if (dayOptions[dayTotal + 1]) {
        delete dayOptions[dayTotal + 1];
        localStorage.setItem("dayOptions" + threadId, JSON.stringify(dayOptions));
      }
      if (savedTallies[dayTotal + 1]) {
        delete savedTallies[dayTotal + 1];
        localStorage.setItem("savedTallies" + threadId, JSON.stringify(savedTallies));
      }
      if (currentDay > dayTotal) {
        switchDay(dayTotal);
      }
      $("#day-tab-container .day-select[name='" + (dayTotal + 1) + "']").remove();
    }
  }
  localStorage.setItem("dayCount" + threadId, dayTotal + "");
}

function colourDayTab(day) {
  var dayTab = $(".day-select[name='" + day + "']");
  dayTab.removeClass("partial-data-day").removeClass("full-data-day").removeClass("empty-data-day");
  if (dayOptions[day]) {
    if (dayOptions[day]["startSelected"] && dayOptions[day]["endSelected"]) {
      dayTab.addClass("full-data-day")
    } else if (dayOptions[day]["startSelected"] || dayOptions[day]["endSelected"]) {
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
      recognisedVotes[post] = {};
      recognisedVotes[post]["user"] = fulldata[post]["u"];
      recognisedVotes[post]["type"] = voteType;
      recognisedVotes[post]["target"] = voteTarget;
      recognisedVotes[post]["time"] = fulldata[post]["t"];
      recognisedVotes[post]["link"] = fulldata[post]["l"];
      recognisedVotes[post]["raw"] = raw;
    }
  });
}

function getVoteType(vote) {
  var hasVote = false;
  var hasUnvote = false;
  var lastUnvote = vote.lastIndexOf(unvotingWord);
  var lastVote = vote.lastIndexOf(votingWord);
  var char_diffs = unvotingWord.length - votingWord.length;
  if (vote.indexOf(unvotingWord) >= 0) {
    hasUnvote = true;
  }
  if (vote.replace(new RegExp(unvotingWord, "g"), "").indexOf(votingWord) >= 0) {
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
  var voteTarget = vote.split(":").pop().split(unvotingWord).pop().split(votingWord).pop().trim();
  if (voteTarget == "") {
    return null;
  } else if (playerNames.length > 0) {
    return matchPlayer(voteTarget);
  } else {
    return voteTarget;
  }
}

function getTallyForRange(start, end) {
  parseAllVotes();
  var playerVotes = {};
  var totalVotes = {};
  Object.keys(recognisedVotes).forEach(function(post) {
    post = parseInt(post);
    if (post >= start && post <= end) {
      var vote = recognisedVotes[post];
      var type = vote["type"];
      if (!playerVotes[vote["user"]]) {
        if (playerNames.length > 0 && $.inArray(vote["user"], playerNames) == -1) {
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
          playerVotes[vote["user"]]["target"] = null;
        }
      }
    }
  });
  for (var i in playerNames) {
    if (playerStates[playerNames[i]] != -1 && playerStates[playerNames[i]] < currentDay) {
      continue;
    }
    if (!playerVotes.hasOwnProperty(playerNames[i])) {
      playerVotes[playerNames[i]] = {
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
  Object.keys(recognisedVotes).sort(function(a, b) {
    return a - b;
  }).filter(function(post) {
    return post >= start && post <= end;
  }).forEach(function(post) {
    var type = recognisedVotes[post]["type"];
    voteLog += "[" + post + "] ";
    voteLog += recognisedVotes[post]["user"];
    if (type == 2) {
      voteLog += " votes " + recognisedVotes[post]["target"];
    } else if (type == 1) {
      voteLog += " unvotes and votes " + recognisedVotes[post]["target"];
    } else if (type == -1) {
      voteLog += " unvotes" + (recognisedVotes[post]["target"] != null ? " " + recognisedVotes[post]["target"] : "");
    } else {
      //Should not happen
      voteLog += " exposes a bug in this script";
    }
    voteLog += " (" + getPostLink(recognisedVotes[post]["link"]) + ")\n";
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
      if ($.inArray(tally[target][voter][0], unrecognisedVoters) >= 0) {
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
  if ($.inArray(user, unrecognisedVoters) == -1) {
    var recognised = false;
    for (var i in playerNames) {
      if (diceCoefficient(playerNames[i], user) > 0.9) {
        $(".player-name[name='" + playerNames[i] + "'] .edit-player").text(user);
        $(".player-name[name='" + playerNames[i] + "']").attr("name", user);
        updatePlayerName(playerNames[i], user);
        recognised = true;
        return;
      }
    }
  }
  if (!recognised) {
    unrecognisedVoters.push(user);
    localStorage.setItem("unrecognisedVoters" + threadId, JSON.stringify(unrecognisedVoters));
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
      }
    }
  }
  return 2 * score / totalSize;
}

function matchPlayer(string) {
  var closestMatch = playerNames[0];
  var highestScore = diceCoefficient(string, playerNames[0]);
  for (var i in playerNames) {
    var score = diceCoefficient(string, playerNames[i]);
    if (score == 1) {
      return playerNames[i];
    }
    if (score > highestScore) {
      closestMatch = playerNames[i];
      highestScore = score;
    }
  }
  for (var i in subNames) {
    for (var j in subNames[i]) {
      var score = diceCoefficient(string, subNames[i][j]);
      if (score == 1) {
        return i;
      }
      if (score > highestScore) {
        closestMatch = i;
        highestScore = score;
      }
    }
  }
  for (var i in nicknames) {
    for (var j in nicknames[i]) {
      var score = diceCoefficient(string, nicknames[i][j]);
      if (score == 1) {
        return i;
      }
      if (score > highestScore) {
        closestMatch = i;
        highestScore = score;
      }
    }
  }
  return closestMatch;
}

function addGm(gmName) {
  gmNames.push(gmName);
  localStorage.setItem("gmNames" + threadId, JSON.stringify(gmNames));
  $("#gm-names").append("<button class='gm-name'>" + gmName + "</button>");
  if (gmNames.length == 1) {
    generateData();
  }
}

function addPlayer(playerName) {
  if ($.inArray(playerName, playerNames) == -1) {
    playerNames.push(playerName);
    localStorage.setItem("playerNames" + threadId, JSON.stringify(playerNames));
    for (var i in unrecognisedVoters) {
      if (diceCoefficient(unrecognisedVoters[i], playerName) > 0.9) {
        unrecognisedVoters.splice(i, 1);
        localStorage.setItem("unrecognisedVoters" + threadId, JSON.stringify(unrecognisedVoters));
        $(".unrecognised-voter[name='" + playerName + "']").removeClass("unrecognised-voter");
        break;
      }
    }
    addPlayerGui(playerName);
  }
}

function addPlayerGui(playerName) {
  return $("<li />", {
    class: "player-name alive-player",
    name: playerName
  })
    .append($("<button />", {
      class: "edit-player",
      text: playerName
    }))
    .append($("<button />", {
      class: "player-state",
      text: "alive"
    }))
    .append($("<span />", {
      class: "sub-list"
    }))
    .append($("<span />", {
      class: "player-controls"
    })
    .append($("<button />", {
      class: "add-sub",
      text: "+Alias"
    }))
    .append($("<button />", {
      class: "remove-player",
      text: "-"
    })))
    .appendTo("#player-list");
}

function removePlayer(playerName) {
  index = $.inArray(playerName, playerNames);
  if (index >= 0) {
    playerNames.splice(index, 1);
    localStorage.setItem("playerNames" + threadId, JSON.stringify(playerNames));
    if (subNames.hasOwnProperty(playerName)) {
      delete subNames[playerName];
      localStorage.setItem("subNames" + threadId, JSON.stringify(subNames));
    }
    if (playerStates.hasOwnProperty(playerName)) {
      delete playerStates[playerName];
      localStorage.setItem("playerStates" + threadId, JSON.stringify(playerStates));
    }
    $(".player-name[name='" + playerName + "']").remove();
  }
}

function clearPlayers() {
  playerNames = [];
  subNames = {};
  nicknames = {};
  playerStates = {};
  localStorage.setItem("playerNames" + threadId, JSON.stringify(playerNames));
  localStorage.setItem("subNames" + threadId, JSON.stringify(subNames));
  localStorage.setItem("playerStates" + threadId, JSON.stringify(playerStates));
  $("#player-list").text("");
}

function addSub(playerName, subName) {
  if (!subNames[playerName]) {
    subNames[playerName] = [];
  }
  if ($.inArray(subName, subNames[playerName]) >= 0) {
    return;
  }
  subNames[playerName].push(subName);
  localStorage.setItem("subNames" + threadId, JSON.stringify(subNames));
  addSubGui(playerName, subName);
}

function addSubGui(playerName, subName) {
  if ($(".player-name[name='" + playerName + "'] .sub-list").text().length > 0) {
    $(".player-name[name='" + playerName + "'] .sub-list").append("<button class='sub-name'>" + subName + "</button>");
  } else {
    $(".player-name[name='" + playerName + "'] .sub-list").append("subbing for<button class='sub-name'>" + subName + "</button>");
  }
}

function removeSub(playerName, subName) {
  index = $.inArray(subName, subNames[playerName]);
  if (index >= 0) {
    subNames[playerName].splice(index, 1);
    if (subNames[playerName].length == 0) {
      subNames[playerName] = "";
      $(".player-name[name='" + playerName + "']").children(".sub-list").text("");
    }
    localStorage.setItem("subNames" + threadId, JSON.stringify(subNames));
    $(".player-name[name='" + playerName + "']").find(".sub-name").filter(function() {return $(this).text() == subName;}).remove();
  }
}

function generateNicknames() {
  nicknames;
  for (var i in playerNames) {
    var player = playerNames[i];
    if (!nicknames.hasOwnProperty(player)) {
      nicknames[player] = [];
    }
    if (player.indexOf(" ") >= 0) {
      var newNick = "";
      var splitName = player.split(" ");
      for (var c in splitName) {
        newNick += splitName[c].charAt(0);
      }
      nicknames[player].push(newNick);
    }
    if (player.indexOf("_") >= 0) {
      var newNick = "";
      var splitName = player.split("_");
      for (var c in splitName) {
        newNick += splitName[c].charAt(0);
      }
      if ($.inArray(newNick, nicknames[player]) == -1) {
        nicknames[player].push(newNick);
      }
    }
    var uppercaseName = getUpperCase(player);
    var nonLowercaseName = getNonLowerCase(player);
    var lowercaseName = getLowerCase(player);
    if (uppercaseName.length > 1 && lowercaseName.length > 2) {
      if ($.inArray(nonLowercaseName, nicknames[player]) == -1) {
        nicknames[player].push(nonLowercaseName);
      }
    } else if(nonLowercaseName.length > 5 && lowercaseName.length > 1) {
      if ($.inArray(lowercaseName, nicknames[player]) == -1) {
        nicknames[player].push(lowercaseName);
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

function getThreadId() {
  return $("a.smallfont").first().attr("href").split("&")[0].split("=")[1];
}

function getForumLink(thread, page) {
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
    if ($(this).find("[id^='post_message_'] > b").length > 0 || (includeGm && $.inArray(username, gmNames) > -1)) {
      if ($.inArray(username, ignoredPlayers) > -1 || !includeGm && $.inArray(username, gmNames) > -1) {
        return true;
      }
      var votingData = {};
      var i = 0;
      if (!includeGm || $.inArray(username, gmNames) > -1) {
        $(this).find(".alt1 > div > b").each(function () {
          content = $(this).html().replace(/(['"])/g, '\\$1').replace(/\n/g, ' ').trim().toLowerCase();
          if (content.indexOf(votingWord) >= 0 || content.indexOf(unvotingWord) >= 0) {
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
  if (curPage > 0 && threadId > 0) {
    localStorage.setItem("pageStatus" + threadId + "-" + curPage, postTotal + "");
    localStorage.setItem("pageData" + threadId + "-" + curPage, JSON.stringify(data));
    $(".page-link[page='" + curPage + "']").removeClass("partial-save").removeClass("empty-save").addClass("full-save");
  } else {
    alert("Could not save data - page is " + curPage + " and thread id is " + threadId);
  }
}

function resetData() {
  localStorage.removeItem("tallyStatus" + threadId);
  localStorage.removeItem("gmNames" + threadId);
  localStorage.removeItem("playerNames" + threadId);
  localStorage.removeItem("subNames" + threadId);
  localStorage.removeItem("dayCount" + threadId);
  localStorage.removeItem("savedTallies" + threadId);
  localStorage.removeItem("dayOptions" + threadId);
  localStorage.removeItem("nightTime" + threadId);
  localStorage.removeItem("playerStates" + threadId);
  $(".full-save, .partial-save").each(function() {
    pg = $(this).text();
    localStorage.removeItem("pageData" + threadId + "-" + pg);
    localStorage.removeItem("pageStatus" + threadId + "-" + pg);
  });
  gmNames = [];
  playerNames = [];
  subNames = {};
  recognisedVotes = {};
  dayOptions = {};
  savedTallies = {};
  playerStates = {};
  nicknames = {};
  curPage = 0;
  postTotal = 0;
  tallyStatus = 0;
  currentDay = 1;
  dayTotal = 1;
  nightTime = 2000;
  popoutTally = false;
  unvotingWord = "unvote";
  votingWord = "vote";
}

function resetScript() {
  $("#fmu-main-container").remove();
  $("#qrform").after("<button id='start-tally'>Turn on Forum Mafia Utilities for this thread</button>");
  $("#start-tally").click(function() {
    localStorage.setItem("tallyStatus" + threadId, "1");
    createInterface();
    $(this).remove();
  });
}