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
                <input type="checkbox" name="checkOne" value="">
                <img src="/img/cat1.jpg" width="150px" height="150px">

                <div>
                    <p>상품 이름</p>
                    <p>상품 가격</p>
                    <p>상품 브랜드</p>
                </div>
            </li>
            */

            const li = document.createElement("li"); // 장바구니 Li
            const checkbox = document.createElement("input"); // 장바구니 체크박스

            const itemNo = document.createElement("input");
            const sizeNo = document.createElement("input");

            const img = document.createElement("img"); // 장바구니 상품 사진
            const infoDiv = document.createElement("div"); // 장바구니 설명 div

            // 장바구니 설명
            const name = document.createElement("div"); // 이름
            const price = document.createElement("div"); // 가격
            const brand = document.createElement("div"); // 브랜드
            const size = document.createElement("div"); // 사이즈

            // 수량 추가 감소 수량 뷰
            const amountDiv = document.createElement("div");
            const plusBtn = document.createElement("button");
            const minusBtn = document.createElement("button");
            const amountSpan = document.createElement("span");

            const deleteBtn = document.createElement("button"); // 삭제 버튼

            // 체크박스 설정
            checkbox.type = "checkbox";
            checkbox.name = "checkOne";
            checkbox.value = cartList[i].itemNo;

            // 상품 주문용 hidden input 상품 번호 / 상품 사이즈
            itemNo.type = "hidden";
            itemNo.name = "itemNo";
            itemNo.value = cartList[i].itemNo;

            sizeNo.type = "hidden";
            sizeNo.name = "sizeNo";
            sizeNo.value = cartList[i].sizeNo;

            // 상품 이미지 세팅 (추가 예정)
            img.src = "/img/cat1.jpg";

            // 상품 정보 세팅
            name.innerText = cartList[i].itemName;
            price.innerText = cartList[i].itemPrice;
            brand.innerText = cartList[i].itemBrand;
            size.innerText = cartList[i].sizeVal;

            // 상품 수량 뷰 및 수량 추가 감소 버튼
            plusBtn.innerHTML = "+";
            plusBtn.type = "button";

            minusBtn.innerHTML = "-";
            minusBtn.type = "button";
            
            amountSpan.innerText = cartList[i].cartItemCount;
            amountDiv.append(minusBtn, amountSpan, plusBtn);

            // infoDiv에 요소 추가
            infoDiv.append(name, price, brand, size, amountDiv);

            deleteBtn.type = "button";
            deleteBtn.innerHTML = "&times;";

            // li에 요소 추가
            li.append(checkbox, img, infoDiv, deleteBtn);
            
            // cartUl에 모든 내용 추가
            cartUl.append(li);

            // 단일 상품 삭제 버튼을 눌렀을 때
            deleteBtn.addEventListener("click", e => {

                const obj = {
                    "itemNo" : cartList[i].itemNo,
                    "sizeNo" : cartList[i].sizeNo

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
                
            const checkOne = cartUl.querySelectorAll('[name=checkOne]');
            for(let i = 0; i<checkOne.length; i++) {
                if(e.target.checked) checkOne[i].checked = true;
                else checkOne[i].checked = false;
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

    const checkList = document.querySelectorAll("[name=checkOne]:checked");

    // 선택 항목이 없을 때
    if(checkList.length == 0) {
        alert("항목을 선택해 주세요");
        return;
    } 

    let list = [];
    checkList.forEach(e => {
        const val = (e.value).split("/");

        const obj = {
            "itemNo" : val[0],
            "sizeNo" : val[1]
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
        "itemNo" : item.itemNo,
        "sizeNo" : item.sizeNo,
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
document.getElementById("orderBtn").addEventListener("click", e => {

    const liList = document.querySelectorAll("#cartUl");
    
    
    checkList.forEach(e => {

        if(e.checked) {

        } else {

        }
    });

    // 선택 항목이 없을 때
    if(checkList.length == 0) {
        alert("항목을 선택해 주세요");
        e.preventDefault();
        return;
    } 

    // 선택 항목이 있으면
    checkList.forEach(e => {

        // disabled 처리해서 input 창 비활성화
    });


});