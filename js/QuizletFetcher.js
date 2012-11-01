function QuizletFetcher(numTerms){
	var self=this;
	this.words=[];
	this.wordsNeeded=numTerms;
	this.getAllWords = function(){
		$.getJSON(self.makeUrl('https://api.quizlet.com/2.0/search/sets?q=SAT%20100%20Words'), function(data) {
			var setIds=self.getDifferentSets(data, self.wordsNeeded).ids;
			for(var i=0; i<setIds.length; i++){
				self.getSetTerms(setIds[i]);
			}		
		});
	}
	this.getDifferentSets= function(data, num){
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
	this.getSetTerms= function(id){
		var url= "https://api.quizlet.com/2.0/sets/"+id;
		$.getJSON(self.makeUrl(url), function(data) {
			var numTerms= data.terms.length;
			var terms=[];
			if(self.wordsNeeded<numTerms) numTerms=self.wordsNeeded;

			for(var i=0;i<numTerms;i++){
				var word= new Object();
				word.term=data.terms[i].term;
				word.definition=data.terms[i].definition;
				terms.push(word);
			}
			for(var i=0;i<terms.length;i++){
				/*var word= {"term":terms[i].term, "definition":terms[i].definition};
				alert(i);

				self.words.push(word);
				*/
				$("#json").append(terms[i].term+": "+terms[i].definition+"<br>");
			}
			self.wordsNeeded-=numTerms;
		});
	}	
	this.makeUrl= function(base){
		if(base.indexOf('?')>0)
			return base+"&client_id=UnFvAtV9uG&whitespace=1&callback=?";
		else
			return base+"?client_id=UnFvAtV9uG&whitespace=1&callback=?";
	}
}