// add new season
Template.addSeasonForm.events({
  "submit form": function(event){
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form elements
    var year = event.target.seasonYear.value;
    var name = event.target.seasonName.value;

    // Insert season into the collection
    Meteor.call("addSeason", year, name);

    // Clear form
    event.target.seasonName.value = "";
    event.target.seasonYear.value = "";
  }
});

// Season helpers
Template.editSeasonsList.helpers({
  // Display all seasons the current user has made
  isOwner: function() {
    return this.owner === Meteor.userId();
  }
});

// Season events
Template.editSeasonsList.events({
  // Open all of the teams for the season
  "click .selectSeason": function() {
    var seasonId = this._id;
    Session.set("currentSeason", seasonId);
    Session.set("hideEditSeason", 1);
    Session.set("hideEditTeam", 0);
  }
});

Template.editSeasonsHeader.helpers({
  // Only displays "Edit a Season" h4 when seasons exist for current user
  userHasSeason: function() {
    var testMe =  Season.find( { owner: Meteor.userId() } ).fetch();
    if(testMe.length > 0){
      return true;
    }
  }
});