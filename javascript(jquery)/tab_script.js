$(window).load(function(){
	var tab_01;  //변수설정
	tab_01 = $(window).return_st_tab({ //초기설정
		//st_slideTarget : '#st_element_change', //('#아이디' or '.클래스') - 전체 탭별 데이터 들어갈 곳
		st_slideTarget : {
			select : '#st_element_change', //('#아이디' or '.클래스') - 전체 탭별 데이터 들어갈 곳
			width : '500', // 가로
			height : '500', // 세로
			speed : '500' // 스피드
		},
		st_slideImg : {
			tab : ['#st_tab_1','#st_tab_2','#st_tab_3','#st_tab_4'], //('#아이디') - 전체 탭별 버튼 셀렉트명
			element : ['#st_element_1','#st_element_2','#st_element_3','#st_element_4'], //('#아이디' or '.클래스') - 전체 탭별 데이터 가져오는곳
			way : ['up','down','left','right'], //('up' or 'down' or 'left' or 'right' or 'empty' or 'fade') - 전체 탭별 슬라이드 방향
			auto : ['no','no','no','no'], //('yes' or 'no') - 전체 탭별 자동슬라이드 여부
			time : ['3000','4000','5000','6000'], // 전체 탭별 자동슬라이드 타임
			state : ['yes','no','no','no'], //('yes' or 'no') - 전체 탭별 데이터에서 bxslide 사용 여부
	        slide : ['.bx_slide_1','.bx_slide_2','.bx_slide_3','.bx_slide_4'] //('#아이디' or '.클래스') 전체 탭별 데이터에서 bxslide 셀렉트명
		}
	});
	tab_01.init(); //초기실행
})

