// ==UserScript==
// @name        Forum Mafia Utilities
// @namespace   lrdwhyt
// @description Number of added functionalities to make playing forum mafia easier. Designed for Forums of Loathing.
// @include     http://forums.kingdomofloathing.com/vb/showthread.php?*
// @version     1
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

GM_addStyle(".page-block.full-save {\
  background-color: #d09;\
  color: #fff !important;\
}\
.full-save:hover {\
  background-color: #c40087;\
}\
.partial-save {\
  background-color: #fae;\
}\
.partial-save:hover {\
  background-color: #e6b3ff;\
}\
.empty-save {\
  background-color: #eee;\
}\
.empty-save:hover {\
  background-color: #e1e1e1;\
}\
#tally-container {\
  margin-bottom: 10px;\
  padding-top: 10px;\
}\
#page-controls {\
  display: inline-block;\
}\
.page-block {\
  color: #333 !important;\
  display: inline-block;\
  padding: 5px;\
  text-align: center;\
  text-decoration: none;\
  width: 17px;\
}\
.page-selected, .day-selected {\
  padding-bottom: 2px !important;\
  border-bottom: 3px solid #666;\
}\
#page-label {\
  background-color: #555;\
  color: #d09;\
  display: inline-block;\
  padding: 5px 10px;\
}\
#tally-container button, #start-tally {\
  display: inline-block;\
  height: 27px;\
  margin: 5px;\
}\
#day-controls {\
  margin: 0 5px;\
}\
.day-select {\
  background-color: #fae;\
  display: inline-block;\
  padding: 5px 10px;\
}\
.day-select:hover {\
  background-color: #e6b3ff;\
  cursor: pointer;\
}\
#add-day {\
  background-color: #d09;\
  color: #fff;\
  display: inline-block;\
  margin-right: 10px;\
  padding: 5px;\
  text-align: center;\
  width: 17px;\
}\
#add-day:hover {\
  background-color: #c08;\
  cursor: pointer;\
}\
#remove-day {\
  background-color: #666;\
  color: #d09;\
  display: inline-block;\
  margin-left: 10px;\
  padding: 5px;\
  text-align: center;\
  width: 17px;\
}\
#remove-day:hover {\
  background-color: #555;\
  cursor: pointer;\
}\
#day-area {\
  background-color: #eee;\
  margin: 0 5px;\
  padding: 10px;\
}\
#tally-area {\
  margin-bottom: 10px;\
}\
.voter-names {\
  \
}\
.voted-name {\
  background-color: #fff;\
  display: inline-block;\
  margin: 2px 0;\
  padding: 8px;\
}\
.vote-count {\
  background-color: #d09;\
  color: #fff;\
  font-weight: bold;\
  padding: 8px;\
}\
#data-container {\
  height: 0;\
  opacity: 0;\
}\
#game-configuration {\
  background-color: #eee;\
  display: none;\
  margin: 5px;\
  padding: 10px;\
}\
#start-post, #start-time, #end-post, #end-time, .gm-name, #nighttime-set {\
  background-color: #fff;\
  border: none;\
}\
.boundary-option-selected {\
  border-bottom: 3px solid #666 !important;\
}\
#paste-wrapper {\
  display: none;\
}\
.player-name button {\
  background-color: white;\
  border: none;\
  margin: 2px 5px !important;\
  padding: 2px 5px;\
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
savedTallies = {};
subNames = {};
recognisedVotes = {};
curPage = 0;
threadId = 0;
postTotal = 0;
tallyStatus = 0;
dayTotal = 1;
currentDay = 1;
nightTime = 2000;
dayOptions = {};

$(document).ready(function () {
  threadId = $("a.smallfont").first().attr("href").split("&")[0].split("=")[1];
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
  $("#qrform").after("<div id='tally-container'></div>");
  $("<div />", {
    id: "page-label",
    text: "Page"
  }).appendTo("#tally-container");
  $("<div />", {
    id: "page-controls"
  }).appendTo("#tally-container");
  $("<button />", {
    id: "toggle-game-configuration",
    text: "Show game configuration"
  }).appendTo("#tally-container");
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
    })).appendTo("#tally-container");
  $("<div />", {
    id: "day-area"
  })
    .append($("<div />", {
      id: "tally-area"
    }))
    .append($("<button />", {
      id: "update-tally",
      text: "Update tally"
    }))
    .append($("<button />", {
      id: "copy-tally",
      text: "Copy BBcode"
    }))
    .append($("<button />", {
      id: "copy-voting-log",
      text: "Copy voting log"
    }))
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
    .appendTo("#tally-container");
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
    .appendTo($("#tally-container"));
  for (var pg = 1; pg <= pageTotal; pg++) {
    pageStatus = getPageStatus(threadId, pg);
    newBlock = $("<a />", {
      class: "page-block",
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
  }
  switchDay(currentDay);
  if (gmNames.length > 0) {
    for (var i = 0; i < gmNames.length; i++) {
      $("#gm-names").append("<button class='gm-name'>" + gmNames[i] + "</button>");
    }
  }
  if (playerNames.length > 0) {
    for (var i = 0; i < playerNames.length; i++) {
      newRow = "<li class='player-name' name='" + playerNames[i] + "'><button class='edit-player'>" + playerNames[i] + "</button><span class='sub-list'>";
      if (subNames[playerNames[i]]) {
        newRow += "subbing for";
        for (var j = 0; j < subNames[playerNames[i]].length; j++) {
          newRow += "<button class='sub-name'>" + subNames[playerNames[i]][j] + "</button>";
        }
      }
      newRow += "</span><span class='player-controls'><button class='add-sub'>+Sub</button><button class='remove-player'>-</button></span></li>";
      $("#player-list").append($(newRow));
    }
  }
  if (tallyStatus == 2) {
    $("#game-configuration").show();
    $("#toggle-game-configuration").text("Hide game configuration");
  }
  $("#update-tally").click(function() {
    var start = 1;
    var end = 200000;
    if (dayOptions[currentDay] && dayOptions[currentDay]["startSelected"] == "start-post") {
      start = parseInt(dayOptions[currentDay]["startPost"]);
    }
    if (dayOptions[currentDay] && dayOptions[currentDay]["endSelected"] == "end-post") {
      end = parseInt(dayOptions[currentDay]["endPost"]);
    }
    var tally = tallyVotesInRange(start, end);
    savedTallies[currentDay] = tally;
    localStorage.setItem("savedTallies" + threadId, JSON.stringify(savedTallies));
    $("#tally-area").html(tallyToHtml(tally));
  });
  $("#copy-tally").click(function () {
    if (savedTallies[currentDay]) {
      $("#tally-container").append("<textarea id='data-container'></textarea>");
      $("#data-container").val(tallyToBbcode(savedTallies[currentDay]));
      $("#data-container").select();
      document.execCommand("copy");
      $("#data-container").remove();
    }
  });
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
      importedPlayers[i] = importedPlayers[i].trim();
      if (importedPlayers[i].indexOf(".") >= 0) {
        importedPlayers[i] = importedPlayers[i].split(".")[1];
      }
      if (importedPlayers[i].indexOf(")") >= 0) {
        importedPlayers[i] = importedPlayers[i].split(")")[1];
      }
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
      var i = $.inArray(oldName, playerNames);
      playerNames[i] = newName;
      localStorage.setItem("playerNames" + threadId, JSON.stringify(playerNames));
      $(this).text(newName);
      $(this).parents(".player-name").attr("name", newName);
      if (subNames[oldName]) {
        subNames[newName] = subNames[oldName];
        subNames[oldName] = "";
      }
    } else if (newName == "") {
      removePlayer(oldName);
    }
  });
  $("#player-list").on("click", ".add-sub", function() {
    player = $(this).parents(".player-name").children(".edit-player").text();
    newSub = prompt("Enter name of former sub (first player should be the current one, this is for whomever the player is subbing for)");
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
    $("#tally-area").html(tallyToHtml(savedTallies[day]));
  } else {
    $("#tally-area").html("");
  }
}

