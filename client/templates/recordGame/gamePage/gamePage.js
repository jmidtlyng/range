Template.homeTeamControls.helpers({
	isHomeStarter: function(){
		var thisGame = Session.get('gameId');
		return (this.game === thisGame && this.homeOrAway === "home");
	},
	liveHomePlayer: function(){
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
	liveAwayPlayer: function(){
		var playerId = this.player;
		var awayPlayer = Player.findOne( { _id: playerId } );
		return (awayPlayer);
	}
});