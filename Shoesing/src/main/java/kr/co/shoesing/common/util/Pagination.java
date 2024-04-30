package kr.co.shoesing.common.util;

public class Pagination {
	private int currentPage; 	// 현재 페이지
	private int listCount; 		// 전체 상품 수
	
	private int limit; 			// 한 페이지 목록에 보여질 상품 수
	private int pageSize; 		// 보여질 페이지 번호 개수
	
	private int maxPage;		// 마지막 페이지 번호
	private int startPage;		// 보여지는 맨 앞 페이지 번호
	private int endPage;		// 보여지는 맨 뒤 페이지 번호
	
	private int prevPage;		// 이전 페이지 모음의 마지막 번호
	private int nextPage;		// 다음 페이지 모음의 시작 번호
	
	
	/** 입력받은 값으로 필드 초기화 및 필드 계산 후 초기화
	 * @param currentPage
	 * @param listCount
	 * @param limit
	 * @param pageSize
	 */
	public Pagination(int currentPage, int listCount, int limit, int pageSize) {
		super();
		this.currentPage = currentPage;
		this.listCount = listCount;
		this.limit = limit;
		this.pageSize = pageSize;
		
		calculate();
	}
	
	// getter/setter
	
	public int getCurrentPage() {
		return currentPage;
	}



	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}



	public int getListCount() {
		return listCount;
	}



	public void setListCount(int listCount) {
		this.listCount = listCount;
	}



	public int getLimit() {
		return limit;
	}



	public void setLimit(int limit) {
		this.limit = limit;
	}



	public int getPageSize() {
		return pageSize;
	}



	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}



	public int getMaxPage() {
		return maxPage;
	}



	public void setMaxPage(int maxPage) {
		this.maxPage = maxPage;
	}



	public int getStartPage() {
		return startPage;
	}



	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}



	public int getEndPage() {
		return endPage;
	}



	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}



	public int getPrevPage() {
		return prevPage;
	}



	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}



	public int getNextPage() {
		return nextPage;
	}



	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}



	/** 페이징 처리 값 계산 후
	 * 	필드에 대입하는 메서드
	 */
	private void calculate() {
		
		// 마지막 페이지 번호 계산
		maxPage = (int)Math.ceil((double) listCount / limit);
		
		// 보여지는 맨 앞 페이지 번호 계산
		startPage = ( ( currentPage - 1 ) / pageSize ) + 1;
		
		// 보여지는 맨 뒤 페이지 번호 계산
		endPage = startPage + pageSize - 1;
		if(endPage > maxPage) endPage = maxPage;
		
		// 이전 페이지 모음의 마지막 번호 계산
		if(currentPage <= pageSize) prevPage = 1; // 1~10번 페이지 즉, 첫번째 페이지 모음일 때
		else prevPage = startPage - 1;
		
		// 다음 페이지 모음의 마지막 번호 계산
		if(endPage == maxPage) nextPage = endPage;
		else nextPage = endPage + 1;
	}

}
