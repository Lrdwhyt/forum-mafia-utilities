$(document).ready(function () {
  fmu.data.init();
  fmu.ui.init();
  fmu.control.init();
  if (fmu.data.options.game.mode) {
    fmu.data.game.init();
    fmu.ui.draw();
    fmu.control.update();
  } else {
    fmu.ui.reset();
  }
});

var fmu = {
  ui: {
    init: function() {
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
            text: "BBCode vote tallies"
          }))
          .append($("<button />", {
            class: "function-button",
            id: "toggle-bbcode-post-numbers",
            text: "Exclude post numbers",
            title: "Toggle post numbers on/off for BBCode tallies"
          }))
          .append($("<button />", {
            class: "function-button",
            id: "toggle-include-dead-players",
            text: "Exclude dead players"
          }))
          .append($("<button />", {
            class: "function-button",
            id: "toggle-bbcode-colours",
            text: "Exclude colours"
          }))
          .append($("<button />", {
            class: "function-button",
            text: "Exclude unvotes (unimplemented)"
          }))
          .append($("<br />"))
          .append($("<span />", {
            text: "Posts per page"
          }))
          .append($("<button />", {
            class: "edit-button input-button",
            id: "number-posts-per-page",
            text: "60"
          }))
          .append($("<br />"))
          .append($("<span />", {
            text: "Night buffer time (minutes)"
          }))
          .append($("<button />", {
            class: "input-button edit-button",
            id: "night-buffer-time",
            text: fmu.data.options.script.nightBuffer,
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
          })))
      .insertAfter("#qrform");
      if (fmu.data.options.script.bbcodePosts) {
        $("#toggle-bbcode-post-numbers").text("Include post numbers");
      }
      if (fmu.data.options.script.includeDead) {
        $("#toggle-include-dead-players").text("Include dead players");
      }
      if (fmu.data.options.script.bbcodeColours) {
        $("#toggle-bbcode-colours").text("Include colours");
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
          text: fmu.data.date.parser.timeToString(fmu.data.options.game.nightfallTime)
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
        .append($("<div />", {
          id: "group-manager"
        })
        .append($("<span />", {
          text: "Groups"
        }))
        .append($("<div />", {
          id: "group-listing"
        }))
        .append($("<button />", {
          class: "function-button",
          id: "add-group",
          text: "+"
        })))
      .appendTo($("#fmu-main-container"));
      fmu.ui.pages.init();
      fmu.ui.days.init();
      fmu.ui.mods.init();
      fmu.ui.players.init();
      fmu.ui.groups.init();
      if (fmu.data.options.game.mode == 2) {
        $("#game-configuration").show();
        $("#toggle-game-configuration").text("Hide game configuration");
      }
      $("#vote-keyword").text(fmu.data.options.game.voteKeyword);
      $("#unvote-keyword").text(fmu.data.options.game.unvoteKeyword);
      if (fmu.data.options.game.voteRecordType == "votelog") {
        $("#toggle-vote-record-mode").text("Mode: Vote log");
      }
      if (fmu.data.options.game.tallyDisplayMode) {
        $("#tally-container").addClass("floating");
        $("#toggle-tally-display").text("Close");
      }
      if (fmu.data.mods.list.length > 0) {
        fmu.data.thread.parse();
      }
    },

    days: {
      init: function() {
        for (var day = 1; day < fmu.data.days.list.length; day++) {
          fmu.ui.days.add(day);
        }
        this.switch(currentDay);
      },
      add: function(day) {
        $("<div />", {
          class: "day-tab",
          name: day,
          text: "Day " + day
        }).appendTo("#day-tab-container");
        this.update(day);
      },
      update: function(day) {
        var dayTab = $(".day-tab").eq(day - 1);
        dayTab.removeClass("partial-data-day full-data-day empty-data-day");
        dayTab.addClass("full-data-day");
      },
      switch: function(day) {
        currentDay = day;
        fmu.data.options.game.day = day;
        fmu.data.options.save();
        $(".day-tab").removeClass("day-selected");
        $(".day-tab").eq(day - 1).addClass("day-selected");
        $(".boundary-option").removeClass("boundary-option-selected");
        if (fmu.data.days.list[day]["startPost"]) {
          $("#start-post").text("Post #" + fmu.data.days.list[day]["startPost"]);
        } else {
          $("#start-post").text("Post #?");
        }
        var startTime = fmu.data.date.offset(new Date(fmu.data.days.list[day]["startDate"]), 0, timeZone);
        $("#start-year").text(startTime.getUTCFullYear());
        $("#start-month").text(fmu.data.date.parser.to2Digits(startTime.getUTCMonth() + 1));
        $("#start-day").text(fmu.data.date.parser.to2Digits(startTime.getUTCDate()));
        $("#start-time").text(fmu.data.date.parser.dateToTimeString(startTime));
        $("#" + fmu.data.days.list[day]["start"]).addClass("boundary-option-selected");
        $("#" + fmu.data.days.list[day]["end"]).addClass("boundary-option-selected");
        if (fmu.data.days.list[day]["endPost"]) {
          $("#end-post").text("Post #" + fmu.data.days.list[day]["endPost"]);
        } else {
          $("#end-post").text("Post #?");
        }
        var endTime = fmu.data.date.offset(new Date(fmu.data.days.list[day]["endDate"]), 0, timeZone);
        $("#end-year").text(endTime.getUTCFullYear());
        $("#end-month").text(fmu.data.date.parser.to2Digits(endTime.getUTCMonth() + 1));
        $("#end-day").text(fmu.data.date.parser.to2Digits(endTime.getUTCDate()));
        $("#end-time").text(fmu.data.date.parser.dateToTimeString(endTime));
        if (fmu.data.options.game.voteRecordType == "tally" && !jQuery.isEmptyObject(fmu.data.days.list[day].tally)) {
          $("#tally-body").html(fmu.data.votes.htmlTally(fmu.data.days.list[day].tally, day));
        } else if (fmu.data.options.game.voteRecordType == "votelog" && fmu.data.days.list[day].voteLog.length > 0) {
          $("#tally-body").html(fmu.data.votes.htmlLog(fmu.data.days.list[day].voteLog));
        } else {
          $("#tally-body").html("");
        }
      },
      remove: function(day) {
        $(".day-tab").last().remove();
      }
    },

    mods: {
      init: function() {
        for (var i in fmu.data.mods.list) {
          fmu.ui.mods.add(fmu.data.mods.list[i]);
        }
      },
      add: function(modName) {
        $("<button />", {
          class: "gm-name input-button",
          text: modName
        })
        .appendTo($("#gm-names"));
      },
      remove: function(modName) {
        $("#gm-names").find(".gm-name").filter(function() {
          return $(this).text() == modName;
        }).remove();
      }
    },

    pages: {
      init: function() {
        for (var page = 1; page <= pageTotal; page++) {
          var pageStatus = fmu.data.thread.pageStatus(page);
          var newBlock = $("<a />", {
            class: "page-link",
            href: fmu.data.thread.pageLink(page),
            page: page,
            text: page
          }).appendTo($("#page-controls"));
          if (page == currentPage) {
            newBlock.addClass("page-selected");
          }
          if (pageStatus == fmu.data.options.script.postsPerPage || (currentPage == pageTotal && pageStatus == numberPostsOnPage)) {
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
        Object.keys(fmu.data.players.list).forEach(function(playerName) {
          var playerBlock = fmu.ui.players.add(playerName);
          fmu.ui.players.updateState(playerName);
          for (var s in fmu.data.players.list[playerName].subs) {
            fmu.ui.players.subs.add(playerName, fmu.data.players.list[playerName].subs[s]);
          }
        });
      },

      list: {},

      add: function(playerName) {
        var groupWrapper = $("<div />", {
          class: "group-wrapper"
        });
        var playerBlock = $("<li />", {
          class: "player-block alive-player",
          name: playerName
        })
        .append($("<div />", {
          class: "group-selector"
        })
        .append($("<button />", {
          class: "current-group",
          text: "group"
        }))
        .append($("<div />", {
          class: "group-list"
        })
        .append(groupWrapper)))
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
        fmu.ui.players.list[playerName] = playerBlock;
      },

      rename: function(oldName, newName) {
        fmu.ui.players.list[newName] = fmu.ui.players.list[oldName];
        delete fmu.ui.players.list[oldName];
        var playerBlock = fmu.ui.players.list[newName];
        playerBlock.find(".player-name").text(newName);
        playerBlock.attr("name", newName);
        for (var i in fmu.data.players.unrecognised.list) {
          $(".unrecognised-voter[name='" + oldName + "']").attr("name", newName);
        }
      },

      /* Updates group selector for a certain player
         Called once when a player is added and once for each player
         when a group is added */
      updateGroups: function(playerName) {
        this.list[playerName].find(".current-group").css("background-color", fmu.data.options.game.groups[fmu.data.players.list[playerName].group]);
        var groupWrapper = this.list[playerName].find(".group-wrapper");
        groupWrapper.html("");
        for (var group in fmu.data.options.game.groups) {
          $("<div />", {
            class: "group-choice",
            name: group,
            text: group
          })
          .css("background-color", fmu.data.options.game.groups[group])
          .appendTo($(groupWrapper));
        }
      },

      updateState: function(playerName) {
        var playerStatus = fmu.data.players.list[playerName].status;
        var playerBlock = this.list[playerName];
        playerBlock.find(".player-state").text(fmu.data.players.state.name(playerStatus));
        playerBlock.find(".death-phase").text(fmu.data.players.state.phase(playerStatus));
        playerBlock.find(".death-time").text(fmu.data.players.state.time(playerStatus));
        if (playerStatus == 0) {
          playerBlock.addClass("alive-player").removeClass("dead-player");
        } else {
          playerBlock.addClass("dead-player").removeClass("alive-player");
        }
      },

      subs: {
        add: function(playerName, subName) {
          var playerBlock = fmu.ui.players.list[playerName];
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
          var playerBlock = fmu.ui.players.list[playerName];
          if (fmu.data.players.list[playerName].subs.length == 0) {
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

    groups: {
      init: function() {
        for (var group in fmu.data.options.game.groups) {
          fmu.ui.groups.add(group);
        }
        for (var player in fmu.data.players.list) {
          fmu.ui.players.updateGroups(player);
        }
      },

      add: function(groupName) {//TODO: Format and make pretty
        $("<div />", {
          class: "group-item",
          name: groupName
        })
          .append($("<button />", {
            class: "input-button group-colour",
            text: "#"
          }).css("background-color", fmu.data.options.game.groups[groupName]))
          .append($("<button />", {
            class: "input-button group-name", //TODO: Better class names
            text: groupName
          }))
        .appendTo($("#group-listing"));
      },

      remove: function(groupName) {
        $("#group-listing").find("[name='" + groupName + "']").remove();
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
        fmu.control.options.toggleMode($(this));
      });
      $("#toggle-bbcode-post-numbers").on("click", function() {
        fmu.control.options.toggleBbcodePostNumbers($(this));
      });
      $("#toggle-include-dead-players").on("click", function() {
        fmu.control.options.toggleIncludeDeadPlayers($(this));
      });
      $("#toggle-bbcode-colours").on("click", function() {
        fmu.control.options.toggleBbcodeColours($(this));
      });
      $("#night-buffer-time").on("click", function() {
        var newBuffer = parseInt(prompt("Enter night buffer time in minutes"));
        if (newBuffer > 0) {
          fmu.data.options.script.nightBuffer = newBuffer;
          fmu.data.options.save();
          $(this).text(newBuffer);
        }
      });
      $("#clear-data").on("click", function() {
        if (confirm("Are you sure you want to reset all data?")) {
          localStorage.clear();
          fmu.data.options.init();
          fmu.data.game.reset();
          fmu.ui.reset();
        }
      });
    },

    update: function() {
      $("#add-day").on("click", fmu.control.days.add);
      $("#remove-day").on("click", fmu.control.days.remove);
      $("#day-tab-container").on("click", ".day-tab", function() {
        fmu.ui.days.switch($(this).attr("name"));
      });
      $("#start-post").on("click", function() {
        fmu.control.days.start.switch("post");
      });
      $("#start-year").on("click", function() {
        fmu.control.days.start.switch("year");
      });
      $("#start-month").on("click", function() {
        fmu.control.days.start.switch("month");
      });
      $("#start-day").on("click", function() {
        fmu.control.days.start.switch("day");
      });
      $("#start-time").on("click", function() {
        fmu.control.days.start.switch("time");
      });
      $("#end-post").on("click", function() {
        fmu.control.days.end.switch("post");
      });
      $("#end-year").on("click", function() {
        fmu.control.days.end.switch("year");
      });
      $("#end-month").on("click", function() {
        fmu.control.days.end.switch("month");
      });
      $("#end-day").on("click", function() {
        fmu.control.days.end.switch("day");
      });
      $("#end-time").on("click", function() {
        fmu.control.days.end.switch("time");
      });

      $("#tally-body").on("click",".unrecognised-voter", function() {
        var playerName = $(this).attr("name");
        fmu.control.players.add(playerName);
        $(this).removeClass("unrecognised-voter");
      })
      $("#update-vote-record").on("click", fmu.control.votes.update);
      $("#toggle-vote-record-mode").on("click", function() {
        fmu.control.options.toggleVoteRecordMode($(this));
      });
      $("#copy-bbcode").on("click", function() {
        fmu.control.votes.copy("bbcode");
      });
      $("#copy-vote-log").on("click", function() {
        fmu.control.votes.copy("voteLog");
      });
      $("#toggle-tally-display").on("click", function() {
        fmu.control.options.toggleTallyDisplay($(this));
      });

      $("#toggle-game-configuration").on("click", function() {
        if ($("#game-configuration").is(":visible")) {
          fmu.data.options.game.mode = 1;
          fmu.data.options.save();
          $("#game-configuration").slideUp(function() {
            $("#toggle-game-configuration").text("Show game configuration");
          });
        } else {
          fmu.data.options.game.mode = 2;
          fmu.data.options.save();
          $("#game-configuration").slideDown();
          $(this).text("Hide game configuration");
        }
      });

      $("#add-gm").on("click", function() {
        var modName = prompt("Enter the name of the new GM");
        if (modName) {
          fmu.control.mods.add(modName);
        }
      });
      $("#gm-names").on("click", ".gm-name", function() {
        fmu.control.mods.remove($(this).text());
      });

      $("#nightfall-time").on("click", function() {
        fmu.control.options.changeNightfallTime($(this));
      });
      $("#vote-keyword").on("click", function() {
        var newKeyword = prompt("Enter new vote keyword");
        if (newKeyword) {
          fmu.data.options.game.voteKeyword = newKeyword;
          fmu.data.options.save();
          $(this).text(newKeyword);
        }
      });
      $("#unvote-keyword").on("click", function() {
        var newKeyword = prompt("Enter new unvote keyword");
        if (newKeyword) {
          fmu.data.options.game.unvoteKeyword = newKeyword;
          fmu.data.options.save();
          $(this).text(newKeyword);
        }
      });

      $("#add-player").on("click", function() {
        var playerName = prompt("Enter the name of the player you want to add");
        if (playerName) {
          fmu.control.players.add(playerName);
        }
      });
      $("#import-players").on("click", function() {
        $("#paste-wrapper").slideToggle();
        $("#paste-area").focus();
      })
      $("#confirm-paste").on("click", fmu.control.players.import);
      $("#reset-players").on("click", function() {
        fmu.control.players.reset();
        fmu.control.players.save();
      });

      $("#player-list").on("mousedown", ".group-choice", function() {
        fmu.control.players.switchGroup($(this).parents(".player-block").attr("name"), $(this).attr("name"));
      })
      $("#player-list").on("click", ".player-name", function() {
        var oldName = $(this).text();
        var newName = prompt("Enter new player name.", oldName);
        if (newName) {
          fmu.control.players.rename(oldName, newName);
        } else if (newName == "") {
          fmu.control.players.remove(oldName);
        }
      });
      $("#player-list").on("click", ".player-state", function() {
        var playerName = $(this).parent().attr("name");
        if (fmu.data.players.list[playerName].status > 0) {
          fmu.control.players.updateState(playerName, 0);
        } else {
          fmu.control.players.updateState(playerName, currentDay * 2);
        }
      });
      $("#player-list").on("click", ".death-phase", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        var playerState = fmu.data.players.list[playerName].status;
        if (playerState % 2 == 0) {
          fmu.control.players.updateState(playerName, playerState - 1);
        } else {
          fmu.control.players.updateState(playerName, playerState + 1);
        }
      });
      $("#player-list").on("click", ".death-time", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        var newState = parseInt(prompt("Enter the day/night of death"));
        if (newState > 0) {
          if (fmu.data.players.list[playerName].status % 2 == 0) {
            fmu.control.players.updateState(playerName, newState * 2);
          } else {
            fmu.control.players.updateState(playerName, newState * 2 - 1);
          }
        }
      });
      $("#player-list").on("click", ".sub-name", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        var subName = $(this).text();
        fmu.control.players.subs.remove(playerName, subName);
      });
      $("#player-list").on("click", ".add-sub", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        var subName = prompt("Enter alternative name for player - e.g. subs or nicknames");
        if (subName) {
          fmu.control.players.subs.add(playerName, subName);
        }
      });
      $("#player-list").on("click", ".remove-player", function() {
        var playerName = $(this).parents(".player-block").attr("name");
        fmu.control.players.remove(playerName);
      });
      $("#player-list").on("focus", ".current-group", function() {
        $(this).siblings(".group-list").addClass("selected");
      });
      $("#player-list").on("blur", ".current-group", function() {
        $(this).siblings(".group-list").removeClass("selected");
      });
      $("#player-list").on("mouseleave", ".group-list", function() {
        $(this).siblings(".current-group").blur();
      });

      $("#group-listing").on("click", ".group-name", function() {
        fmu.control.groups.remove($(this).parent().attr("name"));
      });
      $("#group-listing").on("click", ".group-colour", function() {
        var colour = validateColour(prompt("Enter new colour in hex"));
        if (colour) {
          fmu.control.groups.update($(this).parent().attr("name"), colour);
        }
      })
      $("#add-group").on("click", function() {
        var groupName = prompt("Enter name of new group");
        if (groupName) {
          fmu.control.groups.add(groupName);
        }
      });
    },

    mods: {
      add: function(modName) {
        fmu.data.mods.add(modName);
        fmu.ui.mods.add(modName);
      },
      remove: function(modName) {
        fmu.data.mods.remove(modName);
        fmu.ui.mods.remove(modName);
      }
    },

    players: {
      add: function(playerName) {
        if (!fmu.data.players.list.hasOwnProperty(playerName)) {
          //If player is not already in player list, add player
          fmu.data.players.add(playerName);
          fmu.data.players.unrecognised.update(playerName);
          fmu.ui.players.add(playerName);
          fmu.ui.players.updateGroups(playerName);
        }
      },

      import: function() {
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
          fmu.control.players.add(importedPlayers[i]);
        }
      },

      updateState: function(playerName, newState) {
        fmu.data.players.updateState(playerName, newState);
        fmu.ui.players.updateState(playerName);
      },

      switchGroup: function(playerName, groupName) {
        fmu.data.players.list[playerName].group = groupName;
        fmu.data.players.save();
        fmu.ui.players.list[playerName].find(".current-group").css("background-color", fmu.data.options.game.groups[fmu.data.players.list[playerName].group]);
      },

      subs: {
        add: function(playerName, subName) {
          fmu.data.players.subs.add(playerName, subName);
          fmu.ui.players.subs.add(playerName, subName);
        },
        remove: function(playerName, subName) {
          fmu.data.players.subs.remove(playerName, subName);
          fmu.ui.players.subs.remove(playerName, subName);
        }
      },

      rename: function(oldName, newName) {
        if (fmu.data.players.rename(oldName, newName)) {
          fmu.ui.players.rename(oldName, newName);
        }
      },

      remove: function(playerName) {
        if (fmu.data.players.list.hasOwnProperty(playerName)) {
          fmu.data.players.remove(playerName);
          fmu.ui.players.remove(playerName);
        }
      },

      reset: function() {
        fmu.data.players.reset();
        fmu.ui.players.reset();
      }
    },

    days: {
      add: function() {
        fmu.data.days.add();
        fmu.ui.days.add(fmu.data.days.list.length - 1);
        fmu.ui.days.switch(fmu.data.days.list.length - 1);
      },

      remove: function() {
        if (fmu.data.days.remove()) {
          fmu.ui.days.remove();
          if (fmu.data.days.list.length - 1 < currentDay) {
            fmu.ui.days.switch(currentDay - 1);
          }
        }
      },

      start: {
        switch: function(type) {
          if (type === "post") {
            if (fmu.data.days.list[currentDay]["start"] == "start-date") {
              if (!fmu.data.days.list[currentDay].hasOwnProperty("startPost")) {
                var startPost = parseInt(prompt("Enter new starting post"));
                if (startPost > 0) {
                  fmu.data.days.list[currentDay]["startPost"] = startPost;
                }
              }
              fmu.data.days.list[currentDay]["start"] = "start-post";
              fmu.data.days.save();
              fmu.ui.days.switch(currentDay);
            } else {
              var startPost = parseInt(prompt("Enter new starting post"));
              if (startPost > 0) {
                fmu.data.days.list[currentDay]["startPost"] = startPost;
                fmu.data.days.save();
                fmu.ui.days.switch(currentDay);
              }
            }
          } else {
            //If currently selected is post, switch to time. If currently selected is time, edit time
            if (fmu.data.days.list[currentDay]["start"] === "start-post") {
              fmu.data.days.list[currentDay]["start"] = "start-date";
              fmu.data.days.save();
              fmu.ui.days.switch(currentDay);
            } else {
              var newDate = new Date(fmu.data.days.list[currentDay]["startDate"]);
              newDate = fmu.data.date.offset(newDate, 0, timeZone);
              if (type === "year") {
                var year = parseInt(prompt("Enter new start year"));
                if (year > 0) {
                  newDate.setUTCFullYear(year);
                }
              } else if (type === "month") {
                var month = parseInt(prompt("Enter new start month"));
                if (month > 0 && month <= 12) {
                  newDate.setUTCMonth(month - 1);
                }
              } else if (type === "day") {
                var day = parseInt(prompt("Enter new start day"));
                if (day >= 1 && day <= 31) {
                  newDate.setUTCDate(day);
                }
              } else if (type === "time") {
                var time = prompt("Enter new start time");
                var actualTime = fmu.data.date.parser.stringToTime(time);
                if (actualTime >= 0) {
                  var hours = Math.floor(actualTime / 100);
                  var minutes = actualTime % 100;
                  newDate.setUTCHours(hours);
                  newDate.setUTCMinutes(minutes);
                }
              }
              fmu.data.days.list[currentDay]["startDate"] = fmu.data.date.offset(newDate, 0, -timeZone);
              fmu.data.days.save();
              fmu.ui.days.switch(currentDay);
            }
          }
        }
      },

      end: {
        switch: function(type) {
          if (type === "post") {
            if (fmu.data.days.list[currentDay]["end"] == "end-date") {
              if (!fmu.data.days.list[currentDay].hasOwnProperty("endPost")) {
                var endPost = parseInt(prompt("Enter new ending post"));
                if (endPost > 0) {
                  fmu.data.days.list[currentDay]["endPost"] = endPost;
                }
              }
              fmu.data.days.list[currentDay]["end"] = "end-post";
              fmu.data.days.save();
              fmu.ui.days.switch(currentDay);
            } else {
              var endPost = parseInt(prompt("Enter new ending post"));
              if (endPost > 0) {
                fmu.data.days.list[currentDay]["endPost"] = endPost;
                fmu.data.days.save();
                fmu.ui.days.switch(currentDay);
              }
            }
          } else {
            //If currently selected is post, switch to time. If currently selected is time, edit time
            if (fmu.data.days.list[currentDay]["end"] === "end-post") {
              fmu.data.days.list[currentDay]["end"] = "end-date";
              fmu.data.days.save();
              fmu.ui.days.switch(currentDay);
            } else {
              var newDate = new Date(fmu.data.days.list[currentDay]["endDate"]);
              newDate = fmu.data.date.offset(newDate, 0, timeZone);
              if (type === "year") {
                var year = parseInt(prompt("Enter new end year"));
                if (year > 0) {
                  newDate.setUTCFullYear(year);
                }
              } else if (type === "month") {
                var month = parseInt(prompt("Enter new end month"));
                if (month > 0 && month <= 12) {
                  newDate.setUTCMonth(month - 1);
                }
              } else if (type === "day") {
                var day = parseInt(prompt("Enter new end day"));
                if (day >= 1 && day <= 31) {
                  newDate.setUTCDate(day);
                }
              } else if (type === "time") {
                var time = prompt("Enter new end time");
                var actualTime = fmu.data.date.parser.stringToTime(time);
                if (actualTime >= 0) {
                  var hours = Math.floor(actualTime / 100);
                  var minutes = actualTime % 100;
                  newDate.setUTCHours(hours);
                  newDate.setUTCMinutes(minutes);
                }
              }
              fmu.data.days.list[currentDay]["endDate"] = fmu.data.date.offset(newDate, 0, -timeZone);
              fmu.data.days.save();
              fmu.ui.days.switch(currentDay);
            }
          }
        }
      }
    },

    groups: {
      add: function(groupName) {
        if (!fmu.data.options.game.groups.hasOwnProperty(groupName)) {
          fmu.data.options.game.groups[groupName] = "#000000";
          fmu.data.options.save();
          fmu.ui.groups.add(groupName);
          for (var player in fmu.data.players.list) {
            fmu.ui.players.updateGroups(player);
          }
        }
      },

      update: function(groupName, colour) {
        fmu.data.options.game.groups[groupName] = colour;
        fmu.data.options.save();
        $("#group-listing").find("[name='" + groupName + "'] .group-colour").css("background-color", colour);
        for (var player in fmu.data.players.list) {
          fmu.ui.players.updateGroups(player);
        }
      },

      remove: function(groupName) {
        if (groupName != "unknown" && fmu.data.options.game.groups.hasOwnProperty(groupName)) {
          fmu.data.options.removeGroup(groupName);
          fmu.ui.groups.remove(groupName);
          for (var player in fmu.data.players.list) {
            fmu.ui.players.updateGroups(player);
          }
        }
      }
    },

    votes: {
      update: function() {
        var start = 1;
        var end = 200000;
        if (fmu.data.days.list[currentDay]["start"] === "start-post") {
          start = parseInt(fmu.data.days.list[currentDay]["startPost"]);
        } else if (fmu.data.days.list[currentDay]["start"] === "start-date") {
          start = new Date(fmu.data.days.list[currentDay]["startDate"]);
          start.setUTCSeconds(0, 0);
        }
        if (fmu.data.days.list[currentDay]["end"] === "end-post") {
          end = parseInt(fmu.data.days.list[currentDay]["endPost"]);
        } else if (fmu.data.days.list[currentDay]["end"] === "end-date") {
          end = new Date(fmu.data.days.list[currentDay]["endDate"]);
          end.setUTCSeconds(59, 999);
        }
        var voteLog = fmu.data.votes.log();
        var voteOutput = "";
        if (fmu.data.options.game.voteRecordType === "tally") {
          var voteTally = fmu.data.votes.tally(voteLog, start, end, currentDay);
          fmu.data.days.list[currentDay].tally = voteTally;
          fmu.data.days.save();
          voteOutput = fmu.data.votes.htmlTally(voteTally, currentDay);
        } else {
          voteOutput = fmu.data.votes.htmlLog(voteLog, start, end);
          fmu.data.days.list[currentDay].voteLog = voteLog;
          fmu.data.days.save();
        }
        $("#tally-body").html(voteOutput);
      },

      copy: function(type) {
        if (type === "bbcode") {
          if (!jQuery.isEmptyObject(fmu.data.days.list[currentDay].tally)) {
            $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
            $("#data-container").val(fmu.data.votes.bbcodeTally(fmu.data.days.list[currentDay].tally, currentDay));
            $("#data-container").select();
            document.execCommand("copy");
            $("#data-container").remove();
          }
        } else if (type === "voteLog") {
          $("#fmu-main-container").append("<textarea id='data-container'></textarea>");
          var start = 1;
          var end = 200000;
          if (fmu.data.days.list[currentDay]["start"] === "start-post") {
            start = parseInt(fmu.data.days.list[currentDay]["startPost"]);
          } else if (fmu.data.days.list[currentDay]["start"] === "start-date") {
            start = new Date(fmu.data.days.list[currentDay]["startDate"]);
            start.setUTCSeconds(0, 0);
          }
          if (fmu.data.days.list[currentDay]["end"] === "end-post") {
            end = parseInt(fmu.data.days.list[currentDay]["endPost"]);
          } else if (fmu.data.days.list[currentDay]["end"] === "end-date") {
            end = new Date(fmu.data.days.list[currentDay]["endDate"]);
            end.setUTCSeconds(59, 999);
          }
          var voteRecord = fmu.data.votes.log();
          var voteLog = fmu.data.votes.htmlLog(voteRecord, start, end);
          $("#data-container").val(voteLog);
          $("#data-container").select();
          document.execCommand("copy");
          $("#data-container").remove();
        }
      }
    },

    options: {
      toggleMode: function(toggleButton) {
        if (fmu.data.options.game.mode === 0) {
          fmu.data.options.game.mode = 1;
          fmu.data.options.save();
          fmu.data.game.init();
          fmu.ui.draw();
          fmu.control.update();
          toggleButton.text("Delete game");
        } else {
          fmu.data.clear();
          fmu.data.game.reset();
          fmu.ui.reset();
          $("#toggle-script").text("Start game");
        }
      },

      toggleBbcodePostNumbers: function(toggleButton) {
        if (fmu.data.options.script.bbcodePosts === 0) {
          fmu.data.options.script.bbcodePosts = 1;
          fmu.data.options.save();
          toggleButton.text("Include post numbers");
        } else {
          fmu.data.options.script.bbcodePosts = 0;
          fmu.data.options.save();
          toggleButton.text("Exclude post numbers");
        }
      },

      toggleIncludeDeadPlayers: function(toggleButton) {
        if (fmu.data.options.script.includeDead === 0) {
          fmu.data.options.script.includeDead = 1;
          fmu.data.options.save();
          toggleButton.text("Include dead players");
        } else {
          fmu.data.options.script.includeDead = 0;
          fmu.data.options.save();
          toggleButton.text("Exclude dead players");
        }
      },

      toggleBbcodeColours: function(toggleButton) {
        if (fmu.data.options.script.bbcodeColours === 0) {
          fmu.data.options.script.bbcodeColours = 1;
          fmu.data.options.save();
          toggleButton.text("Include colours");
        } else {
          fmu.data.options.script.bbcodeColours = 0;
          fmu.data.options.save();
          toggleButton.text("Exclude colours");
        }
      },

      toggleTallyDisplay: function(toggleButton) {
        if (fmu.data.options.game.tallyDisplayMode) {
          fmu.data.options.game.tallyDisplayMode = 0;
          fmu.data.options.save();
          $("#tally-container").removeClass("floating");
          toggleButton.text("Pop out");
        } else {
          fmu.data.options.game.tallyDisplayMode = 1;
          fmu.data.options.save();
          $("#tally-container").addClass("floating");
          toggleButton.text("Close");
        }
      },

      toggleVoteRecordMode: function(toggleButton) {
        if (fmu.data.options.game.voteRecordType === "tally") {
          fmu.data.options.game.voteRecordType = "votelog";
          fmu.data.options.save();
          toggleButton.text("Mode: Vote log");
        } else {
          fmu.data.options.game.voteRecordType = "tally";
          fmu.data.options.save();
          toggleButton.text("Mode: Vote tally");
        }
        fmu.control.votes.update();
      },

      changeNightfallTime: function(button) {
        var nightfallTime = fmu.data.date.parser.stringToTime(prompt("Enter new time for night"));
        if (nightfallTime >= 0) {
          fmu.data.options.game.nightfallTime = nightfallTime;
          fmu.data.options.save();
          button.text(fmu.data.date.parser.timeToString(fmu.data.options.game.nightfallTime));
        }
      }
    }
  },

  data: {
    /*
     * Initialises/loads basic data needed for script interface
     * Shouldn't load any game data apart from game options
     * TODO: Separate script data initialisation and global var initialisation
     */
    init: function() {
      threadId = fmu.parser.thread.id();
      fmu.data.options.init();
      fmu.data.options.load();
      timeZone = fmu.parser.time.timeZone();
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
      /* Usernames to ignore when retrieving data */
      ignoredPlayerList = ["TallyBot"];
      /* List of words used to detect night posts (unimplemented) */
      nightKeywords = ["lynch", "kill", "day", "night", "someone", "die"];
      var pageString = $(".pagenav td.vbmenu_control:first-child").first().text();
      var pageArray = pageString.split(" ");
      currentPage = parseInt(pageArray[1]);
      pageTotal = parseInt(pageArray[3]);
      numberPostsOnPage = fmu.parser.page.numberPosts();
    },

    reset: function() {
      //TODO: Implement? Is this necessary?
    },

    /*
     * Clears local data associated with current thread
     */
    clear: function() {
      localStorage.removeItem("mods" + threadId);
      localStorage.removeItem("players" + threadId);
      localStorage.removeItem("days" + threadId);
      localStorage.removeItem("gameOptions" + threadId);
      localStorage.removeItem("unrecognisedUsers" + threadId);
      for (var page = 1; page <= pageTotal; page++) {
        if (localStorage.getItem("pageData" + threadId + "-" + page)) {
          localStorage.removeItem("pageData" + threadId + "-" + page);
          localStorage.removeItem("pageStatus" + threadId + "-" + page);
        }
      }
    },

    game: {
      /*
       * Initialises/loads game data
       */
      init: function() {
        currentDay = fmu.data.options.game.day;
        fmu.data.days.init();
        fmu.data.mods.init();
        fmu.data.players.init();
        fmu.data.players.unrecognised.init();
      },

      /*
       * Resets game data to defaults
       */
      reset: function() {
        fmu.data.options.reset();
        fmu.data.days.reset();
        fmu.data.mods.reset();
        fmu.data.players.reset();
        fmu.data.players.unrecognised.reset();
        currentDay = fmu.data.options.game.day;
      }
    },

    thread: {
      votes: {
        composite: function() {
          var compositeData = {};
          $(".full-save, .partial-save").each(function() {
            var page = $(this).text();
            //Combines two objects into the first
            jQuery.extend(compositeData, fmu.data.thread.votes.get(page));
          });
          return compositeData;
        },

        get: function(page) {
          return JSON.parse(localStorage.getItem("pageData" + threadId + "-" + page));
        }
      },

      pageLink: function(page) {
        return "http://forums.kingdomofloathing.com/vb/showthread.php?t=" + threadId + "&page=" + page;
      },

      postLink: function(post) {
        return "http://forums.kingdomofloathing.com/vb/showthread.php?p=" + post;
      },

      pageStatus: function(page) {
        var numSaved = localStorage.getItem("pageStatus" + threadId + "-" + page)
        if (!numSaved) {
          return 0;
        } else {
          return parseInt(numSaved);
        }
      },

      posts: {
        username: function(post) {
          return post.find(".bigusername").text();
        },

        time: function(post) {
          return post.find(".thead").first().text().trim();
        },

        body: function(post) {
          return post.find(".alt1").children("div");
        },

        boldText: function(post) {
          return post.find(".alt1").children("div").children("b");
        },

        id: function(post) {
          return post.find(".thead").children("[id^=postcount]").attr("id").replace("postcount","");
        },

        number: function(post) {
          return post.find(".thead").children("[id^=postcount]").attr("name");
        }
      },

      parse: function() {
        var data = {};
        var gmData = {};
        $("#posts").find(".page").each(function () {
          var username = fmu.data.thread.posts.username($(this));
          var boldPost = fmu.data.thread.posts.boldText($(this));
          if (boldPost.length > 0 && $.inArray(username, fmu.data.mods.list) == -1 && $.inArray(username, ignoredPlayerList) == -1) {
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
              if (content.indexOf(fmu.data.options.game.voteKeyword) >= 0 || content.indexOf(fmu.data.options.game.unvoteKeyword) >= 0) {
                boldedContent += content.trim();
              }
            });
            if (boldedContent.length == 0) {
              return true;
            }
            var postData = {
              "u": username, //User
              "t": fmu.data.date.parser.stringToDate(fmu.data.thread.posts.time($(this))), //Time of post
              "r": boldedContent, //Raw vote: Parts of post that involve voting
              "l": fmu.data.thread.posts.id($(this)) //Used to link to post
            };
            data[fmu.data.thread.posts.number($(this))] = postData;
          } else if ($.inArray(username, fmu.data.mods.list)) {
            //Post content
            gmData[fmu.data.thread.posts.number($(this))] = {
              "p": fmu.data.thread.posts.body($(this)).html().replace(/(['"])/g, '\\$1').replace(/\n/g, " ").trim()
            };
          }
        });
        if (currentPage > 0 && threadId > 0) {
          localStorage.setItem("pageStatus" + threadId + "-" + currentPage, numberPostsOnPage + "");
          localStorage.setItem("pageData" + threadId + "-" + currentPage, JSON.stringify(data));
          $(".page-link[page='" + currentPage + "']").removeClass("partial-save empty-save").addClass("full-save");
        }
      }
    },

    mods: {
      init: function() {
        if (localStorage.getItem("mods" + threadId)) {
          this.list = JSON.parse(localStorage.getItem("mods" + threadId));
        }
        if (currentPage === 1 && this.list.length == 0) {
          //Page 1, so the first poster should be a GM
          this.add($(".bigusername").first().text());
        }
      },

      add: function(modName) {
        if ($.inArray(modName, this.list) === -1) {
          this.list.push(modName);
          if (this.list.length == 1) {
            //If there is now exactly 1 GM, then there were 0 before and data has not been generated yet
            fmu.data.thread.parse();
          }
          this.save();
        }
      },

      list: [],

      remove: function(modName) {
        this.list.splice($.inArray(modName, this.list), 1);
        this.save();
      },

      save: function() {
        localStorage.setItem("mods" + threadId, JSON.stringify(this.list));
      },

      reset: function() {
        this.list = [];
      }
    },

    players: {
      init: function() {
        if (localStorage.getItem("players" + threadId)) {
          this.list = JSON.parse(localStorage.getItem("players" + threadId));
        }
      },

      add: function(playerName) {
        if (!this.list.hasOwnProperty[playerName]) {
          this.list[playerName] = {
            "group": "unknown",
            "status": 0,
            "subs": [],
            "nicknames": []
          };
          this.nicknames.init(playerName);
          this.save();
        }
      },

      list: {},

      subs: {
        add: function(playerName, subName) {
          if ($.inArray(subName, fmu.data.players.list[playerName].subs) === -1) {
            fmu.data.players.list[playerName].subs.push(subName);
            fmu.data.players.save();
          }
        },
        remove: function(playerName, subName) {
          var i = $.inArray(subName, fmu.data.players.list[playerName].subs);
          if (i >= 0) {
            fmu.data.players.list[playerName].subs.splice(i, 1);
            fmu.data.players.save();
          }
        }
      },

      nicknames: {
        init: function(playerName) {
          if (playerName.indexOf(" ") >= 0) {
            var newNick = "";
            var splitName = playerName.split(" ");
            for (var c in splitName) {
              newNick += splitName[c].charAt(0);
            }
            this.add(playerName, newNick);
          }
          if (playerName.indexOf("_") >= 0) {
            var newNick = "";
            var splitName = playerName.split("_");
            for (var c in splitName) {
              newNick += splitName[c].charAt(0);
            }
            this.add(playerName, newNick);
          }
          var uppercaseName = getUpperCase(playerName);
          var nonLowercaseName = getNonLowerCase(playerName);
          var lowercaseName = getLowerCase(playerName);
          if (uppercaseName.length > 1 && lowercaseName.length > 2) {
            this.add(playerName, nonLowercaseName);
          } else if(nonLowercaseName.length > 5 && lowercaseName.length > 1) {
            this.add(playerName, lowercaseName);
          }
        },

        add: function(playerName, nickname) {
          if ($.inArray(nickname, fmu.data.players.list[playerName].nicknames) === -1) {
            fmu.data.players.list[playerName].nicknames.push(nickname);
            fmu.data.players.save();
          }
        },

        remove: function(playerName, nickname) {
          var i = $.inArray(nickname, fmu.data.players.list[playerName].nicknames);
          if (i >= 0) {
            fmu.data.players.list[playerName].nicknames.splice(i, 1);
            fmu.data.players.save();
          }
        }
      },

      isAlive: function(playerName, day) {
        if (this.list.hasOwnProperty(playerName) && this.list[playerName].status != 0 && this.list[playerName].status < day * 2) {
          return false;
        } else {
          return true;
        }
      },

      state: {
        name: function(state) {
          if (state === 0) {
            return "alive";
          } else if (state > 0) {
            return "dead";
          } else {
            return "resurrected";
          }
        },

        phase: function(state) {
          if (state % 2 == 1) {
            return "day";
          } else {
            return "night";
          }
        },

        time: function(state) {
          return Math.ceil(state / 2);
        }
      },

      colour: function(playerName, day) {
        if (!this.list.hasOwnProperty(playerName)) {
          return "#6d4c41";
        } else if (fmu.data.options.game.groups[this.list[playerName].group] != "#000000"){
          return fmu.data.options.game.groups[this.list[playerName].group];
        } else if (!this.isAlive(playerName, day)) {
          return "#bdbdbd";
        } else {
          return "";
        }
      },

      rename: function(oldName, newName) {
        if (!this.list.hasOwnProperty(newName)) {
          this.list[newName] = this.list[oldName];
          delete this.list[oldName];
          this.list[newName].nicknames = [];
          this.nicknames.init(newName);
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

      match: function(name) {
        var closestMatch = "No lynch";
        var highestScore = diceCoefficient(name, "No lynch");
        if (highestScore == 1) {
          return closestMatch;
        }
        Object.keys(fmu.data.players.list).forEach(function(playerName) {
          for (var nick in fmu.data.players.list[playerName].nicknames) {
            var score = diceCoefficient(name, fmu.data.players.list[playerName].nicknames[nick]);
            if (score >= highestScore) {
              closestMatch = playerName;
              highestScore = score;
            }
          }
          for (var sub in fmu.data.players.list[playerName].subs) {
            var score = diceCoefficient(name, fmu.data.players.list[playerName].subs[sub]);
            if (score >= highestScore) {
              closestMatch = playerName;
              highestScore = score;
            }
          }
          var score = diceCoefficient(name, playerName);
          if (score >= highestScore) {
            closestMatch = playerName;
            highestScore = score;
          }
        });
        if (highestScore > 0) {
          return closestMatch;
        } else {
          //If the highest score is 0 (no similarity), declines to return a player name
          return name;
        }
      },

      unrecognised: {
        init: function() {
          if (localStorage.getItem("unrecognisedUsers" + threadId)) {
            this.list = JSON.parse(localStorage.getItem("unrecognisedUsers" + threadId));
          }
        },

        add: function(userName) {
          this.list.push(userName);
          this.save();
        },

        register: function(userName) {
          if (!jQuery.isEmptyObject(fmu.data.players.list) && $.inArray(userName, this.list) == -1) {
            if (Object.keys(fmu.data.players.list).every(function(playerName) {
              if (diceCoefficient(playerName, userName) > 0.9) {
                fmu.control.players.rename(playerName, userName);
                return false;
              }
              return true;
            }) == true) {
              this.add(userName);
            }
          }
        },

        update: function(playerName) {
          //Checks the unrecognised voter list to see if it can match some new name and remove them from the unrecognised list
          for (var i in this.list) {
            if (diceCoefficient(this.list[i], playerName) > 0.9) {
              this.remove(this.list[i]);
              $(".unrecognised-voter[name='" + playerName + "']").removeClass("unrecognised-voter");
              break;
            }
          }
        },

        list: [],

        remove: function(userName) {
          var i = $.inArray(userName, this.list);
          if (i >= 0) {
            this.list.splice(i, 1);
            this.save();
          }
        },

        save: function() {
          localStorage.setItem("unrecognisedUsers" + threadId, JSON.stringify(this.list));
        },

        reset: function() {
          this.list = [];
        }
      },

      save: function() {
        localStorage.setItem("players" + threadId, JSON.stringify(this.list));
      },

      remove: function(playerName) {
        delete fmu.data.players.list[playerName];
        this.save();
      },

      reset: function() {
        this.list = {};
      }
    },

    days: {
      init: function() {
        if (localStorage.getItem("days" + threadId)) {
          this.list = JSON.parse(localStorage.getItem("days" + threadId));
        } else {
          this.add(1);
        }
      },

      add: function() {
        var startPost = 1;
        var startDate = fmu.data.date.lastNightfall() + "";
        var endDate = fmu.data.date.offset(fmu.data.date.lastNightfall(), 1, 0);
        var day = this.list.length;
        if (day === 0) {
          day = 1;
        }
        if (day > 1) {
          if (this.list[day - 1].hasOwnProperty("endPost")) {
            startPost = this.list[day - 1]["endPost"] + 1;
          }
          var oldEndDate = new Date(this.list[day - 1]["endDate"]);
          startDate = new Date(oldEndDate.getTime() + fmu.data.options.script.nightBuffer * 60 * 1000);
          endDate = new Date(oldEndDate.getTime() + 24 * 60 * 60 * 1000);
        }
        this.list[day] = {
          "start": "start-date",
          "end": "end-date",
          "startDate": startDate,
          "startPost": startPost,
          "endDate": endDate,
          "tally": {},
          "voteLog": ""
        };
        this.save();
      },

      list: [],

      remove: function() {
        if (this.list.length > 2) {
          this.list.pop();
          this.save();
          return true;
        } else {
          return false;
        }
      },

      save: function() {
        localStorage.setItem("days" + threadId, JSON.stringify(this.list));
      },

      reset: function() {
        this.list = [];
      }
    },

    votes: {
      log: function() {
        var data = fmu.data.thread.votes.composite();
        var log = [];
        Object.keys(data).forEach(function(post) {
          var raw = data[post]["r"];
          var type = fmu.data.votes.type(raw);
          var target = fmu.data.votes.target(raw);
          if (type != 0 && (type == -1 || target)) {
            log.push({
              "post": post,
              "user": data[post]["u"],
              "type": type,
              "target": target,
              "time": data[post]["t"],
              "link": data[post]["l"],
              "raw": raw
            });
          }
        });
        return log;
      },

      tally: function(log, start, end, day) {
        var playerVotes = {};
        var tally = [];
        var l = log.length;
        for (var i = 0; i < l; i++) {
          var post = log[i]["post"];
          if (start instanceof Date) {
            if (start.getTime() > new Date(log[i]["time"]).getTime()) {
              continue;
            }
          } else {
            if (start > post) {
              continue;
            }
          }
          if (end instanceof Date) {
            if (end.getTime() < new Date(log[i]["time"]).getTime()) {
              break;
            }
          } else {
            if (end < post) {
              break;
            }
          }
          var user = log[i]["user"];
          if (!fmu.data.options.script.includeDead && !fmu.data.players.isAlive(log[i]["user"], day)) {
            //Throwing out votes from dead players
            continue;
          }
          if (!playerVotes.hasOwnProperty(log[i]["user"])) {
            if (!fmu.data.players.list.hasOwnProperty(log[i]["user"])) {
              Object.keys(fmu.data.players.list).forEach(function(playerName) {
                for (var sub in fmu.data.players.list[playerName].subs) {
                  if (fmu.data.players.list[playerName].subs[sub] === user) {
                    user = playerName;
                    break;
                  }
                }
              });
              if (log[i]["user"] === user) {
                //Did not match to sub
                fmu.data.players.unrecognised.register(log[i]["user"]);
              }
            }
            playerVotes[user] = {};
          }
          if (!playerVotes[user].hasOwnProperty("post") || post > playerVotes[user]["post"]) {
            playerVotes[user]["post"] = post;
            playerVotes[user]["link"] = log[i]["link"];
            if (log[i]["type"] === 2 || log[i]["type"] === 1) {
              playerVotes[user]["target"] = log[i]["target"];
            } else if (log[i]["type"] === -1) {
              playerVotes[user]["target"] = "";
            }
          }
        }
        Object.keys(fmu.data.players.list).forEach(function(playerName) {
          if (!fmu.data.players.isAlive(playerName, day)) {
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
          if (tally.some(function(vote) {
            if (vote["target"] === target) {
              vote["voters"].push({
                "user": user,
                "post": playerVotes[user]["post"],
                "link": playerVotes[user]["link"]
              });
              return true;
            }
          }) == false) {
            tally.push({
              "target": target,
              "voters": [{
                "user": user,
                "post": playerVotes[user]["post"],
                "link": playerVotes[user]["link"]
              }]
            });
          }
        });
        tally = tally.sort(function(a, b) {
          return (b["voters"].length - a["voters"].length);
        });
        return tally;
      },

      htmlLog: function(log, start, end, day) {
        var html = "";
        var l = log.length;
        for (var i = 0; i < l; i++) {
          //Filtering for range
          var post = log[i]["post"];
          if (start instanceof Date) {
            if (start.getTime() > new Date(log[i]["time"]).getTime()) {
              continue;
            }
          } else {
            if (start > post) {
              continue;
            }
          }
          if (end instanceof Date) {
            if (end.getTime() < new Date(log[i]["time"]).getTime()) {
              break;
            }
          } else {
            if (end < post) {
              break;
            }
          }
          var type = log[i]["type"];
          html += "[#<a href='" + fmu.data.thread.postLink(log[i]["link"]) + "'>" + log[i]["post"] + "</a>] ";
          html += log[i]["user"];
          if (type === 2) {
            html += " votes " + log[i]["target"];
          } else if (type === 1) {
            html += " unvotes and votes " + log[i]["target"];
          } else if (type === -1) {
            html += " unvotes" + (log[i]["target"] != null ? " " + log[i]["target"] : "");
          }
          html += "<br />";
        }
        return html;
      },

      type: function(vote) {
        var hasVote = false;
        var hasUnvote = false;
        var lastUnvote = vote.lastIndexOf(fmu.data.options.game.unvoteKeyword);
        var lastVote = vote.lastIndexOf(fmu.data.options.game.voteKeyword);
        var lengthDifference = fmu.data.options.game.unvoteKeyword.length - fmu.data.options.game.voteKeyword.length;
        if (vote.indexOf(fmu.data.options.game.unvoteKeyword) >= 0) {
          hasUnvote = true;
        }
        if (vote.replace(new RegExp(fmu.data.options.game.unvoteKeyword, "g"), "").indexOf(fmu.data.options.game.voteKeyword) >= 0) {
          hasVote = true;
        }
        if (hasVote === true) {
          if (hasUnvote === true) {
            if (lastUnvote >= lastVote - lengthDifference) {
              return -1; //Unvote
            } else {
              return 1; //Unvote and vote
            }
          } else {
            return 2; //Vote
          }
        } else if (hasUnvote === true) {
          return -1; //Unvote
        } else {
          return 0; //No vote
        }
      },

      target: function(vote) {
        var target = vote.split(":").pop().split(fmu.data.options.game.unvoteKeyword).pop().split(fmu.data.options.game.voteKeyword).pop();
        target = target.split("(")[0].split("[")[0].trim();
        if (target === "") {
          return null;
        } else if (!jQuery.isEmptyObject(fmu.data.players.list)) {
          return fmu.data.players.match(target);
        } else {
          return target;
        }
      },

      bbcodeTally: function(tally, day) {
        if (tally.length == 0) {
          return "";
        }
        var bbcode = "[b]Day " + day + "[/b] - [i]Tally generated via Forum Mafia Utilities[/i]\n";
        if (fmu.data.days.list[day]["start"] === "start-post") {
          bbcode += "Post " + fmu.data.days.list[day]["startPost"];
        } else {
          var startDate = new Date(fmu.data.days.list[day]["startDate"]).toUTCString().split(",").slice(1).join(" ").split(":");
          startDate.pop();
          bbcode += startDate.join(":").trim() + " UTC";
        }
        bbcode += " to ";
        if (fmu.data.days.list[day]["end"] === "end-post") {
          bbcode += "Post " + fmu.data.days.list[day]["endPost"];
        } else {
          var endDate = new Date(fmu.data.days.list[day]["endDate"]).toUTCString().split(",").slice(1).join(" ").split(":");
          endDate.pop();
          bbcode += endDate.join(":").trim() + " UTC";
        }
        bbcode += "\n\n";
        var l = tally.length;
        var noVoteIndex = -1;
        for (var i = 0; i < l; i++) {
          if (tally[i]["target"] != "") {
            var colour = fmu.data.players.colour(tally[i]["target"], day);
            if (fmu.data.options.script.bbcodeColours && colour) {
              bbcode += "[color=" + colour + "]";
            }
            bbcode += "[b]" + tally[i]["target"] + " (" + tally[i]["voters"].length;
            if (tally[i]["voters"].length % 10 == 8) {
              bbcode += "[u][/u]";
            }
            bbcode += ")[/b]";
            if (fmu.data.options.script.bbcodeColours && colour) {
              bbcode += "[/color]";
            }
            bbcode += " - [size=1]";
            var voterList = "";
            for (var voter in tally[i]["voters"]) {
              if (voter > 0) {
                bbcode += ", ";
              }
              var colour = fmu.data.players.colour(tally[i]["voters"][voter]["user"]);
              if (fmu.data.options.script.bbcodeColours && colour) {
                bbcode += "[color=" + colour + "]";
              }
              bbcode += tally[i]["voters"][voter]["user"];
              if (fmu.data.options.script.bbcodeColours && colour) {
                bbcode += "[/color]";
              }
              if (fmu.data.options.script.bbcodePosts) {
                bbcode += " (#[post=\"" + tally[i]["voters"][voter]["link"] + "\"]" + tally[i]["voters"][voter]["post"] + "[/post])";
              }
            }
            bbcode += "[/size]\n";
          } else {
            noVoteIndex = i;
          }
        }
        if (noVoteIndex >= 0) {
          var voterList = "";
          for (var nonvoter in tally[noVoteIndex]["voters"]) {
            if (nonvoter > 0) {
              voterList += ", ";
            }
            var colour = fmu.data.players.colour(tally[noVoteIndex]["voters"][nonvoter]["user"], day);
            if (fmu.data.options.script.bbcodeColours && colour) {
              voterList += "[color=" + colour + "]";
            }
            voterList += tally[noVoteIndex]["voters"][nonvoter]["user"];
            if (fmu.data.options.script.bbcodeColours && colour) {
              voterList += "[/color]";
            }
          }
          bbcode += "\n[b]No vote (" + tally[noVoteIndex]["voters"].length + ")[/b] - " + voterList + "";
        }
        return bbcode;
      },

      htmlTally: function(tally, day) {
        var html = "";
        var l = tally.length;
        var noVoteIndex = -1;
        for (var i = 0; i < l; i++) {
          if (tally[i]["target"] != "") {
            var voterList = "";
            for (var voter in tally[i]["voters"]) {
              var colour = fmu.data.players.colour(tally[i]["voters"][voter]["user"], day);
              if (!fmu.data.players.list.hasOwnProperty(tally[i]["voters"][voter]["user"])) {
                voterList += "<span class='voter-wrap'><a class='vote-link' href='" + fmu.data.thread.postLink(tally[i]["voters"][voter]["link"]) + "'>" + tally[i]["voters"][voter]["post"] + "</a><span class='voter-name unrecognised-voter' name='" + tally[i]["voters"][voter]["user"] + "'>" + tally[i]["voters"][voter]["user"] + "</span></span>";
              } else if (fmu.data.options.script.bbcodeColours){
                voterList += "<span class='voter-wrap'><a class='vote-link' href='" + fmu.data.thread.postLink(tally[i]["voters"][voter]["link"]) + "'>" + tally[i]["voters"][voter]["post"] + "</a><span class='voter-name' style='color: " + colour + ";'>" + tally[i]["voters"][voter]["user"] + "</span></span>";
              } else {
                voterList += "<span class='voter-wrap'><a class='vote-link' href='" + fmu.data.thread.postLink(tally[i]["voters"][voter]["link"]) + "'>" + tally[i]["voters"][voter]["post"] + "</a><span class='voter-name'>" + tally[i]["voters"][voter]["user"] + "</span></span>";
              }
            }
            html += "<span class='vote-count'>" + tally[i]["voters"].length + "</span><span class='voted-name'>" + tally[i]["target"] + "</span><span class='voter-name-list'>" + voterList + "</span><br>";
          } else {
            noVoteIndex = i;
          }
        }
        if (noVoteIndex >= 0) {
          var voterList = "";
          for (var nonvoter in tally[noVoteIndex]["voters"]) {
            voterList += "<span class='voter-wrap'><span class='voter-name'>" + tally[noVoteIndex]["voters"][nonvoter]["user"] + "</span></span>";
          }
          html += "<span class='vote-count no-vote'>" + tally[noVoteIndex]["voters"].length + "</span><span class='voted-name no-vote'>No vote</span><span class='voter-name-list'>" + voterList + "</span><br>";
        }
        return html;
      },

      textLog: function(log) {
        return log;
      }
    },

    date: {
      parser: {
        dateToTimeString: function(date) {
          var hours = date.getUTCHours() + "";
          var minutes = date.getUTCMinutes() + "";
          if (hours.length == 1) {
            hours = "0" + hours;
          }
          if (minutes.length == 1) {
            minutes = "0" + minutes;
          }
          return hours + ":" + minutes;
        },

        /* Input: Forum date string such as "Today, Aug 8, 2016 09:30 PM"
           Output: JS date object in UTC time */
        stringToDate: function(string) {
          string = string.replace(/,/g, "");
          var date = new Date();
          var stringArr = string.split(" ");
          var timeArr = stringArr.slice(-2);
          var time = timeArr[0].split(":");
          var hours = parseInt(time[0]);
          var minutes = parseInt(time[1]);
          if (timeArr[1] == "PM" && hours <= 11) {
            hours += 12;
          } else if (hours == 12 && timeArr[1] == "AM") {
            hours -= 12;
          }
          date.setUTCHours(hours);
          date.setUTCMinutes(minutes);
          var dateToday = new Date();
          if (stringArr[0] == "Today") {
            var relativeDate = fmu.data.date.offset(dateToday, 0, timeZone);
            date.setUTCFullYear(relativeDate.getUTCFullYear());
            date.setUTCMonth(relativeDate.getUTCMonth());
            date.setUTCDate(relativeDate.getUTCDate());
          } else if (stringArr[0] == "Yesterday") {
            var relativeDate = fmu.data.date.offset(dateToday, -1, timeZone); //Get yesterday's date in current time zone
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
          date = fmu.data.date.offset(date, 0, -timeZone); //Converting to UTC time
          return date;
        },

        timeToString: function(time) {
          var paddedTime = time + "";
          while (paddedTime.length < 4) {
            paddedTime = "0" + paddedTime;
          }
          return paddedTime.substr(0, 2) + ":" + paddedTime.substr(2);
        },

        stringToTime: function(string) {
          var sanitisedTime = string.replace(":","").replace(" ","").replace("h","").replace(".","");
          var validTime = parseInt(sanitisedTime);
          if (validTime >= 100) {
            var hour = Math.floor(validTime / 100);
            var minute = validTime % 100;
            if (minute < 60) {
              if (hour < 24) {
                if (hour <= 11 && string.toLowerCase().indexOf("pm") >= 0) {
                  return validTime + 1200;
                } else if (hour >= 12 && string.toLowerCase().indexOf("am") >= 0) {
                  return validTime - 1200;
                } else {
                  return validTime;
                }
              }
            }
          } else if (validTime < 60 && sanitisedTime.charAt(0) == "0") {
            if (string.toLowerCase().indexOf("pm") >= 0) {
              return validTime + 1200;
            } else {
              return validTime;
            }
          } else if (validTime < 24) {
            if (validTime <= 11 && string.toLowerCase().indexOf("pm") >= 0) {
              return (validTime + 12) * 100;
            } else if (validTime >= 12 && string.toLowerCase().indexOf("am") >= 0) {
              return (validTime - 12) * 100;
            } else {
              return validTime * 100;
            }
          }
          return -1;
        },

        to2Digits: function(number) {
          var paddedNumber = number + "";
          while (paddedNumber.length < 2) {
            paddedNumber = "0" + paddedNumber;
          }
          return paddedNumber;
        }
      },

      lastNightfall: function() {
        //Get current date in timeZone
        var date = fmu.data.date.offset(new Date(), 0, timeZone);
        var nightfallHours = Math.floor(fmu.data.options.game.nightfallTime / 100);
        var nightfallMinutes = fmu.data.options.game.nightfallTime % 100;
        date.setUTCHours(nightfallHours);
        date.setUTCMinutes(nightfallMinutes);
        if (date.getTime() > new Date().getTime()) {
          return fmu.data.date.offset(date, -1, -timeZone)
        } else {
          return fmu.data.date.offset(date, 0, -timeZone)
        }
      },

      offset: function(date, days, hours) {
        return new Date(date.getTime() + (days * 24 + hours) * 60 * 60 * 1000);
      }
    },

    options: {
      init: function() {
        if (localStorage.getItem("fmuOptions")) {
          this.script = JSON.parse(localStorage.getItem("fmuOptions"));
        } else {
          //TODO: Enumerate all possible script options and rename to more intuitive names
          this.script = {
            "bbcodePosts": 0, //Whether to show BBCode post numbers (boolean)
            "bbcodeColours": 0, //Whether to colour BBCode tallies (boolean)
            "includeDead": 0, //Whether to include dead players in tallies (boolean)
            "includeUnvotes": 0, //Whether to include unvotes
            "logEvents": 1, //Whether to show events in vote logs or not
            "nightBuffer": 10, //How long night lasts/how much time between end of day and start of the next
            "postsPerPage": 60 //Maximum number of posts per page - Forum default is 60
          };
        }
      },

      load: function() {
        if (localStorage.getItem("gameOptions" + threadId)) {
          this.game = JSON.parse(localStorage.getItem("gameOptions" + threadId));
        } else {
          this.reset();
        }
      },

      game: {},

      script: {},

      removeGroup: function(groupName) {
        delete fmu.data.options.game.groups[groupName];
        for (var player in fmu.data.players.list) {
          if (fmu.data.players.list[player].group === groupName) {
            fmu.data.players.list[player].group = "unknown";
            fmu.control.players.switchGroup(player, "unknown");
          }
        }
        this.save();
      },

      save: function() {
        localStorage.setItem("fmuOptions", JSON.stringify(this.script));
        localStorage.setItem("gameOptions" + threadId, JSON.stringify(this.game));
      },

      reset: function() {
        this.game = {
          "mode": 0, //0 = Off, 1 = On, game config is hidden, 2 = On, game config is shown
          "day": 1, //The day that is currently selected by the user
          "groups": {
            "unknown": "#000000",
            "innocent": "#448aff",
            "mafia": "#ff1744",
            "awt": "#aa00ff"
          },
          "nightfallTime": 2000, //Default time for nightfall
          "tallyDisplayMode": 0, //Tally display mode
          "voteRecordType": "tally", //Whether tally or vote log is displayed
          "voteKeyword": "vote", //String used to signify vote
          "unvoteKeyword": "unvote" //String used to signify unvote
        };
      }
    }
  },

  parser: {
    page: {
      numberPosts: function() {
        return (1 + parseInt($(".thead > [id^=postcount]").last().attr("name")) - parseInt($(".thead > [id^=postcount]").first().attr("name")));
      }
    },

    thread: {
      id: function() {
        return parseInt($("#tag_edit_link").attr("href").split("&")[0].split("=")[1]);
      }
    },

    time: {
      timeZone: function() {
        var timeString = $("div.page div.smallfont").last().text(); //Gets string at bottom which tells time zone
        timeString = timeString.split("GMT")[1].split(". ")[0]; //Get between "GMT " and ". "
        return parseFloat(timeString.replace("+","").trim());
      }
    }
  }
}

function validateColour(string) {
  var hex = string.replace(/#/g, "");
  if (/^[0-9A-F]{3,6}$/i.test(hex)) {
    return "#" + hex;
  } else {
    return false;
  }
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
