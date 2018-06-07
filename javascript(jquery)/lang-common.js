/* [怨듯넻] �쎌뒪 �ㅻ퉬寃뚯씠�� - #fixed_nav �꾩씠�붾쭔 �곸슜�섎㈃ �ъ슜媛��� */
function LANG_FIXED_NAV(){
	this.top = 0;
	this.height = 0;
	this.pick = false;
	this.array = [];
}
LANG_FIXED_NAV.prototype.init = function(o){
	var _this = this;
    _this.o = o;
    _this.$o = $(o);
    if(_this.$o.length <= 0){
		return; //�섎━癒쇳듃 �놁쑝硫� 由ы꽩
	}
   	_this.$o.wrapInner('<div class="fixed_inner"></div>')
   	_this.doAnchor();
}
LANG_FIXED_NAV.prototype.doAnchor = function(){
	var _this = this;http://qa-offeng.dangi.co.kr/common/renewal_busan/page
	var _id = [];
	var _top = [];
	var _a;
	/* �쎌뒪 泥섎━ */
	_this.top = _this.$o.offset().top;
	_this.height = _this.$o.height();
	_this.doFixed();
	if(_this.$o.hasClass('fixed_pickup') > 0){
   		_this.pick = true;
   	}
	if(_this.pick){
		_a = 'a.pickup';
	}else{
		_a = 'a';
	}
	/* // �쎌뒪 泥섎━ */
	if(_this.$o.find(_a).length <= 0){
		return; //a踰꾪듉 �놁쓣�� �⑥닚 �쎌뒪 泥섎━
	}
	_this.array.push(['',0]);//理쒖냼媛믪���
	_this.$o.find(_a).each(function(i) {
		$(this).addClass('fixed_nav_num_'+(i+1));
		_id[i] = $(this).attr('href');
		if($(_id[i]).length > 0 ){
			_top[i] = $(_id[i]).offset().top - (_this.height*2);
		}else{
			_top[i] = 0;
			console.log('Error: '+_id[i]+' ID s not exist, you have to input ID')
		}
		_this.array.push([_id[i],_top[i]]);
 	 });
	_this.array.push(['',100000]);//理쒕�媛믪���
	_this.doIt();
}
LANG_FIXED_NAV.prototype.doIt = function(){
	var _this = this;
	_this.doClick();
	_this.doScroll();
}
LANG_FIXED_NAV.prototype.doClick = function(){
	var _this = this;
	var _attr;
	var _a;
	if(_this.pick){
		_a = 'a.pickup';
	}else{
		_a = 'a';
	}
	_this.$o.find(_a).click(function(){
		_attr = $(this).attr('href');
		if($(''+_attr).length > 0 ){
			_this.doMove(_attr);
		}else{
			// console.log('ID s not exist')
		}
	});
}
LANG_FIXED_NAV.prototype.doMove = function(e){
	var _this = this;
	var _top;
	for(i=0; i<_this.array.length; i++){
		if(this.array[i][0]  == e){
			var _top = this.array[i][1];
		}
	}
	$('html,body').stop().animate({scrollTop:_top}, 400);
}
LANG_FIXED_NAV.prototype.doActive = function(n){
	var _this = this;
	_this.$o.find('.active').each(function() {
		$(this).removeClass('active')
	})
	_this.$o.find('.fixed_nav_num_'+n).addClass('active');
}
LANG_FIXED_NAV.prototype.doFixed = function(){
	var _this = this;
	 $(window).scroll(function () {
		var _win = $(this).scrollTop();
	    if(_this.top < _win)  {
	    	_this.$o.addClass('fixed')
	    }else{
	    	_this.$o.removeClass('fixed')
		}
	})
}
LANG_FIXED_NAV.prototype.doScroll = function(){
	var _this = this;
	var _newIdx;
	var _oldIdx;
	$(window).scroll(function () {
		var _win = $(this).scrollTop();
		for(i=0; i<_this.array.length; i++){
			if(_this.array[i][1] <= _win && _this.array[i+1][1] > _win)  {
				_newIdx = i;
				if(_oldIdx != _newIdx){
					_this.doActive(_newIdx)
					_oldIdx = _newIdx;
					break;
				}
				break;
			};
		}
	});
}
$(window).load(function() {
newFixedNav = new LANG_FIXED_NAV();
newFixedNav.init('#fixed_nav');
});
/* // [怨듯넻] �쎌뒪 �ㅻ퉬寃뚯씠�� */



