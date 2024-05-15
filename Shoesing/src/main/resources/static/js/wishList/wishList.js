// 위시리스트 불러오기 함수
const selectWishlist = (cp) => {


    fetch("/wishlist/manage?cp=" + cp) // GET 방식 요청
    .then(resp => resp.json())
    .then(obj => {

        const wishlist = obj.wishlist; // 위시리스트
        const pagination = obj.pagination; // 페이지네이션

        const wishlistUl = document.getElementById("wishlistUl"); // 위시리스트 ul
        const pageUl = document.getElementById("pageUl"); // 페이지네이션 ul

        const checkAll = document.getElementById("checkAll"); // 전체 선택 버튼

        // 위시리스트 비우기
        const lis = wishlistUl.querySelectorAll("li");
        if(lis.length > 0) lis.forEach(e => {e.remove()});

        // 페이지 번호 비우기
        pageUl.innerHTML = "";

        // 위시리스트 목록 생성
        for (const i in wishlist) {
            
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
            const checkboxDiv = document.createElement("div");
            const checkbox = document.createElement("input"); // 위시리스트 체크박스

            const wishlistThumbnail = document.createElement("div");
            const img = document.createElement("img"); // 위시리스트 상품 사진
            const infoA = document.createElement("a"); // 위시리스트 설명 div

            li.classList.add("wishlistbox");

            // 위시리스트 설명
            const infoDiv = document.createElement("div"); // 설명용 박스
            const name = document.createElement("span"); // 이름
            const price = document.createElement("span"); // 가격
            const brand = document.createElement("span"); // 브랜드

            const deleteDiv = document.createElement("div");
            const deleteBtn = document.createElement("button"); // 삭제 버튼

            // 체크박스 설정
            checkbox.type = "checkbox";
            checkbox.name = "deleteOne";
            checkbox.value = wishlist[i].itemNo;
            checkboxDiv.append(checkbox);
            checkboxDiv.classList.add("checkboxDiv");

            // 상품 이미지 세팅 (추가 예정)
            img.src = wishlist[i].thumbnail;
            wishlistThumbnail.append(img);
            wishlistThumbnail.classList.add("wishlistThumbnail");

            // 상품 정보 세팅
            brand.innerText = wishlist[i].itemBrand;
            brand.classList.add("brand");

            price.innerText = `${wishlist[i].itemPrice} 원`;
            price.classList.add("price");

            name.innerText = wishlist[i].itemName;
            name.classList.add("name");

            infoDiv.append(price, name, brand);
            infoDiv.classList.add("infoDiv");

            // infoA에 요소 추가
            infoA.append(wishlistThumbnail);
            infoA.href = `/item/detail?itemNo=${wishlist[i].itemNo}`;
            infoA.classList.add("infoA");

            deleteBtn.innerHTML = "&times;";
            deleteBtn.classList.add("deleteBtn");
            deleteDiv.append(deleteBtn);
            deleteDiv.classList.add("deleteDiv");

            // li에 요소 추가
            li.append(checkboxDiv, infoA, infoDiv, deleteDiv);
            
            // wishlistUl에 모든 내용 추가
            wishlistUl.append(li);

            // 단일 상품 삭제 버튼을 눌렀을 때
            deleteBtn.addEventListener("click", e => {

                let list = [wishlist[i].itemNo];
                deleteList(list);
            });
        }

        // 전체 상품 선택 버튼 클릭시 전체 선택
        checkAll.addEventListener("click", e => {
                
            const deleteOne = wishlistUl.querySelectorAll('[name=deleteOne]');
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

                selectWishlist(i);
            });
        }
    });
}

// 위시리스트 삭제용 함수
const deleteList = (list) => {

    if( !confirm("삭제 하시겠습니까?") ) {
        return;
    }

    const wishlists = {
        "wishlists" : list
    };

    fetch("/wishlist/manage", {
        method : "DELETE",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(wishlists)
    })
    .then(resp => resp.text())
    .then(result => {

        if(result > 0) {
            alert("삭제 되었습니다.");

            const checkAll = document.getElementById("checkAll");
            checkAll.checked = false;

            selectWishlist(1);
        } else {
            alert("삭제를 실패했습니다.");
            return;
        }
    });
}


// 처음 페이지를 열었을 때 화면 목록 초기화
selectWishlist(1);

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

        const obj = {
            "itemNo" : e.value
        };
        list.push(obj);
    });

    deleteList(list);
});
