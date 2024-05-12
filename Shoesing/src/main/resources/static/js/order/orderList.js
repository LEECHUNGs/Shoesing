const orderDetailFnc = (tr, orderNo) => {

    fetch("/order/detailInfo", {
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : orderNo
    })
    .then(resp => resp.json())
    .then(list => {

        const detailTr = document.querySelector("#detailTr");

        if(detailTr != null) {
            detailTr.remove();
        }

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td2.colSpan = 5; 

        // 세부 주문상품 뷰
        const tr2 = document.createElement("tr");
        tr2.id = "detailTr";
        const orderDetailUl = document.createElement("ul");

        tr2.append(td1, td2);
        tr.after(tr2);

        list.forEach(e => {

            const li = document.createElement("li"); // 상품 li
            const img = document.createElement("img"); // 상품 사진

            const infoDiv = document.createElement("div"); // 주문 세부내역 설명 div

            // 세부 상품 설명
            const stockNo = document.createElement("div"); // 상품 재고 번호
            const name = document.createElement("div"); // 이름
            const price = document.createElement("div"); // 가격
            const size = document.createElement("div"); // 사이즈
            const count = document.createElement("div"); // 주문 수량

            // 상품 이미지 (추가 예정)
            img.src = "/img/cat1.jpg";

            // 상품 정보 세팅
            stockNo.innerText = `상품 번호 : ${e.itemStockNo}`;
            name.innerText = `상품명 : ${e.itemName}`;
            price.innerText = `상품 가격 : ${e.itemPrice}`;
            size.innerText = `상품 사이즈 : ${e.sizeVal}`;
            count.innerText = `상품 수량 : ${e.orderItemCount}`;

            infoDiv.append(stockNo, name, price, size, count);
            li.append(img, infoDiv);
            orderDetailUl.append(li);
            
        });

        td2.append(orderDetailUl);
    });
};