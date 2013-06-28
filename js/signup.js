function gatherInfo(){
	$(".hidden").hide("fast");
	var Request = Parse.Object.extend("Request");
	var valid = true;
	var request = new Request();
	var info = new Object();

	//Gather info from text fields
	$("input[type=text]:visible").each(function(){
		var value = $(this).val();
		if(value == ""){
			valid = false;
			$(this).removeClass("highlighted").addClass("error");
			$(".hidden[problem=fields]").show("fast");
		}
		info[this.id] = value;
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
	request.set("times", times);
	if(!valid) return false;

	//Gather info from drop downs and check boxes
	$("select").each(function(){
		var value = $(this).val();
		info[this.id] = value;
	});
	$("input[type=checkbox]").each(function(){
		var checked = $(this).is(":checked");
		info[this.id] = checked;
	});
	$("input[type=radio]:checked").each(function(){
		info['timeLength'] = this.value;
	});

	request.set("info", info);
	return request;
};

function submitInfoDB(){
	var request = gatherInfo();
	if(!request){return;}
	request.save(null, {
		success: function(request) {
			alert("saved to database");
		}
	});
};

function createTimeTable(file){
	$.getJSON(file, function(data){
		$("tbody").remove();
		var row = -1;
		var date = new Date();
		var weekday = date.getDay();
		weekday = (weekday+1)%7;
		$.each(data[weekday], function(index, element){
			if(index % 3 == 0){
				row++;
				$(".timeTable").append("<tr class='row"+row+"'></tr>");
			}
			$("<td>"+element.time+"</td>").appendTo(".row"+row).click(function(){
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
	if($("#cabin").val().length > 0 && $("#firstName").val().length > 0 && $("#lastName").val().length > 0){
		$(".times").show("slow");
	}
};

$(document).ready(function(){	
	$(".left").hide();
	$(".times").hide();
	Parse.initialize("IVhuqzR7EMSFzeACknVIjmhFquT3y8h1tOMKCTjX", "97Js5WNYJkGKNGCeGWFoetCPHtbtZF2VZgYvobE1");

	$("input[type=text]").focusin(function() {
		$(this).removeClass("error").addClass("highlighted");
	}).focusout(function() {
		$(this).removeClass("highlighted").removeClass("error");
	});

	createTimeTable("../res/times.json");

	$(".left").show("slow");
	$("#cabin").keyup(showTimeTable);
	$("#firstName").keyup(showTimeTable);
	$("#lastName").keyup(showTimeTable);
	// $("#withFriend").change(function(){
	// 	if($(this).is(":checked")){
	// 		$(".friendFields").show("fast");
	// 		$("#timeMessage").show("fast");
	// 		createTimeTable("../res/times40.json");
	// 	}else{
	// 		$(".friendFields").hide("fast");
	// 		$("#timeMessage").hide("fast");
	// 		$("#onlyWithFriend").prop('checked', false);
	// 		$("#friendFirstName").val("");
	// 		$("#friendLastName").val("");

	// 		createTimeTable("../res/times.json");
	// 	}
	// });
	$("input[name='timeLength']").change(function(e){
		if($("#twenty").is(":checked")){
			$("#timeMessage").hide("fast");
			createTimeTable("../res/times.json");
		}else{
			$("#timeMessage").show("fast");
			createTimeTable("../res/times40.json");
		}
	});
	
});