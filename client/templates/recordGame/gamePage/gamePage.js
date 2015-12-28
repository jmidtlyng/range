Template.homeTeamControls.helpers({
	isHomeStarter: function(){
		var thisGame = Session.get('gameId');
		return (this.game === thisGame && this.homeOrAway === "home");
	},
	homePlayer: function(){
		var playerId = this.player;
		var homePlayer = Player.findOne( { _id: playerId } );
		return (homePlayer);
	}
});

Template.awayTeamControls.helpers({
	isAwayStarter: function(){
		var thisGame = Session.get('gameId');
		return (this.game === thisGame && this.homeOrAway === "away");
	},
	awayPlayer: function(){
		var playerId = this.player;
		var awayPlayer = Player.findOne( { _id: playerId } );
		return (awayPlayer);
	}
});

Template.substitutions.helpers({
	starters: function(){
		return Starter.find({});
	},
	players: function(){
		return Player.find({});
	},
	subbingTeam: function(){
		var gameId = Session.get('gameId');
		var homeOrAway = Session.get('subSelected');
		if(homeOrAway === "home"){
			var teamId = Game.findOne( { _id: gameId } ).home;
			return Team.findOne( { _id: teamId } ); 
		} else {
			var teamId = Game.findOne( { _id: gameId } ).away;
			return Team.findOne( { _id: teamId } );
		}
	}
});

Template.substitutions.events({
	"submit form": function(){
		// Prevent default browser form submit
    	event.preventDefault();

    	var gameId = Session.get('gameId');
    	var homeOrAway = Session.get('subSelected');
    	var subOut = event.target.inGame.value;
    	var subIn = event.target.onBench.value;

    	var starterInfo = Starter.findOne( { game: gameId, homeOrAway: homeOrAway, player: subOut } );
    	var playerPosition = starterInfo.count;

    	Meteor.call("addStarter", gameId, subIn, homeOrAway, playerPosition);

    	Meteor.call("removeStarter", starterInfo._id);
	},
	"click .cancelSub": function(){
		Session.set("subSelected",'');
	}
});

Template.subOutList.helpers({
	inGame: function(){
		var homeOrAway = Session.get('subSelected');
		var thisGame = Session.get('gameId');
		return (this.game === thisGame && this.homeOrAway === homeOrAway);
	},
	playerInfo: function(){
		var playerId = this.player;
		return Player.findOne( { _id: playerId } );
	}
});

Template.subInList.helpers({
	outOfGame: function(){
		var homeOrAway = Session.get('subSelected');
		var gameId = Session.get('gameId');
		if (homeOrAway === "home"){
			var teamId = Game.findOne( { _id: gameId } ).home;
		} else {
			var teamId = Game.findOne( { _id: gameId } ).away;
		}

		var inGame1 = Starter.findOne( { game: gameId, homeOrAway: homeOrAway, count: 1 } ).player;
		var inGame2 = Starter.findOne( { game: gameId, homeOrAway: homeOrAway, count: 2 } ).player;
		var inGame3 = Starter.findOne( { game: gameId, homeOrAway: homeOrAway, count: 3 } ).player;
		var inGame4 = Starter.findOne( { game: gameId, homeOrAway: homeOrAway, count: 4 } ).player;
		var inGame5 = Starter.findOne( { game: gameId, homeOrAway: homeOrAway, count: 5 } ).player;

		return (this.team === teamId && this._id !== inGame1 && this._id !== inGame2 && this._id !== inGame3 && this._id !== inGame4 && this._id !== inGame5);
	}
});