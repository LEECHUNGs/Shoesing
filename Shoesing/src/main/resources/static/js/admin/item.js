const itemHead = document.querySelector('#itemThead');
const itemBody = document.querySelector('#itemTbody');

const itemList = (sortNo) => {
  fetch('/admin/itemList?sortNo=' + sortNo) // GET 방식 요청
    .then((resp) => resp.json())
    .then((result) => {
      const itemList = result.itemList;

      itemBody.innerHTML = '';

      for (const i in itemList) {
        const item = document.createElement('tr');

        item.innerHTML = `
          <td><a href='/'>${itemList[i].itemNo}</a></td>
          <td>${itemList[i].itemName}</td>
          <td>${itemList[i].itemPrice}</td>
          <td>${itemList[i].categoryNo}</td>
          <td>${itemList[i].itemUploadDate}</td>
          <td>${itemList[i].itemUpdateDate}</td>
          <td>  
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              수정
            </button>
          <td>
        `;

        itemBody.appendChild(item);
      }
    });
};

itemList(0);
