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
		var fetcher= new QuizletFetcher(num);
		fetcher.getAllWords();
		$("#set").show();
	});
})