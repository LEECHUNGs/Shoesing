package kr.co.shoesing.wishList.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.shoesing.wishList.model.service.WishListServiceImpl;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("wishList")
@RestController
public class WishLisController {
	
	private final WishListServiceImpl service;
	
	@PostMapping("manage")
	public int wishList() {
		return 0;
	}
	
}
