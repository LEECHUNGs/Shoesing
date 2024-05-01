// 비동기로 wishList에 상품 추가
document.getElementById("wishListBtn").addEventListener("click", () => {

    fetch("wishList", {
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(item)
    })
    .then(resp => resp.text())
    .then();
});
