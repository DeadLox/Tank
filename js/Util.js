function logger(key, value){
	if ($('#log .'+key).length == 1) {
		$('#log .'+key).html('<span>'+key+': </span>'+value);
	} else {
		$('#log').append('<div class="'+key+'">'+key+': </span>'+value+'</div>');
	}
}
function arr(num, nbDec) {
	var mult = Math.pow(10, nbDec);
	return Math.round(num * mult) / mult;
}
function toDeg(rad){
	return rad * (180 / Math.PI);
}
function toRad(deg){
	return deg * (Math.PI / 180);
}