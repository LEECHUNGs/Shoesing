// 상품 목록 불러오기 함수
const selectItems = (sortNo, cp) => {
  // sortNo : 상품 정렬용 번호
  // 0 : 기본정렬
  // 1 : 역 기본정렬

  // 2 : 가격정렬
  // 3 : 역 가격정렬

  // 4 : 이름정렬
  // 5 : 역 이름정렬

  fetch('itemList?sortNo=' + sortNo + '&cp=' + cp) // GET 방식 요청
    .then((resp) => resp.json())
    .then((obj) => {
      const itemList = obj.itemList;
      const pagination = obj.pagination;

      const pageUl = document.getElementById('pageUl');
      const itemListUl = document.getElementById('itemListUl');
      const sortName = document.querySelector('#sortName');

      // 정렬명 가져오기
      switch (sortNo) {
        case 0:
          sortName.innerText = '기본 정렬';
          break;
        case 1:
          sortName.innerText = '최신 순';
          break;
        case 2:
          sortName.innerText = '가격 낮은 순';
          break;
        case 3:
          sortName.innerText = '가격 높은 순';
          break;
        case 4:
          sortName.innerText = '이름 정렬(A-Z)';
          break;
        case 5:
          sortName.innerText = '이름 정렬(Z-A)';
          break;
      }

      // 상품 목록 / 페이지 번호 비우기
      itemListUl.innerHTML = '';
      pageUl.innerText = '';

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

      // 페이지 버튼 생성
      for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        const pageLi = document.createElement('li');
        const pageA = document.createElement('a');

        // 페이지 번호, 다른 페이지로 이동
        pageA.innerText = i;
        pageA.href = '#';

        pageLi.classList.add('pageNo');
        pageLi.append(pageA);

        if (i == cp) {
          pageLi.classList.add('currentPage');
        }

        pageUl.appendChild(pageLi);

        pageA.addEventListener('click', () => {
          pageUl.innerText = '';

          selectItems(sortNo, i);
        });
      }
    });
};

// 처음 페이지를 열었을 때 화면 목록 초기화
selectItems(0, 1);
