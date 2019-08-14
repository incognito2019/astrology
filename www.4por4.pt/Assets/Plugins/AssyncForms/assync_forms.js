$(document).ready(function(){
	var $forms = $('.assync_form');
	
	var page = '/Assets/Plugins/AssyncForms/ops.php';
	
	$forms.each(function(){
		var $form = $(this);
		
		$form.prepend('<div class="op_result"></div>');
		
		var $op_result = $form.find('.op_result');
		
		$form.on('submit', function(evt){
			evt.preventDefault();
			
			var data = $form.serialize();
			
			$.post(page, data, function(result){				
				if(result != ""){
					$op_result.html(result);
					scrollPageToTopBarBottom($form, 400, 0);
				}
				
				if($op_result.find('.success').length){
					$form.find('input[type="text"], textarea').val('');
					$form.find('select option:first').prop('selected', true).change();
				}
			});
		});
	});
});