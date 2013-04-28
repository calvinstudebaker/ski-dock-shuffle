function submitInfo(){
	alert("clicked");
};

function createTimeTable(){
	$.getJSON("times.json", function(data){
		var row = -1;
		$.each(data.times, function(index, element){
			if(index % 3 == 0){
				row++;
				$(".timeTable").append("<tr class='row"+row+"'></tr>");
			}
			$("<td class='hook'>"+element+"</td>").appendTo(".row"+row).click(function(){
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

$(document).ready(function(){
	$(".left").hide();
	$(".times").hide();

	$("input[type=text]").focusin(function() {
		$(this).addClass("highlighted");
	}).focusout(function() {
		$(this).removeClass("highlighted").removeClass("error");
	});

	createTimeTable();

	$(".left").show("slow");
	$("#roomNumber").keyup(showTimeTable);
	$("#name").keyup(showTimeTable);
});