Template.selectTeamsHeader.helpers({
  selectedSeason: function(){
    var openSeason = Session.get('selectedSeason');
    return Season.findOne( { _id: openSeason } );
  }
});
// Team helpers
Template.selectTeamsList.helpers({
  // only show teams belonging to selected season
  isSeason: function() {
    var teamSeason = Session.get('selectedSeason');
    return(this.season === teamSeason);
  }
});

Template.selectTeamsHeader.helpers({
    // Only displays "Edit a Team" h4 when team exist for the selected season
    seasonHasTeam: function() {
    var thisSeason = Session.get('selectedSeason');
    var teamArray =  Team.find( { season: thisSeason } ).fetch();
    if(teamArray.length > 0){
      return true;
    }
  }
});

Template.selectTeamsHeader.events({
  "click .backToSelectSession": function(){
    Session.set("hideSelectTeams", 1);
    Session.set("hideSelectSeason", 0);
  }
});