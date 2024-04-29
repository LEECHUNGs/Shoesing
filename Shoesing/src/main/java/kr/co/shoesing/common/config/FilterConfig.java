package kr.co.shoesing.common.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import kr.co.shoesing.common.filter.LoginFilter;

@Configuration
public class FilterConfig {
	@Bean
	public FilterRegistrationBean<LoginFilter> loginFilter() {

		// Filter
		FilterRegistrationBean<LoginFilter> filter = new FilterRegistrationBean<>();

		filter.setFilter(new LoginFilter());

		// 까먹지 말고 수정하세요!

		String[] filteringURL = { "/user/myPage/*", "/user/login" };

		// Array.asList(filteringURL) == filteringURL을 List로
		filter.setUrlPatterns(Arrays.asList(filteringURL));

		// 필터 이름 설정
		filter.setName("loginFilter");

		// 필터 순서 지정
		filter.setOrder(1);

		return filter;
	}
}
