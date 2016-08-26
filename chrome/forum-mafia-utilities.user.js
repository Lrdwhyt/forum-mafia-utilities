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
gameSettings = {
  "unvoteKeyword": "unvote", //String used to signify unvote
  "voteKeyword": "vote", //String used to signify vote
  "popoutTally": ""
};
gmNameList = [];
playerNameList = [];
subNameList = {};
playerNicknameList = {};
playerStatusList = {};
savedTallyList = [];
recognisedVoteList = {};
unrecognisedVoterList = [];
threadId = 0;
currentPage = 0;
pageTotal = 0;
numberPostsOnPage = 0;
dayDataList = [];
currentDay = 1; //The day that is selected by the user
nightfallTime = 2000; //Default time for nightfall
timeZone = 0;
scriptSettings = {
  "bbcodePostNumbers": 0, //BBcode post numbers
  "nightBufferTime": "10" //How long a night lasts - used for automatically filling in start times
}

$(document).ready(function () {
  threadId = getThreadId();
  threadScriptMode = parseInt(localStorage.getItem("threadScriptMode" + threadId));
  timeZone = getTimeZone();
  if (localStorage.getItem("fmuSettings")) {
    scriptSettings = JSON.parse(localStorage.getItem("fmuSettings"));
  }
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
      .append($("<span />", {
        text: "BBcode post numbers"
      }))
      .append($("<button />", {
        class: "function-button",
        id: "toggle-bbcode-post-numbers",
        text: "Off"
      }))
      .append($("<br />"))
      .append($("<span />", {
        text: "Night buffer time (minutes)"
      }))
      .append($("<button />", {
        class: "input-button",
        id: "night-buffer-time",
        text: scriptSettings["nightBufferTime"]
      }))
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
  $("#toggle-bbcode-post-numbers").click(function() {
    toggleBbcodePostNumbers($(this));
  });
  $("#night-buffer-time").click(function() {
    var newBuffer = parseInt(prompt("Enter night buffer time in minutes"));
    if (newBuffer > 0) {
      scriptSettings["nightBufferTime"] = newBuffer;
      localStorage.setItem("fmuSettings", JSON.stringify(scriptSettings));
      $(this).text(newBuffer);
    }
  });
  $("#clear-data").click(function() {
    if (confirm("Are you sure you want to reset all data?")) {
      resetData();
      localStorage.clear();
      resetScript();
    }
  });
  if (scriptSettings["bbcodePostNumbers"]) {
      $("#toggle-bbcode-post-numbers").text("On");
    }
  if (threadScriptMode) {
    createInterface();
  } else {
    resetScript();
  }
});

function toggleBbcodePostNumbers(toggleButton) {
  if (scriptSettings["bbcodePostNumbers"] == 0) {
    scriptSettings["bbcodePostNumbers"] = 1;
    localStorage.setItem("fmuSettings", JSON.stringify(scriptSettings));
    toggleButton.text("On");
  } else {
    scriptSettings["bbcodePostNumbers"] = 0;
    localStorage.setItem("fmuSettings", JSON.stringify(scriptSettings));
    toggleButton.text("Off");
  }
}

function getCurrentPageNumbers() {
  var pageString = $(".pagenav td.vbmenu_control:first-child").first().text();
  var pageArray = pageString.split(" ");
  currentPage = parseInt(pageArray[1]);
  pageTotal = parseInt(pageArray[3]);
  numberPostsOnPage = 1 + parseInt($(".thead > [id^=postcount]").last().attr("name")) - parseInt($(".thead > [id^=postcount]").first().attr("name"));
}

function loadLocalData() {
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
  initialiseDayData(1);
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
  if (localStorage.getItem("gameSettings" + threadId)) {
    gameSettings = JSON.parse(localStorage.getItem("gameSettings" + threadId));
  }
}

