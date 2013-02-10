/**
 * [QuizletFetcher class with numTerms amount of Vocab words fetched from Quizlet]
 * @param {[int]} numTerms [number of words needed]
 */
function QuizletFetcher(numTerms){
	var self=this; //reference to QuizletFetcher (object)
	this.words=[]; //array of vocab words (object; word.term, word.definition)
	this.wordsNeeded=numTerms; //amount of words still needed to be fetched (int)
	this.cardMaker= new CardMaker();  //CardMaker object (object)
	this.first=true; //is the first vocab word fetched? (boolean)
	/**
	 * [getAllWords Gets numTerms number of SAT Vocab words from Quizlet by combining sets that come up under the search term
	 * "SAT 100 Words"]
	 * @return {[string[]] array of fetched words}
	 */
	this.getAllWords = function(){
		$.getJSON(self.makeUrl('https://api.quizlet.com/2.0/search/sets?q=SAT%20100%20Words'), function(data) {
			var setIds=self.getDifferentSets(data, self.wordsNeeded);
			for(var i=0; i<setIds.length; i++){
				self.getSetTerms(setIds[i]);
			}	
			return self.words;	
		});
	}
	/**
	 * [getDifferentSets Returns ids of enough Quizlet sets to get num amount of terms]
	 * @param  {[object]} data [JSON from Quizlet API call]
	 * @param  {[int]} num  [number of terms needed]
	 * @return {[int[]] array of ids of Quizlet Sets }
	 */
	this.getDifferentSets= function(data, num){
		var ids=[];
		var wordsFound=0;
		var currSet=0;
		while(wordsFound<num){
				ids.push(data.sets[currSet].id);
				wordsFound+=data.sets[currSet].term_count;
				currSet++;
		}
		return ids;
	}
	/**
	 * [getSetTerms Get words from Quizlet set with given id and append to QuizletFetcher.words array]
	 * @param  {[int]} id [id of Quizlet set]
	 */
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
				var word= {"term":terms[i].term, "definition":terms[i].definition};
				self.words.push(word);
				self.cardMaker.createCard(terms[i].term, terms[i].definition,self.first);
				self.first=false;
			}
			self.wordsNeeded-=numTerms;
			if(self.wordsNeeded==0){
				showScreen("set");
			}
		});
	}	
	/**
	 * [makeUrl Helper function to append client id to Quizlet API calls]
	 * @param  {[string (url)]} base [Quizlet API call URL]
	 * @return {[string] URL with appended client id}
	 */
	this.makeUrl= function(base){
		if(base.indexOf('?')>0)
			return base+"&client_id=UnFvAtV9uG&whitespace=1&callback=?";
		else
			return base+"?client_id=UnFvAtV9uG&whitespace=1&callback=?";
	}
	this.getAllWords(); //calls getAllWords when QuizletFetcher is first called

}