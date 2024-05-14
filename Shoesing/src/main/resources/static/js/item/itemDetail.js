// 비동기로 wishlist에 상품 추가
document.getElementById('wishlistBtn').addEventListener('click', () => {
  if (loginUser == null) {
    alert('로그인 후 이용해 주세요!!');
    return;
  }

  fetch('/wishlist/manage', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(item),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        alert('찜에 상품이 등록되었습니다.');
      } else {
        alert('이미 등록된 상품입니다.');
      }
    });
});

// 비동기로 장바구니에 상품 추가
document.getElementById('cartBtn').addEventListener('click', () => {
  if (document.querySelector('[name=inputSize]:checked') == null) {
    alert('사이즈를 먼저 선택해주세요.');
    return;
  }

  const sizeNo = document.querySelector('[name=inputSize]:checked').value;
  const cartItemCount = document.getElementById('itemCount').value;

  const obj = {
    itemNo: item.itemNo,
    sizeNo: sizeNo,
    cartItemCount: cartItemCount,
  };

  fetch('/cart/manage', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        alert('장바구니에 상품이 등록되었습니다.');
      } else {
        alert('상품을 장바구니에 넣을 수 없습니다.');
      }
    });
});
