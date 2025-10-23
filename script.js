let filmOpened = false;
let filmAutoScroll = null;

// ✅ ตรวจรหัสผ่าน
function checkPassword() {
  const passwordInput = document.getElementById("password").value.trim();
  const music = document.getElementById("bg-music");

  // ✅ พยายามเริ่มเพลง “ทันที” ตอนกดปุ่ม
  const tryPlayMusic = () => {
    music.volume = 0.25;
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log("เพลงเริ่มเล่นแล้ว 🎵"))
        .catch(() => {
          console.warn("เบราว์เซอร์ยังไม่อนุญาตเสียง จะเล่นหลังยืนยัน");
        });
    }
  };

  tryPlayMusic(); // เริ่มเลยตอนกดปุ่ม

  // ✅ ตรวจรหัสผ่าน
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
  const flowerPage = document.getElementById("flower-page");
  const menuPage = document.getElementById("menu-page");

  const fadeOutDuration = 400;

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
  else if (!flowerPage.classList.contains("hidden")) {
    flowerPage.classList.add("fade-out");
    setTimeout(() => {
      flowerPage.classList.add("hidden");
      flowerPage.classList.remove("fade-out");
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



// 💙 ฟิล์มเวอร์ชันใหม่: เล่นอัตโนมัติ + เลื่อนวน
// 💙 ฟิล์มเวอร์ชันใหม่: ปรับความยาวอัตโนมัติ + ขนาดเฟรมพอดี
function openFilmRoll() {
  const menuPage = document.getElementById("menu-page");
  const filmPage = document.getElementById("film-roll-page");
  const filmWrapper = document.getElementById("film-wrapper");
  const filmStrip = document.getElementById("film-strip");
  const videos = filmStrip.querySelectorAll("video");
  const frames = filmStrip.querySelectorAll(".frame");
  

  // ซ่อนเมนู / แสดงฟิล์ม
  menuPage.classList.add("hidden");
  filmPage.classList.remove("hidden");
  filmPage.classList.add("fade-in");
  setTimeout(() => filmPage.classList.remove("fade-in"), 600);

  // รีเซ็ตทุกครั้ง
  filmStrip.classList.remove("active");
  filmWrapper.style.transform = "translateX(0)";
  filmStrip.style.transform = "translateX(-80%)";
  filmOpened = false;

  // เปิดฟิล์มพร้อมเล่นอัตโนมัติ
  setTimeout(() => {
    filmStrip.classList.add("active");
    filmWrapper.style.transform = "translateX(-80px)";
    filmStrip.style.transform = "translateX(0)";
    filmOpened = true;

   // 🎬 เล่นวิดีโอทั้งหมดแบบวนและปิดเสียง (พร้อมแก้ autoplay iPhone)
videos.forEach((v) => {
  v.setAttribute("playsinline", "true"); // ให้เล่นในกล่อง (จำเป็นสำหรับ iPhone)
  v.muted = true;                        // ปิดเสียง
  v.loop = true;                         // เล่นวน
  v.play().catch(() => {
    // ถ้า autoplay ไม่ได้ (เช่น iPhone Safari)
    // ให้รอจนกว่าผู้ใช้จะกดเล่นเอง
    v.addEventListener("click", () => v.play());
  });
});

    // 💡 ปรับความยาวฟิล์มอัตโนมัติ (ให้ยาวพอดีกับจำนวนเฟรม)
    const frameWidth = frames[0].offsetWidth + 12; // 100px + margin 6px ทั้งสองข้าง
    const totalWidth = frames.length * frameWidth + 100; // บวกช่องซ้ายขวาเล็กน้อย
    filmStrip.style.width = `${totalWidth}px`;
  }, 800);
}

// 🔙 หยุดเลื่อนและหยุดวิดีโอเมื่อกลับเมนู
function backToMenu() {
  const filmPage = document.getElementById("film-roll-page");
  const galleryPage = document.getElementById("gallery-page");
  const flowerPage = document.getElementById("flower-page");
  const menuPage = document.getElementById("menu-page");
  const filmStrip = document.getElementById("film-strip");
  const videos = filmStrip.querySelectorAll("video");
  const fadeOutDuration = 400;

  // หยุดทุกอย่าง
  filmOpened = false;
  cancelAnimationFrame(filmAutoScroll);
  videos.forEach((v) => v.pause());

  let activePage = null;
  if (!filmPage.classList.contains("hidden")) activePage = filmPage;
  else if (!galleryPage.classList.contains("hidden")) activePage = galleryPage;
  else if (!flowerPage.classList.contains("hidden")) activePage = flowerPage;

  if (activePage) {
    activePage.classList.add("fade-out");
    setTimeout(() => {
      activePage.classList.add("hidden");
      activePage.classList.remove("fade-out");
      menuPage.classList.remove("hidden");
      menuPage.classList.add("fade-in");
      setTimeout(() => menuPage.classList.remove("fade-in"), 600);
    }, fadeOutDuration);
  }

  document.body.classList.remove("no-scroll");
}
function openFlower() {
  const menuPage = document.getElementById("menu-page");
  const flowerPage = document.getElementById("flower-page");
  const bouquetScene = document.getElementById("bouquet-scene");

  menuPage.classList.add("hidden");
  flowerPage.classList.remove("hidden");

  // รีเซ็ตก่อนทุกครั้ง
  bouquetScene.classList.remove("open", "clicked");

  // คลิกที่ภาพ → ซ่อนข้อความ + แสดงการ์ด
  bouquetScene.onclick = () => {
    bouquetScene.classList.add("clicked"); // ซ่อนข้อความทันที
    setTimeout(() => {
      bouquetScene.classList.toggle("open"); // เปิดการ์ด
    }, 100); // เวลานิดหน่อยเพื่อให้ transition ทำงาน
  };
}


// ✅ รองรับ Enter
document.getElementById("password").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkPassword();
  }
});