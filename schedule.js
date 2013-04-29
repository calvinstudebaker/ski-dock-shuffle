function switchToSignUp(){
	$(".content").hide("fast");
	setTimeout(function() {
		$(location).attr('href', "/signup.html");
	}, 300);
};

$(document).ready(function(){
	$(".content").hide();
	$(".content").show("slow");

	$("#signUpButton").click(function(){
		switchToSignUp();
	});
});