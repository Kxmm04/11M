function checkPassword() {
  const passwordInput = document.getElementById("password").value.trim();

  if (passwordInput === "") {
    showModal("ใส่วันครบรอบก่อนอ้วงง💙", "");
  } 
  else if (passwordInput.length > 2) {
    showModal("กรอกได้แค่ 2 หลักน้า 💫", "ลองลบแล้วใส่ใหม่อีกทีน้า 💙");
  }
  else if (passwordInput === "23") {
    // เอฟเฟกต์ตอนเปลี่ยนหน้า
    const passwordPage = document.getElementById("password-page");
    const menuPage = document.getElementById("menu-page");
    passwordPage.classList.add("fade-out");
    setTimeout(() => {
      passwordPage.classList.add("hidden");
      menuPage.classList.remove("hidden");
      menuPage.classList.add("fade-in");
    }, 400);
  } 
  else {
    showModal("วันไม่ถูกอ่าา 💔", "ใส่ใหม่นะอ้วงงงง");
  }
}

function showModal(title, message = "") {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  modalTitle.textContent = title;
  modalMessage.textContent = message;

  modal.classList.remove("show");
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("show");
  }, 50);
}

document.getElementById("closeModal").addEventListener("click", () => {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 400);
});

// ✅ รองรับกด Enter
const passwordInput = document.getElementById("password");
passwordInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkPassword();
  }
});
