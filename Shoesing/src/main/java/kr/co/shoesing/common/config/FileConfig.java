package kr.co.shoesing.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.MultipartConfigElement;

@Configuration
@PropertySource("classpath:/config.properties")
public class FileConfig implements WebMvcConfigurer {
	// 파일 업로드 임계값
	@Value("${spring.servlet.multipart.file-size-threshold}")
	private long fileSizeThreshold;

	// 요청당 파일 최대 크기
	@Value("${spring.servlet.multipart.max-request-size}")
	private long maxRequestSize;

	// 개별 파일당 크기
	@Value("${spring.servlet.multipart.max-file-size}")
	private long maxFileSize;

	// 임계값 초과 시 임시 저장 폴더 경로
	@Value("${spring.servlet.multipart.location}")
	private String location;

	// ------------------------------------------------------------

	// 상품 이미지
	@Value("${item.resource-handler}")
	private String itemResourceHandler;

	@Value("${item.resource-location}")
	private String itemResourceLocation;

	@Value("${item.web-path}")
	private String itemWebPath;

	@Value("${item.folder-path}")
	private String itemFolderPath;

	// ------------------------------------------------------------

	// 요청 주소에 따라서 어떤 경로에 접근할 지 설정
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// 프로필 이미지 요청 <-> 서버 폴더 연결 추가
		// file:///C: 는 파일 시스템의 루트 디렉토리
		registry.addResourceHandler(itemResourceHandler).addResourceLocations(itemResourceLocation);

	}

	/**
	 * MultipartResolver 파일 설정
	 * 
	 * @return
	 */
	@Bean
	public MultipartConfigElement configElement() {

		// 파일 업로드 처리용 element 구성, 반환(업로드 최대 크기, 메모리 임시저장 경로 등..)
		MultipartConfigFactory factory = new MultipartConfigFactory();

		factory.setFileSizeThreshold(DataSize.ofBytes(fileSizeThreshold));

		factory.setMaxFileSize(DataSize.ofBytes(maxFileSize));

		factory.setMaxRequestSize(DataSize.ofBytes(maxRequestSize));

		factory.setLocation(location);

		return factory.createMultipartConfig();
	}

	/**
	 * MultipartResolver 파일
	 * 
	 * @return
	 */
	@Bean
	public MultipartResolver multipartResolver() {
		// 파일 여러개 선택 가능
		// 클라이언트로부터 받은 멀티파트 요청 처리, 업로드 파일 추출하여 MultipartFile 객체로 제공하는 역할
		StandardServletMultipartResolver multipartResolver = new StandardServletMultipartResolver();

		return multipartResolver;
	}

}
