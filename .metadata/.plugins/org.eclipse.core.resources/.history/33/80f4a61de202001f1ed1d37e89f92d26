package kr.co.shoesing.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import kr.co.shoesing.user.model.dto.User;
import kr.co.shoesing.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("user")
@SessionAttributes({ "loginUser" })
public class UserController {

	private final UserService service;

	@PostMapping("login")
	public String login(User inputUser, Model model) {

		User loginUser = service.login();

		return "redirect:/";
	}
}
