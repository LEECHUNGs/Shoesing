package kr.co.shoesing.common.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import groovy.util.logging.Slf4j;
import kr.co.shoesing.common.filter.LoggedInFilter;
import kr.co.shoesing.common.filter.LoggedOutFilter;

@Configuration
public class FilterConfig {

	/**
	 * 로그인한 회원 존재시 접근 불가 필터
	 * 
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<LoggedInFilter> loggedInFilter() {

		System.out.println("loggedInFilter 가동");
		// Filter
		FilterRegistrationBean<LoggedInFilter> filter = new FilterRegistrationBean<>();

		filter.setFilter(new LoggedInFilter());

		String[] filteringURL = { "/user/signup", "/user/login", "/user/restoration" };

		// Array.asList(filteringURL) == filteringURL을 List로
		filter.setUrlPatterns(Arrays.asList(filteringURL));

		// 필터 이름 설정
		filter.setName("loginFilter");

		// 필터 순서 지정
		filter.setOrder(1);

		return filter;
	}

	/**
	 * 로그인한 회원 존재하지 않으면 접근 불가 필터
	 * 
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<LoggedOutFilter> loggedOutFilter() {

		System.out.println("loggedOutFilter 가동");
		// Filter
		FilterRegistrationBean<LoggedOutFilter> filter = new FilterRegistrationBean<>();

		filter.setFilter(new LoggedOutFilter());

		String[] filteringURL = { "/user/myPage", "/user/delete" };

		// Array.asList(filteringURL) == filteringURL을 List로
		filter.setUrlPatterns(Arrays.asList(filteringURL));

		// 필터 이름 설정
		filter.setName("logOutFilter");

		// 필터 순서 지정
		filter.setOrder(1);

		return filter;
	}

}