/* [怨듯넻] �쎌뒪 �섎떒 ���대뱶 諛곕꼫 - #fixed_ban_wide �꾩씠�붾쭔 �곸슜�섎㈃ �ъ슜媛��� */
function LANG_FIXED_BAN_WIDE(){
	this.array = [];
	this.close = 'white';
}
LANG_FIXED_BAN_WIDE.prototype.init = function(o){
	var _this = this;
    _this.o = o;
    _this.$o = $(o);
     if(_this.$o.length <= 0){
		return; //�섎━癒쇳듃 �놁쑝硫� 由ы꽩
	}
   	_this.$o.wrapInner('<div class="fixed_inner"><div class="fixed_width"></div></div>')
   	_this.doDraw();
}
LANG_FIXED_BAN_WIDE.prototype.doDraw = function(){
	var _this = this;
	if(_this.$o.hasClass('close_black') > 0){
   		_this.close = 'black';
   	}
	_this.$o.find('.fixed_width').append('<a href="javascript:void(0);" class="btn_close_ban_wide '+_this.close+'"></a>');
	_this.doIt();
}
LANG_FIXED_BAN_WIDE.prototype.doIt = function(){
	var _this = this;
	_this.doClick();
}
LANG_FIXED_BAN_WIDE.prototype.doClick = function(){
	var _this = this;
	_this.$o.find('.btn_close_ban_wide').click(function(){
		_this.$o.remove();
	});
}

$(window).load(function() {
newFixedBanWide = new LANG_FIXED_BAN_WIDE();
newFixedBanWide.init('#fixed_ban_wide');
});
/* // [怨듯넻] �쎌뒪 �섎떒 ���대뱶 諛곕꼫 */



/* [怨듯넻] �쎌뒪 �ㅽ뙘�� - #fixed_dim �꾩씠�붿� data-cookie-name(dim_ymdhms)瑜� �곸슜�섎㈃ �ъ슜媛���  */
function LANG_FIXED_DIM(){
	this.it = false;
	this.html = '';
	this.cookie;
}
LANG_FIXED_DIM.prototype.init = function(o){
	var _this = this;
    _this.o = o;
    _this.$o = $(o);
    if(_this.$o.length > 0){
    	_this.it = true;
   	}else{
   		return; //�섎━癒쇳듃 �놁쑝硫� 由ы꽩
   	}
   	_this.doGetCookie();
}

LANG_FIXED_DIM.prototype.doGetCookie = function(){
	var _this = this;
	var _cookie = _this.$o.attr('data-cookie-name');
	if(_cookie.length <= 0){ // �좊땲�ы븳 荑좏궎�ㅼ엫 �놁쑝硫� 由ы꽩
		return;
	}
	if (getCookie(_cookie)) {
		return; // 荑좏궎 �덉쑝硫� 由ы꽩
	}
	_this.cookie = _cookie;
	_this.doChoose();
}

LANG_FIXED_DIM.prototype.doSetCookie = function(){
	var _this = this;
	var _data = {};
	_data.unsight_check_today = $('#unsight_check_today:checked').length > 0;
	_data.unsight_check_week = $('#unsight_check_week:checked').length > 0;

	if (_data.unsight_check_week) {
		setCookie(_this.cookie, "yes" , 7);
	}
	else if (_data.unsight_check_today) {
		setCookie(_this.cookie, "yes" , 1);
	}
	_this.doRemove();
}

LANG_FIXED_DIM.prototype.doChoose = function(){
	var _this = this;
	var _length = _this.$o.find('>a').length;
	if(_length <= 0){
		return;
	}
	var _random = Math.floor((Math.random() * _length) + 1);
	_this.$o.find('>a:eq('+(_random-1)+')').siblings().remove();
	_this.html = _this.$o.html();
	_this.$o.html('');
	_this.$o.wrapInner('<div class="fixed_inner"></div>')
   	_this.doDraw();
}