function changeDayCount(change) {
  if (change > 0) {
    dayTotal++;
    $("#day-tab-container").append("<div class='day-select' name='" + dayTotal + "'>Day " + dayTotal + "</div>")
  } else {
    if (dayTotal > 1) {
      dayTotal--;
      if (dayOptions[dayTotal + 1]) {
        delete dayOptions[dayTotal + 1];
        localStorage.setItem("dayOptions" + threadId, JSON.stringify(dayOptions));
      }
      $("#day-tab-container .day-select[name='" + (dayTotal + 1) + "']").remove();
    }
  }
  localStorage.setItem("dayCount" + threadId, dayTotal + "");
}

function combinedData() {
  var combinedData = {};
  $(".full-save, .partial-save").each(function() {
    pg = $(this).text();
    jQuery.extend(combinedData, getPageData(pg));
  });
  return combinedData;
}

function tallyToBbcode(tally) {
  var bbcode = "";
  Object.keys(tally).sort(function(a, b) {
    return tally[b].length - tally[a].length;
  }).forEach(function(target) {
    bbcode += "[b]" + target + " (" + tally[target].length + ")[/b] - " + tally[target].join(", ") + "\n";
  });
  return bbcode;
}

function tallyToHtml(tally) {
  var html = "";
  Object.keys(tally).sort(function(a, b) {
    return tally[b].length - tally[a].length;
  }).forEach(function(target) {
    html += "<span class='vote-count'>" + tally[target].length + "</span><span class='voted-name'>" + target + "</span> - <span class='voter-names'>" + tally[target].join(", ") + "</span><br>";
  });
  return html;
}

