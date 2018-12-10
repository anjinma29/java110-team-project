
/* 사진 모달 처리 */
$(".col-md-4.photo button").on('click', function() {
    var sessionno=$('#sessionno').html();
    console.log("sessionNO:"+sessionno);
    
    var buskno=$('#buskno').html();  
    console.log("buskerNo:"+buskno);
    
    var pbno=$(this).val();
    console.log("photoBoardNO:"+pbno);
    $.ajax({
        type:"GET",
        url:"showphoto",
        data:{"pbno" : pbno},
        success: function(data){
            console.log(data);
            $(".feedphoto1").empty();
            $(".feedphoto2").empty();
            $(".pinfocontent").empty();
            $(".pinsertcontent").empty();
            $(".pcomtlist").empty();
            $("#delrevbtn").empty();
            
            if(sessionno == buskno){
            $("#delrevbtn").append(
                    '<button type="button" onclick="photorevise()" id="photorevise" class="btn btns-outline-warning" style="margin-top: -3%;">수정</button>'+
                    "<button id='photoreviseend' onclick='photoreviseend()' style='display:none;margin-top: -3%;' disabled class='btn btns-outline-warning'>수정완료</button>"+
                    '<button onclick="photoremove()" id="photodelete" class="btn btns-outline-warning" style="margin-top: -3%;">삭제</button>'+
                    '<h4 style="display:none;" id=photonumber>'+pbno+'</h4>'
                    );
            }
            $(".feedphoto1").append("<img src='../../upload/"+data.feedphotoFiles[0].filename+"' alt='첫번쨰사진' class='bigimg'>");
            $.each(data.feedphotoFiles,function(index,item){
                $(".feedphoto2").append(
                        "<td><h1 id='photofake"+index+"' value='"+item.filename+"' style='dislay:none;'></h1><button value='"+item.filename+"' ><img src='../../upload/"+item.filename+"' alt='....' class='smallimg'></button></td>"
                );
                
                console.log("index:"+index);
            });
            
            // 팀 정보!!
            if(data.teamPhoto ==null){
                var value = "<img id='teamphoto' src='img/phot1.png' style='width:100%;height: 100%;' alt='프로필사진'>";
            } else{
                var value = "<img src='../../upload/"+data.teamPhoto+"' style='width:100%;height: 100%;' alt='프로필사진' id='teamphoto'>";
            }
            $(".pinfocontent").append(
                    '<div class="top">'+
                    '<div class="infoimg">'+
                    value+
                    '</div>'+
                    '<div class="infodata">'+
                    '<table>'+
                        '<tr><td style="font-weight: 1000;"}>'+data.teamname+'</td></tr>'+
                        '<tr><td id="modalgenre">'+data.teamgenre+' / </td><td id="modalcity"> '+data.city+'</td></tr>'+
                    '</table>'+
                    '</div>'+
                  '</div>'+
                  '<div class="mid">'+
                  '<textarea id="revphotcont" readonly="readonly" disabled style="resize:none;width:100%;'+ 
                  ' font-size:20px;background-color:white;border: 0;border-radius:0.25rem;" rows="3">'+data.feedcont+'</textarea>'+
                  '</div>'+
                  '<div class="bot">'+
                    '<i class="far fa-heart modallike" style="margin-right: 30px;"></i>'+
                    data.lcnt+
                  '</div>'
            );
            
            //댓글
            $(".pinsertcontent").append(
                    '<form action="insertphotocomt">'+
                    '<textarea name="pcomtcont" id="pcomtcont" style="resize:none;width:100%;" rows="2" placeholder="댓글을 입력해주세요.">'+
                    '</textarea>'+
                    '<br>'+
                    '<button style="float:right;" class="btn btns-outline-m">입력</button>'+
                    '</form>'
            );
            if(data.comtcount == 5){
                $.each(data.comments,function(index,item){
                    if(item.comtphot ==null){
                        var value = "<img id='teamphoto' style='width:100%;height: 100%;' src='/img/phot1.png' alt='프로필사진'>";
                    } else{
                        var value = "<img id='teamphoto' style='width:100%;height: 100%;' alt='없넹' src='../../upload/"+item.comtphot+"'>";
                    }
                    $(".pcomtlist").append(
                            '<div class="comtwrap">'+
                            '<div class="comttop">'+
                                '<div class="comtimg">'+
                                value+
                                '</div>'+
                                '<div class="comtcont">'+
                                '<textarea id="pcomtcontlist" readonly="readonly" disabled style="resize:none;width:100%;" rows="2">'+item.cont+'</textarea>'+
                                '</div>'+
                            '</div>'+
                            '<div class="comtbottom">'+
                                '<div class="comtname">'+item.comtname+'</div>'+
                                '<div class="comtdate">'+item.strcdt+'</div>'+
                            '</div>'+
                        '</div>'
                    );
                })
            }

            $(".feedphoto2 button").on('click',function(){
                var src=$(this).val();
                console.log(src);
                $(".feedphoto1").empty();
                $(".feedphoto1").append("<img src='../../upload/"+src+"' alt='첫번쨰사진' class='bigimg'>");
            });
        }
    });
});
/*위는 사진 밑은 영상=================================================================================*/
/* 영상 모달처리 */
$('.col-md-4.avi button').on('click', function() {
    var sessionno=$('#sessionno').html();
    console.log("sessionNO:"+sessionno);
    var buskno=$('#buskno').html();  
    console.log("buskerNo:"+buskno);
    var abno=$(this).val();
    console.log("AVIBOARDNO:"+abno);
    $.ajax({
        type:"GET",
        url:"showavi",
        data:{"abno" : abno},
        success: function(data){
            console.log("abnotest:"+abno);
            $(".feedavi").empty();
            $(".modal-header.avi").empty();
            $(".ainfocontent").empty();
            $(".ainsertcontent").empty();
            $(".acomtlist").empty();
            
            if(data.length != 0){
               if(sessionno == buskno){
                    $(".modal-header.avi").append(
                            "<textarea id='avititlerev' readonly='readonly' disabled rows='1' style='resize:none;border-radius:0.25rem;" +
                            "background-color: transparent;border: 0;'>"+data.title+"</textarea>"+
                            "<h4 style='display:none;' id=avinumber>"+abno+"</h4>"+
                            "<button type='button' class='close' data-dismiss='modal'"+
                            "aria-label='Close' style='padding-right: 10px;'>"+
                            "<p>×</p>"+
                            "</button>"+
                            "<button id='avirevise' onclick='avirevise()' class='btn btns-outline-warning'>수정</button>"+
                            "<button id='avireviseend' onclick='avireviseend()' style='display:none;' class='btn btns-outline-warning'>수정완료</button>"+
                            "<button id='avidelete' onclick='aviremove()' class='btn btns-outline-warning'>삭제</button>"
                    );
                }else{
                    $(".modal-header.avi").append(
                            data.title+
                            "<button type='button' class='close' data-dismiss='modal'"+
                            "aria-label='Close' style='padding-right: 10px;'>"+
                            "<p>×</p>"+
                            "</button>"
                    );
                }
                $(".feedavi").append(
                        "<iframe src='https://www.youtube.com/embed/"+data.urlid+"?ecver=2'"+
                        "width='500px' height='280px' frameborder='0'"+ 
                        "allow='autoplay; encrypted-media' allowfullscreen id='aviframe'></iframe>"+
                        
                        '<table id="avithumbnail" style="width: 100%;display:none;">'+
                        '<tr>'+
                          '<td><img style="height:250px; width:auto; margin:0;"'+
                            'id="uploadavirev" src="https://i.ytimg.com/vi/'+data.urlid+'/hqdefault.jpg"'+
                            'alt="기본이미지">'+
                        '</tr>'+
                        '<tr>'+
                          '<td style="width: 86%;"><input style="border-radius: 0.25rem; width: 98%; margin-right: 10px;"'+
                            'type="text" name="revurl" id="revurl"'+
                            'placeholder="URL 입력" /></td>'+
                          '<td><button type="button" onclick="urlchkrev()" class="btn btns-outline-dark urlchkrev">확인</button></td>'+
                        '</tr>'+
                      '</table>'
                );
                
                // 팀 정보!!
                if(data.teamPhoto ==null){
                    var value = "<img id='teamphoto' src='img/phot1.png' style='width:100%;height: 100%;' alt='프로필사진'>";
                } else{
                    var value = "<img src='../../upload/"+data.teamPhoto+"' style='width:100%;height: 100%;' alt='프로필사진' id='teamphoto'>";
                }
                $(".ainfocontent").append(
                        '<div class="top">'+
                        '<div class="infoimg">'+
                        value+
                        '</div>'+
                        '<div class="infodata">'+
                        '<table>'+
                            '<tr><td style="font-weight: 1000;"}>'+data.teamname+'</td></tr>'+
                            '<tr><td id="modalgenre">'+data.teamgenre+' / </td><td id="modalcity"> '+data.city+'</td></tr>'+
                        '</table>'+
                        '</div>'+
                      '</div>'+
                      '<div class="mid">'+
                        '<textarea id="revavicontent" readonly="readonly" disabled style="resize:none;width:100%;'+ 
                      ' font-size:20px;background-color:white;border: 0;border-radius:0.25rem" rows="3">'+data.content+'</textarea>'+
                      '</div>'+
                      '<div class="bot">'+
                        '<i class="far fa-heart modallike" style="margin-right: 30px;"></i>'+
                        data.avilikecount+
                      '</div>'
                );
                $(".ainsertcontent").append(
                        '<form action="insertavicomt">'+
                        '<textarea name="acomtcont" id="acomtcont" style="resize:none;width:100%;" rows="2" placeholder="댓글을 입력해주세요.">'+
                        '</textarea>'+
                        '<br>'+
                        '<button style="float:right;" class="btn btns-outline-m">입력</button>'+
                        '</form>'
                );
                
                if(data.comtcount == 5){
                    $.each(data.comments,function(index,item){
                        if(item.comtphot ==null){
                            var value = "<img id='teamphoto' style='width:100%;height: 100%;' src='/img/phot1.png' alt='프로필사진'>";
                        } else{
                            var value = "<img id='teamphoto' style='width:100%;height: 100%;' alt='없넹' src='../../upload/"+item.comtphot+"'>";
                        }
                        $(".acomtlist").append(
                                '<div class="comtwrap">'+
                                '<div class="comttop">'+
                                    '<div class="comtimg">'+
                                    value+
                                    '</div>'+
                                    '<div class="comtcont">'+
                                    '<textarea id="acomtcontlist" readonly="readonly" disabled style="resize:none;width:100%;" rows="2">'+item.cont+'</textarea>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="comtbottom">'+
                                    '<div class="comtname">'+item.comtname+'</div>'+
                                    '<div class="comtdate">'+item.strcdt+'</div>'+
                                '</div>'+
                            '</div>'
                        );
                    })
                }
            }
        }
    })
});
//영상수정에서 url재입력 시
function urlchkrev(){
    var urlid=$("#revurl").val().substring(32,43);
    console.log(urlid);
    
    $("#uploadavirev").attr("src","https://i.ytimg.com/vi/"+urlid+"/hqdefault.jpg");
}
//영상게시글 수정완료버튼 눌렀을때
function avireviseend(){
    var avititlerev=$("#avititlerev").val();
    var revurl=$("#revurl").val().substring(32,43);
    var revavicontent=$("#revavicontent").val();
    var abno=$('#avinumber').html(); 
    var buskno=$('#buskno').html();  
    
    console.log(buskno);
    console.log(abno);
    console.log(avititlerev);
    console.log(revurl);
    console.log(revavicontent);
    
    location.href="updateavi?abno="+abno+"&bno="+buskno+"&title="+avititlerev+"&url="+revurl+"&cont="+revavicontent;
}
// 영상게시글 수정버튼 눌렀을때
function avirevise(){
    $("#avirevise").css("display","none");
    $("#avireviseend").css("display","");
    $("#revavicontent").removeAttr("disabled");
    $("#revavicontent").removeAttr("readonly");
    $("#revavicontent").css("border","1px solid #80808066");
    
    $("#aviframe").css("display","none");
    $("#avithumbnail").css("display","");
    $("#avititlerev").removeAttr("readonly");
    $("#avititlerev").removeAttr("disabled");
    $("#avititlerev").css("background-color","white");
    $("#avititlerev").css("color","black");
}
// 영상게시글삭제
function aviremove(){
    var buskno=$('#buskno').html();  
    console.log(buskno);
    var abno=$('#avinumber').html(); 
    console.log("abno: "+abno);
    
    location.href = 'deleteavi?abno='+abno+'&bno='+buskno;
        console("deletetest:"+abno);
}

