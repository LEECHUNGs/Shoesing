package kr.co.shoesing.email.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.shoesing.email.model.service.EmailService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("email")
@RequiredArgsConstructor
public class EmailController {

	private final EmailService service;

}
