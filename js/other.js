var fetcher,localSet;
$(document).ready(function(){ //when page is ready
	showScreen("home"); //show the home screen of the app first
	$("#new_button").click(function(){
		showScreen("newSet");
		$("#numTerms").focus();
	});
	$('#numTerms').on('keyup', function(e) {
	    if (e.which == 13) {
	        $("#fetch_button").click();
	    }
	});
	$("#fetch_button").click(function(){
		var input=$("#numTerms").val();
		var num;
		if((num=validateNumberInput(input)))
		{
			showScreen("loading");
			fetcher= new QuizletFetcher(num); // create new QuizletFetcher with num amount of words
		}
		
	});

	$("#load_button").click(function(){
		showScreen("loadScreen");
		localSet=getLocalSet('set');
		$("#loadedSetTitle").html(localSet.title);
		if(localSet.words.length>0)
			$("#loadedSetCount span").html(localSet.words.length);
	})

	$("#loadSetButton").click(function(){
		if(localSet){
			showScreen("loading");
			fetcher=new QuizletFetcher(localSet.title,localSet.words);
		}
	})

	$(".prev").live('click',prevButton);
	$(".next").live('click',nextButton);
	$("#saveSet").click(function(){
		if(fetcher){
			showScreen('saveScreen')
		}
	});
	$("#saveButton").click(saveSet);
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
/*
*[validateNumberInput] validate number input
*
 */
function validateNumberInput(input){
	if(isNaN(+input))
	{
		generateError("Please enter a number!");
		return false;
	}
	var num=Number(input); //get an int value from text input
	if(num<0||num>200)
	{
		generateError("Please enter a number between 0-200!");
		return false;
	}
	return num;		

}

function generateError(msg){
	$("#number_input").html(msg);
}

function activateArrowFunctions(){
	var LEFT= 37;
	var RIGHT= 39;
	$(document).on('keydown', function(e) {
	    if (e.which == LEFT){
	    	prevButton();
	    	$(".prev").addClass('prev-hover');
	    } 
	    if (e.which == RIGHT){
	    	nextButton();
	    	$(".next").addClass('next-hover');
	    }
	});
	$(document).on('keyup', function(e) {
		$(".prev").removeClass('prev-hover');
		$(".next").removeClass('next-hover');
	});
}

function saveSet(){
	if(fetcher){
		var title= $("#nameSet").val();
		var set= {'title':title, 'words':fetcher.words};
		localStorage.getItem('set');
		localStorage.setItem('set',JSON.stringify(set));
	}
}

function getLocalSet(key){
	if(!localStorage.getItem(key))
		return {'title':'EMPTY','words':{}};
	return JSON.parse(localStorage.getItem(key));
}
