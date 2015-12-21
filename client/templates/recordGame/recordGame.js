Template.recordGame.helpers({
    recording: function(){
      if(Session.get('record') === 1){
        return true;
      }
    }
});

Template.recordGame.events({
  "click .quit": function(){
    Session.set("track", 1);
    Session.set("record", 0);
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
    }
});