$(document).ready(function(){
	$("#home").show();
	$("#new_button").click(function(){
		$("#home").hide();
		$("#newSet").show();
	});
	$("#fetch_button").click(function(){
		var num=Number($("#numTerms").val());
		alert(num);
		$(".screen").hide();
		$("#set").show();
		var fetcher= new QuizletFetcher(num);
	});
});
function prevButton(){
	var curr=$(".card:visible").index()-2;
	$(".card").hide();
	if(curr>0)
		$(".card").eq(curr-1).show();
	else
		$(".card").eq($(".card").size()-1).show();
}
function nextButton(){
	var curr=$(".card:visible").index()-2;
	$(".card").hide();
	if(curr<$(".card").size()-1)
		$(".card").eq(curr+1).show();
	else
		$(".card").eq(0).show();
}