require('../../mongodb/models/db');
var mongoose = require('mongoose');

var Session = mongoose.model('Session');

var getSessions = function getSessions() {

    return Session.find()
                  .select("id searchedTerms addedToCart date")
                  .exec();
};

var createSession = function createSession(session) {

  return Session.create({ id: session.id,
                          searchedTerms: session.sessionTerms,
                          addedToCart: session.addedToCart,
                          date: session.date }, function(err, post){
    if(err){
      return(err);
    }

    return post;
  });
};

var updateSession = function updateSession(args) {

    Session.update({ id: args.id },
      { $set: { searchedTerms: args.searchedTerms,
                addedToCart: args.addedToCart,
                date: args.date }},
      function(err, sessionA) {


        if(err) {
          console.log(err);
          return "Done";
        };

        return "Done";
      });

    return "Done";
}

module.exports = { getSessions,
                   createSession,
                   updateSession };
