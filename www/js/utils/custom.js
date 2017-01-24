//根据字典取属性组合,积分列表中goodsDec用到
function getDecString(item) {
	var dec='';
	for (var i in item.goodsDec.data) {
		var ck = Object.keys(item.goodsDec.code)[i];
		var sk = item.goodsDec.data[i];
		dec+=item.goodsDec.code[ck].secondary[sk]+'|';
	}
	return dec.substr(0, dec.length - 1);;
}