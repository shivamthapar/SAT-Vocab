function QuizMaker(words){
	/*
	A class that generates quizzes based on an array of words.
	 */
	var self= this;
	this.makeMCQuestion=function(question,a,b,c,d){
		$q= $("#quiz_mc_template.quiz_mc_template").clone();
		$q.removeAttr('style').removeAttr('id').removeClass("template");
		$q.find('.mc_question').text(question);
		$q.find('#mc_a_1').attr('value',a).parent('label').append(a);
		$q.find('#mc_a_2').attr('value',b).parent('label').append(b);
		$q.find('#mc_a_3').attr('value',c).parent('label').append(c);
		$q.find('#mc_a_4').attr('value',d).parent('label').append(d);
		$q.appendTo('#quizScreen.screen');
		if(first) $q.show();
		curr=0;
	}
	this.makeFRQQuestion=function(question,answer){
		$q= $("#quiz_frq_template.quiz_frq_template").clone();
		$q.removeAttr('style').removeAttr('id').removeClass("template");
		$q.find('.frq_question').text(question);
		$q.appendTo('#quizScreen.screen');
		if(first) $q.show();
		curr=0;
	}
}