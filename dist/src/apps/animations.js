$(document).ready( function() {
	
	$('.tntSC').load(function(){
		$('.loading').fadeOut(800, function (){
			//animation complete
		});
	});

	$('.hero-img').addClass('animated fadeIn');
	$('.hero-content').addClass('animated fadeIn');

});