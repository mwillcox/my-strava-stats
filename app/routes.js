var bodyParser = require('body-parser');
var strava = require('strava-v3');
var Stats = require('./models/stats');
var Athelete = require('./models/athelete');

module.exports = function(app){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/strava/stats', function(req, res){
    strava.athletes.stats({id:5390846}, function(err, stats){
      if(err) throw err;
      res.send(stats);
    });
  });

  app.get('/api/stats', function(req, res){
     Stats.find({ }, function(err, stats){
      if(err) throw err;
      res.send(stats);
     });
  });

  app.get('/api/athelete', function(req, res){
     Athelete.find({ }, function(err, athleteInfo){
      if(err) throw err;
      res.send(athleteInfo);
     });
  });

  app.get('/api/strava/athelete', function(req, res){
    strava.athletes.get({id:5390846}, function(err, stats){
      if(err) throw err;
      res.send(stats);
    });
  });

  app.get('/api/strava/activities', function(req, res){
    strava.athlete.listActivities({id:5390846}, function(err, activities){
      if(err) throw err;
      res.send(activities);
    });
  });
};