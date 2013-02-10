$(document).ready(function(){ //when page is ready
	showScreen("home"); //show the home screen of the app first
	$("#new_button").click(function(){
		showScreen("newSet");
		$("#numTerms").focus();
	});
	$("#fetch_button").click(function(){
		var num=Number($("#numTerms").val()); //get an int value from text input
		showScreen("loading");
		var fetcher= new QuizletFetcher(num); // create new QuizletFetcher with num amount of words		
	});
	$(".prev").live('click',prevButton);
	$(".next").live('click',nextButton);
});
/**
 * [prevButton Show the previous card]
 */
function prevButton(){
	var curr=$(".card:visible").index()-2;
	$(".card").hide();
	if(curr>0)
		$(".card").eq(curr-1).show();
	else
		$(".card").eq($(".card").size()-1).show();
	return false;
}
/**
 * [nextButton Show the next card]
 */
function nextButton(){
	var curr=$(".card:visible").index()-1;
	$(".card").hide();
	if(curr<$(".card").size()-1)
		$(".card").eq(curr+1).show();
	else
		$(".card").eq(0).show();
	return false;
}

function showScreen(name){
	$(".screen").hide();
	$name=$("#"+name);
	$name.show();
	$("#title h3").html($name.attr('data-title'));
}