LANG_FIXED_DIM.prototype.doDraw = function(){
	var _this = this;
	var _html ='';
	_html += '<div class="add_a">';
	_html += '<em>';
	_html += _this.html;
	_html += '<span class="add_b">';
	_html += '<span ><input type="checkbox" id="unsight_check_today"> <label for="unsight_check_today">�ㅻ뒛 �섎（ 蹂댁� �딄린</label></span>';
	_html += '<span ><input type="checkbox" id="unsight_check_week"> <label for="unsight_check_week">�쇱＜�� 蹂댁� �딄린</label></span>';
	_html += '<a href="javascript:void(0);" class="btn_close_dim">�リ린</a>';
	_html += '</span>';
	_html += '</em>';
	_html += '</div>';
	_this.$o.find('.fixed_inner').append(_html);
	$('#wrap').prepend('<div class="fixed_dim_bg"></div>');
		_this.doIt();
}

LANG_FIXED_DIM.prototype.doIt = function(){
	var _this = this;
	_this.doShow();
	_this.doClose();
}

LANG_FIXED_DIM.prototype.doShow = function(){
	var _this = this;
	_this.$o.show();
	$('.fixed_dim_bg').fadeIn('fast');
}

LANG_FIXED_DIM.prototype.doRemove = function(){
	var _this = this;
	_this.$o.remove();
	$('.fixed_dim_bg').remove();
}

LANG_FIXED_DIM.prototype.doClose = function(){
	var _this = this;
	_this.$o.find('.btn_close_dim').click(function(){
		_this.doSetCookie();
	});
}

$(window).load(function() {
newFixedDim = new LANG_FIXED_DIM();
newFixedDim.init('#fixed_dim');
});



/* [怨듯넻] �쎌뒪 �뚮줈�� 諛곕꼫 - .fixed_ban_floating �대옒�ㅻ쭔 �곸슜�섎㈃ �ъ슜媛���, data-cookie-name(dim_YMDHMS)�� 李⑦썑 �ъ슜�덉젙 */
function LANG_FIXED_BAN_FLOATING(){
    this.it = false; // 諛곕꼫 �좊Т 泥댄겕
    this.start = []; //�덉빟 �쒖옉 �쒓컙
    this.end = []; //�덉빟 醫낅즺 �쒓컙
    this.left = []; // 諛곕꼫 �덊봽�� 媛�
    this.top = []; // 諛곕꼫 �� 媛�
    this.conects = 0; // 而ㅻ꽖痢� �믪씠媛�
    this.name; // 諛곕꼫 怨좎쑀 �ㅼ엫
    this.time; // �꾩옱 �쒓컙
    this.foot ; // 諛곕꼫 �쎌엯 怨좎젙 �꾩튂
    this.close; // �リ린 踰꾪듉 �듭뀡 white black
}

LANG_FIXED_BAN_FLOATING.prototype.init = function(o){
    var _this = this;
    _this.o = o;
    _this.$o = $(o);
    if(_this.$o.length > 0){
        _this.it = true;
    }else{
        return; //�섎━癒쇳듃 �놁쑝硫� 由ы꽩
    }
     var decision = _this.doSet();
     if(decision) return;  // 怨좎젙 �꾩튂 �≪쓣 怨� �놁쑝硫� 由ы꽩
    _this.$o.each(function(){
        _this.doPeriod($(this)); // �덉빟 議곌굔 寃��됲썑 �� 諛곗튂
    });
    if($(_this.o).length <= 0){
         return; // �щ같移섑썑 �섎━癒쇳듃 �놁쑝硫� 由ы꽩
    }
    _this.doIt(); // �뗮똿
}

LANG_FIXED_BAN_FLOATING.prototype.doSet = function(){
    var _this = this;
    var _foot = $('#wrap');
    if(_foot.length <= 0){
       console.log('ID s not exist, you have to input ID(#wrap)')
       return true;  //�섎━癒쇳듃(#wrap) �놁쑝硫� 由ы꽩
    }
    _this.foot = $('#wrap');
    var _conects =  $('.st-connects-v3');
    if(_conects.length > 0){
        _this.conects  = _conects.height();
    }
    _this.foot.prepend('<div class="absolute_foot"></div>');
}

