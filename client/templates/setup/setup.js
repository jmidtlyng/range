Template.seasonSetup.helpers({
  seasons: function(){
    return Season.find({});
  }
});

Template.teamSetup.helpers({
  teams: function(){
    return Team.find({});
  },
  seasonIsSet: function(){
    if(Session.get('currentSeason')){
      return true;
    }
  }
});

Template.playerSetup.helpers({
    players: function(){
        return Player.find({});
    },
    teamIsSet: function(){
        if(Session.get('currentTeam')){
            return true;
        }
    }
});
