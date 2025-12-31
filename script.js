document.addEventListener("DOMContentLoaded", () => {
  const countdown = document.getElementById("countdown");
  const quoteEl = document.getElementById("quote");
  const fullYearEl = document.getElementById("fullYear");
  const newYearText = document.getElementById("newYearText");
  const fireworksContainer = document.getElementById("fireworks-container");
  const bgMusic = document.getElementById("bgMusic");
  const startBtn = document.getElementById("startBtn");
  const tapIndicator = document.querySelector(".tap-indicator");

  // Ensure voices load (Chrome fix)
  speechSynthesis.onvoiceschanged = () => {};

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

  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = `"${selectedQuote}"`;

  function detectLang(text) {
    return /[अ-ह]/.test(text) ? "hi-IN" : "en-US";
  }

  function getBestFemaleVoice(lang) {
    const voices = speechSynthesis.getVoices();
    return voices.find(v =>
      v.lang.startsWith(lang) &&
      (v.name.toLowerCase().includes("female") ||
       v.name.toLowerCase().includes("woman") ||
       v.name.toLowerCase().includes("zira") ||
       v.name.toLowerCase().includes("samantha"))
    );
  }

  function speakHuman(text, lang) {
    return new Promise(resolve => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = 0.85;
      utter.pitch = 1.15;
      utter.volume = 1;

      const voice = getBestFemaleVoice(lang);
      if (voice) utter.voice = voice;

      utter.onend = resolve;
      speechSynthesis.speak(utter);
    });
  }

  /* ================= START EXPERIENCE ================= */
  startBtn.addEventListener("click", async () => {

    // ✅ Hide TAP ANYWHERE indicator
    if (tapIndicator) tapIndicator.classList.add("hide");

    startBtn.style.display = "none";
    speechSynthesis.cancel();

    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => {});

    if (!speechSynthesis.getVoices().length) {
      await new Promise(r => setTimeout(r, 300));
    }

    await speakHuman("Happy New Year", "en-US");
    await new Promise(r => setTimeout(r, 400));
    await speakHuman(selectedQuote, detectLang(selectedQuote));

    // 🔊 Smooth volume increase
    let vol = 0.2;
    const fade = setInterval(() => {
      vol += 0.05;
      bgMusic.volume = Math.min(vol, 0.7);
      if (vol >= 0.7) clearInterval(fade);
    }, 120);
  });

  /* ================= YEAR & COUNTDOWN ================= */
  let currentYear = new Date().getFullYear();
  let targetDate = new Date(`${currentYear + 1}-01-01T00:00:00`);

  function setYear(year) {
    fullYearEl.textContent = year;
    newYearText.textContent = year;
  }

  setYear(currentYear);

  function launchFireworks(count = 40) {
    for (let i = 0; i < count; i++) {
      const fw = document.createElement("div");
      fw.className = "firework";
      fw.style.left = Math.random() * 100 + "vw";
      fw.style.top = Math.random() * 100 + "vh";
      fireworksContainer.appendChild(fw);
      setTimeout(() => fw.remove(), 1500);
    }
  }

  setTimeout(() => launchFireworks(30), 800);

  function updateCountdown() {
    const diff = targetDate - new Date();

    if (diff <= 0) {
      currentYear++;
      setYear(currentYear);
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

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
