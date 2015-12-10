// set up Mongodb connection
Season = new Mongo.Collection("season");

Team = new Mongo.Collection("team");

Player = new Mongo.Collection("player");

Game = new Mongo.Collection("game");

Shot = new Mongo.Collection("shot");


if (Meteor.isClient) {

  // Body helpers
  Template.body.helpers({
    seasons: function(){
      return Season.find({});
    },
    teams: function(){
      return Team.find({});
    },
    players: function(){
      return Player.find({});
    }
  });

  // Body events
  Template.addSeasonForm.events({
    "submit. new-season": function(event){
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form elements
      var name = event.target.seasonYear.value;
      var year = event.target.seasonName.value;

      // Insert season into the collection
      Meteor.call("addSeason", year, name);

      // Clear form
      event.target.seasonName.value = "";
      event.target.seasonYear.value = "";
    }
  });

  // Season helpers
  Template.seasonList.helpers({
    isOwner: function() {
      return this.owner === Meteor.userId();
    }
  });

  // Season events
  Template.seasonList.events({
    "click .selectSeason": function() {
      // Open all of the teams for the season
      var seasonId = this._id;
      Session.set("currentSeason", seasonId);
    }
  });

  Template.addTeamForm.events({
    "submit form": function(event){
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form elements
      var coach = event.target.coach.value;
      var name = event.target.teamName.value;
      var seasonId = Session.get('currentSeason');

      // Insert season into the collection
      Meteor.call("addTeam", name, coach, seasonId);

      // Clear form
      event.target.coach.value = "";
      event.target.teamName.value = "";
    }
  });

  // Team helpers
  Template.teamList.helpers({
    isSeason: function() {
      var teamSeason = Session.get('currentSeason');
      return(this.season === teamSeason);
    }
  });
  // Team events
  Template.teamList.events({
    "click .viewPlayers": function(){
      // Get all players for a team
      var teamId = this._id;
      Session.set("currentTeam", teamId);
    }
  });
  Template.addPlayerForm.events({
    "submit form": function(event){
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form elements
      var name = event.target.playerName.value;
      var number = event.target.playerNumber.value;
      var height = event.target.playerHeight.value;
      var position = event.target.playerPosition.value;
      var year = event.target.playerYear.value;
      var teamId = Session.get('currentTeam');

      // Insert player into the collection
      Meteor.call("addPlayer", name, number, height, position, year, teamId);

      // Clear form
      event.target.playerName.value = '';
      event.target.playerNumber.value = '';
      event.target.playerHeight.value = '';
      event.target.playerPosition.value = '';
      event.target.playerYear.value = '';
    }
  });

  Template.addPlayerList.helpers({
    isTeam: function(){
      var playerTeam = Session.get('currentTeam');
      return(playerTeam); 
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addSeason: function (year, name) {
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Season.insert({
      year: year,
      name: name,
      owner: Meteor.userId(),
      createAt: new Date()
    });
  },
  addTeam: function(name, coach, seasonId){
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Team.insert({
      name: name,
      coach: coach,
      season: seasonId,
    });
  },
  addPlayer: function(name, number, height, position, year, teamId){
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Player.insert({
      name: name,
      number: number,
      height: height,
      position: position,
      year: year,
      team: teamId
    });
  },
  addGame: function(home, away, date){
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Game.insert({
      home: home,
      away: away,
      date: date
    });
  },
  addStarters: function(hstarter1, hstarter2, hstarter3, hstarter4, hstarter5, astarter1, astarter2, astarter3, astarter4, astarter5) {
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }


  },
  addShot: function(playerId, gameId, quarter, make, shotType, fastBreak){
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    Shot.insert({
      player: playerId,
      game: gameId,
      quarter: quarter,
      make: make,
      shotType: shotType,
      fastBreak: fastBreak
    });
  }
});