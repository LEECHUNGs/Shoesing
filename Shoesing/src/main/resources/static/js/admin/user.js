const userHead = document.querySelector('#userThead');
const userBody = document.querySelector('#userTbody');
const modal = document.querySelector('#modal');

// 삭제 기능 추가!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const userList = (sortNo) => {
  fetch('/admin/userList?sortNo=' + sortNo)
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
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#id${userList[i].userNo}">
            수정
          </button>
          </td>`;

        userBody.appendChild(user);

        userDetail.innerHTML = `
          <div class="modal fade" id="id${userList[i].userNo}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form action='/admin/updateUser' method='post'>
                  <input type="hidden" name="userNo" value="${userList[i].userNo}" /> <br />
                  <label>회원 ID: <input type="text" name="userId" value="${userList[i].userId}" /></label> <br />
                  <label>회원 이메일: <input type="text" name="userEmail" value="${userList[i].userEmail}" /></label> <br />
                  <label>회원 닉네임: <input type="text" name="userNickname" value="${userList[i].userNickname}" /></label> <br />
                  <label>회원 이름: <input type="text" name="userName" value="${userList[i].userName}" /></label> <br />
                  <label>회원 주소: <input type="text" name="userAddress" value="${userList[i].userAddress}" /></label> <br />
                  <label>회원 전화번호: <input type="text" name="userTel" value="${userList[i].userTel}" /></label> <br />
                  회원탈퇴 여부: ${userList[i].userDelFl}
                  <br />
                    <button>수정 완료</button>
                  </form>
                  <form action="/admin/userDelFl" method="post">
                    <input type="hidden" name="userNo" value="${userList[i].userNo}" />
                    <input type="hidden" name="userDelFl" value="${userList[i].userDelFl}" />
                    <button>회원 탈퇴/복구</button>
                  </form>
                  <button>회원 PW 리셋</button>
              </div>
            </div>
          </div>
        </div>`;

        modal.appendChild(userDetail);
      }
    });
};

userList(0);
