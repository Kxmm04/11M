let filmOpened = false;

// ✅ ตรวจรหัสผ่าน
function checkPassword() {
  const passwordInput = document.getElementById("password").value.trim();
  if (passwordInput === "") {
    showModal("ใส่วันครบรอบก่อนอ้วงง💙", "");
  } else if (passwordInput === "23") {
    showSuccessModal("ถูกต้องแย้วว 💙");
  } else {
    showModal("วันไม่ถูกอ่าา 💔", "ใส่ใหม่นะอ้วงงงง");
  }
}

// ✅ Modal ปกติ
function showModal(title, message = "") {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const closeBtn = document.getElementById("closeModal");

  modalTitle.textContent = title;
  modalMessage.textContent = message;
  closeBtn.style.display = "inline-block";

  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("show"), 50);
}

// ✅ Modal ตอนถูก
function showSuccessModal(title) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const closeBtn = document.getElementById("closeModal");

  modalTitle.textContent = title;
  modalMessage.innerHTML = '<img src="images/success.jpg" class="success-img">';
  closeBtn.style.display = "none";

  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("show"), 50);

  setTimeout(() => {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.classList.add("hidden");
      goToMenu();
    }, 400);
  }, 2000);
}

// ✅ ปิด Modal
document.getElementById("closeModal").addEventListener("click", () => {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
  setTimeout(() => modal.classList.add("hidden"), 400);
});

// ✅ ไปหน้าเมนู
function goToMenu() {
  document.getElementById("password-page").classList.add("hidden");
  document.getElementById("menu-page").classList.remove("hidden");
}

function backToMenu() {
  const filmStrip = document.getElementById("film-strip");
  const filmWrapper = document.getElementById("film-wrapper");
  const filmPage = document.getElementById("film-roll-page");
  const galleryPage = document.getElementById("gallery-page");
  const envelopePage = document.getElementById("envelope-page"); // ✅ เพิ่มบรรทัดนี้
  const menuPage = document.getElementById("menu-page");

  const fadeOutDuration = 400;

  // 🎞️ กลับจากหน้าฟิล์ม
  if (!filmPage.classList.contains("hidden")) {
    if (!filmOpened) {
      filmPage.classList.add("fade-out");
      setTimeout(() => {
        filmPage.classList.add("hidden");
        filmPage.classList.remove("fade-out");
        menuPage.classList.remove("hidden");
        menuPage.classList.add("fade-in");
        setTimeout(() => menuPage.classList.remove("fade-in"), 600);
      }, fadeOutDuration);
    } else {
      filmStrip.classList.remove("active");
      filmOpened = false;
      filmWrapper.style.transition = "transform 1s ease";
      filmStrip.style.transition = "transform 1s ease";
      filmWrapper.style.transform = "translateX(0)";
      filmStrip.style.transform = "translateX(-70%)";

      setTimeout(() => {
        filmPage.classList.add("fade-out");
        setTimeout(() => {
          filmPage.classList.add("hidden");
          filmPage.classList.remove("fade-out");
          menuPage.classList.remove("hidden");
          menuPage.classList.add("fade-in");
          setTimeout(() => menuPage.classList.remove("fade-in"), 600);
          filmOpened = false;
        }, fadeOutDuration);
      }, 1000);
    }
  }

  // 🖼️ กลับจากแกลเลอรี่
  else if (!galleryPage.classList.contains("hidden")) {
    galleryPage.classList.add("fade-out");
    setTimeout(() => {
      galleryPage.classList.add("hidden");
      galleryPage.classList.remove("fade-out");
      menuPage.classList.remove("hidden");
      menuPage.classList.add("fade-in");
      setTimeout(() => menuPage.classList.remove("fade-in"), 600);
    }, fadeOutDuration);
  }

  // 💌 กลับจากหน้าซองจดหมาย (เพิ่มส่วนนี้)
  else if (!envelopePage.classList.contains("hidden")) {
    envelopePage.classList.add("fade-out");
    setTimeout(() => {
      envelopePage.classList.add("hidden");
      envelopePage.classList.remove("fade-out");
      menuPage.classList.remove("hidden");
      menuPage.classList.add("fade-in");
      setTimeout(() => menuPage.classList.remove("fade-in"), 600);
    }, fadeOutDuration);
  }

  document.body.classList.remove("no-scroll");
}


// ✅ เปิดแกลเลอรี
function openGallery() {
  document.getElementById("menu-page").classList.add("hidden");
  document.getElementById("gallery-page").classList.remove("hidden");
  document.body.classList.add("no-scroll");
  setupGallery();
}

/* 💙 ตั้งค่า Gallery */
let currentIndex = 0;
let startX = 0;
let isDragging = false;