$.fn.extend({
    return_st_tab: function(options) {
        var defaults = {} //전체 초기설정
       	//options = $.extend(defaults, options);
        $.extend(defaults, options);
        var st_slideCurrent = 0; //현재 탭 카운트
		var st_slideCount = defaults.st_slideImg.tab.length; //전체 탭 카운트
		var st_slideTime; //자동슬라이드 셋타임
		var st_slideId; //bx슬라이드
        return {
			init :  function(){
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				var _target = _that.st_slideTarget.select; //테이터 들어갈 곳
				/* s: 가상셀렉트 생성 */
				var numX = defaults.st_slideTarget.width;
				var numY = defaults.st_slideTarget.height
				$(''+_target).css({'position':'relative','overflow':'hidden','width':numX,'height':numY})
				$(''+_target).append('<div class="bx_html"></div>');
				/* e: 가상셀렉트 생성 */
				//초기실행
				_this.change();
				/* s:탭메뉴 클릭이벤트 */
				for (var i = 0; i < st_slideCount; i++) {
					var st_tab_item = defaults.st_slideImg.tab[i];
					$(''+st_tab_item).click(function(){
						var temp =  $(this).attr('id');
						for (var i = 0; i < st_slideCount; i++) {
							if(defaults.st_slideImg.tab[i] == '#'+temp ){
								_this.goTo(i);
								return;
							}
						}
					});
				}
				/* e:탭메뉴 클릭이벤트 */
			},
			animated : function(){ // 동작중인지 체크
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				var _target = _that.st_slideTarget.select; //테이터 들어갈 곳
				if($(''+_target).find('.bx_html').is(':animated')) return true;
			},
			change : function (){ //실행
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				var _auto = _that.st_slideImg.auto[_current]; //전체 자동슬라이드 여부
				var _target = _that.st_slideTarget.select; //테이터 들어갈 곳
				var _state = _that.st_slideImg.state[_current]; //슬라이드 여부
				// tab 메뉴 활성화
				_this.active();
				// e:tab 메뉴 활성화
				// s: gif일시 타임캐시 추가
				var _gifTime = _this.getTime();
				// e: gif일시 캐시타임 추가
				// s:탭변경시 모션
				var wayX;
				var wayY;
				var numX = defaults.st_slideTarget.width;
				var numY = defaults.st_slideTarget.height;
				var speed = defaults.st_slideTarget.speed;
				switch (defaults.st_slideImg.way[_current]){
					case 'up':
						wayX = 0;
						wayY = +(numY);
					break;
					case 'down':
						wayX = 0;
						wayY = -(numY);
					break;
					case 'left':
						wayX = +(numX);
						wayY = 0;
					break;
					case 'right':
						wayX = -(numX);
						wayY = 0;
					break;
					case 'empty':
						wayX = 0;
						wayY = 0;
					break;
					case 'fade':
						wayX = 0;
						wayY = 0;
					break;
				}
				$(''+_target).append('<div class="bx_after"></div>');
				$(''+_target).find('.bx_after').css({'position':'absolute','left':0,'top':0});
				var elem = $(''+_target).find('.bx_html').html();
				$(''+_target).find('.bx_after').html(elem);
				$(''+_target).find('.bx_html').css({'position':'absolute','left':+(wayX),'top':+(wayY)});
				$(''+_target).find('.bx_html').html(''); //데이터 비우기
				$(''+_target).find('.bx_html').html($(''+_that.st_slideImg.element[_current]).html()); //데이터 넣기
				$(''+_target).find('.bx_after').stop().animate({'left':-(wayX),'top':-(wayY)},speed,function(){
					$(''+_target).find('.bx_after').remove();
				});
				$(''+_target).find('.bx_html').stop().animate({'left':0,'top':0},speed,function(){});
				// e:탭변경시 모션
				// s: 전체 자동슬라이드 여부
				if(_auto === 'yes'){
					_this.start();//자동슬라이스 실행
				}else{
					_this.stop();//자동슬라이드 정지
				}
				// e: 전체 자동슬라이드 여부
				// s: 서브 bx슬라이드 적용
				if(_state === 'yes'){
					_this.stop(); //인터벌 정지
					var bx_slide_temp = $(''+_target).find(''+_that.st_slideImg.slide[_current]);
					var bx_slide_length = bx_slide_temp.find('>li').length;
					var bx_slide_first = bx_slide_temp.find('>li:first');
					st_slideId = bx_slide_temp.bxSlider({ //슬라이드 실행
						controls:true,
						pager:true,
						auto:false,
						infiniteLoop: true,
						speed: 500,
						pause: 3000,
						onSliderLoad: function(currentIndex) {
							bx_slide_load(currentIndex);
						},
						onSlideBefore: function ($slideElement, oldIndex, newIndex) {
							bx_slide_auto($slideElement,oldIndex,newIndex);
						},
						onSlideAfter: function ($slideElement, oldIndex, newIndex) {
							bx_slide_auto($slideElement,oldIndex,newIndex);
						},
						onSlideNext : function ($slideElement, oldIndex, newIndex) {
							 if(oldIndex >= bx_slide_length-1){
							 	_this.next(); //슬라이드 마지막에서ㄴ 다음탭으로
							 }
						},
						onSlidePrev : function ($slideElement, oldIndex, newIndex) {
							if(oldIndex <= 0){
								_this.prev(); //슬라이드 처음에서 이전탭으로
							}
						}
					});
					function bx_slide_load (currentIndex){
					}
					function bx_slide_auto ($slideElement,oldIndex,newIndex){
						var bx_slide_auto = $slideElement.attr('data-auto');
						if(bx_slide_auto == 'yes'){
							st_slideId.startAuto();
						}
						if(newIndex == (bx_slide_length-1)){
							st_slideId.stopAuto();
							_this.start(); //인터벌 시작
						}
						if(bx_slide_auto == 'no'){
							st_slideId.stopAuto();
							_this.stop(); //인터벌 정지
						}
					}
				}
				// e: 서브 bx슬라이드 적용
				//***** s: 추가되는 이벤트*****//
				return_st_change(_current+1) //현재 탭 카운트
				//***** e: 추가되는 이벤트*****//
			},
			active : function (){
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
			  	obj = defaults.st_slideImg.tab;
			  	for(var key in obj){
			  		$(''+obj[key]).removeClass('active');
			  	}
			  	$(''+defaults.st_slideImg.tab[_current]).addClass('active');
			},
			getTime : function(){ //현재시간 구하기
				var d = new Date();
				var t = d.getTime();
				return t
				/////////////////
			},
			goTo : function(num){ //바로가기
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				var _target = _that.st_slideTarget.select; //테이터 들어갈 곳
				if($(''+_target).find('.bx_html').is(':animated')) return;

				clearTimeout(st_slideTime); //인터벌 삭제
				st_slideCurrent = num;
				_this.change();
				/////////////////
			},
			next : function(){ //다음
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				var _target = _that.st_slideTarget.select; //테이터 들어갈 곳
				if($(''+_target).find('.bx_html').is(':animated')) return;

				clearTimeout(st_slideTime); //인터벌 삭제
				st_slideCurrent ++
				if(st_slideCurrent == st_slideCount){
					st_slideCurrent = 0;
				}
				_this.change();
				/////////////////
			},
			prev : function(){ //이전
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				var _target = _that.st_slideTarget.select; //테이터 들어갈 곳
				if($(''+_target).find('.bx_html').is(':animated')) return;

				clearTimeout(st_slideTime); //인터벌 삭제
				st_slideCurrent --
				if(st_slideCurrent < 0){
					st_slideCurrent = st_slideCount-1;
				}
				_this.change();
				/////////////////
			},
			start : function(){ //인터벌 시작
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				_this.run(); //전체 자동슬라이드 여부
				/////////////////
			},
			stop : function(){ //인터벌 정지
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				clearTimeout(st_slideTime) //인터벌 삭제
				/////////////////
			},
			run : function(){ //인터벌 실행
				var _current = st_slideCurrent;
				var _count = st_slideCount;
				var _that = defaults; //설정값 _that 에 담기
				var _this = this; //retuen값 this에 담기
				/////////////////
				var _time = _that.st_slideImg.time[_current]; //타임 체크
				st_slideTime = window.setTimeout(function(){
					st_slideCurrent ++
					if(st_slideCurrent == st_slideCount){
						st_slideCurrent = 0;
					}
					_this.change();
				},_time);
				/////////////////
			}
		}
    }
});


function return_st_change(num){ //탭스텝 추가변경

}