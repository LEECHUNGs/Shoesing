// 비동기로 wishList에 상품 추가
document.getElementById("wishListBtn").addEventListener("click", () => {

    if(loginUser == null) {
        alert("로그인 후 이용해 주세요!!");
        return;
    }

    fetch("/wishList/manage", {
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(item)
    })
    .then(resp => resp.text())
    .then(result => {

        if(result > 0) {
            alert("상품이 등록되었습니다.")

        } else {
            alert("이미 등록된 상품입니다.")
        }
        
    });
});
