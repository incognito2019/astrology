function setAssyncForms(forms){
	var $forms = $(forms);
	
	$forms.each(function(){
		var $form = $(this),
			$op_result = $form.find('.op_result');
	
		var page = $form.attr('action'),
			timeout;
			
		$form.on('submit', function(evt){
			evt.preventDefault();
			
			$.ajax({
				type: 'post',
				url: page,
				data: $form.serialize(),
				dataType: "json",
				success: function(result){
					if(result.location != ""){
						window.location = result.location;
					}else{
						window.clearTimeout(timeout);
						$op_result.show();
						
						if(result.error_msg != ""){
							$op_result.html(result.error_msg);
							//scrollPageTo($form, 400, 0);
						}
						
						if(result.success_msg != ""){
							$op_result.html(result.success_msg);
							//scrollPageTo($form, 400, 0);
						}
						
						if(result.reset_form){
							$form.get(0).reset();
						}
						
						if(result.disable_form){
							$form.find('[type="submit"]').prop('disabled', true);
						}
						
						timeout = window.setTimeout(function(){ $op_result.fadeOut(500) }, 3000);
					}
				},
				error: function(result){
					console.log(result)
				}
			});
		});
	});
}


/**
 *	This method controls the quick appointment form
 */
function setQuickAppointmentsForm(lang_iso){
	var form = 'form[name="quick_appointment_form"]',
		page = '/' + lang_iso + '/actions/appointment/';
	
	// declare vars
	var $btn, $form, $category_id, $service_id, $date, $forbidden_dates, $hour, $submit_btn;
	
	function init(){
		// init vars
		$form = $(form);
		$category_id = $form.find('select[name="category_id"]');
		$service_id = $form.find('select[name="service_id"]');
		$date = $form.find('input[name="date"]');
		$forbidden_dates = $form.find('input[name="forbidden_dates"]');
		$hour = $form.find('select[name="hour"]');
		$submit_btn = $form.find('input[type="submit"]');
		
		// set toggler
		setToggler();
		// set custom selects
		$('.appointment select').customSelect();
		// set assync form submission
		setAssyncForms(form);
		// set assync inputs
		assyncInputs();
	}
	
	function setToggler(){
		$btn = $('.appointment_pane > a');
		
		$btn.on('click', function(){
			$btn.parent().toggleClass('active');
			$form.stop().fadeToggle();
		});
	}		
	
	function assyncInputs(){
		// get services
		$category_id.on('change', function(){
			// disable hour and date fields, as well as the submit button
			$date.val("").prop('disabled', true);
			$hour.val("").prop('disabled', true).change();
			$submit_btn.prop('disabled', true);
			
			$.post(
				page + "get_services_by_category_id",
				{selected_id: $category_id.val()},
				function(data){
					$service_id.find('option:not(:first-child)').remove();
					$service_id.append(data);
					if($service_id.find('option').length > 1){
						$service_id.prop('disabled', false);
					}else{
						$service_id.prop('disabled', true);
					}
					$service_id.change();
				}
			);
		});
		
		// set days
		$service_id.on('change', function(){
			// disable hour and date fields
			$date.val("").prop('disabled', true);
			$hour.val("").prop('disabled', true).change();
			$submit_btn.prop('disabled', true);
			
			$.post(
				page + "get_unavailable_dates",
				{selected_id: $service_id.val()},
				function(data){
					if($service_id.val()){
						$forbidden_dates.val(data);
						
						$date.prop('disabled', false);
						setDatePicker(form + ' #date');
					}
				}
			);
		});
		
		$date.on('change', function(){
			$.post(
				page + "get_available_hours_by_date",
				{service_id: $service_id.val(), date: $date.val(), hour: $hour.val()},
				function(data){
					$hour.find('option:not(:first-child)').remove();
					$hour.append(data);
					if($hour.find('option').length > 1){
						$hour.prop('disabled', false);
					}else{
						$hour.prop('disabled', true);
					}
					$hour.change();
				}
			);
		});
		
		$hour.on('change', function(){
			if($hour.val().length){
				$submit_btn.prop('disabled', false);
			}else{
				$submit_btn.prop('disabled', true);
			}
		});
	}
	
	init();
}


/**
 *	This method controls the appointment form on the service detail page and on the appointments history page
 */
function setAppointmentsDate(forms, lang_iso){
	var $forms = $(forms);
	
	var page = '/' + lang_iso + '/actions/appointment/get_available_hours_by_date';
	
	$forms.each(function(){
		var $form = $(this),
			$date = $form.find('[name="date"]'),
			$hour = $form.find('[name="hour"]'),
			$service_id = $form.find('[name="service_id"]');
		
		$date.on('change', function(){
			$.post(
				page,
				{service_id: $service_id.val(), date: $date.val(), hour: $hour.val()},
				function(data){
					$hour.find('option:not(:first-child)').remove();
					$hour.append(data);
					if($hour.find('option').length > 1){
						$hour.prop('disabled', false);
					}else{
						$hour.prop('disabled', true);
					}
					$hour.change();
				}
			);
		});
	});	
}