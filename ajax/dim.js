
function open_email_pop(){
	$.ajax({
        url     : "/customer/main/open_email_pop"
       ,type    : 'POST'
       ,data    : {
       }
       ,success : function(data) { //응답결과를 뿌려준다.
			//딤 생성 스크립트 ex)pop_full_layer_open(el:팝업ID,ml:컨텐츠타켓ID,width:940px/500px,height:700px/auto,scroll:yes/no)
       		pop_full_layer_create('open_email_pop','open_email_pop_layer','600px','auto','no');
			$('#open_email_pop_layer').html(data);
			pop_full_layer_open('open_email_pop'); ////딤 이벤트 스크립트
       }
       ,error    : function(result) { //에러시 alert 창으로 에러 알림
           alert("호출에 실패했습니다. \n잠시 후 다시 시도해주세요.");
       }
   });
}

function sort(type){
	if(type=='all'){
		$('.notice').show();
		$('.event').show();
	}else if(type=='notice'){
		$('.notice').show();
		$('.event').hide();
	}else if(type=='event'){
		$('.notice').hide();
		$('.event').show();
	}
}

function open_dim(type){
	$.ajax({
        url     : "/customer/main/open_dim"
       ,type    : 'POST'
       ,data    : {
    	   'type':type
       }
       ,success : function(data) { //응답결과를 뿌려준다.

    	 	//딤 생성 스크립트(사이즈내스크롤형) ex)pop_full_layer_create,(el:팝업ID,ml:컨텐츠타켓ID,width:940px/500px,height:700px/auto,scroll:yes/no)
			//딤 생성 스크립트(전체스크롤형) ex)pop_full_layer_formation,(el:팝업ID,ml:컨텐츠타켓ID,width:940px/500px,height:700px/auto,scroll:yes/no)
			//pop_full_layer_create('full_layer_01','open_pop3','940px','700px','yes');

			pop_full_layer_formation('open_dim','open_dim_layer','940px','auto','yes');
			$('#open_dim_layer').html(data);
			pop_full_layer_open('open_dim'); ////딤 이벤트 스크립트
       }
       ,error    : function(result) { //에러시 alert 창으로 에러 알림
           alert("호출에 실패했습니다. \n잠시 후 다시 시도해주세요.");
       }
   });
}

