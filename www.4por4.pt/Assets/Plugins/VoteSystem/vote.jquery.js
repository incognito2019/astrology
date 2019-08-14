function setVoteSystem(els){
	var $els = $(els);
	
	var page = "/Assets/Plugins/VoteSystem/ops.php";
	
	$els.each(function(){
		var $el = $(this);
		
		$el.on('click', function(){
			console.log('click')
			$.ajax({
				type: 'post',
				url: page,
				data: {
					record_id: $el.data('id'),
					language_id : $el.data('langid')	
				},
				dataType: "json",
				success: function(result){
					if(result){
						$el.addClass('active');
						if($('#votes_displayer').length){
							$('#votes_displayer').html(parseInt($('#votes_displayer').html()) + 1);
						}
					}
				},
				error: function(result){
					console.log(result)
				}
			});
		});
	});
}