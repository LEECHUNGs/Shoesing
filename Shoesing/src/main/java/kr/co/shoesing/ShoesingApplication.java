package kr.co.shoesing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class }) // Spring Security 기본 클래스 적용 방지
public class ShoesingApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShoesingApplication.class, args);
	}
}
