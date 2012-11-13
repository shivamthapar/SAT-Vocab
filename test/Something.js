function Something(numTerms){
	var self=this;
	this.words=[];
	this.wordsNeeded=numTerms;
	this.mainMethod = function(){
		$.getJSON("external JSON url", function(data) {
			var setIds=[1,2,3];
			for(var i=0; i<setIds.length; i++){
				self.subMethod(setIds[i]);
			}	
				
		});
	}
	this.subMethod= function(id){
		$.getJSON("some other external JSON url", function(data) {
			var numberTerms= data.terms.length;
			var terms=[];
			if(self.wordsNeeded<numberTerms) numberTerms=self.wordsNeeded;

			for(var i=0;i<numberTerms;i++){
				var word= new Object();
				word.term=data.terms[i].term;
				word.definition=data.terms[i].definition;
				terms.push(word);
			}
			for(var i=0;i<terms.length;i++){
				var word= {"term":terms[i].term, "definition":terms[i].definition};
				self.words.push(word);
			}
			self.wordsNeeded-=numberTerms;
		});
	}
}