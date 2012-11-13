$(document).ready(function(){	
	$("#fetch_button").click(function(){
		var num=Number($("#numTerms").val());
		var some= new Something(num);
		some.mainMethod();
		var words=some.words; //How can I get the final value of some.words AFTER it has been changed by the JSON calls?
	});
})