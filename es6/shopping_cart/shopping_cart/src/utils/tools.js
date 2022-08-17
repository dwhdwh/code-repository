function getUrlQueryValue (key) {
	const reg = new RegExp('(^|&)'+ key +'=([^&]*)(&|$)', 'i'),
	      res = window.location.search.substr(1).match(reg);

	return res != null ? decodeURIComponent(res[2]) : null;
}

module.exports = {
	getUrlQueryValue
}