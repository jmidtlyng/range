Template.buildGame.helpers({
  tracking: function(){
    if(Session.get('track') === 1){
      return true;
    }
  }
});

Template.selectSeason.helpers({
  seasons: function(){
    return Season.find({});
  },
  showSelectSeason: function(){
    if(Session.get('hideSelectSeason') !== 1){
      return true;
    }
  }
});

Template.selectTeams.helpers({
  teams: function(){
    return Team.find({});
  },
  showSelectTeams: function(){
    if(Session.get('selectedSeason') && Session.get('hideSelectTeams') !== 1){
      return true;
    }
  }
});

Template.selectTeams.events({
    // store team to a session to be used by setup_Player helpers
  "submit form": function(event){
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form elements
    var home = event.target.homeTeam.value;
    var away = event.target.awayTeam.value;

    // Insert season into the collection
    Session.set("homeTeam", home);
    Session.set("awayTeam", away);

    Session.set("hideSelectTeams", 1);
    Session.set("hideSelectDate", 0);
  }
});

Template.selectGameDate.helpers({
  showSelectDate: function(){
    if(Session.get('homeTeam') && Session.get('awayTeam') && Session.get('hideSelectDate') !== 1){
      return true;
    }
  }
});