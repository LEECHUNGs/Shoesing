const userHead = document.querySelector('#userThead');
const userBody = document.querySelector('#userTbody');
const modal = document.querySelector('#modal');

const userList = (sortNo) => {
  fetch('/admin/userList?sortNo=' + sortNo) // GET 방식 요청
    .then((resp) => resp.json())
    .then((result) => {
      const userList = result.userList;

      userBody.innerHTML = '';
      modal.innerHTML = '';

      for (const i in userList) {
        const user = document.createElement('tr');
        const userDetail = document.createElement('div');

        user.innerHTML = `
          <td><a href='/'>${userList[i].userNo}</a></td>
          <td><a>${userList[i].userId}</a></td>
          <td><a>${userList[i].userEmail}</a></td>
          <td><a>${userList[i].userNickname}</a></td>
          <td><a>${userList[i].userName}</a></td>
          <td><a>${userList[i].userAddress}</a></td>
          <td><a>${userList[i].userTel}</a></td>
          <td><a>${userList[i].userEnrollDate}</a></td>
          <td><a>${userList[i].userDelFl}</a></td>
          <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${userList[i].userId}">
            수정
          </button>
          </td>`;

        userBody.appendChild(user);

        userDetail.innerHTML = `
          <div class="modal fade" id="${userList[i].userId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>`;

        modal.appendChild(userDetail);
      }
    });
};

userList(0);
