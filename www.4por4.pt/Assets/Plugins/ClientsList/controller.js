function setClientsList(language_id, recs_per_page){
	/* els */
	var $container = $('#clients_pane'),
		$category_filter = $('#category_filter'),
		$type_filter = $('#type_filter'),
		$sort_filter = $('#sort_filter'),
		$prev_btn = $('.icon.arrow.left'),
		$next_btn = $('.icon.arrow.right');
		
	/* values */
	var page_nr = 1,
		category_id,
		type_id,
		sort_order;
	
	var resizeGrid = function(){
		$els = $container.find('.item');
		
		$.each($els, function(){
			$(this).height($els.eq(0).width());
		});
	};
	
	var makeQuery = function(){
		// update values
		category_id = $category_filter.val(),
		type_id = $type_filter.val(),
		sort_order = $sort_filter.val();
		
		$.post(
			'Assets/Plugins/ClientsList/view.php',
			{language_id: language_id, category_id: category_id, type_id: type_id, sort_order: sort_order, recs_per_page: recs_per_page, page_nr: page_nr},
			function(data){
				$container.fadeOut(300, function(){
					$container.html(data);
					resizeGrid();
					
					$container.fadeIn(300);
				
					var $items = $container.find('.item');
					var total_pages = $items.length ? $items.first().data('totalpages') : 0;
					
					if(page_nr > total_pages){
						page_nr = total_pages;	
					}
					if(total_pages <= 0){
						page_nr = 1;	
					}
					
					// update buttons references
					if(page_nr > 1){
						$prev_btn.attr('data-pagenr', parseInt(page_nr) - 1);
						$prev_btn.show();
					}else{
						$prev_btn.hide();
					}
					if(page_nr < total_pages){
						$next_btn.attr('data-pagenr', parseInt(page_nr) + 1);
						$next_btn.show();
					}else{
						$next_btn.hide();
					}
				});
				
			}
		)
	}
	
	var init = function(){
		$prev_btn.on('click', function(){
			page_nr = $(this).attr('data-pagenr');
			makeQuery();
		});
		$next_btn.on('click', function(){
			page_nr = $(this).attr('data-pagenr');
			makeQuery();
		});
		
		$('#category_filter').on('change', function(){
			page_nr = 1;
			makeQuery();
		});
		$('#type_filter').on('change', function(){
			page_nr = 1;
			makeQuery();
		});
		$('#sort_filter').on('change', makeQuery);
		
		makeQuery();
	}
	
	init();
}