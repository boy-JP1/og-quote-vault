const quotes = [
  "Stay low, move smart. Let results speak.",
  "You ain't broke, you're pre-rich.",
  "Don't wait for chances. Take the damn shot.",
  "Stack now, flex later.",
  "Discipline > Motivation. Every time.",
  "Respect is earned in silence, not noise.",
  "The grind won't betray you.",
  "Make your next move your best move.",
  "Loyalty is rare — value it.",
  "Fear is fake. Hustle is real.",
  "Excuses never paid the bills.",
  "Plan like a nerd. Execute like a savage.",
  "Talk less, build more.",
  "Never beg for a seat. Build your own table.",
  "The streets don’t sleep — neither should your vision.",
  "You don’t need a team to start. You need a reason.",
  "Small moves daily. Big results eventually.",
  "If it costs your peace, it’s too expensive.",
  "Starve your distractions. Feed your grind.",
  "Turn pain into product.",
  "Some people hustle. Others just post about it.",
  "You were born broke. Staying broke is a choice.",
  "You can’t flex a lazy grind.",
  "No plan B — make plan A work.",
  "Ambition hits different when you’re tired of being average.",
  "Quiet minds create loud empires.",
  "They slept on you? Cool. Let ‘em snore.",
  "Let the vision be louder than the noise.",
  "Chase progress, not people.",
  "Your vibe attracts your vision.",
  "Consistency eats talent when talent sleeps.",
  "Burn the blueprint if it doesn’t fit your dream.",
  "Don’t explain. Dominate.",
  "Work in silence. Let your site talk.",
  "Your past is fuel, not a finish line.",
  "No emotion in business. Just motion.",
];

let autoRefresh = null;
let selectedRating = 0;

// ===================== QUOTES ====================
function generateQuote() {
  const quoteElement = document.getElementById("quote");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
}

function copyQuote() {
  const quote = document.getElementById("quote").textContent;
  navigator.clipboard
    .writeText(quote)
    .then(() => alert("✅ Quote copied to clipboard!"))
    .catch(() => alert("❌ Failed to copy."));
}

function toggleMode() {
  document.body.classList.toggle("light-mode");
}

function toggleAutoRefresh() {
  const toggle = document.getElementById("autoRefreshToggle");
  if (toggle.checked) {
    autoRefresh = setInterval(generateQuote, 10000);
  } else {
    clearInterval(autoRefresh);
    autoRefresh = null;
  }
}

// ===================== RATING =====================
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
      const value = parseInt(star.dataset.value);
      highlightStars(value);
    });

    star.addEventListener("mouseleave", () => {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.value);
      highlightStars(selectedRating);
    });
  });

  if (!localStorage.getItem("hasRated")) {
    randomPopupDelay();
  }
});

function highlightStars(rating) {
  document.querySelectorAll(".star").forEach((star) => {
    const value = parseInt(star.dataset.value);
    star.classList.toggle("selected", value <= rating);
  });
}

function sendRating() {
  if (selectedRating === 0) {
    alert("Please select a rating before sending!");
    return;
  }

  document.getElementById("thankYouMessage").textContent =
    "Thanks for rating us ${selectedRating} star${selectedRating > 1 ? 's' : ''}!";

  localStorage.setItem("hasRated", "true");

  setTimeout(() => {
    document.getElementById("ratingModal").style.display = "none";
    selectedRating = 0;
    highlightStars(0);
  }, 2000);
}

function randomPopupDelay() {
  const delay = Math.floor(Math.random() * (40000 - 15000) + 15000);
  setTimeout(() => {
    document.getElementById("ratingModal").style.display = "flex";
  }, delay);
}
// ===================== MOOD POPUP =====================
// Show popup on load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mood-popup").style.display = "flex";
});

// Handle mood
function handleMood(mood) {
  if (mood === "sad") {
    generateQuote("hope");
  } else if (mood === "angry") {
    generateQuote("calm");
  } else if (mood === "happy") {
    generateQuote("rizz");
  }
  closePopup();
}
window.addEventListener("load", () => {
  setTimeout(() => {
    document
      .getElementById("bgMusic")
      .play()
      .catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
  }, 10000);
});

function closePopup() {
  document.getElementById("mood-popup").style.display = "none";
}
// ========== QUOTE CATEGORIES ==========
const rizzQuotes = [
  "You're the reason mirrors exist.",
  "Even the stars get jealous of your shine.",
  "You're not just a vibe, you're the whole universe.",
];

const hopeQuotes = [
  "Even the darkest night ends with sunrise.",
  "You're stronger than you think.",
  "Storms don’t last forever.",
];

const calmQuotes = [
  "Take a breath — peace begins within.",
  "Let it go. Peace is better than pride.",
  "Silence is sometimes the best answer.",
];

// ========== QUOTE GENERATOR ==========
function generateQuote(type) {
  let quote;
  if (type === "rizz") {
    quote = rizzQuotes[Math.floor(Math.random() * rizzQuotes.length)];
  } else if (type === "hope") {
    quote = hopeQuotes[Math.floor(Math.random() * hopeQuotes.length)];
  } else if (type === "calm") {
    quote = calmQuotes[Math.floor(Math.random() * calmQuotes.length)];
  } else {
    quote = "Click a quote type to get inspired!";
  }

  document.getElementById("quote-text").textContent = "${quote}";
}

// ========== SAVE TO FAVORITES ==========
function saveFavorite() {
  const currentQuote = document.getElementById("quote-text").textContent;
  if (
    !currentQuote ||
    currentQuote === '"Click the button below to generate a quote."'
  ) {
    alert("Please generate a quote first.");
    return;
  }

  let favorites =
    JSON.parse(localStorage.getItem("quotevault_favorites")) || [];
  if (!favorites.includes(currentQuote)) {
    favorites.push(currentQuote);
    localStorage.setItem("quotevault_favorites", JSON.stringify(favorites));
    alert("Saved to favorites!");
  } else {
    alert("Already in favorites.");
  }
}

// ========== SHOW USERNAME ==========
window.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("quotevault_user");
  if (userName && document.getElementById("user-name")) {
    document.getElementById("user-name").textContent = userName;
  }

  // Visitor Count
  let count = localStorage.getItem("quotevault_visits") || 0;
  count++;
  localStorage.setItem("quotevault_visits", count);
  const vc = document.getElementById("visitor-count");
  if (vc) vc.textContent = count;
});
