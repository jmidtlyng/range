Template.homeTeamControls.helpers({
	isHomeStarter: function(){
		var thisGame = Session.get('gameId');
		return (this.game === thisGame && this.homeOrAway === "home");
	},
	homePlayer: function(){
		var playerId = this.player;
		var homePlayer = Player.findOne( { _id: playerId } );
		return (homePlayer);
	},
	selectedPlayer: function(){
		var clickedPlayer = Session.get('statPlayer');
		if (clickedPlayer === this.player){
			return ("selected");
		}
	}
});

Template.homeTeamControls.events({
	'click .homePlayerBtn': function(){
		var playerId = this.player;
		Session.set("noPlayerSelected", 0)
		Session.set("statPlayer", playerId);
	}
});

Template.gameControls.helpers({
	'courtShape': function(){
		var seasonId = Session.get('selectedSeason');
		var level = Season.findOne( { _id: seasonId } ).courtShape;
		if(level = "hs") {
			return "hs_court.jpg";
		} else if(level = "college") {
			return "college_court.jpg";
		} else {
			return "nba_court.jpg";
		}
	},
	'pointPicked': function(){
		var x = Session.get('x');
		var y = Session.get('y');
		return (x < 563 && y < 486 && x !== '');
	},
	'top': function(){
		var top = Session.get('y');
		return top;
	},
	'left': function(){
		var left = Session.get('x');
		return left;
	},
	'made': function(){
		if (Session.get('make') === 1){
			return ("selected");
		}
	},
	'assisted': function(){
		if (Session.get('assist') === 1){
			return ("selected");
		}
	},
	'fastbroke': function(){
		if (Session.get('fastbreak') === 1){
			return ("selected");
		}
	},
	'putbacked': function(){
		if (Session.get('putback') === 1){
			return ("selected");
		}
	},
	'pickPlayerMsg': function(){
		if (Session.get('noPlayerSelected') === 1) {
			return "You need to select a player";
		}
	}
});

Template.gameControls.events({
	'click img': function(event){
		var posX = event.offsetX?(event.offsetX):event.pageX-img.offsetLeft;
		var posY = event.offsetY?(event.offsetY):event.pageY-img.offsetTop;
		Session.set("x", posX);
		Session.set("y", posY);
	},
	'click .makeBtn': function(){
		if(Session.get('make') !== 1){
			Session.set('make', 1);
		} else {
			Session.set('make', 0);
		}
	},
	'click .assistBtn': function(){
		if(Session.get('assist') !== 1){
			Session.set('assist', 1);
		} else {
			Session.set('assist', 0);
		}
	},
	'click .fastbreakBtn': function(){
		if(Session.get('fastbreak') !== 1){
			Session.set('fastbreak', 1);
		} else {
			Session.set('fastbreak', 0);
		}
	},
	'click .putbackBtn': function(){
		if(Session.get('putback') !== 1){
			Session.set('putback', 1);
		} else {
			Session.set('putback', 0);
		}
	},
	'click .submitShotBtn': function(){
		if (Session.get('make') === 1){
			var make = 1;
		} else {
			var make = 0;
		}
		if (Session.get('assist') === 1){
			var assist = 1;
		} else {
			var assist = 0;
		}
		if (Session.get('fastbreak') === 1){
			var fastbreak = 1;
		} else {
			var fastbreak = 0;
		}
		if (Session.get('putback') === 1){
			var putback = 1;
		} else {
			var putback = 0;
		}

		var player = Session.get('statPlayer');
		var gameId = Session.get('gameId');
		var seasonId = Session.get('selectedSeason');
		var level = Season.findOne( { _id: seasonId } ).courtShape;

		if(level = "hs") {
			var x = Session.get('x') / 522;
			var y = Session.get('y') / 436;
		} else if(level = "college") {
			var x = Session.get('x') / 468;
			var y = Session.get('y') / 438;
		} else {
			var x = Session.get('x') / 472;
			var y = Session.get('y') / 438;
		}

		if(typeof player !== 'undefined' && player !== ''){
			Meteor.call('addShot', player, gameId, x, y, make, assist, putback, fastbreak);

			Session.set('make', '');
			Session.set('assist', '');
			Session.set('fastbreak', '');
			Session.set('putback', '');
			Session.set('statPlayer', '');
			Session.set('x', '');
			Session.set('y', '');
		} else {
			Session.set("noPlayerSelected", 1);
		}
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
	},
	selectedPlayer: function(){
		var clickedPlayer = Session.get('statPlayer');
		if (clickedPlayer === this.player){
			return ("selected");
		}
	}
});

Template.awayTeamControls.events({
	'click .awayPlayerBtn': function(){
		var playerId = this.player;
		Session.set("statPlayer", playerId);
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
	'click button': function(){
		Session.set("subSelected",'');
	},
	'submit form': function(event){
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