LANG_FIXED_BAN_FLOATING.prototype.doPeriod = function(e){
    var _this = this;
    var _start =  e.attr('setting-start');
    var _end =  e.attr('setting-end');
    if(_end){ // 留덇컧 �쒓컙 �명똿 ��
        var decision = _this.doCheckTime(_end);
        if(decision) {
            e.remove();
            return;  // 醫낅즺�쒓컙 �댄썑硫� 由ы꽩
        }
    }
     if(_start){  // �쒖옉 �쒓컙 �뗮똿 ��
       var decision =  _this.doCheckTime(_start);
        if(!decision) {
             e.remove();
            return; // �쒖옉�쒓컙 �댁쟾�대㈃ 由ы꽩
        }
    }
     _this.doDraw(e);
}

LANG_FIXED_BAN_FLOATING.prototype.doCheckTime = function(n){
    var _this = this;
    var _now = new Date();
    var _year = _now.getFullYear();
    var _month = _this.doCheckCipher(_now.getMonth()+1);
    var _data = _this.doCheckCipher(_now.getDate());
    var _hour = _this.doCheckCipher(_now.getHours());
    var _min = _this.doCheckCipher(_now.getMinutes());
    var _sec = _this.doCheckCipher(_now.getSeconds());
    _this.time = ''+_year+_month+_data+_hour+_min+_sec;
    var decision  = _this.time - n > 0;
    return decision;
}

LANG_FIXED_BAN_FLOATING.prototype.doCheckCipher = function(n){
     return n < 10 ? '0' + n : '' + n; // ('' + n) �먮┸�� 泥댄겕
}

LANG_FIXED_BAN_FLOATING.prototype.doDraw = function(e){
    var _this = this;
    var _left = e.attr('setting-left')+'px';
    var _top =  e.attr('setting-top')+'px';
    if(e.hasClass('close_white') > 0){
        _this.close = 'white';
    }
    if(e.hasClass('close_black') > 0){
        _this.close = 'black';
    }
    e.css({'left':_left,'top':_top});
    e.append('<a href="javascript:void(0);" class="btn_close_ban_floating '+_this.close+'"></a>')
    _this.doClone(e);
}

LANG_FIXED_BAN_FLOATING.prototype.doClone = function(e){
    var _this = this;
    var _html = e.clone();
    e.remove();
    _this.foot.find('.absolute_foot').append(_html);
}

LANG_FIXED_BAN_FLOATING.prototype.doIt = function(){
     var _this = this;
     $(_this.o).each(function(){
        _this.doShow($(this)); // �몄텧 �뗮똿
        _this.doClose($(this)); //�リ린 踰꾪듉 �명똿
     })
    $(_this.o).each(function(i){
        if($(this).hasClass('fixed_move') > 0){
            _this.doOffSet($(this),i); //�꾩튂媛� �뗮똿
            _this.doFixed($(this),i);
        }
    })
}

LANG_FIXED_BAN_FLOATING.prototype.doShow = function(e){
    var _this = this;
     e.css({'display':'block'})
}

LANG_FIXED_BAN_FLOATING.prototype.doClose = function(e){
    var _this = this;
       e.find('.btn_close_ban_floating').click(function(){
            _this.doRemove(e);
       })
}

LANG_FIXED_BAN_FLOATING.prototype.doRemove = function(e){
    var _this = this;
    e.remove();
}

LANG_FIXED_BAN_FLOATING.prototype.doOffSet = function(e,i){
    var _this = this;
    var _top = [];
    _top[i] = e.offset().top - _this.conects;
    _this.top[i] = _top[i];
    //_this.top.push(_top[i]);
}

LANG_FIXED_BAN_FLOATING.prototype.doFixed = function(e,i){
    var _this = this;
     $(window).scroll(function () {
        var _win = $(this).scrollTop();
        if(_this.top[i] < _win)  {
            e.css({'top':_win})
            //$(this).addClass('fixed')
        }else{
            e.css({'top':_this.top[i] })
            //$(this).removeClass('fixed')
        }
    })
}

$(window).load(function() {
    newFixedDim = new LANG_FIXED_BAN_FLOATING();
    newFixedDim.init('.fixed_ban_floating');
});

/* // [怨듯넻] �쎌뒪 �뚮줈�� 諛곕꼫 */