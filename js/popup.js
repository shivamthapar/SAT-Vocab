var wordsNeeded=199;
$(document).ready(function(){
	var setIds=[];
	$.getJSON(makeUrl('https://api.quizlet.com/2.0/search/sets?q=SAT%20100%20Words'), function(data) {
		setIds=getDifferentSets(data, wordsNeeded).ids;
		for(var i=0; i<setIds.length; i++){
			getSetTerms(setIds[i]);
		}


		
	});
	
})
function getDifferentSets(data, num){
	var obj= {};
	obj.ids=[];
	obj.wordsFound=0;
	var currSet=0;
	while(obj.wordsFound<num){
			obj.ids.push(data.sets[currSet].id);
			obj.wordsFound+=data.sets[currSet].term_count;
			currSet++;
	}
	console.log(obj);
	return obj;
}
function getSetTerms(id){
	var url= "https://api.quizlet.com/2.0/sets/"+id;
	$.getJSON(makeUrl(url), function(data) {
		var numTerms= data.terms.length;
		var terms=[];
		if(wordsNeeded<numTerms) numTerms=wordsNeeded;

		for(var i=0;i<numTerms;i++){
			var word= new Object();
			word.term=data.terms[i].term;
			word.definition=data.terms[i].definition;
			terms.push(word);
			console.log(id+":"+i);
		}
		for(var i=0;i<terms.length;i++){
			var text= terms[i].term+":"+terms[i].definition;
			$("#json").append("<br/>"+text);
		}
		wordsNeeded-=numTerms;
	});

	
}
function makeUrl(base){
	if(base.indexOf('?')>0)
		return base+"&client_id=UnFvAtV9uG&whitespace=1&callback=?";
	else
		return base+"?client_id=UnFvAtV9uG&whitespace=1&callback=?";
}