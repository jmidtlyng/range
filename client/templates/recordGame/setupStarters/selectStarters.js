Template.gameDate.helpers({
  date: function(){
    var selectedGame = Session.get('gameId');
    var gameDate = Game.findOne( { _id: selectedGame });
    return gameDate.date;
  }
});

Template.homeTeamHeader.helpers({
  selectedHomeTeam: function(){
    var openHomeTeam = Session.get('homeTeam');
    return Team.findOne( { _id: openHomeTeam } );
  }
});

Template.awayTeamHeader.helpers({
  selectedAwayTeam: function(){
    var openAwayTeam = Session.get('awayTeam');
    return Team.findOne( { _id: openAwayTeam } );
  }
});

// Team helpers
Template.selectHomeStartersList.helpers({
  // only show teams belonging to selected season
  isHomeTeam: function() {
    var homeTeam = Session.get('homeTeam');
    return(this.team === homeTeam);
  },
  homeStarterCount: function(){
    var thisGame = Session.get('gameId');
    var thisPlayer = this._id;
    return Starter.findOne( { game: thisGame, player: thisPlayer } );
  }
});

Template.selectHomeStartersList.events({
  "submit form": function(event){
    // Prevent default browser form submit
    event.preventDefault();

    var startOrBench = event.target.startHomePlayerIpt.value;

    var homeStarterId = this._id;
    var thisGame = Session.get('gameId');
    var teamLocation = "home";
    var thisPlayer = this._id;
    
    if(startOrBench === "Start" ){
      if(Session.get('homeStarterCounter') === 5) {
        Session.set("homeStartersFull", "You have selected 5 home starters. Bench a starter to start another.");
      } else if (Session.get('homeStarterCounter')) {
        var homeCounter = Session.get('homeStarterCounter') + 1;
        Session.set("homeStarterCounter", homeCounter);
        event.target.startHomePlayerIpt.value = "Bench";
        Meteor.call("addStarter", thisGame, homeStarterId, teamLocation, homeCounter);
      } else {
        var homeCounter = 1;
        Session.set("homeStarterCounter", homeCounter);
        event.target.startHomePlayerIpt.value = "Bench";
        Meteor.call("addStarter", thisGame, homeStarterId, teamLocation, homeCounter);
      }
    } else {
      var numStarters = Session.get('homeStarterCounter');
      var removalStarter = Starter.findOne( { game: thisGame, player: thisPlayer } );
      
      for(var i = removalStarter.count; i < 5; i ++) {
        var countToDecrease = i + 1;
        var updatedStarter = Starter.findOne( { game: thisGame, count: countToDecrease, homeOrAway: teamLocation } );
        if(updatedStarter){
          Meteor.call("updateStarter", updatedStarter._id, i);  
        } else {
          i = 4;  
        }
      }

      event.target.startHomePlayerIpt.value = "Start";
      Meteor.call("removeStarter", removalStarter._id);
      numStarters --;
      Session.set("homeStarterCounter", numStarters);
      Session.set('homeStartersFull', '');
    }
  }
});

Template.selectAwayStartersList.helpers({
  // only show teams belonging to selected season
  isAwayTeam: function() {
    var awayTeam = Session.get('awayTeam');
    return(this.team === awayTeam);
  },
  awayStarterCount: function(){
    var thisGame = Session.get('gameId');
    var thisPlayer = this._id;
    return Starter.findOne( { game: thisGame, player: thisPlayer } );
  }
});

Template.selectAwayStartersList.events({
  "submit form": function(event){
    // Prevent default browser form submit
    event.preventDefault();

    var startOrBench = event.target.startAwayPlayerIpt.value;
    
    var awayStarterId = this._id;
    var thisGame = Session.get('gameId');
    var teamLocation = "away";
    var thisPlayer = this._id;

    if(startOrBench === "Start") {
      if(Session.get('awayStarterCounter') === 5) {
        Session.set("awayStartersFull", "You have selected 5 away starters. Bench a starter to start another.");
      } else if(Session.get('awayStarterCounter')) {
        var awayCounter = Session.get('awayStarterCounter') + 1;
        Session.set('awayStarterCounter', awayCounter);
        event.target.startAwayPlayerIpt.value = "Bench";
        Meteor.call("addStarter", thisGame, awayStarterId, teamLocation, awayCounter);
      } else {
        var awayCounter = 1;
        Session.set("awayStarterCounter", awayCounter);
        event.target.startAwayPlayerIpt.value = "Bench";
        Meteor.call("addStarter", thisGame, awayStarterId, teamLocation, awayCounter);
      }
    } else {
      var numStarters = Session.get('awayStarterCounter');
      var removalStarter = Starter.findOne( { game: thisGame, player: thisPlayer } );

      for(i = removalStarter.count; i < 5; i ++) {
        var countToDecrease = i + 1;
        var updatedStarter = Starter.findOne( { game: thisGame, count: countToDecrease, homeOrAway: teamLocation } );
        if(updatedStarter){
          Meteor.call("updateStarter", updatedStarter._id, i);  
        } else {
          i = 4;  
        }
      }

      event.target.startAwayPlayerIpt.value = "Start";
      Meteor.call("removeStarter", removalStarter._id);
      numStarters --;
      Session.set("awayStarterCounter", numStarters);
      Session.set('awayStartersFull', '');
    }
  }
});
