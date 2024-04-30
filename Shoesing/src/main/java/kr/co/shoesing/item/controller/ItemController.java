package kr.co.shoesing.item.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import kr.co.shoesing.item.model.dto.Item;
import kr.co.shoesing.item.model.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("item")
@RequiredArgsConstructor
public class ItemController {
	
	private final ItemService service;
	
	/** 상품 목록 페이지 뷰
	 * @return
	 */
	@GetMapping("info")
	public String getMethodName() {
		return "pages/item";
	}
	
	/** 상품 목록 불러오기
	 * @param sortNo
	 * @return
	 */
	@ResponseBody
	@GetMapping("itemList")
	public Map<String, Object> itemList(
					@RequestParam("sortNo") int sortNo,
					@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		return service.selectAll(sortNo, cp);
	}
}















