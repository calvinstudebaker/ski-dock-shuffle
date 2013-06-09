var https = require('https');
var querystring = require('querystring');

//grabs all the sign up requests in the database and creates a schedule out of them
exports.createSchedule = function(){
  getAllRequests(startCreateSchedule);
};

function startCreateSchedule(requests){
  var timeMap = buildTimeMap(requests);
  
};

function buildSchedule(timeMap){
	for(var time in timeMap){
		var requests = timeMap[time];
	}
};


function buildTimeMap(requests){
  timeMap = new Object();
  for(var index in requests){
    var request = requests[index];
    for(var timeIndex in request.times){
      var time = request.times[timeIndex];
      time = time.substring(0, time.indexOf("-"));
      if(!timeMap.hasOwnProperty(time)) timeMap[time] = new Array();
      timeMap[time].push(request.info);
    }
  }
  return timeMap;
};

function getAllRequests(callback){
  var options = {
    hostname: 'api.parse.com',
    path: '/1/classes/Request',
    headers: {
      "X-Parse-Application-Id": "IVhuqzR7EMSFzeACknVIjmhFquT3y8h1tOMKCTjX",
      "X-Parse-REST-API-Key": "53pxuXQUTZMYZLaQ25tlIehv5wsQ7A9WxJHFGihd"
    }
  };

  var req = https.get(options, function(res){
    var output = '';
    res.on('data', function(chunk){
      output += chunk;
    });

    res.on('end', function(){
      var allRequests = JSON.parse(output);
      callback(allRequests.results);
    });
  });
  req.end();

  req.on('error', function(e){
    console.error(e);
  });
};

