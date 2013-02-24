/**
 * [CardMaker simple class to create flashcards in HTML DOM]
 */
function CardMaker(){
	/**
	 * [createCard Creates a flashcard with a term and definition by cloning a template card]
	 * @param  {[string]} term       [Vocab term]
	 * @param  {[string]} definition [Definition of term]
	 * @param  {[boolean]} first     [is the first card to be created]
	 * @return {[type]}
	 */
	this.createCard= function(term, definition, first){
		console.log(term);
		var card= $("#template.template").clone();
		$(card).removeAttr('style').removeAttr('id').removeClass("template").addClass("card");
		$(card).find('.term').text(term);
		$(card).find('.def').text(definition);		
		$(card).appendTo('#set.screen');
		if(first) $(card).show();
		curr=0;
	}
	
}