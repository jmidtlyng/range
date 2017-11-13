Basketball has assistants who watch games record stats on shot charts by hand.

There are many apps which replicate and help assistants with this process.

The problem with existing apps is difficulty keeping up with a fast-paced sport
while navigating menus during substitutions. At best there is no substitution feature
and the user learns how to quickly navigate a player list. Managing multiple
statistic types is out of the question.

This app is a prototype Meteor app to minimize time between witnessing and recording
a basketball game data point.

Each team can have multiple user accounts. Using reactive components, user accounts
can be recording a single game at the same time. This front-loads the work of entering
player information, then delegates the duties of recording data across multiple users
watching the game.

EG:
One person manages substitutions. 
  -- On a substitution all other users have their UI updated with the new substitution. 
One person manages shots taken
One person manages makes
One person manages steals
One person manages fouls
etc.

Reactive data collection can results in live reports for team decision-makers.

I believe distributed app use is the step between hand-recorded stats and
an affordable version of SportVu.

TODO: 
lots.
I'd like to re-build using React native or Vue.js.
On small scale; custom statistic stypes
