package kr.co.shoesing.email.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.internet.MimeMessage;
import kr.co.shoesing.email.model.mapper.EmailMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

	// 타임리프 탬플릿 엔진(html -> java)
	private final SpringTemplateEngine templateEngine;

	private final EmailMapper mapper;

	private final JavaMailSender mailSender;

	/**
	 * 인증 코드 생성 (영어 대문자 + 소문자 + 숫자 6자리)
	 * 
	 * @return
	 */
	public String createAuthKey() {
		String key = "";
		for (int i = 0; i < 6; i++) {

			int sel1 = (int) (Math.random() * 3); // 0:숫자 / 1,2:영어

			if (sel1 == 0) {
				int num = (int) (Math.random() * 10); // 0~9
				key += num;

			} else {
				char ch = (char) (Math.random() * 26 + 65); // A~Z
				int sel2 = (int) (Math.random() * 2); // 0:소문자 / 1:대문자

				if (sel2 == 0) {
					ch = (char) (ch + ('a' - 'A')); // 대문자로 변경
				}
				key += ch;
			}
		}
		return key;
	}

	/**
	 * 전달용 타임리프 html 반환
	 * 
	 * @param authKey
	 * @param htmlName
	 * @return
	 */
	private String loadHtml(String authKey, String htmlName) {
		// 타임리프 값 세팅용 객체
		Context context = new Context();

		context.setVariable("authKey", authKey);

		// template/ 에 위치한 html 파일의 내용을 String 형태로 변환
		return templateEngine.process("fragments/components" + htmlName, context); // HTML to Java 객체
	}

	/**
	 * 이메일 인증번호 전송
	 */
	@Override
	public String sendEmail(String htmlName, String email) {
		String authKey = createAuthKey();

		try {
			String subject = null;

			switch (htmlName) {
			case "emailAuth":
				subject = "SHOESING 회원가입 인증번호입니다.";
				break;
			}

			// MimeMessage : Java에서 메일을 보내는 객체
			MimeMessage mimeMessage = mailSender.createMimeMessage();

			// MimeMessageHelper : Spring 제공 메일 발송 도우미
			// MimeMessageHelper(>>MimeMessage 객체, >>파일 전송 이용 여부, >>문자 인코딩 지정)
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

			helper.setTo(email); // 받는 사람 이메일 지정
			helper.setSubject(subject); // 이메일 제목 지정

			helper.setText(loadHtml(authKey, htmlName), true); // 변경 -> html 보낼 준비

			helper.addInline("logo", new ClassPathResource("static/img/logo/logo.svg"));

			mailSender.send(mimeMessage);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		Map<String, String> map = new HashMap<>();
		map.put("authKey", authKey);
		map.put("email", email);

		// 해당하는 이메일이 DB에 존재할 수 있기 때문에 주의
		// DB에 존재하는 경우 update 성공할것, 아니면 insert 시도(새로 생성)
		int result = mapper.updateAuthKey(map);

		if (result == 0) {
			mapper.insertAuthKey(map);
		}
		// 뭔가 다 안되는 경우
		if (result == 0)
			return null;

		return authKey;
	}

	/**
	 * 이메일 인증번호 인증
	 */
	@Override
	public int checkAuthKey(Map<String, Object> map) {

		return mapper.checkAuthKey(map);
	}

}
