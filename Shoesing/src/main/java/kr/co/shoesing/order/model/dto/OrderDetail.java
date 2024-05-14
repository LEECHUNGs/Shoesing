package kr.co.shoesing.order.model.dto;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderDetail {
	
	private int orderDetailNo;		// 주문 상세 번호
	private int orderNo;			// 주문 번호
	
	private int itemStockNo;		// 상품 재고번호
	
	private int itemNo;				// 상품 번호
	private String itemName;		// 상품 이름
	
	private int sizeNo;				// 상품 사이즈 번호
	private int sizeVal;			// 상품 사이즈
	
	private int itemPrice;			// 상품 가격
	
	private int orderItemCount;		// 주문 수량
	
	private String thumbnail;
}
