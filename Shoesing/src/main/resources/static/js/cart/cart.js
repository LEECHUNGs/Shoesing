// 장바구니 불러오기 함수
const selectCart = (cp) => {


    fetch("/cart/manage?cp=" + cp) // GET 방식 요청
    .then(resp => resp.json())
    .then(obj => {

        const cartList = obj.cartList; // 장바구니
        const pagination = obj.pagination; // 페이지네이션

        const cartUl = document.getElementById("cartUl"); // 장바구니 ul
        const pageUl = document.getElementById("pageUl"); // 페이지네이션 ul

        const checkAll = document.getElementById("checkAll"); // 전체 선택 버튼

        // 장바구니 비우기
        const lis = cartUl.querySelectorAll("li");
        if(lis.length > 0) lis.forEach(e => {e.remove()});

        // 페이지 번호 비우기
        pageUl.innerHTML = "";

        // 장바구니 목록 생성
        for (const i in cartList) {
            
            /* 
            <li>
                <input type="checkbox" name="itemStockNoList" value="">
                <img src="/img/cat1.jpg" width="150px" height="150px">

                <div>
                    <p>상품 이름</p>
                    <p>상품 가격</p>
                    <p>상품 브랜드</p>
                </div>
            </li>
            */

            const li = document.createElement("li"); // 장바구니 Li
            const checkboxDiv = document.createElement("div");
            const checkbox = document.createElement("input"); // 장바구니 체크박스
            const itemCount = document.createElement("input"); // 상품 수량용 hidden input

            const cartThumbnail = document.createElement("div");
            const img = document.createElement("img"); // 장바구니 상품 사진
            const infoA = document.createElement("a"); // 장바구니 설명 div

            li.classList.add("cartBox");

            // 장바구니 설명
            const infoDiv = document.createElement("div"); // 설명용 박스
            const name = document.createElement("span"); // 이름
            const price = document.createElement("span"); // 가격
            const brand = document.createElement("span"); // 브랜드
            const size = document.createElement("span"); // 사이즈

            // 수량 추가 감소 수량 뷰
            const amountDiv = document.createElement("div");
            const plusBtn = document.createElement("button");
            const minusBtn = document.createElement("button");
            const amountSpan = document.createElement("span");

            const deleteDiv = document.createElement("div");
            const deleteBtn = document.createElement("button"); // 삭제 버튼

            // 체크박스 설정
            checkbox.type = "checkbox";
            checkbox.name = "itemStockNoList";
            checkbox.value = cartList[i].itemStockNo; // 상품 재고 번호로 초기화
            checkbox.classList.add("checkbox");
            checkboxDiv.append(checkbox);
            checkboxDiv.classList.add("checkboxDiv");

            // 상품 수량용 hidden input
            itemCount.type = "hidden";
            itemCount.name = "itemCountList";
            itemCount.value = cartList[i].cartItemCount; // 상품 재고 수로 초기화

            // 상품 이미지 세팅 (추가 예정)
            img.src = cartList[i].thumbnail;
            cartThumbnail.append(img);
            cartThumbnail.classList.add("cartThumbnail");

            // 상품 정보 세팅
            brand.innerText = cartList[i].itemBrand;
            brand.classList.add("brand");

            price.innerText = `${cartList[i].itemPrice} 원`;
            price.classList.add("price");

            name.innerText = cartList[i].itemName;
            name.classList.add("name");

            size.innerText = `사이즈 ${cartList[i].sizeVal} mm`;
            size.classList.add("size");

            infoDiv.append(price, name, brand, size);
            infoDiv.classList.add("infoDiv");

            // 상품 수량 뷰 및 수량 추가 감소 버튼
            plusBtn.innerHTML = "+";
            plusBtn.type = "button";

            minusBtn.innerHTML = "-";
            minusBtn.type = "button";
            
            amountSpan.innerText = cartList[i].cartItemCount;
            amountDiv.append(minusBtn, amountSpan, plusBtn);
            amountDiv.classList.add("amountDiv");

            // infoA에 요소 추가
            infoA.append(cartThumbnail);
            infoA.href = `/item/detail?itemNo=${cartList[i].itemNo}`;
            infoA.classList.add("infoA");

            deleteBtn.type = "button";
            deleteBtn.innerHTML = "&times;";
            deleteBtn.classList.add("deleteBtn");
            deleteDiv.append(deleteBtn);
            deleteDiv.classList.add("deleteDiv");

            // li에 요소 추가
            li.append(checkboxDiv, itemCount, infoA, infoDiv, amountDiv, deleteDiv);
            
            // cartUl에 모든 내용 추가
            cartUl.append(li);

            // 단일 상품 삭제 버튼을 눌렀을 때
            deleteBtn.addEventListener("click", e => {

                const obj = {
                    "itemStockNo" : cartList[i].itemStockNo
                };

                const list = [obj];
                deleteCart(list);
            });

            // 상품 수량 변경 버튼을 눌렀을 때
            plusBtn.addEventListener("click", e => {update(cartList[i], 1);});
            minusBtn.addEventListener("click", e => {update(cartList[i], -1);});
        }

        // 전체 상품 선택 버튼 클릭시 전체 선택
        checkAll.addEventListener("click", e => {
                
            const itemStockNoList = cartUl.querySelectorAll('[name=itemStockNoList]');
            for(let i = 0; i<itemStockNoList.length; i++) {
                if(e.target.checked) itemStockNoList[i].checked = true;
                else itemStockNoList[i].checked = false;
            }

        });

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
            
            pageUl.append(pageLi);
            
            pageA.addEventListener("click", () => {
                pageUl.innerText = "";

                selectCart(i);
            });
        }
    });
}

