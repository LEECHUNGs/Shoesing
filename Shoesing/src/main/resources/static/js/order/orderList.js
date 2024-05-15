
const orderDetailFnc = (td, orderNo) => {

    const tr = td.parentNode;

    const detailTr = document.querySelector("#detailTr");

    // 이전 세부 주문목록 삭제
    if(detailTr != null) {

        // 한번 누른 상품일 경우 삭제 (= 접기 기능)
        if(detailTr.previousElementSibling === tr) {
            detailTr.remove();
            return;  
        } 

        detailTr.remove();
    }

    fetch("/order/detailInfo", {
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : orderNo
    })
    .then(resp => resp.json())
    .then(list => {

        const pageUl = document.getElementById("pageUl");

        console.log(pageUl);

        const td = document.createElement("td");
        td.colSpan = 5; 

        // 세부 주문상품 뷰
        const tr2 = document.createElement("tr");
        tr2.id = "detailTr";
        const orderDetailUl = document.createElement("ul");
        orderDetailUl.classList.add("orderListUl");

        tr2.append(td);
        tr.after(tr2);

        list.forEach(e => {

            const li = document.createElement("li"); // 상품 li
            const imgDiv = document.createElement("div");
            const img = document.createElement("img"); // 상품 사진

            const infoDiv = document.createElement("div"); // 주문 세부내역 설명 div

            // 세부 상품 설명
            const stockNo = document.createElement("span"); // 상품 재고 번호
            const name = document.createElement("span"); // 이름
            const price = document.createElement("span"); // 가격
            const size = document.createElement("span"); // 사이즈
            const count = document.createElement("span"); // 주문 수량  

            li.classList.add("orderListLi");

            // 상품 이미지 (추가 예정)
            img.src = e.thumbnail;
            img.classList.add("itemImg");

            imgDiv.append(img);
            imgDiv.classList.add("imgDiv");

            // 상품 정보 세팅
            stockNo.innerText = `상품 번호 : ${e.itemStockNo}`;
            name.innerText = `상품명 : ${e.itemName}`;
            price.innerText = `상품 가격 : ${e.itemPrice} 원`;
            size.innerText = `상품 사이즈 : ${e.sizeVal} mm`;
            count.innerText = `상품 수량 : ${e.orderItemCount} 개`;

            infoDiv.append(stockNo, name, price, size, count);
            infoDiv.classList.add("infoDiv");

            li.append(imgDiv, infoDiv);
            orderDetailUl.append(li);
            
        });

        td.append(orderDetailUl);
    });
};

const confirmBtn = (orderNo) => {

    if(!confirm("상품 처리 상태를 변경하시겠습니까?")) {
        return;
    }

    fetch("/order/manage?orderNo=" + orderNo)
    .then(resp => resp.text())
    .then(result => {
        
        if(result > 0) {
            alert("변경 되었습니다.");
            location.href = `/order/info?cp=${cp}`;
        }
    });

};