function createInterface() {
  getCurrentPageNumbers();
  loadLocalData();
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
    .append($("<div />", {
      class: "vote-keywords"
    })
    .append($("<span />", {
      text: "Unvote keyword"
    }))
    .append($("<button />", {
      class: "input-button",
      id: "unvote-keyword",
      text: "unvote"
    }))
    .append($("<br />"))
    .append($("<span />", {
      text: "Vote keyword"
    }))
    .append($("<button />", {
      class: "input-button",
      id: "vote-keyword",
      text: "vote"
    })))
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
  for (var day = 1; day < dayDataList.length; day++) {
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
  $("#vote-keyword").text(gameSettings["voteKeyword"]);
  $("#unvote-keyword").text(gameSettings["unvoteKeyword"]);
  $("#tally-body").on("click",".unrecognised-voter", function() {
    addPlayer($(this).attr("name"));
  })
  $("#update-tally").click(updateTally);
  $("#copy-tally").click(copyBbcodeTally);
  $("#copy-vote-log").click(copyVoteLog);
  $("#toggle-tally-display").click(function() {
    toggleTallyDisplay($(this));
  });
  if (gameSettings["popoutTally"]) {
    gameSettings["popoutTally"] = "";
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
  $("#vote-keyword").click(function() {
    var newKeyword = prompt("Enter new vote keyword");
    if (newKeyword) {
      gameSettings["voteKeyword"] = newKeyword;
      localStorage.setItem("gameSettings" + threadId, JSON.stringify(gameSettings));
      $(this).text(newKeyword);
    }
  });
  $("#unvote-keyword").click(function() {
    var newKeyword = prompt("Enter new unvote keyword");
    if (newKeyword) {
      gameSettings["unvoteKeyword"] = newKeyword;
      localStorage.setItem("gameSettings" + threadId, JSON.stringify(gameSettings));
      $(this).text(newKeyword);
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
  if (gmNameList.length > 0) {
    generateData();
  }
}

function getLastNightfall() {
  var date = new Date();
  date = getOffsetDate(date, 0, timeZone);
  var nightfallHours = Math.floor(nightfallTime / 100);
  var nightfallMinutes = nightfallTime % 100;
  date.setUTCHours(nightfallHours);
  date.setUTCMinutes(nightfallMinutes);
  if (date.getTime() > new Date().getTime()) {
    return getOffsetDate(date, -1, -timeZone)
  } else {
    return getOffsetDate(date, 0, -timeZone)
  }
}

function initialiseDayData(day) {
  var startPost = 1;
  var startDate = getLastNightfall();
  var endDate = getOffsetDate(getLastNightfall(), 1, 0);
  if (day > 1) {
    if (dayDataList[day - 1].hasOwnProperty("endPost")) {
      startPost = dayDataList[day - 1]["endPost"] + 1;
    }
    var oldEndDate = new Date(dayDataList[day - 1]["endDate"]);
    startDate = new Date(oldEndDate.getTime() + parseInt(scriptSettings["nightBufferTime"]) * 60 * 1000);
    endDate = new Date(oldEndDate.getTime() + 24 * 60 * 60 * 1000);
  }
  dayDataList[day] = {
    "startDate": startDate,
    "startPost": startPost,
    "startSelected": "start-post",
    "endDate": endDate,
    "endSelected": "end-date"
  };
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
    $("#start-month").text(pad2Digits(startTime.getUTCMonth() + 1));
    $("#start-day").text(pad2Digits(startTime.getUTCDate()));
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
    $("#end-month").text(pad2Digits(endTime.getUTCMonth() + 1));
    $("#end-day").text(pad2Digits(endTime.getUTCDate()));
    $("#end-time").text(getTimeString(endTime));
  }
  if (savedTallyList[day]) {
    $("#tally-body").html(tallyToHtml(savedTallyList[day]));
  } else {
    $("#tally-body").html("");
  }
}

function toggleTallyDisplay(toggleButton) {
  if (gameSettings["popoutTally"]) {
    gameSettings["popoutTally"] = "";
    localStorage.setItem("gameSettings" + threadId, JSON.stringify(gameSettings));
    $("#tally-container").removeClass("floating");
    toggleButton.text("Pop out");
  } else {
    gameSettings["popoutTally"] = "1";
    localStorage.setItem("gameSettings" + threadId, JSON.stringify(gameSettings));
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
    dayDataList.splice(day, 1);
    localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
  }
  if (savedTallyList[day]) {
    savedTallyList.splice(day, 1);
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
    start = new Date(dayDataList[currentDay]["startDate"]);
    start.setUTCSeconds(0, 0);
  }
  if (dayDataList[currentDay] && dayDataList[currentDay]["endSelected"] == "end-post") {
    end = parseInt(dayDataList[currentDay]["endPost"]);
  } else if (dayDataList[currentDay]["endSelected"] == "end-date") {
    end = new Date(dayDataList[currentDay]["endDate"]);
    end.setUTCSeconds(59, 1000);
  }
  var tally = getTallyForRange(start, end, currentDay);
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
  updatePlayerState(toggleButton.parent(), toggleButton.parent().attr("name"));
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
    var newDay = dayDataList.length;
    addDayTabGui(newDay);
    initialiseDayData(newDay);
    localStorage.setItem("dayDataList" + threadId, JSON.stringify(dayDataList));
    colourDayTab(newDay);
    switchDay(newDay);
  } else {
    var oldDay = dayDataList.length - 1;
    if (oldDay > 1) {
      deleteDayData(oldDay);
      if (currentDay >= oldDay) {
        switchDay(oldDay - 1);
      }
      $("#day-tab-container .day-tab[name='" + oldDay + "']").remove();
    }
  }
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

function getCombinedData() {
  var combinedData = {};
  $(".full-save, .partial-save").each(function() {
    pg = $(this).text();
    //This 'concatenates' two objects
    jQuery.extend(combinedData, getPageData(pg));
  });
  return combinedData;
}

function parseAllVotes() {
  var fulldata = getCombinedData();
  Object.keys(fulldata).forEach(function(post) {
    var raw = fulldata[post]["r"];
    var voteType = getVoteType(raw);
    var voteTarget = getVoteTarget(raw);
    if (voteType != 0 && (voteType == -1 || voteTarget)) {
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
  var lastUnvote = vote.lastIndexOf(gameSettings["unvoteKeyword"]);
  var lastVote = vote.lastIndexOf(gameSettings["voteKeyword"]);
  var lengthDifference = gameSettings["unvoteKeyword"].length - gameSettings["voteKeyword"].length;
  if (vote.indexOf(gameSettings["unvoteKeyword"]) >= 0) {
    hasUnvote = true;
  }
  if (vote.replace(new RegExp(gameSettings["unvoteKeyword"], "g"), "").indexOf(gameSettings["voteKeyword"]) >= 0) {
    hasVote = true;
  }
  if (hasVote == true) {
    if (hasUnvote == true) {
      if (lastUnvote >= lastVote - lengthDifference) {
        return -1; //Unvote
      } else {
        return 1; //Unvote and vote
      }
    } else {
      return 2; //Vote
    }
  } else if (hasUnvote == true) {
    return -1; //Unvote
  } else {
    return 0; //No vote
  }
}

function getVoteTarget(vote) {
  var voteTarget = vote.split(":").pop().split(gameSettings["unvoteKeyword"]).pop().split(gameSettings["voteKeyword"]).pop();
  voteTarget = voteTarget.split("(")[0].split("[")[0].trim();
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

function getTallyForRange(start, end, day) {
  parseAllVotes();
  var playerVotes = {};
  var totalVotes = {};
  Object.keys(recognisedVoteList).forEach(function(post) {
    post = parseInt(post);
    if (start instanceof Date) {
      if (compareDates(start, recognisedVoteList[post]["time"]) > 0) {
        return;
      }
    } else {
      if (start > post) {
        return;
      }
    }
    if (end instanceof Date) {
      if (compareDates(end, recognisedVoteList[post]["time"]) < 0) {
        return;
      }
    } else {
      if (end < post) {
        return;
      }
    }
    var vote = recognisedVoteList[post];
    if (playerStatusList[vote["user"]] != 0 && playerStatusList[vote["user"]] < day * 2) {
      //Throwing out votes from dead players
      return;
    }
    var voteType = vote["type"];
    if (!playerVotes[vote["user"]]) {
      if (playerNameList.length > 0 && $.inArray(vote["user"], playerNameList) == -1) {
        registerUnrecognisedVoter(vote["user"]);
      }
      playerVotes[vote["user"]] = {};
    }
    if (!playerVotes[vote["user"]]["post"] || parseInt(post) > playerVotes[vote["user"]]["post"]) {
      playerVotes[vote["user"]]["post"] = post;
      playerVotes[vote["user"]]["link"] = vote["link"];
      if (voteType == 2 || voteType == 1) {
        playerVotes[vote["user"]]["target"] = vote["target"];
      } else if (voteType == -1) {
        playerVotes[vote["user"]]["target"] = "";
      }
    }
  });
  for (var i in playerNameList) {
    if (playerStatusList[playerNameList[i]] != 0 && playerStatusList[playerNameList[i]] < day * 2) {
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
  var bbcode = "Tally generated via Forum Mafia Utilities\n\n";
  var hasVotes = false;
  Object.keys(tally).filter(function(target) {
    return (target == "" ? false : true);
  }).sort(function(a, b) {
    return tally[b].length - tally[a].length;
  }).forEach(function(target) {
    hasVotes = true;
    var voterList = [];
    bbcode += "[b]" + target + " (" + tally[target].length;
    if (tally[target].length % 10 == 8) {
      bbcode += "[u][/u]";
    }
    bbcode += ")[/b] - [size=1]"
    for (var voter in tally[target]) {
      if (voter > 0) {
        bbcode += ", ";
      }
      bbcode += tally[target][voter][0];
      if (scriptSettings["bbcodePostNumbers"]) {
        bbcode += " (#[post=\""+tally[target][voter][2]+"\"]"+tally[target][voter][1]+"[/post])";
      }
    }
    bbcode += "[/size]\n";
  });
  if (tally.hasOwnProperty("")) {
    if (hasVotes) {
      bbcode += "\n";
    }
    var voterList = [];
    for (var i in tally[""]) {
      voterList.push(tally[""][i][0]);
    }
    bbcode += "[b]Yet to vote (" + voterList.length;
    if (voterList.length % 10 == 8) {
      bbcode += "[u][/u]";
    }
    bbcode += ")[/b] - [size=1]" + voterList.join(", ") + "[/size]";
  }
  return bbcode;
}

function tallyToHtml(tally) {
  var html = "";
  Object.keys(tally).filter(function(target) {
    return (target == "" ? false : true);
  }).sort(function(a, b) {
    //Sorts tally by the length of voter lists - how many people are voting for user a vs how many people are voting for user b
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
  if (highestScore > 0) {
    return closestMatch;
  } else {
    //If the highest score is 0 (no similarity), declines to return a player name
    return string;
  }
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
  var cleanedTime = time.replace(":","").replace(" ","").replace("h","").replace(".","");
  var validTime = parseInt(cleanedTime);
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
  } else if (validTime < 60 && cleanedTime.charAt(0) == "0") {
    if (time.toLowerCase().indexOf("pm") >= 0) {
      return validTime + 1200;
    } else {
      return validTime;
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
}

function pad2Digits(number) {
  var paddedNumber = number + "";
  while (paddedNumber.length < 2) {
    paddedNumber = "0" + paddedNumber;
  }
  return paddedNumber;
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
          var htmlContent = $(this).html();
          if ($(this).children(".inlineimg").length > 0) {
            var htmlContent = $("<b>" + $(this).html() + "</b>");
            htmlContent.children("[title='Surprised']").replaceWith(":o");
            htmlContent.children("[title='Broad Smile']").replaceWith(":D");
            htmlContent.children("[title='Razz']").replaceWith(":p");
            htmlContent.children("[title='Mad']").replaceWith(":x");
            htmlContent = htmlContent.html();
          }
          var content = htmlContent.replace(/(['"])/g, '\\$1').replace(/\n/g, " ").toLowerCase();
          if (content.indexOf(gameSettings["voteKeyword"]) >= 0 || content.indexOf(gameSettings["unvoteKeyword"]) >= 0) {
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
  localStorage.removeItem("selectedDay" + threadId);
  localStorage.removeItem("savedTallyList" + threadId);
  localStorage.removeItem("dayDataList" + threadId);
  localStorage.removeItem("nightfallTime" + threadId);
  localStorage.removeItem("playerStatusList" + threadId);
  localStorage.removeItem("gameSettings" + threadId);
  localStorage.removeItem("unrecognisedVoterList" + threadId);
  $(".full-save, .partial-save").each(function() {
    pg = $(this).text();
    localStorage.removeItem("pageData" + threadId + "-" + pg);
    localStorage.removeItem("pageStatus" + threadId + "-" + pg);
  });
  threadScriptMode = 0;
  includeGm = false;
  gameSettings = {
    "unvoteKeyword": "unvote", //String used to signify unvote
    "voteKeyword": "vote", //String used to signify vote
    "popoutTally": "0"
  };
  gmNameList = [];
  playerNameList = [];
  subNameList = {};
  playerNicknameList = {};
  playerStatusList = {};
  savedTallyList = [];
  recognisedVoteList = {};
  unrecognisedVoterList = [];
  dayDataList = [];
  currentDay = 1;
  nightfallTime = 2000;
  initialiseDayData(1);
}

function resetScript() {
  $("#fmu-main-container").remove();
  scriptSettings = {
    "bbcodePostNumbers": 0,
    "nightBufferTime": "10" //How long a night lasts - used for automatically filling in start times
  }
  $("#toggle-script").text("Start game");
}