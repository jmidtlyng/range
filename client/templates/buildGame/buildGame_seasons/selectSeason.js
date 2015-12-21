// Season helpers
Template.selectSeasonsList.helpers({
  // Display all seasons the current user has made
  isOwner: function() {
    return this.owner === Meteor.userId();
  }
});

// Season events
Template.selectSeasonsList.events({
  // Open all of the teams for the season
  "click .selectSeason": function() {
    var seasonId = this._id;
    Session.set("selectedSeason", seasonId);
    Session.set("hideSelectSeason", 1);
    Session.set("hideSelectTeams", 0);
  }
});

Template.selectSeasonsHeader.helpers({
  // Only displays "Select a Season" h4 when seasons exist for current user
  userHasSeason: function() {
    var testMe =  Season.find( { owner: Meteor.userId() } ).fetch();
    if(testMe.length > 0){
      return true;
    }
  }
});