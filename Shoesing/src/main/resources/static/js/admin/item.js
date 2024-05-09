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
          <td>
        `;

        itemBody.appendChild(item);
      }
    });
};

itemList(0);

document.querySelector('#insertItem').addEventListener('click', () => {
  fetch('/admin/insertItem', { method: 'post' })
    .then((resp) => resp.text())
    .then((result) => {
      console.log(result);
      // location.href = 'item/detail?itemNo=' + result;
    });
});
