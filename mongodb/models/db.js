var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var dbURI = 'mongodb://localhost/Order';

if(process.env.NODE_ENV === 'production') {
  console.log('hi',process.env.MONGOLAB_URI);
  dbURI = process.env.MONGOLAB_URI;

}

var connection = mongoose.connect(dbURI);

autoIncrement.initialize(connection);

mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through' + msg);
    callback();
  });
};

process.once('SIGUSR2', function(){
  gracefulShutdown('nodemon restart', function(){
      process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function(){
  gracefulShutdown('app termination', function(){
      process.exit(0);
  });
});

process.on('SIGTERM', function(){
  gracefulShutdown('Heroku app shutdown', function(){
    process.exit(0);
  });
});

require('./orders');
require('./sessions');
