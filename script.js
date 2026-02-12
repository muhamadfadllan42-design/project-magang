// BINTANG
const stars = document.getElementById("stars");
for (let i = 0; i < 160; i++) {
  const s = document.createElement("span");
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.animationDelay = Math.random() * 2 + "s";
  stars.appendChild(s);
}

// ACCORDION AUTO CLOSE
document.querySelectorAll(".accordion-header").forEach(h => {
  h.onclick = () => {
    const parent = h.parentElement;
    document.querySelectorAll(".accordion").forEach(a => {
      if (a !== parent) a.classList.remove("active");
    });
    parent.classList.toggle("active");
  };
});

// MUSIC
const box = document.getElementById("musicBox");
const music = document.getElementById("music");
let playing = false;

box.onclick = () => {
  if (!playing) {
    music.play();
    box.textContent = "Stop music";
  } else {
    music.pause();
    music.currentTime = 0;
    box.textContent = "Play music";
  }
  playing = !playing;
};

/* ========================= */
/* SPACESHIP - FIXED LEFT CORNER AREA */
/* ========================= */

const ship = document.getElementById("spaceship");

// Area kecil khusus pojok kiri bawah
const area = {
  minX: 10,    // sangat kiri
  maxX: 15,   // hanya sedikit ke kanan
  minY: 5,    // bawah
  maxY: 18    // sedikit naik saja
};

let x = 6;
let y = 10;
let dx = 0.02;
let dy = 0.015;

function animateShip() {
  x += dx;
  y += dy;

  // Pantul di area kecil saja
  if (x > area.maxX || x < area.minX) {
    dx *= -1;
  }

  if (y > area.maxY || y < area.minY) {
    dy *= -1;
  }

  ship.style.left = x + "%";
  ship.style.bottom = y + "%";

  requestAnimationFrame(animateShip);
}

animateShip();

/* ========================= */
/* METEOR SYSTEM (REALISTIC) */
/* ========================= */

const meteorLayer = document.getElementById("meteor-layer");

function createMeteor(isBig = false) {
  const meteor = document.createElement("img");
  meteor.src = "assets/meteor.png";
  meteor.classList.add("meteor");

  if (isBig) {
    meteor.classList.add("big-meteor");
  }

  meteorLayer.appendChild(meteor);

  const duration = isBig ? 5000 : 10000;
  const start = Date.now();

  // Posisi awal meteor (kanan atas)
  let startX = window.innerWidth + 100;
  let startY = -100;

  // Target default (kiri bawah)
  let targetX = -200;
  let targetY = window.innerHeight + 200;

  // Jika meteor besar → target pesawat
  if (isBig) {
    const shipRect = ship.getBoundingClientRect();

    targetX = shipRect.left + shipRect.width / 2;
    targetY = shipRect.top + shipRect.height / 2;
  }

  function move() {
    const elapsed = Date.now() - start;
    const progress = elapsed / duration;

    if (progress >= 1) {
      meteor.remove();
      return;
    }

    const currentX = startX + (targetX - startX) * progress;
    const currentY = startY + (targetY - startY) * progress;

    meteor.style.left = currentX + "px";
    meteor.style.top = currentY + "px";

    requestAnimationFrame(move);
  }

  move();

  // Jika meteor besar → spin 2 detik saat tabrakan
  if (isBig) {
    setTimeout(() => {
      ship.classList.add("spin");

      setTimeout(() => {
        ship.classList.remove("spin");
      }, 2000); // sekarang 2 detik

    }, duration - 200); // hampir tepat saat menyentuh
  }
}

/* ========================= */
/* START SYSTEM */
/* ========================= */

setTimeout(() => {

  // Meteor kecil tiap 5 detik
  setInterval(() => {
    createMeteor(false);
  }, 5000);

  // Meteor besar tiap 20 detik
  setInterval(() => {
    createMeteor(true);
  }, 20000);

}, 5000);
