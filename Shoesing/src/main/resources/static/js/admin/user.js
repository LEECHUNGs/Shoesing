const userHead = document.querySelector('#userThead');
const userBody = document.querySelector('#userTbody');

const userList = () => {
  fetch('/admin/userList') // GET 방식 요청
    .then((resp) => resp.json())
    .then((result) => {
      const userList = result.userList;

      for (const i in userList) {
        userBody.innerHTML = `
       <tr> 
         <td><a href='/'>${userList[i].userNo}</a></td>
         <td><a>${userList[i].userId}</a></td>
         <td><a>${userList[i].userEmail}</a></td>
         <td><a>${userList[i].userNickname}</a></td>
         <td><a>${userList[i].userName}</a></td>
         <td><a>${userList[i].userAdress}</a></td>
         <td><a>${userList[i].userTel}</a></td>
         <td><a>${userList[i].userEnrollDate}</a></td>
         <td><a>${userList[i].userDelFl}</a></td>
         </tr>
       `;
      }
    });
};

userList();
