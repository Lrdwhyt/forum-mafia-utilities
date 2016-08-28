// ==UserScript==
// @name        Forum Mafia Utilities
// @namespace   lrdwhyt
// @description Number of added functionalities to make playing forum mafia easier. Designed for Forums of Loathing.
// @include     http://forums.kingdomofloathing.com/vb/showthread.php?*
// @version     0.4.0
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
#tally-container.floating #tally-wrapper {
  left: 0;
  max-height: 100%;
  opacity: 0.1;
  overflow-y: auto;
  position: fixed;
  top: 0;
}
#tally-body {
  background-color: var(--light-color);
  padding: 10px 0;
}
#tally-container.floating #tally-body {
  padding: 10px;
}
#tally-container.floating:hover #tally-wrapper {
  opacity: 0.9;
}
#tally-controls {
  margin-top: 10px;
}
#tally-container.floating #tally-controls {
  bottom: 0;
  right: 0;
  position: fixed;
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
#day-ranges .input-button:not(.boundary-option-selected):hover {
  border-color: #f5f5f5 !important;
}
#day-ranges .boundary-option-selected .input-button:hover {
  border-color: var(--dark-contrast-color) !important;
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
  -webkit-transition-duration: 0.4s;
  background-color: var(--light-color-highlighted);
  border-color: var(--light-color-highlighted) !important;
  margin: 0 !important;
  padding-left: 3px !important;
  padding-right: 3px !important;
}
#start-date:not(.boundary-option-selected):hover .input-button {
  background-color: #f5f5f5 !important;
  border-color: #f5f5f5 !important;
}
#end-date:not(.boundary-option-selected):hover .input-button {
  background-color: #f5f5f5 !important;
  border-color: #f5f5f5 !important;
}
#start-time, #end-time {
  margin: 0 !important;
  background-color: #fff;
  border-bottom: 3px solid #fff;
}
#day-ranges .input-button:hover {
  background-color: #f5f5f5;
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
  background-color: var(--light-color-highlighted);
  color: #333;
  margin-right: 0 !important;
}
.death-phase:hover {
  background-color: #b0bec5;
  color: #fff;
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

$(document).ready(function () {
  utilities.data.init();
  utilities.ui.init();
  utilities.control.init();
  if (gameSettings.scriptMode) {
    utilities.ui.draw();
    utilities.control.update();
  } else {
    utilities.ui.reset();
    utilities.control.reset();
  }
});

var utilities = {
  ui: {
    init: function() {
      getFrontInterface().insertAfter("#qrform");
      if (scriptSettings.bbcodePostNumbers) {
        $("#toggle-bbcode-post-numbers").text("On");
      }
    },
    draw: function() {
      $("#script-manager").before("<div id='fmu-main-container'></div>");
      $("<div />", {
        id: "page-container"
      })
        .append($("<span />", {
          id: "page-label",
          text: "Page"
        })).append($("<span />", {
          id: "page-controls"
        }))
        .appendTo("#fmu-main-container");
      $("<div />", {
        id: "day-controls"
      })
        .append($("<div />", {
          id: "add-day",
          text: "+",
          title: "Add a day"
        }))
        .append($("<span />", {
          id: "day-tab-container"
        }))
        .append($("<div />", {
          id: "remove-day",
          text: "-",
          title: "Remove a day"
        }))
        .appendTo("#fmu-main-container");
      $("<div />", {
        id: "day-area"
      })
        .append($("<div />", {
          id: "tally-container"
        })
        .append($("<div />", {
          id: "tally-wrapper"
        })
        .append($("<div />", {
          id: "tally-body"
        })))
        .append($("<div />", {
          id: "tally-controls"
        })
        .append($("<button />", {
          class: "function-button",
          id: "update-vote-record",
          text: "Update"
        }))
        .append($("<button />", {
          class: "function-button",
          id: "toggle-vote-record-mode",
          text: "Mode: Vote tally"
        }))
        .append($("<button />", {
          class: "function-button",
          id: "copy-bbcode",
          text: "Copy BBCode tally"
        }))
        .append($("<button />", {
          class: "function-button",
          id: "copy-vote-log",
          text: "Copy vote log"
        }))
        .append($("<button />", {
          class: "function-button",
          id: "toggle-tally-display",
          text: "Pop out",
          title: "Toggle floating display on/off"
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
          class: "input-button edit-button",
          id: "start-year"
        }))
        .append($("<button />", {
          class: "input-button edit-button",
          id: "start-month"
        }))
        .append($("<button />", {
          class: "input-button edit-button",
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
          class: "input-button edit-button",
          id: "end-year"
        }))
        .append($("<button />", {
          class: "input-button edit-button",
          id: "end-month"
        }))
        .append($("<button />", {
          class: "input-button edit-button",
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
          text: "+",
          title: "Add a new GM"
        }))
        .append($("<br />"))
        .append($("<span />", {
          text: "Night time"
        }))
        .append($("<button />", {
          class: "input-button edit-button",
          id: "nightfall-time",
          text: padTime(gameSettings.nightfallTime)
        }))
        .append($("<div />", {
          class: "vote-keywords"
        })
          .append($("<span />", {
            text: "Unvote keyword"
          }))
          .append($("<button />", {
            class: "input-button edit-button",
            id: "unvote-keyword",
            text: "unvote"
          }))
          .append($("<br />"))
          .append($("<span />", {
            text: "Vote keyword"
          }))
          .append($("<button />", {
            class: "input-button edit-button",
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
          text: "+",
          title: "Add a new player"
        }))
        .append($("<button />", {
          class: "function-button",
          id: "import-players",
          text: "Paste...",
          title: "Add multiple players by pasting a list"
        }))
        .append($("<button />", {
          class: "function-button",
          id: "reset-players",
          text: "Reset",
          title: "Reset all players"
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
      utilities.ui.pages.init();
      utilities.ui.days.init();
      utilities.ui.gms.init();
      utilities.ui.players.init();
      if (gameSettings.scriptMode == 2) {
        $("#game-configuration").show();
        $("#toggle-game-configuration").text("Hide game configuration");
      }
      $("#vote-keyword").text(gameSettings.voteKeyword);
      $("#unvote-keyword").text(gameSettings.unvoteKeyword);
      $("#tally-body").on("click",".unrecognised-voter", function() {
        var playerName = $(this).attr("name");
        utilities.control.players.add(playerName);
      })
      $("#update-vote-record").on("click", updateVoteRecord);
      if (gameSettings.voteRecordMode == "votelog") {
        $("#toggle-vote-record-mode").text("Mode: Vote log");
      }
      $("#toggle-vote-record-mode").on("click", function() {
        toggleVoteRecordMode($(this));
      });
      $("#copy-bbcode").on("click", copyBbcodeTally);
      $("#copy-vote-log").on("click", copyVoteLog);
      $("#toggle-tally-display").on("click", function() {
        toggleTallyDisplay($(this));
      });
      if (gameSettings.popoutTally) {
        gameSettings.popoutTally = "";
        toggleTallyDisplay($("#toggle-tally-display"));
      }
      $("#toggle-game-configuration").on("click", function() {
        toggleGameConfig($(this));
      });
      $("#add-day").on("click", function() {
        changeDayCount(1);
      });
      $("#remove-day").on("click", function() {
        changeDayCount(-1);
      });
      $("#day-tab-container").on("click", ".day-tab", function() {
        switchDay($(this).attr("name"));
      });
      $("#start-post").on("click", switchStartPost);
      $("#start-year").on("click", switchStartYear);
      $("#start-month").on("click", switchStartMonth);
      $("#start-day").on("click", switchStartDay);
      $("#start-time").on("click", switchStartTime);
      $("#end-post").on("click", switchEndPost);
      $("#end-year").on("click", switchEndYear);
      $("#end-month").on("click", switchEndMonth);
      $("#end-day").on("click", switchEndDay);
      $("#end-time").on("click", switchEndTime);
      $("#add-gm").on("click", promptAddGm);
      $("#gm-names").on("click", ".gm-name", function() {
        gmNameList.splice($.inArray($(this).text(), gmNameList), 1);
        updateGameData("gmNameList", gmNameList);
        $(this).remove();
      });
      $("#nightfall-time").on("click", function() {
        changeNightfallTime($(this));
      });
      $("#vote-keyword").on("click", function() {
        var newKeyword = prompt("Enter new vote keyword");
        if (newKeyword) {
          gameSettings.voteKeyword = newKeyword;
          updateGameData("gameSettings", gameSettings);
          $(this).text(newKeyword);
        }
      });
      $("#unvote-keyword").on("click", function() {
        var newKeyword = prompt("Enter new unvote keyword");
        if (newKeyword) {
          gameSettings.unvoteKeyword = newKeyword;
          updateGameData("gameSettings", gameSettings);
          $(this).text(newKeyword);
        }
      });
      $("#import-players").on("click", function() {
        $("#paste-wrapper").slideToggle();
        $("#paste-area").focus();
      })
      $("#confirm-paste").on("click", confirmPaste);
      if (gmNameList.length > 0) {
        generateData();
      }
    },
    days: {
      init: function() {
        for (var day = 1; day < dayDataList.length; day++) {
          utilities.ui.days.draw(day);
        }
        switchDay(currentDay);
      },
      draw: function(day) {
        drawDayTab(day);
        colourDayTab(day);
      }
    },
    gms: {
      init: function() {
        if (gmNameList.length > 0) {
          for (var i = 0; i < gmNameList.length; i++) {
            drawGm(gmNameList[i]);
          }
        }
      }
    },
    pages: {
      init: function() {
        for (var page = 1; page <= pageTotal; page++) {
          var pageStatus = getPageStatus(threadId, page);
          var newBlock = $("<a />", {
            class: "page-link",
            href: getPageLink(threadId, page),
            page: page,
            text: page
          }).appendTo($("#page-controls"));
          if (page == currentPage) {
            newBlock.addClass("page-selected");
          }
          if (pageStatus == scriptSettings.numberPostsPerPage || (currentPage == pageTotal && pageStatus == numberPostsOnPage)) {
            newBlock.addClass("full-save");
          } else if (pageStatus > 0) {
            newBlock.addClass("partial-save");
          } else {
            newBlock.addClass("empty-save");
          }
        }
      }
    },
    players: {
      init: function() {
        Object.keys(utilities.data.players.list).forEach(function(playerName) {
          var playerBlock = utilities.ui.players.add(playerName);
          utilities.ui.players.updateState(playerName);
          for (var s in utilities.data.players.list[playerName].subs) {
            utilities.ui.players.subs.add(playerName, utilities.data.players.list[playerName].subs[s]);
          }
        });
      },
      list: {},
      add: function(playerName) {
        var playerBlock = $("<li />", {
          class: "player-block alive-player",
          name: playerName
        })
          .append($("<button />", {
            class: "player-name input-button edit-button",
            text: playerName,
            title: "Edit player name"
          }))
          .append($("<button />", {
            class: "player-state input-button",
            text: "alive",
            title: "Toggle whether player is alive or dead"
          }))
          .append($("<div />", {
            class: "death-info"
          })
          .append($("<button />", {
            class: "death-phase input-button",
            text: "night",
            title: "Toggle between day and night"
          }))
          .append($("<button />", {
            class: "death-time input-button edit-button",
            text: "1",
            title: "Day/night of death"
          })))
          .append($("<span />", {
            class: "sub-list"
          }))
          .append($("<span />", {
            class: "player-controls"
          })
          .append($("<button />", {
            class: "add-sub function-button",
            text: "+Alias",
            title: "Add a new alias for this player"
          }))
          .append($("<button />", {
            class: "remove-player function-button",
            text: "-",
            title: "Remove this player"
          })))
        .appendTo("#player-list");
        utilities.ui.players.list[playerName] = playerBlock;
      },
      //TODO: ui.players
      rename: function(oldName, newName) {
        utilities.ui.players.list[newName] = utilities.ui.players.list[oldName];
        delete utilities.ui.players.list[oldName];
        var playerBlock = utilities.ui.players.list[newName];
        playerBlock.find(".player-name").text(newName);
        playerBlock.attr("name", newName);
        for (var i in unrecognisedVoterList) {
          $(".unrecognised-voter[name='" + oldName + "']").attr("name", newName);
        }
      },
      updateState: function(playerName) {
        var playerStatus = utilities.data.players.list[playerName].status;
        var playerBlock = this.list[playerName];
        playerBlock.find(".player-state").text(getLifeStatus(playerStatus));
        playerBlock.find(".death-phase").text(getPhaseName(playerStatus));
        playerBlock.find(".death-time").text(getDeathTime(playerStatus));
        if (playerStatus == 0) {
          playerBlock.addClass("alive-player").removeClass("dead-player");
        } else {
          playerBlock.addClass("dead-player").removeClass("alive-player");
        }
      },
      subs: {
        add: function(playerName, subName) {
          var playerBlock = utilities.ui.players.list[playerName];
          if (playerBlock.find(".sub-list").text().length == 0) {
            $("<span />", {
              text: "subbing for"
            }).appendTo(playerBlock.find(".sub-list"));
          }
          $("<button />", {
            class: "sub-name input-button",
            text: subName
          })
          .appendTo(playerBlock.find(".sub-list"));
        },
        remove: function(playerName, subName) {
          var playerBlock = utilities.ui.players.list[playerName];
          if (utilities.data.players.list[playerName].subs.length == 0) {
            playerBlock.children(".sub-list").text("");
          } else {
            playerBlock.find(".sub-name").filter(function() {
              return $(this).text() == subName;
            }).remove();
          }
        }
      },
      remove: function(playerName) {
        this.list[playerName].remove();
      },
      reset: function() {
        $("#player-list").text("");
      }
    },
    reset: function() {
      $("#fmu-main-container").remove();
      $("#toggle-script").text("Start game");
    }
  },
  control: {
    init: function() {
      $("#edit-settings").on("click", function() {
        $("#settings-display").slideToggle();
      });
      $("#toggle-script").on("click", function() {
        toggleScriptMode($(this));
      });
      $("#toggle-bbcode-post-numbers").on("click", function() {
        toggleBbcodePostNumbers($(this));
      });
      $("#night-buffer-time").on("click", function() {
        var newBuffer = parseInt(prompt("Enter night buffer time in minutes"));
        if (newBuffer > 0) {
          scriptSettings.nightBufferTime = newBuffer;
          localStorage.setItem("fmuSettings", JSON.stringify(scriptSettings));
          $(this).text(newBuffer);
        }
      });
      $("#clear-data").on("click", function() {
        if (confirm("Are you sure you want to reset all data?")) {
          localStorage.clear();
          scriptSettings = {
            "bbcodePostNumbers": 0, //BBCode post numbers
            "nightBufferTime": 10, //How long a night lasts - used for automatically filling in start times
            "numberPostsPerPage": 60 //Maximum number of posts per page - Forum default is 60
          };
          utilities.data.reset();
          utilities.ui.reset();
        }
      });
    },
    update: function() {
      $("#reset-players").on("click", utilities.control.players.reset);
      $("#add-player").on("click", function() {
        var newPlayer = prompt("Enter the name of the player you want to add");
        if (newPlayer) {
          utilities.control.players.add(newPlayer);
        }
      });
      $("#player-list").on("click", ".player-name", function() {
        var oldName = $(this).text();
        var newName = prompt("Enter new player name.", oldName);
        if (newName) {
          utilities.control.players.rename(oldName, newName);
        } else if (newName == "") {
          utilities.control.players.remove(oldName);
        }
      });
      $("#player-list").on("click", ".player-state", function() {
        var playerName = $(this).parent().attr("name");
        if (utilities.data.players.list[playerName].status > 0) {
          utilities.control.players.updateState(playerName, 0);
        } else {
          utilities.control.players.updateState(playerName, currentDay * 2);
        }
      });
      $("#player-list").on("click", ".death-phase", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        var playerState = utilities.data.players.list[playerName].status;
        if (playerState % 2 == 0) {
          utilities.control.players.updateState(playerName, playerState - 1);
        } else {
          utilities.control.players.updateState(playerName, playerState + 1);
        }
      });
      $("#player-list").on("click", ".death-time", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        var newState = parseInt(prompt("Enter the day/night of death"));
        if (newState > 0) {
          if (utilities.data.players.list[playerName].status % 2 == 0) {
            utilities.control.players.updateState(playerName, newState * 2);
          } else {
            utilities.control.players.updateState(playerName, newState * 2 - 1);
          }
        }
      });
      $("#player-list").on("click", ".sub-name", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        var subName = $(this).text();
        utilities.control.players.subs.remove(playerName, subName);
      });
      $("#player-list").on("click", ".add-sub", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        var subName = prompt("Enter alternative name for player - e.g. subs or nicknames");
        if (subName) {
          utilities.control.players.subs.add(playerName, subName);
        }
      });
      $("#player-list").on("click", ".remove-player", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        utilities.control.players.remove(playerName);
      });
    },
    players: {
      //TODO: control.players
      add: function(playerName) {
        if (!utilities.data.players.list.hasOwnProperty(playerName)) {
          //If player is not already in player list, add player
          utilities.data.players.add(playerName);
          player.recognise(playerName);
          utilities.ui.players.add(playerName);
        }
      },
      updateState: function(playerName, newState) {
        utilities.data.players.updateState(playerName, newState);
        utilities.ui.players.updateState(playerName);
      },
      subs: {
        add: function(playerName, subName) {
          utilities.data.players.addSub(playerName, subName);
          utilities.ui.players.subs.add(playerName, subName);
        },
        remove: function(playerName, subName) {
          utilities.data.players.removeSub(playerName, subName);
          utilities.ui.players.subs.remove(playerName, subName);
        }
      },
      rename: function(oldName, newName) {
        if (utilities.data.players.rename(oldName, newName)) {
          utilities.ui.players.rename(oldName, newName);
        }
      },
      remove: function(playerName) {
        if (utilities.data.players.list.hasOwnProperty(playerName)) {
          utilities.data.players.remove(playerName);
          utilities.ui.players.remove(playerName);
        }
      },
      reset: function() {
        utilities.data.players.reset();
        utilities.ui.players.reset();
      }
    },
    reset: function() {
      //Reset
    }
  },
  data: {
    init: function() {
      threadId = getThreadId();
      if (localStorage.getItem("fmuSettings")) {
        scriptSettings = JSON.parse(localStorage.getItem("fmuSettings"));
      } else {
        scriptSettings = {
          "bbcodePostNumbers": 0, //BBCode post numbers
          "nightBufferTime": 10, //How long a night lasts - used for automatically filling in start times
          "numberPostsPerPage": 60 //Maximum number of posts per page - Forum default is 60
        }
      }
      timeZone = getTimeZone();
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
      ignoredPlayerList = ["TallyBot"]; //Usernames to ignore when retrieving data
      nightKeywords = ["lynch", "kill", "day", "night", "someone", "die"]; //List of words associated with night posts (unimplemented)
      currentPage = 0;
      pageTotal = 0;
      numberPostsOnPage = 0;
      getCurrentPageNumbers();
      utilities.data.reset();
      utilities.data.players.init();
    },
    reset: function() {
      if (localStorage.getItem("gameSettings" + threadId)) {
        gameSettings = JSON.parse(localStorage.getItem("gameSettings" + threadId));
      } else {
        gameSettings = {
          "scriptMode": 0, //0 = Off, 1 = On, game config is hidden, 2 = On, game config is shown
          "currentDay": 1, //The day that is currently selected by the user
          "nightfallTime": 2000, //Default time for nightfall
          "popoutTally": "", //Tally display mode
          "voteRecordMode": "tally", //Whether tally or vote log is displayed
          "voteKeyword": "vote", //String used to signify vote
          "unvoteKeyword": "unvote" //String used to signify unvote
        };
      }
      currentDay = gameSettings.currentDay;
      gmNameList = [];
      savedTallyList = [];
      savedVoteLogList = [];
      recognisedVoteList = {};
      unrecognisedVoterList = [];
      dayDataList = [];
      initialiseDayData(1);
      if (localStorage.getItem("gmNameList" + threadId)) {
        gmNameList = JSON.parse(localStorage.getItem("gmNameList" + threadId));
      }
      if (currentPage == 1 && gmNameList.length == 0) {
        //Page 1, so the first poster should be a GM
        gmNameList.push($(".bigusername").first().text());
        updateGameData("gmNameList", gmNameList);
      }
      initialiseDayData(1);
      if (localStorage.getItem("dayDataList" + threadId)) {
        dayDataList = JSON.parse(localStorage.getItem("dayDataList" + threadId));
      }
      if (localStorage.getItem("savedTallyList" + threadId)) {
        savedTallyList = JSON.parse(localStorage.getItem("savedTallyList" + threadId));
      }
      if (localStorage.getItem("savedVoteLogList" + threadId)) {
        savedVoteLogList = JSON.parse(localStorage.getItem("savedVoteLogList" + threadId));
      }
      if (localStorage.getItem("unrecognisedVoterList" + threadId)) {
        unrecognisedVoterList = JSON.parse(localStorage.getItem("unrecognisedVoterList" + threadId));
      }
    },
    resetLocal: function() {
      localStorage.removeItem("gmNameList" + threadId);
      localStorage.removeItem("players" + threadId);
      localStorage.removeItem("dayDataList" + threadId);
      localStorage.removeItem("savedTallyList" + threadId);
      localStorage.removeItem("savedVoteLogList" + threadId);
      localStorage.removeItem("dayDataList" + threadId);
      localStorage.removeItem("gameSettings" + threadId);
      localStorage.removeItem("unrecognisedVoterList" + threadId);
      $(".full-save, .partial-save").each(function() {
        pg = $(this).text();
        localStorage.removeItem("pageData" + threadId + "-" + pg);
        localStorage.removeItem("pageStatus" + threadId + "-" + pg);
      });
    },
    //TODO: data.players
    players: {
      init: function() {
        if (localStorage.getItem("players" + threadId)) {
          this.list = JSON.parse(localStorage.getItem("players" + threadId));
        }
      },
      add: function(playerName) {
        if (!this.list.hasOwnProperty[playerName]) {
          this.list[playerName] = {
            "status": 0,
            "subs": [],
            "nicknames": []
          };
          this.generateNicknames(playerName);
          this.save();
        }
      },
      list: {},
      isAlive: function(playerName, day) {
        if (this.list.hasOwnProperty(playerName) && this.list[playerName].status != 0 && this.list[playerName].status < day * 2) {
          return false;
        } else {
          return true;
        }
      },
      generateNicknames: function(playerName) {
        if (playerName.indexOf(" ") >= 0) {
          var newNick = "";
          var splitName = playerName.split(" ");
          for (var c in splitName) {
            newNick += splitName[c].charAt(0);
          }
          this.list[playerName].nicknames.push(newNick);
        }
        if (playerName.indexOf("_") >= 0) {
          var newNick = "";
          var splitName = playerName.split("_");
          for (var c in splitName) {
            newNick += splitName[c].charAt(0);
          }
          if ($.inArray(newNick, this.list[playerName].nicknames) == -1) {
            this.list[playerName].nicknames.push(newNick);
          }
        }
        var uppercaseName = getUpperCase(playerName);
        var nonLowercaseName = getNonLowerCase(playerName);
        var lowercaseName = getLowerCase(playerName);
        if (uppercaseName.length > 1 && lowercaseName.length > 2) {
          if ($.inArray(nonLowercaseName, this.list[playerName].nicknames) == -1) {
            this.list[playerName].nicknames.push(nonLowercaseName);
          }
        } else if(nonLowercaseName.length > 5 && lowercaseName.length > 1) {
          if ($.inArray(lowercaseName, this.list[playerName].nicknames) == -1) {
            this.list[playerName].nicknames.push(lowercaseName);
          }
        }
      },
      rename: function(oldName, newName) {
        if (!this.list.hasOwnProperty(newName)) {
          this.list[newName] = this.list[oldName];
          delete this.list[oldName];
          this.save();
          return true;
        } else {
          return false;
        }
      },
      updateState: function(playerName, newState) {
        this.list[playerName].status = newState;
        this.save();
      },
      addSub: function(playerName, subName) {
        if ($.inArray(subName, this.list[playerName].subs) == -1) {
          this.list[playerName].subs.push(subName);
          this.save();
        }
      },
      removeSub: function(playerName, subName) {
        var i = $.inArray(subName, this.list[playerName].subs);
        if (i >= 0) {
          this.list[playerName].subs.splice(i, 1);
          this.save();
        }
      },
      addNickname: function(nickname) {
        if (!this.list[playerName].nicknames) {
          this.list[playerName].nicknames = [];
        }
        this.list[playerName].nicknames.push(nickname);
        this.save();
      },
      removeNickname: function(nickname) {
        var i = $.inArray(nickname, this.list[playerName].nicknames);
        if (i >= 0) {
          this.list[playerName].nicknames.splice(i, 1);
          this.save();
        }
      },
      registerUnrecognisedVoter: function(userName) {
        if ($.inArray(userName, unrecognisedVoterList) == -1) {
          var recognisedVoter = false;
          Object.keys(this.list).forEach(function(playerName) {
            if (!recognisedVoter) {
              if (diceCoefficient(playerName, userName) > 0.9) {
                utilities.control.players.rename(playerName, userName);
                recognisedVoter = true;
              }
            }
          });
          if (!recognisedVoter) {
            unrecognisedVoterList.push(userName);
            updateGameData("unrecognisedVoterList", unrecognisedVoterList);
          }
        }
      },
      save: function() {
        localStorage.setItem("players" + threadId, JSON.stringify(this.list));
      },
      remove: function(playerName) {
        delete utilities.data.players.list[playerName];
        this.save();
      },
      reset: function() {
        this.list = {};
        this.save();
      }
    }
  }
}

function toggleScriptMode(toggleButton) {
  if (gameSettings.scriptMode == 0) {
    gameSettings.scriptMode = 1;
    updateGameData("gameSettings", gameSettings);
    utilities.data.reset();
    utilities.ui.draw();
    toggleButton.text("Delete game");
  } else {
    utilities.data.resetLocal();
    utilities.data.reset();
    utilities.ui.reset();
  }
}

function getFrontInterface() {
  return $("<div />", {
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
        text: "Delete game",
        title: "Toggle the script on/off for this game"
      }))
      .append($("<button />", {
        class: "function-button",
        id: "edit-settings",
        text: "Settings",
        title: "Edit scriptwide settings"
      }))
      .append($("<button />", {
        class: "function-button",
        onclick: "window.open('https://github.com/Lrdwhyt/forum-mafia-utilities/wiki', '_blank')",
        text: "Help",
        title: "Open the usage guide"
      })))
    .append($("<div />", {
      id: "settings-display"
    })
      .append($("<span />", {
        text: "BBCode post numbers"
      }))
      .append($("<button />", {
        class: "function-button",
        id: "toggle-bbcode-post-numbers",
        text: "Off",
        title: "Toggle post numbers on/off for BBCode tallies"
      }))
      .append($("<br />"))
      .append($("<span />", {
        text: "Night buffer time (minutes)"
      }))
      .append($("<button />", {
        class: "input-button edit-button",
        id: "night-buffer-time",
        text: scriptSettings.nightBufferTime,
        title: "The amount of time between the end of one day and the start of the next"
      }))
      .append($("<div />", {
        id: "memory-usage",
        text: "Local memory: ~" + Math.round(unescape(encodeURIComponent(JSON.stringify(localStorage))).length * 2 / 1024 / 1024 * 10000) / 10000 + " MB used of 5 MB"
      }))
      .append($("<button />", {
        class: "function-button",
        id: "clear-data",
        text: "Clear script data",
        title: "Reset all data permanently"
      })));
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

function getTimeZone() {
  var timeString = $("div.page div.smallfont").last().text(); //Gets string at bottom which tells time zone
  timeString = timeString.split("GMT")[1].split(". ")[0]; //Get between "GMT " and ". "
  return parseFloat(timeString.replace("+","").trim());
}

function toggleBbcodePostNumbers(toggleButton) {
  if (scriptSettings.bbcodePostNumbers == 0) {
    scriptSettings.bbcodePostNumbers = 1;
    localStorage.setItem("fmuSettings", JSON.stringify(scriptSettings));
    toggleButton.text("On");
  } else {
    scriptSettings.bbcodePostNumbers = 0;
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

function getLastNightfall() {
  //Get current date in timeZone
  var date = getOffsetDate(new Date(), 0, timeZone);
  var nightfallHours = Math.floor(gameSettings.nightfallTime / 100);
  var nightfallMinutes = gameSettings.nightfallTime % 100;
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
    startDate = new Date(oldEndDate.getTime() + scriptSettings.nightBufferTime * 60 * 1000);
    endDate = new Date(oldEndDate.getTime() + 24 * 60 * 60 * 1000);
  }
  dayDataList[day] = {
    "startDate": startDate,
    "startPost": startPost,
    "startSelected": "start-date",
    "endDate": endDate,
    "endSelected": "end-date"
  };
}

function changeNightfallTime(nightfallTimeButton) {
  var nightfallTime = validateTime(prompt("Enter new time for night"));
  if (nightfallTime >= 0) {
    gameSettings.nightfallTime = validateTime(nightfallTime);
    updateGameData("gameSettings", gameSettings);
    nightfallTimeButton.text(padTime(gameSettings.nightfallTime));
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
  updateGameData("dayDataList", dayDataList);
  switchDay(currentDay);
  colourDayTab(currentDay);
}

function switchStartDate() {
  if (!dayDataList[currentDay]) {
    dayDataList[currentDay] = {};
  }
  dayDataList[currentDay]["startSelected"] = "start-date";
  updateGameData("dayDataList", dayDataList);
  switchDay(currentDay);
  colourDayTab(currentDay);
}

function switchStartYear() {
  if (dayDataList[currentDay]["startSelected"] == "start-date") {
    var year = parseInt(prompt("Enter new start year"));
    if (year > 0) {
      var newDate = new Date(dayDataList[currentDay]["startDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCFullYear(year);
      dayDataList[currentDay]["startDate"] = getOffsetDate(newDate, 0, -timeZone);
      updateGameData("dayDataList", dayDataList);
      switchDay(currentDay);
    }
  } else {
    switchStartDate();
  }
}

function switchStartMonth() {
  if (dayDataList[currentDay]["startSelected"] == "start-date") {
    var month = parseInt(prompt("Enter new start month"));
    if (month > 0 && month <= 12) {
      var newDate = new Date(dayDataList[currentDay]["startDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCMonth(month - 1);
      dayDataList[currentDay]["startDate"] = getOffsetDate(newDate, 0, -timeZone);
      updateGameData("dayDataList", dayDataList);
      switchDay(currentDay);
    }
  } else {
    switchStartDate();
  }
}

function switchStartDay() {
  if (dayDataList[currentDay]["startSelected"] == "start-date") {
    var day = parseInt(prompt("Enter new start day"));
    if (day > 0 && day <= 31) {
      var newDate = new Date(dayDataList[currentDay]["startDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCDate(day);
      dayDataList[currentDay]["startDate"] = getOffsetDate(newDate, 0, -timeZone);
      updateGameData("dayDataList", dayDataList);
      switchDay(currentDay);
    }
  } else {
    switchStartDate();
  }
}

function switchStartTime() {
  if (dayDataList[currentDay]["startSelected"] == "start-date") {
    var time = prompt("Enter new start time");
    var actualTime = validateTime(time);
    if (actualTime > -1) {
      var hours = Math.floor(actualTime / 100);
      var minutes = actualTime % 100;
      var newDate = new Date(dayDataList[currentDay]["startDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCHours(hours);
      newDate.setUTCMinutes(minutes);
      dayDataList[currentDay]["startDate"] = getOffsetDate(newDate, 0, -timeZone);
      updateGameData("dayDataList", dayDataList);
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
  updateGameData("dayDataList", dayDataList);
  switchDay(currentDay);
  colourDayTab(currentDay);
}

function switchEndDate() {
  var post;
  if (!dayDataList[currentDay]) {
    dayDataList[currentDay] = {};
  }
  dayDataList[currentDay]["endSelected"] = "end-date";
  updateGameData("dayDataList", dayDataList);
  switchDay(currentDay);
  colourDayTab(currentDay);
}

function switchEndYear() {
  if (dayDataList[currentDay]["endSelected"] == "end-date") {
    var year = parseInt(prompt("Enter new end year"));
    if (year > 0) {
      var newDate = new Date(dayDataList[currentDay]["endDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCFullYear(year);
      dayDataList[currentDay]["endDate"] = getOffsetDate(newDate, 0, -timeZone);
      updateGameData("dayDataList", dayDataList);
      switchDay(currentDay);
    }
  } else {
    switchEndDate();
  }
}

function switchEndMonth() {
  if (dayDataList[currentDay]["endSelected"] == "end-date") {
    var month = parseInt(prompt("Enter new end month"));
    if (month > 0 && month <= 12) {
      var newDate = new Date(dayDataList[currentDay]["endDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCMonth(month - 1);
      dayDataList[currentDay]["endDate"] = getOffsetDate(newDate, 0, -timeZone);
      updateGameData("dayDataList", dayDataList);
      switchDay(currentDay);
    }
  } else {
    switchEndDate();
  }
}

function switchEndDay() {
  if (dayDataList[currentDay]["endSelected"] == "end-date") {
    var day = parseInt(prompt("Enter new end day"));
    if (day > 0 && day <= 31) {
      var newDate = new Date(dayDataList[currentDay]["endDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCDate(day);
      dayDataList[currentDay]["endDate"] = getOffsetDate(newDate, 0, -timeZone);
      updateGameData("dayDataList", dayDataList);
      switchDay(currentDay);
    }
  } else {
    switchEndDate();
  }
}

function switchEndTime() {
  if (dayDataList[currentDay]["endSelected"] == "end-date") {
    var time = prompt("Enter new end time");
    var actualTime = validateTime(time);
    if (actualTime > -1) {
      var hours = Math.floor(actualTime / 100);
      var minutes = actualTime % 100;
      var newDate = new Date(dayDataList[currentDay]["endDate"]);
      newDate = getOffsetDate(newDate, 0, timeZone);
      newDate.setUTCHours(hours);
      newDate.setUTCMinutes(minutes);
      dayDataList[currentDay]["endDate"] = getOffsetDate(newDate, 0, -timeZone);
      updateGameData("dayDataList", dayDataList);
      switchDay(currentDay);
    }
  } else {
    switchEndDate();
  }
}

function promptAddGm() {
  var newGm = prompt("Enter the name of the GM you want to add");
  if (newGm) {
    addGm(newGm);
  }
}

function confirmPaste() {
  $("#paste-wrapper").slideUp();
  var importedPlayers = $("#paste-area").val().split("\n");
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
    utilities.control.players.add(importedPlayers[i]);
  }
}

function formatTimeString(date) {
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
  gameSettings.currentDay = day;
  updateGameData("gameSettings", gameSettings);
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
    $("#start-month").text(padTo2Digits(startTime.getUTCMonth() + 1));
    $("#start-day").text(padTo2Digits(startTime.getUTCDate()));
    $("#start-time").text(formatTimeString(startTime));
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
    $("#end-month").text(padTo2Digits(endTime.getUTCMonth() + 1));
    $("#end-day").text(padTo2Digits(endTime.getUTCDate()));
    $("#end-time").text(formatTimeString(endTime));
  }
  if (gameSettings.voteRecordMode == "tally" && savedTallyList[day]) {
    $("#tally-body").html(tallyToHtml(savedTallyList[day]));
  } else if (gameSettings.voteRecordMode == "votelog" && savedVoteLogList[day]) {
    $("#tally-body").html(savedVoteLogList[day]);
  } else {
    $("#tally-body").html("");
  }
}

function toggleTallyDisplay(toggleButton) {
  if (gameSettings.popoutTally) {
    gameSettings.popoutTally = "";
    updateGameData("gameSettings", gameSettings);
    $("#tally-container").removeClass("floating");
    toggleButton.text("Pop out");
  } else {
    gameSettings.popoutTally = "1";
    updateGameData("gameSettings", gameSettings);
    $("#tally-container").addClass("floating");
    toggleButton.text("Close");
  }
}

function drawDayTab(day) {
  $("<div />", {
    class: "day-tab",
    name: day,
    text: "Day " + day
  }).appendTo("#day-tab-container");
}

function deleteDayData(day) {
  if (dayDataList[day]) {
    dayDataList.splice(day, 1);
    updateGameData("dayDataList", dayDataList);
  }
  if (savedTallyList[day]) {
    savedTallyList.splice(day, 1);
    updateGameData("savedTallyList", savedTallyList);
  }
}

function updateVoteRecord() {
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
  parseAllVotes();
  var voteRecord = "";
  if (gameSettings.voteRecordMode == "tally") {
    var tally = getTallyForRange(start, end, currentDay);
    savedTallyList[currentDay] = tally;
    updateGameData("savedTallyList", savedTallyList);
    voteRecord = tallyToHtml(tally);
  } else {
    voteRecord = getVoteLogForRange(start, end);
    savedVoteLogList[currentDay] = voteRecord;
    updateGameData("savedVoteLogList", savedVoteLogList);
  }
  $("#tally-body").html(voteRecord);
}

function toggleVoteRecordMode(toggleButton) {
  if (gameSettings.voteRecordMode == "tally") {
    gameSettings.voteRecordMode = "votelog";
    updateGameData("gameSettings", gameSettings);
    toggleButton.text("Mode: Vote log");
  } else {
    gameSettings.voteRecordMode = "tally";
    updateGameData("gameSettings", gameSettings);
    toggleButton.text("Mode: Vote tally");
  }
  updateVoteRecord();
}

function copyBbcodeTally() {
  if (savedTallyList[currentDay]) {
    $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
    $("#data-container").val(tallyToBbcode(savedTallyList[currentDay], currentDay));
    $("#data-container").select();
    document.execCommand("copy");
    $("#data-container").remove();
  }
}

function copyVoteLog() {
  $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
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
  parseAllVotes();
  var voteLog = getVoteLogForRange(start, end);
  $("#data-container").val(voteLog);
  $("#data-container").select();
  document.execCommand("copy");
  $("#data-container").remove();
}

function updateGameData(field, object) {
  localStorage.setItem(field + threadId, JSON.stringify(object));
}

function toggleGameConfig(toggleButton) {
  if ($("#game-configuration").is(":visible")) {
    gameSettings.scriptMode = 1;
    updateGameData("gameSettings", gameSettings);
    $("#game-configuration").slideUp(function() {
      $("#toggle-game-configuration").text("Show game configuration");
    });
  } else {
    gameSettings.scriptMode = 2;
    updateGameData("gameSettings", gameSettings);
    $("#game-configuration").slideDown();
    toggleButton.text("Hide game configuration");
  }
}

function changeDayCount(change) {
  if (change > 0) {
    var newDay = dayDataList.length;
    drawDayTab(newDay);
    initialiseDayData(newDay);
    updateGameData("dayDataList", dayDataList);
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
    var page = $(this).text();
    //Combines two objects into the first
    jQuery.extend(combinedData, getPageData(page));
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
  var lastUnvote = vote.lastIndexOf(gameSettings.unvoteKeyword);
  var lastVote = vote.lastIndexOf(gameSettings.voteKeyword);
  var lengthDifference = gameSettings.unvoteKeyword.length - gameSettings.voteKeyword.length;
  if (vote.indexOf(gameSettings.unvoteKeyword) >= 0) {
    hasUnvote = true;
  }
  if (vote.replace(new RegExp(gameSettings.unvoteKeyword, "g"), "").indexOf(gameSettings.voteKeyword) >= 0) {
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
  var voteTarget = vote.split(":").pop().split(gameSettings.unvoteKeyword).pop().split(gameSettings.voteKeyword).pop();
  voteTarget = voteTarget.split("(")[0].split("[")[0].trim();
  if (voteTarget == "") {
    return null;
  } else if (!jQuery.isEmptyObject(utilities.data.players.list)) {
    return matchPlayer(voteTarget);
  } else {
    return voteTarget;
  }
}

function getTallyForRange(start, end, day) {
  var playerVotes = {};
  var tally = {};
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
    var user = vote["user"];
    if (!utilities.data.players.isAlive(vote["user"], day)) {
      //Throwing out votes from dead players
      return;
    }
    if (!playerVotes.hasOwnProperty(vote["user"])) {
      if (!utilities.data.players.list.hasOwnProperty(vote["user"])) {
        Object.keys(utilities.data.players.list).forEach(function(playerName) {
          for (var sub in utilities.data.players.list[playerName].subs) {
            if (utilities.data.players.list[playerName].subs[sub] == user) {
              user = playerName;
              break;
            }
          }
        });
        if (vote["user"] == user) {
          //Did not match to sub
          utilities.data.players.registerUnrecognisedVoter(vote["user"]);
        }
      }
      playerVotes[user] = {};
    }
    if (!playerVotes[user].hasOwnProperty("post") || post > playerVotes[user]["post"]) {
      playerVotes[user]["post"] = post;
      playerVotes[user]["link"] = vote["link"];
      if (vote["type"] == 2 || vote["type"] == 1) {
        playerVotes[user]["target"] = vote["target"];
      } else if (vote["type"] == -1) {
        playerVotes[user]["target"] = "";
      }
    }
  });
  Object.keys(utilities.data.players.list).forEach(function(playerName) {
    if (!utilities.data.players.isAlive(playerName, day)) {
      return;
    }
    if (!playerVotes.hasOwnProperty(playerName)) {
      playerVotes[playerName] = {
        "target": "",
        "post": 0,
        "link": ""
      };
    }
  });
  Object.keys(playerVotes).sort(function(a, b) {
    return playerVotes[a]["post"] - playerVotes[b]["post"];
  }).forEach(function(user) {
    var target = playerVotes[user]["target"];
    if (!tally[target]) {
      tally[target] = [];
    }
    tally[target].push([user, playerVotes[user]["post"], playerVotes[user]["link"]]);
  });
  return tally;
}

//Takes a range and returns a HTML representation of all votes in that range
function getVoteLogForRange(start, end) {
  var voteLog = "";
  Object.keys(recognisedVoteList).sort(function(a, b) {
    //Sort by post number
    return a - b;
  }).forEach(function(post) {
    //Filtering for range
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
    var type = recognisedVoteList[post]["type"];
    voteLog += "[#<a href='" + getPostLink(recognisedVoteList[post]["link"]) + "'>" + post + "</a>] ";
    voteLog += recognisedVoteList[post]["user"];
    if (type == 2) {
      voteLog += " votes " + recognisedVoteList[post]["target"];
    } else if (type == 1) {
      voteLog += " unvotes and votes " + recognisedVoteList[post]["target"];
    } else if (type == -1) {
      voteLog += " unvotes" + (recognisedVoteList[post]["target"] != null ? " " + recognisedVoteList[post]["target"] : "");
    }
    voteLog += "<br />";
  });
  return voteLog;
}

//Takes tally object and ouputs a string with BBCode formatting
function tallyToBbcode(tally, day) {
  var bbcode = "Day " + day + " - ";
  if (dayDataList[day]["startSelected"] == "start-post") {
    bbcode += "Post " + dayDataList[day]["startPost"];
  } else {
    var startDate = new Date(dayDataList[day]["startDate"]).toUTCString().split(",").slice(1).join(" ").split(":");
    startDate.pop();
    bbcode += startDate.join(":").trim() + " UTC";
  }
  bbcode += " to ";
  if (dayDataList[day]["endSelected"] == "end-post") {
    bbcode += "Post " + dayDataList[day]["endPost"];
  } else {
    var endDate = new Date(dayDataList[day]["endDate"]).toUTCString().split(",").slice(1).join(" ").split(":");
    endDate.pop();
    bbcode += endDate.join(":").trim() + " UTC";
  }
  bbcode += " - Tally generated via Forum Mafia Utilities";
  bbcode += "\n\n";
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
      if (scriptSettings.bbcodePostNumbers) {
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
      //Preventing conversion of "8)" to a smiley
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

function getBigrams(string) {
  var bigrams = [];
  for (var i = 0; i < string.length - 1; i++) {
    bigrams.push(string.slice(i, i+2));
  }
  return bigrams;
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
  Object.keys(utilities.data.players.list).forEach(function(playerName) {
    for (var nick in utilities.data.players.list[playerName].nicknames) {
      var score = diceCoefficient(string, utilities.data.players.list[playerName].nicknames[nick]);
      if (score >= highestScore) {
        closestMatch = playerName;
        highestScore = score;
      }
    }
    for (var sub in utilities.data.players.list[playerName].subs) {
      var score = diceCoefficient(string, utilities.data.players.list[playerName].subs[sub]);
      if (score >= highestScore) {
        closestMatch = playerName;
        highestScore = score;
      }
    }
    var score = diceCoefficient(string, playerName);
    if (score >= highestScore) {
      closestMatch = playerName;
      highestScore = score;
    }
  });
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

var player = {
  recognise: function(playerName) {
    //Checks the unrecognised voter list to see if it can match some new name and remove them from the unrecognised list
    for (var i in unrecognisedVoterList) {
      if (diceCoefficient(unrecognisedVoterList[i], playerName) > 0.9) {
        unrecognisedVoterList.splice(i, 1);
        updateGameData("unrecognisedVoterList", unrecognisedVoterList);
        $(".unrecognised-voter[name='" + playerName + "']").removeClass("unrecognised-voter");
        break;
      }
    }
  }
}

function addGm(gmName) {
  if ($.inArray(gmName, gmNameList) == -1) {
    gmNameList.push(gmName);
    updateGameData("gmNameList", gmNameList);
    drawGm(gmName);
    if (gmNameList.length == 1) {
      //If there is now exactly 1 GM, then there were 0 before and data has not been generated yet
      generateData();
    }
  }
}

function drawGm(gmName) {
  $("<button />", {
    class: "gm-name input-button",
    text: gmName
  }).appendTo($("#gm-names"));
}

//Returns uppercase characters of a string
function getUpperCase(string) {
  var uppercaseString = "";
  for (var i in string) {
    var c = string.charAt(i);
    if (c.toUpperCase() == c.toLowerCase()) {
      continue;
    } else if (c == c.toUpperCase()) {
      uppercaseString += c;
    }
  }
  return uppercaseString;
}

//Returns non-lowercase characters of a string
function getNonLowerCase(string) {
  var nonLowercaseString = "";
  for (var i in string) {
    var c = string.charAt(i);
    if (c == c.toUpperCase()) {
      nonLowercaseString += c;
    }
  }
  return nonLowercaseString;
}

//Returns lowercase characters of a string
function getLowerCase(string) {
  var lowercaseString = "";
  for (var i in string) {
    var c = string.charAt(i);
    if (c.toUpperCase() == c.toLowerCase()) {
      continue;
    } else if (c == c.toLowerCase()) {
      lowercaseString += c;
    }
  }
  return lowercaseString;
}

//Takes a forum date string such as "Today, Aug 8, 2016 09:30 PM" and converts into a JavaScript date object
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

function validateTime(time) {
  var sanitisedTime = time.replace(":","").replace(" ","").replace("h","").replace(".","");
  var validTime = parseInt(sanitisedTime);
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
  } else if (validTime < 60 && sanitisedTime.charAt(0) == "0") {
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

function padTime(time) {
  var paddedTime = time + "";
  while (paddedTime.length < 4) {
    paddedTime = "0" + paddedTime;
  }
  return paddedTime.substr(0, 2) + ":" + paddedTime.substr(2);
}

function padTo2Digits(number) {
  var paddedNumber = number + "";
  while (paddedNumber.length < 2) {
    paddedNumber = "0" + paddedNumber;
  }
  return paddedNumber;
}

function getOffsetDate(date, days, hours) {
  return new Date(date.getTime() + (days * 24 + hours) * 60 * 60 * 1000);
}

function getPageStatus(thread, page) {
  var numSaved = localStorage.getItem("pageStatus" + thread + "-" + page)
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
  var gmData = {};
  $("#posts").find(".page").each(function () {
    var username = getPostUsername($(this));
    var boldPost = getPostBoldText($(this));
    if (boldPost.length > 0 && $.inArray(username, gmNameList) == -1 && $.inArray(username, ignoredPlayerList) == -1) {
      var boldedContent = "";
      boldPost.each(function () {
        var htmlContent = $(this).html();
        if ($(this).children(".inlineimg").length > 0) {
          //Replace smileys with their text representations
          var htmlContent = $("<b>" + $(this).html() + "</b>");
          htmlContent.children("[title='Surprised']").replaceWith(":o");
          htmlContent.children("[title='Broad Smile']").replaceWith(":D");
          htmlContent.children("[title='Razz']").replaceWith(":p");
          htmlContent.children("[title='Mad']").replaceWith(":x");
          htmlContent = htmlContent.html();
        }
        var content = htmlContent.replace(/(['"])/g, '\\$1').replace(/\n/g, " ").toLowerCase();
        if (content.indexOf(gameSettings.voteKeyword) >= 0 || content.indexOf(gameSettings.unvoteKeyword) >= 0) {
          boldedContent += content.trim();
        }
      });
      if (boldedContent.length == 0) {
        return true;
      }
      var postData = {
        "u": username, //User
        "t": parseDateFromString(getPostTime($(this))), //Time of post
        "r": boldedContent, //Raw vote: Parts of post that involve voting
        "l": getPostId($(this)) //Used to link to post
      };
      data[getPostNumber($(this))] = postData;
    } else if ($.inArray(username, gmNameList)) {
      //Post content
      gmData[getPostNumber($(this))] = {
        "p": getPostBody($(this)).html().replace(/(['"])/g, '\\$1').replace(/\n/g, " ").trim()
      };
    }
  });
  if (currentPage > 0 && threadId > 0) {
    localStorage.setItem("pageStatus" + threadId + "-" + currentPage, numberPostsOnPage + "");
    localStorage.setItem("pageData" + threadId + "-" + currentPage, JSON.stringify(data));
    $(".page-link[page='" + currentPage + "']").removeClass("partial-save empty-save").addClass("full-save");
  }
}