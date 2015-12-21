Template.addPlayerForm.helpers({
  selectedSeason: function(){
    var openSeason = Session.get('currentSeason');
    return Season.findOne( { _id: openSeason } );
  },
  selectedTeam: function(){
    var openTeam = Session.get('currentTeam');
    return Team.findOne( { _id: openTeam });
  }
});
// Add a player to the database
Template.addPlayerForm.events({
  "submit form": function(event){
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form elements
    var name = event.target.playerName.value;
    var number = event.target.playerNumber.value;
    var height = event.target.playerHeight.value;
    var position = event.target.playerPosition.value;
    var year = event.target.playerYear.value;
    var teamId = Session.get('currentTeam');

    // Insert player into the collection
    Meteor.call("addPlayer", name, number, height, position, year, teamId);

    // Clear form
    event.target.playerName.value = '';
    event.target.playerNumber.value = '';
    event.target.playerHeight.value = '';
    event.target.playerPosition.value = '';
    event.target.playerYear.value = '';
  },
  "click .backToEditTeam": function(){
    Session.set("hideEditPlayer", 1);
    Session.set("hideEditTeam", 0);
  }
});

Template.addPlayerList.helpers({
  // only show players for the selected team
  isTeam: function(){
    var playerTeam = Session.get('currentTeam');
    return(playerTeam === this.team);
  }
});

Template.editPlayersHeader.helpers({
    // show "Edit a player" h4 only if players exist for the selected team
    teamHasPlayer: function(){
        var thisTeam = Session.get('currentTeam');
        var playerArray =  Player.find( { team: thisTeam } ).fetch();
        if(playerArray.length > 0){
          return true;
        }
    }
});