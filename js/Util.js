function logger(key, value){
	if ($('#log .'+key).length == 1) {
		$('#log .'+key).html('<span>'+key+': </span>'+value);
	} else {
		$('#log').append('<div class="'+key+'">'+key+': </span>'+value+'</div>');
	}
}