function setupGallery() {
  const gallery = document.getElementById("gallery");
  const caption = document.getElementById("caption");
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const total = items.length;

  updateGallery();

  const isMobile = window.innerWidth <= 700;
  if (!isMobile) {
    document.getElementById("arrow-left").onclick = () => {
      currentIndex = (currentIndex - 1 + total) % total;
      updateGallery(true);
    };
    document.getElementById("arrow-right").onclick = () => {
      currentIndex = (currentIndex + 1) % total;
      updateGallery(true);
    };
  }

  gallery.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  gallery.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
    isDragging = false;
  });

  function handleSwipe(delta) {
    if (delta > 50) currentIndex = (currentIndex - 1 + total) % total;
    else if (delta < -50) currentIndex = (currentIndex + 1) % total;
    updateGallery(true);
  }

  function updateGallery(withTransition = false) {
    items.forEach((item, i) => {
      const diff = (i - currentIndex + total) % total;
      item.style.transition = withTransition
        ? "transform 0.5s ease, opacity 0.5s ease"
        : "none";
      if (diff === 0) {
        item.style.transform = "translateX(0) scale(1)";
        item.style.opacity = "1";
        item.style.zIndex = 3;
      } else if (diff === 1 || diff === total - 1) {
        const direction = diff === 1 ? 1 : -1;
        item.style.transform = `translateX(${direction * 120}px) scale(0.9)`;
        item.style.opacity = "0.6";
        item.style.zIndex = 2;
      } else {
        item.style.transform = "translateX(0) scale(0.8)";
        item.style.opacity = "0";
        item.style.zIndex = 1;
      }
    });
    caption.textContent = items[currentIndex].dataset.caption;
  }
}

// 💙 เมนูที่ 2: ฟิล์มกลิ้ง (แก้ใหม่สุด)
function openFilmRoll() {
  const menuPage = document.getElementById("menu-page");
  const filmPage = document.getElementById("film-roll-page");
  const filmWrapper = document.getElementById("film-wrapper");
  const filmStrip = document.getElementById("film-strip");

  menuPage.classList.add("hidden");
  filmPage.classList.remove("hidden");
  filmPage.classList.add("fade-in");
  setTimeout(() => filmPage.classList.remove("fade-in"), 600);

  // ✅ รีเซ็ตทุกครั้ง
  filmStrip.classList.remove("active");
  filmWrapper.style.transform = "translateX(0)";
  filmStrip.style.transform = "translateX(-80%)";
  filmOpened = false;

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  // 🎞️ เริ่มลากหรือคลิกฟิล์ม
  filmStrip.onmousedown = (e) => {
    // ให้ฟิล์มขยับออกนิดก่อนเสมอ
    if (!filmOpened) {
      filmStrip.classList.add("active");
      filmWrapper.style.transform = "translateX(-80px)";
      filmStrip.style.transform = "translateX(0)";
      filmOpened = true;
    }
    isDragging = true;
    startX = e.pageX - filmStrip.offsetLeft;
    scrollLeft = filmStrip.scrollLeft;
    filmStrip.style.cursor = "grabbing";
  };

  filmStrip.onmouseup = () => {
    isDragging = false;
    filmStrip.style.cursor = "grab";
  };

  filmStrip.onmouseleave = () => {
    isDragging = false;
  };

  filmStrip.onmousemove = (e) => {
    if (!isDragging || !filmOpened) return;
    const x = e.pageX - filmStrip.offsetLeft;
    const walk = (x - startX) * 1.3;
    filmStrip.scrollLeft = scrollLeft - walk;
  };

  // 📱 มือถือ
  let touchStartX = 0;
  let touchScrollLeft = 0;
  filmStrip.ontouchstart = (e) => {
    if (!filmOpened) {
      filmStrip.classList.add("active");
      filmWrapper.style.transform = "translateX(-80px)";
      filmStrip.style.transform = "translateX(0)";
      filmOpened = true;
    }
    touchStartX = e.touches[0].clientX;
    touchScrollLeft = filmStrip.scrollLeft;
  };
  filmStrip.ontouchmove = (e) => {
    if (!filmOpened) return;
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX) * 1.3;
    filmStrip.scrollLeft = touchScrollLeft - walk;
  };
}
function openFlower() {
  const menuPage = document.getElementById("menu-page");
  const flowerPage = document.getElementById("flower-page");
  const bouquetWrapper = document.getElementById("bouquet-wrapper");

  menuPage.classList.add("hidden");
  flowerPage.classList.remove("hidden");

  bouquetWrapper.classList.remove("open");
  bouquetWrapper.onclick = () => {
    bouquetWrapper.classList.toggle("open");
  };
}








// ✅ รองรับ Enter
document.getElementById("password").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkPassword();
  }
});