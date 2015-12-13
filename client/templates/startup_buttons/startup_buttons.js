Template.startupButtons.events({
    "click .setupBtn": function(){
        Session.set("track", 0);
        Session.set("setup", 1);
    },
    "click .trackBtn": function(){
        Session.set("setup", 0);
        Session.set("track", 1);
    }
});