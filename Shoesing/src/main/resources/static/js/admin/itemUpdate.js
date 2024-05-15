const input = document.querySelector('#inputFiles');
const inputThumb = document.querySelector('#inputThumbnail');

// Listen for files selection
input.addEventListener('change', (e) => {
  // Retrieve all files
  const files = input.files;

  // Check files count
  if (files.length != 5) {
    alert(`상품 이미지 5개를 선택해주세요`);
    input.value = '';
    return;
  }
});

uploadImg.addEventListener('submit', (e) => {
  if (input.value.trim().length == 0 || inputThumb.value.trim().length == 0) {
    alert(`상품 이미지를 모두 선택해주세요`);
    e.preventDefault();
    return;
  }
});
