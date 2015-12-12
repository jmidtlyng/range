// Add a team to the database
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
Template.editTeamsList.helpers({
  // only show teams belonging to selected season
  isSeason: function() {
    var teamSeason = Session.get('currentSeason');
    return(this.season === teamSeason);
  }
});
// Team events
Template.editTeamsList.events({
  // store team to a session to be used by setup_Player helpers
  "click .viewPlayers": function(){
    var teamId = this._id;
    Session.set("currentTeam", teamId);
    var checkTeamId = Session.get("currentTeam");
  }
});

Template.editTeamsHeader.helpers({
    // Only displays "Edit a Team" h4 when team exist for the selected season
    seasonHasTeam: function() {
    var thisSeason = Session.get('currentSeason');
    var teamArray =  Team.find( { season: thisSeason } ).fetch();
    if(teamArray.length > 0){
      return true;
    }
  }
});