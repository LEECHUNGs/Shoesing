// 상품 목록 불러오기 함수
const selectItems = (sortNo, cp) => {
    // sortNo : 상품 정렬용 번호
        // 0 : 기본정렬
        // 1 : 역 기본정렬

        // 2 : 가격정렬
        // 3 : 역 가격정렬

        // 4 : 이름정렬
        // 5 : 역 이름정렬


    fetch("itemList?sortNo=" + sortNo + "&cp=" + cp) // GET 방식 요청
    .then(resp => resp.json())
    .then(obj => {

        const itemList = obj.itemList;
        const pagination = obj.pagination;

        const pageUl = document.getElementById("pageUl");
        const itemListUl = document.getElementById("itemListUl");
        
        // 상품 목록 / 페이지 번호 비우기
        itemListUl.innerHTML = "";
        pageUl.innerText = "";

        // 상품 목록 생성
        for (const i in itemList) {
            const itemLi = document.createElement("li");
            const itemA = document.createElement("a");

            itemA.innerHTML = `상품 번호 : ${itemList[i].itemNo}<br>
                                상품 이름 : ${itemList[i].itemName}<br><br>
                                상품 가격 : ${itemList[i].itemPrice}원`;

            itemA.href = `detail?itemNo=${itemList[i].itemNo}`;

            itemLi.appendChild(itemA);

            itemLi.classList.add("itemBox");
                                
            itemListUl.appendChild(itemLi);
        }

        // 페이지 버튼 생성
        for (let i = pagination.startPage; i <= pagination.endPage; i++) {

            const pageLi = document.createElement("li");
            const pageA = document.createElement("a");

            // 페이지 번호, 다른 페이지로 이동
            pageA.innerText = i;
            pageA.href = "#";
            
            pageLi.classList.add("pageNo");
            pageLi.append(pageA);
            
            if(i == cp) {
                pageLi.classList.add("currentPage");
            }
            
            pageUl.appendChild(pageLi);
            
            pageA.addEventListener("click", () => {
                pageUl.innerText = "";

                selectItems(sortNo, i);
            });
        }
    });
}

// 처음 페이지를 열었을 때 화면 목록 초기화
selectItems(0, 1);