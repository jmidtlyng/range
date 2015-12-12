Template.startupButtons.events({
    "click .setupBtn": function(){
        Session.set("setup", 1);
    },
    "click .trackBtn": function(){
        Session.set("track", 1);
    }
});