<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
callback 처리중입니다. 이 페이지에서는 callback을 처리하고 바로 main으로 redirect하기때문에 이 메시지가 보이면 안됩니다.

    <script>
        var naverLogin = new naver.LoginWithNaverId(
            {
                clientId: "i7CWhQxEhKTYcem_vHnQ",
                callbackUrl: "http://localhost:8080/app/loginapi/form",
                isPopup: false,
                callbackHandle: true
            }
        );

        /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
        naverLogin.init();

        /* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup close) */
        window.addEventListener('load', function () {
            naverLogin.getLoginStatus(function (status) {
                if (status) {
                    /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
                    var email = naverLogin.user.getEmail();
                    if( email == undefined || email == null) {
                        alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                        /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
                        naverLogin.reprompt();
                        return;
                    }

                    var json = {}
                    json.email = naverLogin.user.getEmail();
                    json.nickname = naverLogin.user.getNickName();
                    json.phot = naverLogin.user.getProfileImage();
                    json.id = naverLogin.user.getId();
                    jsonData(json);

                    /* window.location.replace(
                            "http://" + window.location.hostname +
                            ( (location.port==""||location.port==undefined)?"":":" + location.port) +
                            "/app/loginapi/login"); */
                } else {
                    console.log("callback 처리에 실패하였습니다.");
                }
            });
        });
        
         function jsonData(json){
            $.ajax("http://localhost:8080/app/loginapi/callback",{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                data: JSON.stringify(json)
                ,
                success: function(result){
                    location.href = "http://localhost:8080/app/editProfile/member/form";
                },
                error: function(xhr, status, msg){
                    console.log(status);
                    console.log(msg);
                    location.herf = "http://localhost:8080/app/loginapi/form";
                }
            });
        } 
        </script>
</body>
</html>