//사진게시글삭제
function photoremove(){
    var buskno=$('#buskno').html();  
    console.log(buskno);
    var pbno=$('#photonumber').html(); 
    console.log("pbno: "+pbno);
    
    location.href = 'deletephoto?pbno='+pbno+'&bno='+buskno;
}
//사진게시글 수정버튼 눌렀을때
function photorevise(){
    $("#photorevise").css("display","none");
    $("#photoreviseend").css("display","");
    
    $(".feedphoto").empty();
    
    console.log($("#photofake1").length);

/*    if($("#photofake3").length > 0){//이전에 사진이 3장일때
        var phot1 = $("#photofake1").val();
        var phot2 = $("#photofake2").val();
        var phot3 = $("#photofake3").val();
        $(".feedphoto").append(
                '<table id="imgtable">'+
                '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                '<img id="revupload1" src="'+phot1+'" alt="기본이미지"></td>'+
                '<td style="padding:95px 0 0 10px;"><label for="rev_img1" style="font-size: 20px;">파일업로드</label>'+ 
                '<input style="height: 0; width: 150px; opacity: 0;" '+
                 '   type="file" name="revfile1" id="rev_img1" onchange="readrevURL1(this);" /></td>'+
                 '</tr>'+
                 '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                  '<img id="revupload2" src="'+phot2+'" alt="기본이미지"></td>'+
                  '<td style="padding:95px 0 0 10px;"><label for="rev_img2" style="font-size: 20px;">파일업로드</label> '+
                  '<input style="height: 0; width: 150px; opacity: 0;"'+
                  '  type="file" name="revfile2" id="rev_img2" onchange="readrevURL2(this);" /></td>'+
                  '</tr>'+
                  '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                  '<img id="revupload3" src="'+phot3+'" alt="기본이미지"></td>'+
                  '<td style="padding:95px 0 0 10px;"><label for="rev_img3" style="font-size: 20px;">파일업로드</label> '+
                  '<input style="height: 0; width: 150px; opacity: 0;" '+
                  '    type="file" name="revfile3" id="rev_img3" onchange="readrevURL3(this);" /></td>'+
                '</tr>'+
              '</table>'
        );
    }else if($("#photofake2").length > 0){//이전에 사진이 2장일때
        var phot1 = $("#photofake1").val();
        var phot2 = $("#photofake2").val();
        $(".feedphoto").append(
                '<table id="imgtable">'+
                '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                '<img id="revupload1" src="'+phot1+'" alt="기본이미지"></td>'+
                '<td style="padding:95px 0 0 10px;"><label for="rev_img1" style="font-size: 20px;">파일업로드</label>'+ 
                '<input style="height: 0; width: 150px; opacity: 0;" '+
                 '   type="file" name="revfile1" id="rev_img1" onchange="readrevURL1(this);" /></td>'+
                 '</tr>'+
                 '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                  '<img id="revupload2" src="'+phot2+'" alt="기본이미지"></td>'+
                  '<td style="padding:95px 0 0 10px;"><label for="rev_img2" style="font-size: 20px;">파일업로드</label> '+
                  '<input style="height: 0; width: 150px; opacity: 0;"'+
                  '  type="file" name="revfile2" id="rev_img2" onchange="readrevURL2(this);" /></td>'+
                  '</tr>'+
                  '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                  '<img id="revupload3" src="/img/default_image.png" alt="기본이미지"></td>'+
                  '<td style="padding:95px 0 0 10px;"><label for="rev_img3" style="font-size: 20px;">파일업로드</label> '+
                  '<input style="height: 0; width: 150px; opacity: 0;" '+
                  '    type="file" name="revfile3" id="rev_img3" onchange="readrevURL3(this);" /></td>'+
                '</tr>'+
              '</table>'
        );
    }else{
        var phot1 = $("#photofake1").val();
        $(".feedphoto").append(
                '<table id="imgtable">'+
                '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                '<img id="revupload1" src="'+phot1+'" alt="기본이미지"></td>'+
                '<td style="padding:95px 0 0 10px;"><label for="rev_img1" style="font-size: 20px;">파일업로드</label>'+ 
                '<input style="height: 0; width: 150px; opacity: 0;" '+
                 '   type="file" name="revfile1" id="rev_img1" onchange="readrevURL1(this);" /></td>'+
                 '</tr>'+
                 '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                  '<img id="revupload2" src="/img/default_image.png" alt="기본이미지"></td>'+
                  '<td style="padding:95px 0 0 10px;"><label for="rev_img2" style="font-size: 20px;">파일업로드</label> '+
                  '<input style="height: 0; width: 150px; opacity: 0;"'+
                  '  type="file" name="revfile2" id="rev_img2" onchange="readrevURL2(this);" /></td>'+
                  '</tr>'+
                  '<tr>'+
                  '<td style="padding:0 5px 0 5px;width: 45%;">'+
                  '<img id="revupload3" src="/img/default_image.png" alt="기본이미지"></td>'+
                  '<td style="padding:95px 0 0 10px;"><label for="rev_img3" style="font-size: 20px;">파일업로드</label> '+
                  '<input style="height: 0; width: 150px; opacity: 0;" '+
                  '    type="file" name="revfile3" id="rev_img3" onchange="readrevURL3(this);" /></td>'+
                '</tr>'+
              '</table>'
        );
    }*/


    $("#revphotcont").removeAttr("disabled");
    $("#revphotcont").removeAttr("readonly");
    $("#revphotcont").css("border","1px solid #80808066");
}
function readrevURL1(input) { 
    var chkImg = document.getElementById('rev_img1').value
    chkImg=chkImg.slice(chkImg.indexOf(".")+1).toLowerCase();
    var chkFile1 = 0;
    var chkFile2 = 0;
    var chkFile3 = 0;
    
    if(chkImg !="jpg" && chkImg !="jpeg" && 
            chkImg !="gif" && chkImg !="png" && chkImg !="bmp"){
        alert("이미지 파일만 올려주세요");
        $('#revupload1').attr('src', "/img/default_image.png");}
    
    else if (input.files && input.files[0]){ 
        var reader = new FileReader(); 
        reader.onload = function (e) { 
            $('#revupload1').attr('src', e.target.result); } 
        reader.readAsDataURL(input.files[0]); 
        chkFile1 = 1;

        if(chkFile1==1 || chkFile2==1 || chkFile3==1) {
            $("#photoreviseend").removeAttr("disabled","false");
        }
    }
};
//사진게시글 수정완료버튼 눌렀을때
function photoreviseend(){
    
    /*location.href="updateavi?abno="+abno+"&bno="+buskno+"&title="+avititlerev+"&url="+revurl+"&cont="+revavicontent;*/
}









