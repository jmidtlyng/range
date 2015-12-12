// Make Meteor's OOB login use username. Default is email.
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});