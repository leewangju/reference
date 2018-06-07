var notification = {
    lists: function(page){
        try{
            if(!page) page = 1;
            var url = "//"+document.domain+"/mydangi/popup/notice/notice_list/"+page;
        
            $.ajax({
                url: url,           
                type: "GET",
                cache: false,
                success: function(response){
                    $("#notice_list").html(response);
                },
                error: function(xmlHttpRequest, textStatus, errorThrown){
                    console.log(xmlHttpRequest + ", " + textStatus + " , " + errorThrown);
                    return;
                }
            });

        }catch(e){
            console.error(e.message);
        }
    },
    delete: function(type, ids, devqa){
        if(type == "ALL"){
            msg = "�뚮┝�� 紐⑤몢 ��젣�섏떆寃좎뒿�덇퉴?";    
        }else{
            msg = "�대떦 �뚮┝�� ��젣�섏떆寃좎뒿�덇퉴?";
        }

        if(confirm(msg)){
            try{
                if(devqa){
                    var url = "//qa-my.conects.com/mydangi/popup/notice/delete_notice"
                }else{
                    var url = "//my.conects.com/mydangi/popup/notice/delete_notice"
                }
                
                $.ajax({
                    url: url,           
                    type: "GET",
                    data: {
                        "type" : type,
                        "ids"  : ids,
                    },
                    dataType:"jsonp",
                    contentType: "application/json",
                    jsonpCallback:"del_callback",
                    async:false,
                    success: function(response){
                        if(response['msg'] == "SUCCESS"){
                            alert("珥� "+response['total']+"媛쒖쓽 �뚮┝�� ��젣�섏뿀�듬땲��.");
                            $(".ico-new-notification").removeClass("on");
                            if(response['cnt'] > 0){
                                $(".ico-new-notification").addClass("on");
                            }
                        }else if(response['msg'] == "NODATA"){
                            alert("��젣�� �곗씠�곌� �놁뒿�덈떎.");
                        }else{
                            alert("��젣 �ㅽ뙣�섏뿀�듬땲��.");
                        }
                    },
                    error: function(xmlHttpRequest, textStatus, errorThrown){
                        console.log(xmlHttpRequest + ", " + textStatus + " , " + errorThrown);
                        return;
                    }
                });

            }catch(e){
                console.error(e.message);
            }   
        }
    },
    delete_list: function(type, ids){
        if(type == "ALL"){
            msg = "�뚮┝�� 紐⑤몢 ��젣�섏떆寃좎뒿�덇퉴?";    
        }else{
            msg = "�대떦 �뚮┝�� ��젣�섏떆寃좎뒿�덇퉴?";
        }

        if(confirm(msg)){
            try{
                var url = "//"+document.domain+"/mydangi/popup/notice/delete_notice_list"
                var cur_cnt = $(".countNum").text();
                
                $.ajax({
                    url: url,           
                    type: "POST",
                    data: {
                        "type" : type,
                        "ids"  : ids,
                    },
                    cache: false,
                    success: function(response){
                        if(response['msg'] == "SUCCESS"){
                            alert("珥� "+response['total']+"媛쒖쓽 �뚮┝�� ��젣�섏뿀�듬땲��.");
                            $(".countNum").text(cur_cnt - response['total']);
                            if((cur_cnt - response['total']) == 0){
                                $(".delete-allList").css("display", "none");
                            }
                            notification.lists();
                        }else if(response['msg'] == "NODATA"){
                            alert("��젣�� �곗씠�곌� �놁뒿�덈떎.");
                        }else{
                            alert("��젣 �ㅽ뙣�섏뿀�듬땲��.");
                        }
                    },
                    error: function(xmlHttpRequest, textStatus, errorThrown){
                        console.log(xmlHttpRequest + ", " + textStatus + " , " + errorThrown);
                        return;
                    }
                });

            }catch(e){
                console.error(e.message);
            }   
        }
    },
    click: function (e, devqa) {
        if(e.target.className === 'notification-1depth') {
            try{
                if(devqa){
                    var url = "//qa-my.conects.com/mydangi/popup/notice/notice_header_list"
                }else{
                    var url = "//my.conects.com/mydangi/popup/notice/notice_header_list"                        
                }

                $.ajax({
                    url: url,           
                    type: "GET",
                    dataType:"jsonp",
                    contentType: "application/json",
                    jsonpCallback:"list_callback",
                    async:false,
                    success: function(response){
                        jQuery(e.target).parent().hasClass('active') ? jQuery(e.target).parent().removeClass('active') : jQuery(e.target).parent().addClass('active');
                        if(response){
                            $(".notification-list").html(response.header_script);
                            $(".ico-new-notification").removeClass("on");
                            if($("#no_check_cnt").val() > 0){
                                $(".ico-new-notification").addClass("on");
                            }
                        }
                    },
                    error: function(xmlHttpRequest, textStatus, errorThrown){
                        console.log(xmlHttpRequest + ", " + textStatus + " , " + errorThrown);
                        return;
                    }
                });

            }catch(e){
                console.error(e.message);
            }
        }
    },
    update: function(id, devqa){
        try{
                if(devqa){
                    var url = "//qa-my.conects.com/mydangi/popup/notice/update_notice"
                }else{
                    var url = "//my.conects.com/mydangi/popup/notice/update_notice"
                }
                
                $.ajax({
                    url: url,           
                    type: "GET",
                    data: {
                        "id"  : id,
                    },
                    dataType:"jsonp",
                    contentType: "application/json",
                    jsonpCallback:"callback",
                    async:false,
                    success: function(response){
                        if(response['msg'] == "SUCCESS"){
                            window.open('about:blank').location = $("#comment_"+id).attr("href");
                            $(".ico-new-notification").removeClass("on");
                            if(response['cnt'] > 0){
                                $(".ico-new-notification").addClass("on");
                            }
                        }
                    },
                    error: function(xmlHttpRequest, textStatus, errorThrown){
                        console.log(xmlHttpRequest + ", " + textStatus + " , " + errorThrown);
                        return;
                    }
                });

        }catch(e){
            console.error(e.message);
        }
    },
};