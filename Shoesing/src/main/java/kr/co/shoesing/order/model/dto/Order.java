package kr.co.shoesing.order.model.dto;

import java.util.List;

import kr.co.shoesing.user.model.dto.User;
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
	private String[] orderAddressList; // 배송지 전체 주소
	
	private char orderConfirm;		// 주문 확정
	private int userNo;				// 주문한 회원 번호
	private User orderUser;			// 주문한 회원 정보를 저장한 객체
	private int sizeNo;				// 사이즈 번호
	
	private int orderPrice;			// 총 주문 금액
	
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

	public int getOrderPrice() {
		return orderPrice;
	}

	public void setOrderPrice(int orderPrice) {
		
		this.orderPrice = orderPrice;
	}

	public List<OrderDetail> getItemStockNoList() {
		return itemStockNoList;
	}

	public void setItemStockNoList(List<OrderDetail> itemStockNoList) {
		
		this.itemStockNoList = itemStockNoList;
		
		// 재고 리스트에 값이 없으면 0원으로 초기화
		if(this.itemStockNoList == null) {
			
			this.orderPrice = 0;
		} else {
			
			this.orderPrice = 0;
			
			// 재고들의 가격을 모두 합하여 저장
			for(OrderDetail detail : this.itemStockNoList) {
				
				this.orderPrice += detail.getItemPrice() * detail.getOrderItemCount();
			}
		}
	}

	public User getOrderUser() {
		return orderUser;
	}

	public void setOrderUser(User orderUser) {
		this.orderUser = orderUser;
	}

	public int getSizeNo() {
		return sizeNo;
	}

	public void setSizeNo(int sizeNo) {
		this.sizeNo = sizeNo;
	}

	public String[] getOrderAddressList() {
		return orderAddressList;
	}

	public void setOrderAddressList(String[] orderAddressList) {
		this.orderAddressList = orderAddressList;
	}
	
	
}
