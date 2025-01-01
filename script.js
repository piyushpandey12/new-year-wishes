document.addEventListener("DOMContentLoaded", () => {
  const countdown = document.getElementById("countdown");
  const quote = document.getElementById("quote");
  const digit4 = document.getElementById("digit4");
  const digit5 = document.getElementById("digit5");

  const quotes = [
    "Cheers to a new year and another chance for us to get it right!",
    "The best is yet to come. Happy New Year!",
    "A new year is a fresh chapter in life. Make it count.",
    "Wishing you peace, love, and laughter in the new year!",
    "May all your dreams come true in 2025!",
    "2025 का नये साल का है संदेश, खुशियों से भरा रहे हर दिन का अंदेशा. आपके लिए लाए नए रंग, नए सपने, हैप्पी न्यू ईयर 2025 का यह शानदार उपहार!",
    "New dreams, new hopes, and new cheer, Let's welcome 2025 with no fear. Happy New Year 2025 to you and yours, May this year open golden doors!",
    "May your year be filled with endless joy, new opportunities, and unforgettable memories.",
    "Wishing you a year of health, happiness, and success in everything you do.",
    "May the new year bring brighter days, bigger dreams, and beautiful beginnings.",
    "Let us leave behind our arguments and look forward to a wonderful 2025!",
    "Life is too short to hold grudges. So, spread love and be happy.",
    "Always dream big and don't forget to make the most of this new year.",
    "A new year signifies a year full of hope and new experiences.",
    "Let's start 2025 with hope and a grateful heart.",
    "Every great dream begins with a dreamer.",
    "Kindness is free; sprinkle it everywhere.",
  ];

  // Trigger digit animation
  setTimeout(() => {
    digit4.style.transform = "translateY(-100%)"; // Move "4" up
    digit5.style.transform = "translateY(0)"; // Move "5" into place
  }, 500);

  // Firework and background animation
  document.getElementById("fireworkBtn").addEventListener("click", () => {
    const container = document.getElementById("fireworks-container");

    // Change the quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quote.textContent = quotes[randomIndex];

    // Generate fireworks
    for (let i = 0; i < 30; i++) {
      const firework = document.createElement("div");
      firework.classList.add("firework");
      firework.style.left = `${Math.random() * 100}vw`;
      firework.style.top = `${Math.random() * 100}vh`;
      firework.style.backgroundColor = getRandomColor();

      container.appendChild(firework);

      // Remove the firework after the animation
      setTimeout(() => firework.remove(), 1500);
    }
  });

  function getRandomColor() {
    const colors = ["#ff007f", "#ff9900", "#00ccff", "#66ff66", "#ff3333"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});
