package kr.co.shoesing.order.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Order {
	
	private int orderNo;			// 주문 번호
	private String orderDate;		// 주문 날짜
	private String orderAddress;	// 배송지
	private char orderConfirm;		// 주문 확정
	private int userNo;				// 주문한 회원 번호
	
	private int totalPrice;			// 총 주문 금액
	
	private List<OrderDetail> itemStockNoList;	// 주문한 상품 세부정보 리스트

	public int getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public String getOrderAddress() {
		return orderAddress;
	}

	public void setOrderAddress(String orderAddress) {
		this.orderAddress = orderAddress;
	}

	public char getOrderConfirm() {
		return orderConfirm;
	}

	public void setOrderConfirm(char orderConfirm) {
		this.orderConfirm = orderConfirm;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		
		this.userNo = userNo;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		
		this.totalPrice = totalPrice;
	}

	public List<OrderDetail> getItemStockNoList() {
		return itemStockNoList;
	}

	public void setItemStockNoList(List<OrderDetail> itemStockNoList) {
		
		this.itemStockNoList = itemStockNoList;
		
		// 재고 리스트에 값이 없으면 0원으로 초기화
		if(this.itemStockNoList == null) {
			
			this.totalPrice = 0;
		} else {
			
			this.totalPrice = 0;
			
			// 재고들의 가격을 모두 합하여 저장
			for(OrderDetail detail : this.itemStockNoList) {
				
				this.totalPrice += detail.getItemPrice() * detail.getOrderItemCount();
			}
		}
	}
	
	
}
