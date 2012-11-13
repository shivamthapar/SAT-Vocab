function CardMaker(){
	this.words=[];
	this.createCard= function(term, definition, first){
		console.log(term);
		var card= $("#template.template").clone();
		$(card).removeAttr('style').removeAttr('id').removeClass("template").addClass("card");
		$(card).find('.term').text(term);
		$(card).find('.def').text(definition);		
		$(card).appendTo('#set.screen');
		if(first) $(card).show();
	}
	
}