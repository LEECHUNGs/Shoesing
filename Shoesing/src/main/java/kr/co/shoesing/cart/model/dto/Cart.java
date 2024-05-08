package kr.co.shoesing.cart.model.dto;

import groovy.transform.ToString;
import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {
	
	private int itemNo; 				// 상품번호
	private int userNo;					// 회원번호
	private int cartItemCount; 			// 상품 수량
	private int sizeNo;					// 상품 사이즈 번호
	private int sizeVal;				// 상품 사이즈
	
	private String itemName;		// 상품 이름
	private int itemPrice;			// 상품 가격
	private String itemBrand;		// 상품 브랜드
	private String itemImgPath;		// 상품 이미지 경로
	
	@Override
	public String toString() {
		return "Cart [itemNo=" + itemNo + ", userNo=" + userNo + ", cartItemCount=" + cartItemCount + ", sizeNo="
				+ sizeNo + ", itemName=" + itemName + ", itemPrice=" + itemPrice + ", itemBrand=" + itemBrand
				+ ", itemImgPath=" + itemImgPath + "]";
	}

	@Override
	public boolean equals(Object obj) {
		
		Cart cart = (Cart) obj;
		
		if(cart.itemNo == this.itemNo && cart.sizeNo == this.sizeNo) {
			return true;
		}
		
		return false;
	}
	
}
