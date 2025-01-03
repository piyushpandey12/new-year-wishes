document.addEventListener("DOMContentLoaded", () => {
  const countdown = document.getElementById("countdown");
  const quote = document.getElementById("quote");
  const digit4 = document.getElementById("digit4");
  const digit5 = document.getElementById("digit5");
  const newYearText = document.getElementById("newYearText");

  const quotes = [
    "Cheers to a new year and another chance for us to get it right!",
    "The best is yet to come. Happy New Year!",
    "A new year is a fresh chapter in life. Make it count.",
    "Wishing you peace, love, and laughter in the new year!",
    "May all your dreams come true in the next year!",
  ];

  const now = new Date();
  const currentYear = now.getFullYear(); // Get the current year (2025 in this case)

  // Set next year based on the current year
  const nextYear = currentYear + 1;

  // Set the initial year in the greeting
  newYearText.textContent = currentYear; // Start with the current year

  // Set initial digits for the transition animation
  digit4.textContent = Math.floor((currentYear % 100) / 10); // Tens place
  digit5.textContent = currentYear % 10; // Units place

  const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);

  function updateCountdown() {
    const now = new Date();
    const diff = newYearDate - now;

    if (diff <= 0) {
      // Update to "Happy New Year" when the countdown ends
      newYearText.textContent = nextYear; // Set to 2025 correctly
      document.querySelector(".container").classList.add("celebrate");
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Digit transition animation for the year
    if (diff > 0 && days < 365) {
      digit4.style.transform = "translateY(-100%)";
      digit5.style.transform = "translateY(0)";
    }
  }

  const countdownInterval = setInterval(updateCountdown, 1000);

  document.getElementById("fireworkBtn").addEventListener("click", () => {
    const container = document.getElementById("fireworks-container");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quote.textContent = quotes[randomIndex];

    for (let i = 0; i < 30; i++) {
      const firework = document.createElement("div");
      firework.classList.add("firework");
      firework.style.left = `${Math.random() * 100}vw`;
      firework.style.top = `${Math.random() * 100}vh`;
      firework.style.backgroundColor = getRandomColor();

      container.appendChild(firework);

      setTimeout(() => firework.remove(), 1500);
    }
  });

  function getRandomColor() {
    const colors = ["#ff007f", "#ff9900", "#00ccff", "#66ff66", "#ff3333"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});
