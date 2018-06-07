<script type="text/javascript" src="http://hackers.com/publish/js/auto_map.js"></script>
1. jQuery selector¸¦ »ç¿ëÇÏ±â ¶§¹®¿¡ jQuery´Â ÇÊ¼ö·Î »ç¿ëÇØ¾ß ÇÕ´Ï´Ù.
2. jQuery ¼±¾ðÈÄ À§ÀÇ ÅÂ±×Ã³·³ auto_map.js¸¦ ºÒ·¯¿À¸é µË´Ï´Ù.
<div class="img_re">
	<img src="http://hackers.gscdn.com/hackers/images/S_Speak/toeicSpeaking/expect_book_sayim_1.jpg" alt="" usemap="#evt_cont5">
	<map name="evt_cont5" map-autoresize map-size="700">
		<area shape="rect" coords="61,671,345,734" href="#" target="_blank" alt="¼¼ÀÌÀÓ ¼±»ý´ÔÀÇ ÀÎ°­ º¸·¯°¡±â" />
		<area shape="rect" coords="357,671,638,734" href="#" target="_blank" alt="¼¼ÀÌÀÓ ¼±»ý´ÔÀÇ ÇÐ¿ø°­ÀÇ º¸·¯°¡±â" />
	</map>
</div>
1. auto_map.js ¸¦ »ç¿ëÇÏ°íÀÚ ÇÏ´Â °÷ÀÇ <map> ÅÂ±×¿¡ map-autoresize ¸¦ Ãß°¡ÇØÁÖ½Ã¸é ±âº»ÀûÀÎ »ç¿ëÁØºñ´Â ³¡.
2. map-size="" ¿¡´Â ¿øº» ÀÌ¹ÌÁö »çÀÌÁî(°¡·Î »çÀÌÁî)¸¦ Àû¾îÁÖ¼¼¿ä. (ÁÂÇ¥°ª °è»ê¿¡ ±âÁØÀÌ µË´Ï´Ù.)
3. map-size¸¦ ¼³Á¤ÇÏÁö ¾ÊÀ¸¸é ±âº» 640À¸·Î °íÁ¤µË´Ï´Ù. (¸ð¹ÙÀÏ ±âº» ÀÌ¹ÌÁö °¡·Î »çÀÌÁî 640)
4. ¾Æ·¡ÀÇ ÀÌ¹ÌÁö´Â ¿øº» °¡·Î »çÀÌÁî°¡ 700ÀÔ´Ï´Ù.
¡Ø ÅÇ ³»ºÎ¿¡ »ç¿ëÇÒ °æ¿ì, ÅÇ Á¦ÀÌÄõ¸® ÇÔ¼ö ³»ºÎ¿¡¼­ ¿ÀÅä¸ÊÀ» ÇÑ¹ø ´õ ºÒ·¯ÁÖ¾î¾ß ÇÕ´Ï´Ù.
(¼û±èÃ³¸® µÉ ¶§ ÀÌ¹ÌÁö »çÀÌÁî°¡ 0À¸·Î ¹Ù²î°Ô µÇ¹Ç·Î, ´Ù½Ã ÇÑ¹ø autoMap.printMap(); ºÒ·¯¾ß Á¤»óÀÛµ¿ ÇÔ)

<script>
var autoMap = {
	/* global variable */
	_gv:function(){
		_this._ori = {};
		_this._setW = {};
		_this._tImg = {};
	},
	init:function(){
		_this = this;
		_this._gv();

		$("map").each(function(){
			var _thisM = $(this);
			if(_thisM.attr("map-autoresize") != undefined){
				if(_thisM.attr("map-size") != undefined){
					_this._setW[_thisM.attr("name")] = _thisM.attr("map-size");
				}else{
					_this._setW[_thisM.attr("name")] = 640
				}
				_this._ori[_thisM.attr("name")] = {};

				_this._tImg[_thisM.attr("name")] = $("img[usemap=#"+_thisM.attr("name")+"]");

				$(this).find("area").each(function() {
					_this._ori[_thisM.attr("name")][$(this).index()]= ($(this).attr("coords")).split(',');
				});
			}
		});

		_this.printMap();
	},
	printMap:function(){
		$("map").each(function(){
			var _thisM = $(this);
			if(_thisM.attr("map-autoresize") != undefined){
				var _thisM = $(this);

				_thisM.find("area").each(function() {
					$(this).attr("coords", _this.creatCoords(_this._ori[_thisM.attr("name")][$(this).index()], _this._setW[_thisM.attr("name")], _this._tImg[_thisM.attr("name")]));
				});
			}
		})
	},
	creatCoords:function(_obj, _setW, _img){
		var _val = _obj;
		var _coords = ""
		var _w = parseInt(_img.width());
		for(i=0; i<_val.length; i++){
			if(i==0){
				_coords += parseInt(_val[i] * _w / _setW);
			}else{
				_coords += "," + parseInt(_val[i] * _w / _setW)
			}
		}
		return _coords;
	}
}

$(function(){
	autoMap.init();
	
	$(window).resize(function(){
		autoMap.printMap();
	})
});
</script>