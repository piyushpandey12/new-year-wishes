document.addEventListener("DOMContentLoaded", () => {
  const countdown = document.getElementById("countdown");
  const quote = document.getElementById("quote");
  const digit4 = document.getElementById("digit4");
  const digit5 = document.getElementById("digit5");
  const newYearText = document.getElementById("newYearText");
  const fireworksContainer = document.getElementById("fireworks-container");
  const bgMusic = document.getElementById("bgMusic");
  const startBtn = document.getElementById("startBtn");

  /* ================= MUSIC (VERCEL SAFE) ================= */
  startBtn.addEventListener("click", () => {
    bgMusic.volume = 0.7;
    bgMusic.play().catch(err => console.log("Audio error:", err));
    startBtn.style.display = "none";
  });

  /* ================= QUOTES ================= */
  const quotes = [
    "Cheers to a new year and another chance for us to get it right!",
    "The best is yet to come. Happy New Year!",
    "A new year is a fresh chapter in life. Make it count.",
    "Wishing you peace, love, and laughter in the new year!",
    "May all your dreams come true in the next year!"
  ];

  /* ================= DATE SETUP ================= */
  let currentYear = new Date().getFullYear();
  let targetDate = new Date(`${currentYear + 1}-01-01T00:00:00`);

  newYearText.textContent = currentYear;
  digit4.textContent = Math.floor((currentYear % 100) / 10);
  digit5.textContent = currentYear % 10;

  /* ================= FIREWORKS ================= */
  function launchFireworks(count = 40) {
    for (let i = 0; i < count; i++) {
      const fw = document.createElement("div");
      fw.className = "firework";
      fw.style.left = Math.random() * 100 + "vw";
      fw.style.top = Math.random() * 100 + "vh";
      fw.style.backgroundColor = randomColor();
      fireworksContainer.appendChild(fw);
      setTimeout(() => fw.remove(), 1500);
    }
  }

  function randomColor() {
    return ["#ff007f", "#ff9900", "#00ccff", "#66ff66", "#ff3333"]
      [Math.random() * 5 | 0];
  }

  setTimeout(() => launchFireworks(30), 800);

  /* ================= COUNTDOWN ================= */
  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      currentYear++;
      newYearText.textContent = currentYear;
      quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
      launchFireworks(80);

      targetDate = new Date(`${currentYear + 1}-01-01T00:00:00`);
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;

    countdown.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  setInterval(updateCountdown, 1000);
});
