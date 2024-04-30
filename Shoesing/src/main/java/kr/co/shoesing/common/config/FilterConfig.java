package kr.co.shoesing.common.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import kr.co.shoesing.common.filter.LoggedInFilter;

@Configuration
public class FilterConfig {

	/**
	 * 로그인한 회원 존재시 접근 불가 필터
	 * 
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<LoggedInFilter> loggedInFilter() {

		// Filter
		FilterRegistrationBean<LoggedInFilter> filter = new FilterRegistrationBean<>();

		filter.setFilter(new LoggedInFilter());

		String[] filteringURL = { "/user/signup", "/user/login" };

		// Array.asList(filteringURL) == filteringURL을 List로
		filter.setUrlPatterns(Arrays.asList(filteringURL));

		// 필터 이름 설정
		filter.setName("loginFilter");

		// 필터 순서 지정
		filter.setOrder(1);

		return filter;
	}
}