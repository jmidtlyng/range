Meteor.methods({
  addSeason: function (year, name) {
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Season.insert({
      year: year,
      name: name,
      owner: Meteor.userId(),
      createAt: new Date()
    });
  },
  addTeam: function(name, coach, seasonId){
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Team.insert({
      name: name,
      coach: coach,
      season: seasonId,
    });
  },
  addPlayer: function(name, number, height, position, year, teamId){
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Player.insert({
      name: name,
      number: number,
      height: height,
      position: position,
      year: year,
      team: teamId
    });
  },
  addGame: function(home, away, date){
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Game.insert({
      home: home,
      away: away,
      date: date
    });
  },
  addStarters: function(hstarter1, hstarter2, hstarter3, hstarter4, hstarter5, astarter1, astarter2, astarter3, astarter4, astarter5) {
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }


  },
  addShot: function(playerId, gameId, quarter, make, shotType, fastBreak){
    // Ensure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Shot.insert({
      player: playerId,
      game: gameId,
      quarter: quarter,
      make: make,
      shotType: shotType,
      fastBreak: fastBreak
    });
  }
});