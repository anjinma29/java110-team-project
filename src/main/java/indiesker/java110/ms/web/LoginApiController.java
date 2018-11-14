package indiesker.java110.ms.web;

import java.util.ArrayList;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import indiesker.java110.ms.domain.Member;
import indiesker.java110.ms.service.MemberService;

@Controller
@RequestMapping("/loginapi")
public class LoginApiController {

  MemberService memberService;
  public LoginApiController(MemberService memberService) {
    this.memberService=memberService;
  }

  @GetMapping("form")
  public void form() {}

  @PostMapping("login")
  public String login(
      String id,
      String password,
      String save,
      HttpServletResponse response,
      HttpSession session) { 

    ArrayList<Cookie> cookies = new ArrayList<>();

    if (save != null) {// 이메일 저장하기를 체크했다면,
      Cookie cookie = new Cookie("id", id);
      cookie.setMaxAge(60 * 60 * 24 * 15);
      response.addCookie(cookie);
    } else {// 이메일을 저장하고 싶지 않다면,
      Cookie cookie = new Cookie("id", "");
      cookie.setMaxAge(0);
      cookies.add(cookie);
    }
    Member loginUser = memberService.getMember(id, password);

    if(loginUser != null) {
      session.setAttribute("loginUser", loginUser);
      // 추후에 수정해야함 일단은 기본 html로 돌리기
      return "redirect:../../";
    } else {
      session.invalidate();
      System.out.println("비밀번호틀림쓰");
      return "redirect:form";
    }
  }

  @ResponseBody
  @PostMapping(value="form", produces="application/json;charset=UTF-8")
  public void apiProfile(@RequestBody Map params, HttpSession session) {
    Member loginUser = memberService.getApiMember(params);

    if(loginUser != null) {
      session.setAttribute("loginUser", loginUser);
      System.out.println("Gd");
    } else {
      session.invalidate();
      System.out.println("비밀번호틀림쓰");
    }
  }

  @ResponseBody
  @PostMapping(value="callback", produces="application/json;charset=UTF-8")
  public void apiProfile2(@RequestBody Map params, HttpSession session) {
    Member loginUser = memberService.getApiMember(params);

    if(loginUser != null) {
      session.setAttribute("loginUser", loginUser);
    } else {
      session.invalidate();
      System.out.println("비밀번호틀림쓰");
    }
  }

  @GetMapping("callback")
  public void callback() {}

}
