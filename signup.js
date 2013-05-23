function gatherInfo(){
	$(".hidden").hide("fast");

	var valid = true;
	var data = new Object();

	//Gather info from text fields
	$("input[type=text]:visible").each(function(){
		var value = $(this).val();
		if(value == ""){
			valid = false;
			$(this).removeClass("highlighted").addClass("error");
			$(".hidden[problem=fields]").show("fast");
		}
		data[this.id] = value;
	});

	//Gather info from table
	var times = new Array();
	$("td.selected").each(function(){
		times.push($(this).text());
	});
	if(times.length == 0){
		valid = false;
		$(".hidden[problem=times]").show("fast");
	}
	data.times = times;
	if(!valid) return false;

	//Gather info from drop downs and check boxes
	$("select").each(function(){
		var value = $(this).val();
		data[this.id] = value;
	});
	$("input[type=checkbox]").each(function(){
		var checked = $(this).is(":checked");
		data[this.id] = checked;
	});

	return data;
}

function submitInfoDB(){
	Parse.initialize("IVhuqzR7EMSFzeACknVIjmhFquT3y8h1tOMKCTjX", "97Js5WNYJkGKNGCeGWFoetCPHtbtZF2VZgYvobE1");
	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}, {
	  	success: function(object) {
	    	alert("yay! it worked");
	  	}
	});
}

function submitInfo(){
	var data = gatherInfo();
	if(!data){return;}

	$.ajax({
		type: "POST",
		url: "/",
		data: data
	}).success(function(msg){
		alert(msg);
	}).fail(function(jqXHR, status){
		alert("Failure: " + status);
	});
};

function createTimeTable(){
	$.getJSON("times.json", function(data){
		var row = -1;
		$.each(data.times, function(index, element){
			if(index % 3 == 0){
				row++;
				$(".timeTable").append("<tr class='row"+row+"'></tr>");
			}
			$("<td>"+element+"</td>").appendTo(".row"+row).click(function(){
				if($(this).hasClass("selected")){
					$(this).removeClass("selected");
				}else{
					$(this).addClass("selected");
				}
				$("#submit").show("slow");
			});
		});
	});
};

function showTimeTable(){
	if($("#roomNumber").val().length > 0 && $("#name").val().length > 0){
		$(".times").show("slow");
	}
};

function switchToSchedule(){
	$(".content").hide("fast");
	setTimeout(function() {
		$(location).attr('href', "/schedule.html");
	}, 300);
};

$(document).ready(function(){
	$(".left").hide();
	$(".times").hide();

	$("input[type=text]").focusin(function() {
		$(this).removeClass("error").addClass("highlighted");
	}).focusout(function() {
		$(this).removeClass("highlighted").removeClass("error");
	});

	createTimeTable();

	$(".left").show("slow");
	$("#roomNumber").keyup(showTimeTable);
	$("#name").keyup(showTimeTable);
	$("#withFriend").change(function(){
		if($(this).is(":checked")){
			$(".friendFields").show("fast");
		}else{
			$(".friendFields").hide("fast");
			$("#onlyWithFriend").prop('checked', false);
			$("#friendName").val("");
		}
	});

	$("#scheduleButton").click(function(){
		switchToSchedule();
	});
});