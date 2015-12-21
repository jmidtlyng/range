Template.setupGame.helpers({
  settingUp: function(){
    if(Session.get('setup') === 1){
      return true;
    }
  }
})

Template.seasonSetup.helpers({
  seasons: function(){
    return Season.find({});
  },
  showSeasonSetup: function(){
    if(Session.get('hideEditSeason') !== 1){
      return true;
    }
  }
});

Template.teamSetup.helpers({
  teams: function(){
    return Team.find({});
  },
  showTeamSetup: function(){
    if(Session.get('currentSeason') && Session.get('hideEditTeam') !== 1){
      return true;
    }
  }
});

Template.playerSetup.helpers({
    players: function(){
        return Player.find({});
    },
    showPlayerSetup: function(){
      if(Session.get('currentTeam') && Session.get('hideEditPlayer') !== 1){
        return true;
      }
    }
});