function tallyVotesInRange(start, end) {
  parseAllVotes();
  var playerVotes = {};
  var totalVotes = {};
  Object.keys(recognisedVotes).forEach(function(post) {
    if (post >= start && post <= end) {
      var vote = recognisedVotes[post];
      var type = vote["type"];
      if (!playerVotes[vote["user"]]) {
        playerVotes[vote["user"]] = {};
      }
      if (!playerVotes[vote["user"]]["post"] || parseInt(post) > playerVotes[vote["user"]]["post"]) {
        playerVotes[vote["user"]]["post"] = post;
        if (type == 2 || type == 1) {
          playerVotes[vote["user"]]["target"] = vote["target"];
        } else if (type == -1) {
          playerVotes[vote["user"]]["target"] = null;
        }
      }
    }
  });
  Object.keys(playerVotes).forEach(function(user) {
    var target = playerVotes[user]["target"];
    if (!target) {
      return true;
    }
    if (!totalVotes[target]) {
      totalVotes[target] = [];
    }
    totalVotes[target].push(user);
  });
  return totalVotes;
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
      recognisedVotes[post]["raw"] = raw;
    }
  });
}

function voteToText(post) {
  var type = recognisedVotes[post]["type"];
  var text = "[" + post + "] " + recognisedVotes[post]["user"];
  if (type == 2) {
    text += " votes " + recognisedVotes[post]["target"];
  } else if (type == 1) {
    text += " unvotes and votes " + recognisedVotes[post]["target"];
  } else if (type == -1) {
    text += " unvotes " + recognisedVotes[post]["target"];
  } else {
    text += " does absolutely nothing. This shouldn't happen.";
  }
  text += " (" + recognisedVotes[post]["raw"] + ")";
  return text;
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
  return closestMatch;
}

function diceCoefficient(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  if (str1 == str2) {
    return 1;
  }
  var pairs1 = bigrams(str1);
  var pairs2 = bigrams(str2);
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

function bigrams(string) {
  var bigrams = [];
  for (var i = 0; i < string.length - 1; i++) {
    bigrams.push(string.slice(i, i+2));
  }
  return bigrams;
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
    $("#player-list").append("<li class='player-name' name='" + playerName + "'><button class='edit-player'>" + playerName + "</button><span class='sub-list'></span><span class='player-controls'><button class='add-sub'>+Sub</button><button>-</button></span></li>");
    localStorage.setItem("playerNames" + threadId, JSON.stringify(playerNames));
  }
}

function removePlayer(playerName) {
  index = $.inArray(playerName, playerNames);
  if (index >= 0) {
    playerNames.splice(index, 1);
    localStorage.setItem("playerNames" + threadId, JSON.stringify(playerNames));
    $(".player-name[name='" + playerName + "']").remove();
  }
}

function clearPlayers() {
  playerNames = [];
  localStorage.setItem("playerNames" + threadId, JSON.stringify(playerNames));
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

function resetData() {
  localStorage.removeItem("tallyStatus" + threadId);
  localStorage.removeItem("gmNames" + threadId);
  localStorage.removeItem("playerNames" + threadId);
  localStorage.removeItem("subNames" + threadId);
  localStorage.removeItem("dayCount" + threadId);
  localStorage.removeItem("savedTallies" + threadId);
  localStorage.removeItem("dayOptions" + threadId);
  localStorage.removeItem("nightTime" + threadId);
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
  curPage = 0;
  postTotal = 0;
  tallyStatus = 0;
  currentDay = 1;
  dayTotal = 1;
  nightTime = 2000;
  unvotingWord = "unvote";
  votingWord = "vote";
}

function resetScript() {
  $("#tally-container").remove();
  $("#qrform").after("<button id='start-tally'>Tallyho</button>");
  $("#start-tally").click(function() {
    localStorage.setItem("tallyStatus" + threadId, "1");
    createInterface();
    $(this).remove();
  });
}

function getForumLink(thread, page) {
  return "http://forums.kingdomofloathing.com/vb/showthread.php?t=" + thread + "&page=" + page;
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
          "v": votingData //Voting candidates
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
    $(".page-block[page='" + curPage + "']").removeClass("partial-save").removeClass("empty-save").addClass("full-save");
  } else {
    alert("Could not save data - page is " + curPage + " and thread id is " + threadId);
  }
}