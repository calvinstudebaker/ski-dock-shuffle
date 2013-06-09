function switchToPage(page){
	$(".content").hide("fast");
	setTimeout(function() {
		$(location).attr('href', page);
	}, 300);
};

$(document).ready(function(){
	$("#signUpButton").click(function(){
		switchToPage("/html/signup.html");
	});

	$("#scheduleButton").click(function(){
		switchToPage("/html/schedule.html");
	});
});