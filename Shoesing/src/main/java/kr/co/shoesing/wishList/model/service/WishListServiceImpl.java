package kr.co.shoesing.wishList.model.service;

import org.springframework.stereotype.Service;

import kr.co.shoesing.wishList.model.mapper.WishListMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService{
	
	private final WishListMapper mapper;
}
