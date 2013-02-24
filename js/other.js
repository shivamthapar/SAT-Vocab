var fetcher,localSet, first, curr=-1, flipped=false;
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
	$("a.link").live('click',function(){
		showScreen($(this).attr('href').substring(1));
	});
	$("#fetch_button").click(function(){
		var input=$("#numTerms").val();
		var num;
		if((num=validateNumberInput(input)))
		{
			$("#newSet #normal").hide();
			$("#newSet #loading").show();
			fetcher= new QuizletFetcher(num); // create new QuizletFetcher with num amount of words
		}
		
	});
	$("#back").live('click',function(){
		window.history.back();
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
	$("#saveSetButton").click(function(){
		if(fetcher){
			showScreen('saveScreen')
		}
	});
	$("#saveButton").click(function(){
		if(saveSet()){			
			$("#saveForm").hide();
			$("#saveSuccess").show();
			setTimeout(function(){
				showScreen('set');					
				$("#saveForm").show();
				$("#saveSuccess").hide();
			}, 1000);
		}

	});
	$("#studySettingsButton").toggle(function(){
		$("#studySettings").show();
		$("#studySettingsButton").css('background-image','url(../img/options_icon_select.png)');
	},function(){
		$("#studySettings").hide();
		$("#studySettingsButton").css('background-image','url(../img/options_icon.png)');
	});

	$('.card').live('click',function(){
		flip();	
	});
	$('input[name="showFirst"]').change(function(){
		var value=$(this).attr('value');
		first=value;
		switch(value){
			case "both":
				$(".term").removeClass('term-big');
				$(".def").removeClass('def-big');
				$(".def").show();
				$(".term").show();
				break;
			case "term":
				$(".term").addClass('term-big');
				$(".def").addClass('def-big');
				$(".term").show();
				$(".def").hide();
				break;
			case "definition":
				$(".def").addClass('def-big');
				$(".term").addClass('term-big');
				$(".def").show();
				$(".term").hide();
				break;	
		}	
	});
});

function flip(){
	if(curr>=0){
		var termShowing= $(".card .term").eq(curr).css('display')!=="none";
		var defShowing= $(".card .def").eq(curr).css('display')!=="none";
		if(termShowing&&!defShowing){
			$(".card .term").eq(curr).hide();
			$(".card .def").eq(curr).show();
		}
		else if(defShowing && !termShowing){
			$(".card .def").eq(curr).hide();
			$(".card .term").eq(curr).show();
		}
		flipped=!flipped;
	}
}


/**
 * [prevButton Show the previous card]
 */
function prevButton(){
	curr=$(".card:visible").first().index('.card');
	if(flipped)
		flip();
	$(".card").hide();
	if(curr>0)
		$(".card").eq(curr-1).show();
	else
		$(".card").eq($(".card").size()-1).show();
	curr=$(".card:visible").first().index('.card');
	flipped=false;
}
/**
 * [nextButton Show the next card]
 */
function nextButton(){
	curr=$(".card:visible").first().index('.card');	
	if(flipped)
		flip();
	$(".card").hide();
	if(curr<$(".card").size()-1)
		$(".card").eq(curr+1).show();
	else
		$(".card").eq(0).show();
	curr=$(".card:visible").first().index('.card');
	flipped=false;
}

function showScreen(name){
	window.location.href="#"+name;
	//$(".screen").hide();
	$name=$("#"+name);
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
		return true;
	}
	return false;
}

function getLocalSet(key){
	if(!localStorage.getItem(key))
		return {'title':'EMPTY','words':{}};
	return JSON.parse(localStorage.getItem(key));
}
