package kr.co.shoesing.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.shoesing.user.model.service.UserService;

@Controller
@RequestMapping("user")
public class MainController2 {

	@Autowired
	private UserService service;
	
	/**
	 * 홈페이지 전환
	 * 
	 * @return
	 */
	

	
	//ID 중복검사 테스트용
		@PostMapping("checkId")
		public int checkId(@RequestParam("userId") String userId) {
			
			return service.checkId(userId);
			
			
		}
		
		
	//닉네임 중복검사 테스트용
		@PostMapping("checkNickname")
		public int checkNickname(@RequestParam("userNickname") String userNickname) {
			
			return service.checkNickname(userNickname);
			
			
		}

}
