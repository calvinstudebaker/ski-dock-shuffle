function submitInfo(){
	alert("clicked");
};

$(document).ready(function(){
	$(".content").hide();
	$(".content").show("slow");

	$("input[type=text]").focusin(function() {
		$(this).addClass("highlighted");
	}).focusout(function() {
		$(this).removeClass("highlighted").removeClass("error");
	});
});