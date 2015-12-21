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
  }
});

Template.selectAwayStartersList.helpers({
  // only show teams belonging to selected season
  isAwayTeam: function() {
    var awayTeam = Session.get('awayTeam');
    return(this.team === awayTeam);
  }
});

Template.selectHomeStartersList.helpers({
  homeStarterCount: function(){
    var thisGame = Session.get('gameId');
    var thisPlayer = this._id;
    return Starter.findOne( {game: thisGame, player: thisPlayer} );
  }
});

Template.selectHomeStartersList.events({
  "click .setHomeStarter": function(){
    var homeStarterId = this._id;
    if(Session.get('homeStarterCounter')){
      var homeCounter = Session.get('homeStarterCounter') + 1;
      Session.set("homeStarterCounter", homeCounter);
    } else{
      var homeCounter = 1;
      Session.set("homeStarterCounter", homeCounter);
    }

    if (homeCounter < 6){
        var game = Session.get('gameId');
        Meteor.call("addStarter", game, homeStarterId, homeCounter);
    }
  }
});

Template.selectAwayStartersList.helpers({
  awayStarterCount: function(){
    var thisGame = Session.get('gameId');
    var thisPlayer = this._id;
    return Starter.findOne( {game: thisGame, player: thisPlayer} );
  }
});

Template.selectAwayStartersList.events({
  "click .setAwayStarter": function(){
    var awayStarterId = this._id;
    if(Session.get('awayStarterCounter')){
      var awayCounter = Session.get('awayStarterCounter') + 1;
      Session.set('awayStarterCounter', awayCounter);
    } else{
      var awayCounter = 1;
      Session.set("awayStarterCounter", awayCounter);
    }

    if (awayCounter < 6){
        var game = Session.get('gameId');
        Meteor.call("addStarter", game, awayStarterId, awayCounter);
    }
    console.log(awayStarterId + ' ' + awayCounter + ' ' + game);
  }
});
