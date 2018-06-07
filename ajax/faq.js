var fin_faq = {};

fin_faq.init = function(){
	fin_faq.lists(false);
};

fin_faq.request = function(url, method, sendData, successCallBack){
	$.ajax({
		'type' : method,
		'url'  : url,
		'data' : sendData,
		'success' : function(response){
			successCallBack(response);
		},
		'error' : function(xmlHttpRequest, textStatus, errorThrown){
			console.log(xmlHttpRequest + ", " + textStatus + " , " + errorThrown);
			return;
		}
	});
};

//肄쒕갚
fin_faq.setView = function(response){
	$("#gr_faq").html(response);
};

fin_faq.setEditor = function(response){
	$('#write_view').html(response);
	fin_faq.init_tinyEditor();
	$('#write_view').css('display','block');
};

fin_faq.gotoList = function(response){
	$('#write_view').css('display','none');
	alert(response);
	fin_faq.lists();
};

//紐⑸줉 議고쉶
fin_faq.lists = function(page){
	if(!page) page = 1;
	var	url = "//" + document.domain +"/customer/faq/faq_list/"+page;
	fin_faq.request(url,'GET',{}, fin_faq.setView);
};
//�좏깮 ��젣
fin_faq.check_delete = function () {
    var document_srls = "";
	$(".faq_document_srl:checked").each(function () {
        document_srls += $(this).val() + ",";
    });
    if(document_srls.length){
    	document_srls = document_srls.slice(0,-1);
    	var url = "//" + document.domain +"/customer/faq/check_delete";
    	fin_faq.request(url, 'POST', {'document_srls':document_srls}, fin_faq.gotoList);
    }
}

//湲��곌린 view �몄텧
fin_faq.writeView = function(){
	var	url = "//" + document.domain +"/customer/faq/faq_write";
	fin_faq.request(url, 'GET', {}, fin_faq.setEditor);
};

//湲��곌린
fin_faq.write = function(){
	if($.trim($('#faq_title').val())==""){
		alert('�쒕ぉ�� �낅젰�섏꽭��.');
		return;
	}
	if(tinyMCE.get('faq_editable').getContent()==""){
		alert('�댁슜�� �낅젰�섏꽭��.');
		return;
	}
	var title = $('#faq_title').val();
	var content = tinyMCE.get('faq_editable').getContent();
	var	url = "";

	if($('#faq_mode').val() == 'W'){
		url = "//" + document.domain +"/customer/faq/faq_write";
	}
	else if($('#faq_mode').val() == 'M'){
		var document_srl = $('#faq_document_srl').val();
		url = "//" + document.domain +"/customer/faq/faq_update?document_srl="+document_srl;
	}
	else return;
	fin_faq.request(url, 'POST',{'title' : title,'content': content}, fin_faq.gotoList);
};

fin_faq.updateView = function(){
	var document_srl = false;
	var chk = $(".faq_document_srl:checked");
	if (chk.length == 1){
		document_srl = chk.val();
	}
	else if (chk.length == 0) {
		alert('�섏젙 �� 寃뚯떆臾쇱쓣 �좏깮 �� 二쇱꽭��');
		return;
	}
	else{
		alert('�쒕쾲�� �� 寃뚯떆臾쇰쭔 �섏젙 媛��ν빀�덈떎.');
		return;
	}
	if(!document_srl) return;
	var	url = "//" + document.domain +"/customer/faq/faq_update";
	fin_faq.request(url,'GET', {'document_srl':document_srl}, fin_faq.setEditor);
};
/*
fin_faq.deleteDoc = function(){
	var document_srl = $('#nr_document_srl').val();
	var	url = "//"+document.domain + "/myroom_gn/bbs/noryangjin/faq/noryangjinfaqDelete";
	if(!confirm('�뺣쭚 ��젣 �섏떆寃좎뒿�덇퉴?')) return false;
	fin_faq.request(url, { 'document_srl' : document_srl}, fin_faq.gotoList);
};
*/
fin_faq.toggleSrl = function(check){
    if(check.is(':checked')){
        $('.faq_document_srl').prop("checked",true);
    }else{
        $('.faq_document_srl').prop("checked",false);
    }
};
fin_faq.init_tinyEditor = function(){
	tinyMCE.remove('#faq_editable'); //For AJAX
	tinyMCE.init({
	    selector: "textarea#faq_editable",
	    plugins: [
	        "advlist autolink lists link image charmap print preview anchor",
	        "searchreplace visualblocks code fullscreen",
	        "insertdatetime media table contextmenu paste"
	    ],
	    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
	    language: "ko_KR",
	    width : 838,
	    height: 300,
	    fields: {
	        content: {
	            validators: {
	                notEmpty: {
	                    message: '�댁슜�� �낅젰�섏꽭��.'
	                    }
	                }
	            }
	        }
    });
};
