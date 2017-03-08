var bodyParser = require('body-parser');
var strava = require('strava-v3');

module.exports = function(app){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/strava/stats', function(req, res){
    strava.athletes.stats({id:5390846}, function(err, stats){
      if(err) throw err;
      res.send(stats);
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