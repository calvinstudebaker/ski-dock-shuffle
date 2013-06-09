function sendCreateRequest(){
	var data = {request : "createSchedule"};
	$.ajax({
		type: "POST",
		url: "/",
		data: data
	}).success(function(msg){
		if(msg == "success"){
			alert("Making the schedule. Keep an eye out for completion");
		}
		else{
			alert("Wrong request response, go get Calvin!");
		}
	}).fail(function(jqXHR, status){
		alert("Failure: " + status + "\n Go Get Calvin!");
	});
}