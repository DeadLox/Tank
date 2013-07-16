function logger(key, value){
	if ($('#log .'+key).length == 1) {
		$('#log .'+key).html('<span>'+key+': </span>'+value);
	} else {
		$('#log').append('<div class="'+key+'">'+key+': </span>'+value+'</div>');
	}
}
function arr(num, nbDec) {
	var mult = 10 * nbDec;
	return Math.round(num * mult) / mult;
}