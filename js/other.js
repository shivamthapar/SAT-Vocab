$(document).ready(function(){ //when page is ready
	$("#home").show(); //show the home screen of the app first
	$("#new_button").click(function(){
		$("#home").hide();
		$("#newSet").show();
	});
	$("#fetch_button").click(function(){
		var num=Number($("#numTerms").val()); //get an int value from text input
		$(".screen").hide(); 
		$("#set").show(); //hide all screens except #set
		var fetcher= new QuizletFetcher(num); // create new QuizletFetcher with num amount of words
	});
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
}
/**
 * [nextButton Show the next card]
 */
function nextButton(){
	var curr=$(".card:visible").index()-2;
	$(".card").hide();
	if(curr<$(".card").size()-1)
		$(".card").eq(curr+1).show();
	else
		$(".card").eq(0).show();
}