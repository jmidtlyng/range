Template.selectDateHeader.helpers({
  homeTeam: function(){
    var homeTeamId = Session.get('homeTeam');
    return Team.findOne( { _id: homeTeamId } );
  },
  awayTeam: function(){
    var awayTeamId = Session.get('awayTeam');
    return Team.findOne( { _id: awayTeamId } );
  }
});

Template.selectDateHeader.events({
  "click .backToSelectTeams": function(){
    Session.set("hideSelectDate", 1);
    Session.set("hideSelectTeams", 0);
  }
});

Template.selectDate.events({
	"submit form": function(event){
		// Prevent default browser form submit
    event.preventDefault();

    // Get value from form elements
    var homeTeam = Session.get('homeTeam');
    var awayTeam = Session.get('awayTeam');
    var date = event.target.gameDate.value;

    // Insert season into the collection
    Meteor.call("addGame", homeTeam, awayTeam, date);

    // Clear form
    event.target.gameDate.value = "";
    Session.set("track", 0);
    Session.set("record", 1);

    var gameId = Game.findOne( { home: homeTeam, away: awayTeam, date: date } )._id;
    Session.set("gameId", gameId);
    var testVar = Session.get('gameId');
    console.log(testVar);
	}
});