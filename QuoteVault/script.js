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
