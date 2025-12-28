document.addEventListener("DOMContentLoaded", () => {
  const countdown = document.getElementById("countdown");
  const quote = document.getElementById("quote");
  const fullYearEl = document.getElementById("fullYear");
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
    "May all your dreams come true in the next year!",
    "New year. New dreams. New beginnings.",
    "Every end is a new beginning. Welcome the New Year!",
    "This year, be fearless in the pursuit of your dreams.",
    "Leave the past behind and embrace the future.",
    "A fresh start begins today.",
    "May the coming year bring happiness and success.",
    "Turn the page. A new story begins now.",
    "Dream big. Start fresh. Shine brighter.",
    "Let go of what was and welcome what will be.",
    "New Year, new hopes, new opportunities.",
    "Make this year unforgettable.",
    "Your future starts now. Happy New Year!",
    "Celebrate endings, for they precede new beginnings.",
    "Step into the New Year with confidence and courage.",
    "Every moment is a chance to begin again."
  ];

  /* ================= YEAR SETUP ================= */
  let currentYear = new Date().getFullYear();
  let targetDate = new Date(`${currentYear + 1}-01-01T00:00:00`);

  function setYear(year) {
    fullYearEl.textContent = year;
    newYearText.textContent = year;
  }

  setYear(currentYear);

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
    const colors = ["#ff007f", "#ff9900", "#00ccff", "#66ff66", "#ff3333"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  setTimeout(() => launchFireworks(30), 800);

  /* ================= COUNTDOWN ================= */
  function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) {
      currentYear++;
      setYear(currentYear);
      quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
      launchFireworks(80);
      targetDate = new Date(`${currentYear + 1}-01-01T00:00:00`);
      diff = targetDate - now;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;

    countdown.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
