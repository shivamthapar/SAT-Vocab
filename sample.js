$(document).ready(function(){
	var numSetsCombined=3;
	var setIds=[];
	$.getJSON(makeUrl('https://api.quizlet.com/2.0/search/sets?q=SAT%20Vocab'), function(data) {
		setIds=getDifferentSets(data, numSetsCombined, setIds);
		getSetTerms(setIds[0]);
	});
	
})
function getDifferentSets(data, num, arr){
	for(var i=0; i<num; i++){
			arr.push(data.sets[i].id);
	}
	return arr;
}
function getSetTerms(id){
	var url= "https://api.quizlet.com/2.0/set/"+id;
	$.getJSON(makeUrl(url), function(data) {
		console.log(data);
	});
}
function makeUrl(base){
	if(base.indexOf('?')>0)
		return base+"&client_id=UnFvAtV9uG&whitespace=1&callback=?";
	else
		return base+"?client_id=UnFvAtV9uG&whitespace=1&callback=?";
}