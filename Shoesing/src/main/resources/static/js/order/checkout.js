// 버튼 클릭 시 주문 데이터를 서버에 전송
document.getElementById("orderBtn").addEventListener("click", e => {

    const userAddress = document.getElementById("userAddress");

    // 주문 정보에 주소 설정
    order.orderAddress = userAddress.value;

    // 비회원일 경우 입력받은 비회원용 정보 입력
    if(loginUser == null) {
        
        const userAddress = document.getElementById("userAddress");
        const userName = document.getElementById("userName");
        const userEmail = document.getElementById("userEmail");
        const userTel = document.getElementById("userTel");

        const user = {
            "userName" : userName.value,
            "userEmail" : userEmail.value,
            "userTel" : userTel.value,
            "userAddress" : userAddress.value
        };

        order.orderUser = user;
    } 

    // 주문 요청
    fetch("/order/manage", {
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(order)
    })
    .then(resp => resp.text())
    .then(result => {

        // 주문이 성공하면
        if(result > 0) {
            location.href = "/order/orderSuccess";
        }
    });


});
