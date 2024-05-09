package kr.co.shoesing.cart.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Cart {
	
	private int cartNo;					// 장바구니 번호	
	private int itemStockNo;			// 상품 재고 번호
	private int itemNo; 				// 상품번호
	private int userNo;					// 회원번호
	private int sizeNo;					// 상품 사이즈 번호
	private int sizeVal;				// 상품 사이즈
	private int cartItemCount; 			// 상품 수량
	
	private String itemName;		// 상품 이름
	private int itemPrice;			// 상품 가격
	private String itemBrand;		// 상품 브랜드
	private String itemImgPath;		// 상품 이미지 경로

	@Override
	public boolean equals(Object obj) {
		
		Cart cart = (Cart) obj;
		
		if(cart.itemStockNo == this.itemStockNo) {
			return true;
		}
		
		return false;
	}
	
}
