package kr.co.shoesing.common.filter;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import kr.co.shoesing.user.model.dto.User;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoggedInFilter implements Filter {

	/**
	 * 로그인한 회원 존재시 접근 불가 필터
	 * 
	 * @return
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		// HTTP 통신이 가능하도록 다운캐스팅
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;

		// Session 얻어오기
		HttpSession session = req.getSession();

		User loginUser = (User) session.getAttribute("loginUser");

		// 로그인한 회원 정보를 얻어옴
		if (session.getAttribute("loginUser") == null) { // 로그인 회원 존재하지 않으면

			// 다음 필터로 요청, 응답 객체 전달
			chain.doFilter(request, response);
			return;

		} else if (session.getAttribute("loginUser") != null && !loginUser.getUserId().equals("admin")) { // 로그인 회원
			// 존재하면

			// 로그인 에러
			resp.sendRedirect("/loggedInError");
			return;

		}

	}
}
