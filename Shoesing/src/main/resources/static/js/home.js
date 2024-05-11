// 최신 상품 목록 불러오기
const selectItems = () => {
  fetch('/item/itemListNew') // GET 방식 요청
    .then((resp) => resp.json())
    .then((itemList) => {
      console.log(itemList);
      const itemListUl = document.getElementById('itemListUl');

      itemListUl.innerHTML = '';

      // 상품 목록 생성
      for (const i in itemList) {
        const itemLi = document.createElement('li');
        const itemA = document.createElement('a');

        itemA.innerHTML = `
          <div class="itemThumbnail">
          <img src="${itemList[i].thumbnail}" />
          <div class="itemA">
          <div class="itemNo">
          No. ${itemList[i].itemNo}
          </div>
          <a id="wishListBtn" class="itemWishList">
          <i id="heart" class="bi-suit-heart"></i>
          </a>
          </div>
          </div>
          <div class="itemText">
          <div class="itemName">${itemList[i].itemName}</div>
          <div class="itemDetail">${
            itemList[i].itemName
          }은 정말 좋은 신발입니다</div>
          <div class="itemPrice"> 
          ${itemList[i].itemPrice.toLocaleString('en-US', 'currency')}₩
          </div>
          </div>`;

        itemA.href = `detail?itemNo=${itemList[i].itemNo}`;

        itemLi.appendChild(itemA);

        itemLi.classList.add('itemBox');

        itemListUl.appendChild(itemLi);
      }
    });
};

// 처음 페이지를 열었을 때 화면 목록 초기화
selectItems();
