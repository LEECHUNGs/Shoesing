const itemHead = document.querySelector('#itemThead');
const itemBody = document.querySelector('#itemTbody');

const itemList = (sortNo) => {
  fetch('/admin/itemList?sortNo=' + sortNo)
    .then((resp) => resp.json())
    .then((result) => {
      const itemList = result.itemList;

      itemBody.innerHTML = '';
      modal.innerHTML = '';

      for (const i in itemList) {
        const item = document.createElement('tr');

        item.innerHTML = `
          <td>${itemList[i].itemNo}</td>
          <td>${itemList[i].itemName}</td>
          <td>${itemList[i].itemPrice}</td>
          <td>${itemList[i].categoryNo}</td>
          <td>${itemList[i].itemUploadDate}</td>
          <td>  
            <a href="item/detail?itemNo=${itemList[i].itemNo}">
              수정
            </a>
          </td>
          <td>
            <button value="${itemList[i].itemNo}" id="deleteStock">
              재고 초기화
            </button>
          </td>
          <td>
            <button value="${itemList[i].itemNo}" id="deleteItem">
              삭제
            </button>
          </td>
        `;

        itemBody.appendChild(item);
      }

      // 상품 테이블에서 삭제 수정필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      document.querySelector('#deleteItem').addEventListener('click', (e) => {
        fetch(`/admin/deleteItem?itemNo=` + e.target.value, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((resp) => resp.text())
          .then((result) => {
            console.log(result);
          });
      });

      // 재고 초기화
      document.querySelector('#deleteStock').addEventListener('click', (e) => {
        fetch(`/admin/deleteStock?itemNo=` + e.target.value, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result > 0) {
              alert('초기화 성공');
            } else {
              alert('초기화 실패');
            }
          });
      });
    });
};

itemList(0);

// 상품 새로 추가
document.querySelector('#insertItem').addEventListener('click', () => {
  fetch('/admin/insertItem', { method: 'post' })
    .then((resp) => resp.text())
    .then((result) => {
      location.href = 'item/detail?itemNo=' + result;
    });
});
