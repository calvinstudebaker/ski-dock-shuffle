var https = require('https');
var querystring = require('querystring');

var bestSchedule;
var leastUnsatisfied = 500;

//grabs all the sign up requests in the database and creates a schedule out of them
exports.createSchedule = function(){
  getAllRequests(startCreateSchedule);
};

function startCreateSchedule(requests){
  var timeMap = buildTimeMap(requests);
  var sortedTimes = sortTimeMap(timeMap);
  buildSchedule(sortedTimes);
};

function buildSchedule(sortedTimes){
  var changed = true;

  //Assign all the single requested slots
  while(changed){
    changed = false;
    console.log("BEFORE");
    logSortedTimes(sortedTimes);
    for(var elem in sortedTimes){
      if(sortedTimes[elem].requests.length == 1){
        changed = true;
        schedule[sortedTimes[elem].time] = sortedTimes[elem].requests[0];
        removeRequest(sortedTimes, sortedTimes[elem].requests[0]);
      }
    }
    console.log("AFTER");
    logSortedTimes(sortedTimes);
  }

  sortedTimes = sortTimeArray(sortedTimes);
  console.log("SORTING TIMES ARRAY");
  logSortedTimes(sortedTimes);

  for(var index in sortedTimes){
    
  }
};

function removeRequest(sortedTimes, request){
  for(var index = 0; index < sortedTimes.length; index++){
    var requests = sortedTimes[index].requests;
    for(var i = 0; i < requests.length; i++){
      var curr = requests[i];
      if(isEqual(curr, request)){
        requests.splice(i, 1);
        i--;
      }
    }
    //Remove element if we cleared out all requests.
    if(requests.length == 0){
      sortedTimes.splice(index, 1);
      index--;
    }
  }
};

function isEqual(request1, request2){
  return (request1.firstName == request2.firstName && request1.lastName == request2.lastName && request1.roomNumber == request2.roomNumber);
};

//Insertion sorts the elements in the timeMap by the number of requests for a given time
function sortTimeMap(timeMap){
  var sortedTimes = new Array();
  for(var time in timeMap){
    var elem = new Object();
    elem.time = time;
    elem.requests = timeMap[time];
    var added = false;
    for(var index in sortedTimes){
      if(sortedTimes[index].requests.length >= elem.requests.length){
        sortedTimes.splice(index, 0, elem);
        added = true;
        break;
      }
    }
    if(!added){
      sortedTimes.push(elem);
    }
  }
  return sortedTimes;
}

function sortTimeArray(timeArray){
  var sortedTimes = new Array();
  for(var i = 0; i < timeArray.length; i++){
    var elem = timeArray[i];
    var added = false;
    for(var index in sortedTimes){
      if(sortedTimes[index].requests.length >= elem.requests.length){
        sortedTimes.splice(index, 0, elem);
        added = true;
        break;
      }
    }
    if(!added){
      sortedTimes.push(elem);
    }
  }
  return sortedTimes;
}

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

function logSortedTimes(sortedTimes){
  for(var index in sortedTimes){
    var elem = sortedTimes[index];
    console.log(elem.time + ": " + elem.requests);
  }
};
