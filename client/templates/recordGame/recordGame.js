Template.recordGame.helpers({
    recording: function(){
      return (Session.get('record') === 1);
    },
    pickingStarters: function(){
      return (Session.get('pickStarters') === 1);
    },
    takingStats: function(){
      return (Session.get('takeStats') ===1);
    }
});

Template.recordGame.events({
  "click .quit": function(){
    Session.set("track", 1);
    Session.set("record", 0);
    Session.set('homeStartersFull', '');
    Session.set('awayStartersFull', '');
    Session.set('homeStarterCounter', '');
    Session.set('awayStarterCounter', '');
  }
});

Template.selectStarters.helpers({
    players: function(){
        return Player.find({});
    },
    showSelectStarters: function(){
      if(Session.get('hideSelectStarters') !== 1){
        return true;
      }
    },
      homeStartersDone: function(){
      var fiveHomeStarters = Session.get('homeStartersFull');
      return fiveHomeStarters;
    },
      awayStartersDone: function(){
      var fiveAwayStarters = Session.get('awayStartersFull');
      return fiveAwayStarters;
    }
});

Template.selectStarters.events({
  "click .startGame": function(){
    Session.set("hideSelectStarters", 1);
    Session.set("showGameScreen", 1);
  },
  "click .enterGame": function(){
    Session.set("pickStarters", 0);
    Session.set("takeStats", 1);
  }
});

Template.gamePage.helpers({
  starters: function(){
    return Starter.find({});
  }
});