// 장바구니 삭제용 함수
const deleteCart = (list) => {

    if( !confirm("삭제 하시겠습니까?") ) {
        return;
    }

    const obj = {
        "cartList" : list
    };

    fetch("/cart/manage", {
        method : "DELETE",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(obj)
    })
    .then(resp => resp.text())
    .then(result => {
        if(result > 0) {
            selectCart(1);
            alert("상품이 삭제되었습니다.");
        } else {
            alert("상품을 삭제할수 없습니다.");
            return;
        }
    });


}


// 처음 페이지를 열었을 때 화면 목록 초기화
selectCart(1);

// 선택 상품 삭제 버튼을 눌렀을 때
document.getElementById("checkDelBtn").addEventListener("click", e => {

    const checkList = document.querySelectorAll("[name=itemStockNoList]:checked");

    // 선택 항목이 없을 때
    if(checkList.length == 0) {
        alert("항목을 선택해 주세요");
        return;
    } 

    let list = [];
    checkList.forEach(e => {

        const obj = {
            "itemStockNo" : e.value
        };
        list.push(obj);
    });

    deleteCart(list);
});

// 상품 수량 수정 버튼을 눌렀을 때
const update = (item, val) => {

    if(item.cartItemCount + val <= 0) {
        alert("수량이 0개일 수 없습니다.");
        return;
    }

    const obj = {
        "itemStockNo" : item.itemStockNo,
        "cartItemCount" : val
    };

    fetch("/cart/manage", {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(obj)
    })
    .then(resp => resp.text())
    .then(result => {

        if(result > 0) {
            selectCart(1);
        } else {
            alert("수량 수정을 실패했습니다.");
            return;
        }
    });
}

// 선택 상품 구매 버튼을 눌렀을 때
document.getElementById("orderForm").addEventListener("submit", e => {

    const checkAll = document.querySelectorAll("[name=itemStockNoList]:checked");

    // 선택 항목이 없을 때
    if(checkAll.length == 0) {
        alert("항목을 선택해 주세요");
        e.preventDefault();
        return;
    } 

    checkAll.forEach(e => {
        
        // 선택 버튼이 안눌렸으면 서버에 값을 보내지 않음
        if(!e.checked) {

            e.disabled = true;
            e.nextSibling.disabled = true;
        }
    });

});