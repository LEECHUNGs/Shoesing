// 위시리스트 불러오기 함수
const selectWishList = (cp) => {


    fetch("/wishList/manage?cp=" + cp) // GET 방식 요청
    .then(resp => resp.json())
    .then(obj => {

        const wishList = obj.wishList; // 위시리스트
        const pagination = obj.pagination; // 페이지네이션

        const wishListUl = document.getElementById("wishListUl"); // 위시리스트 ul
        const pageUl = document.getElementById("pageUl"); // 페이지네이션 ul

        const checkAll = document.getElementById("checkAll"); // 전체 선택 버튼

        // 위시리스트 비우기
        const lis = wishListUl.querySelectorAll("li");
        if(lis.length > 0) lis.forEach(e => {e.remove()});

        // 페이지 번호 비우기
        pageUl.innerHTML = "";

        // 위시리스트 목록 생성
        for (const i in wishList) {
            
            /* 
            <li>
                <input type="checkbox" name="deleteOne" value="">
                <img src="/img/cat1.jpg" width="150px" height="150px">

                <div>
                    <p>상품 이름</p>
                    <p>상품 가격</p>
                    <p>상품 브랜드</p>
                </div>
            </li>
            */

            const li = document.createElement("li"); // 위시리스트 Li
            const checkbox = document.createElement("input"); // 위시리스트 체크박스
            const img = document.createElement("img"); // 위시리스트 상품 사진
            const infoDiv = document.createElement("div"); // 위시리스트 설명 div

            // 위시리스트 설명
            const name = document.createElement("div"); // 이름
            const price = document.createElement("div"); // 가격
            const brand = document.createElement("div"); // 브랜드

            const deleteBtn = document.createElement("button"); // 삭제 버튼

            // 체크박스 설정
            checkbox.type = "checkbox";
            checkbox.name = "deleteOne";
            checkbox.value = wishList[i].itemNo;

            // 상품 이미지 세팅 (추가 예정)
            img.src = "/img/cat1.jpg";

            // 상품 정보 세팅
            name.innerText = wishList[i].itemName;
            price.innerText = wishList[i].itemPrice;
            brand.innerText = wishList[i].itemBrand;

            // infoDiv에 요소 추가
            infoDiv.append(name, price, brand);

            deleteBtn.innerHTML = "&times;";

            // li에 요소 추가
            li.append(checkbox, img, infoDiv, deleteBtn);
            
            // wishListUl에 모든 내용 추가
            wishListUl.append(li);

            // 단일 상품 삭제 버튼을 눌렀을 때
            deleteBtn.addEventListener("click", e => {

                let list = [wishList[i].itemNo];
                deleteList(list);
            });
        }

        // 전체 상품 선택 버튼 클릭시 전체 선택
        checkAll.addEventListener("click", e => {
                
            const deleteOne = wishListUl.querySelectorAll('[name=deleteOne]');
            for(let i = 0; i<deleteOne.length; i++) {
                if(e.target.checked) deleteOne[i].checked = true;
                else deleteOne[i].checked = false;
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

                selectWishList(i);
            });
        }
    });
}

// 위시리스트 삭제용 함수
const deleteList = (list) => {

    if( !confirm("삭제 하시겠습니까?") ) {
        return;
    }

    const obj = list.map(Number);

    fetch("/wishList/manage", {
        method : "DELETE",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(obj)
    })
    .then(resp => resp.text())
    .then(result => {

        if(result > 0) {
            alert("삭제 되었습니다.");
            selectWishList(1);
        } else {
            alert("삭제를 실패했습니다.");
            return;
        }
    });
}


// 처음 페이지를 열었을 때 화면 목록 초기화
selectWishList(1);

// 선택 상품 삭제 버튼을 눌렀을 때
document.getElementById("checkDelBtn").addEventListener("click", e => {

    const checkList = document.querySelectorAll("[name=deleteOne]:checked");
    console.log(checkList);

    // 선택 항목이 없을 때
    if(checkList.length == 0) {
        alert("항목을 선택해 주세요");
        return;
    } 

    let list = [];
    checkList.forEach(e => {
        list.push(e.value)
    });

    deleteList(list);
});