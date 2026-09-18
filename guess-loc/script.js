const seedMysteries = [
  {
    id: 29,
    title: "Old walls, warm light.",
    caption: "A slow walk through streets that remember another century.",
    author: "STONE_AND_SUN",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1400&q=85",
    answer: "Vigan, Philippines",
    city: "Vigan",
    country: "Philippines",
    guesses: 24,
  },
  {
    id: 28,
    title: "A river through the jungle.",
    caption: "The water is quiet, but the island is anything but empty.",
    author: "GREEN_ROOM",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chocolate_Hills_Bohol_1.jpg?width=1400",
    answer: "Bohol, Philippines",
    city: "Bohol",
    country: "Philippines",
    guesses: 33,
  },
  {
    id: 27,
    title: "Where the palm trees lean.",
    caption: "A board, a breeze, and a horizon with no hurry in it.",
    author: "WAVE_CHASER",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_Photo_of_Siargao_Island_(Coast_Guard1).jpg?width=1400",
    answer: "Siargao, Philippines",
    city: "Siargao",
    country: "Philippines",
    guesses: 46,
  },
  {
    id: 26,
    title: "Clouds over the summer capital.",
    caption: "Pine-scented air and a jacket you did not expect to need.",
    author: "HIGH_ROAD",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Baguio_view_5-19-23.jpg?width=1400",
    answer: "Baguio, Philippines",
    city: "Baguio",
    country: "Philippines",
    guesses: 29,
  },
  {
    id: 25,
    title: "A city framed by mountains.",
    caption: "The lights come on while the last color leaves the hills.",
    author: "SOUTHBOUND",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/People%27s_Park_Davao_City.jpg?width=1400",
    answer: "Davao, Philippines",
    city: "Davao",
    country: "Philippines",
    guesses: 37,
  },
  {
    id: 24,
    title: "A shoreline made for slow mornings.",
    caption: "Clear water, warm sand, and a boat waiting just offshore.",
    author: "ISLAND_EYES",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=85",
    answer: "Boracay, Philippines",
    city: "Boracay",
    country: "Philippines",
    guesses: 27,
  },
  {
    id: 23,
    title: "Green steps into the clouds.",
    caption: "The road gets quieter where the terraces begin.",
    author: "NORTHBOUND",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
    answer: "Banaue, Philippines",
    city: "Banaue",
    country: "Philippines",
    guesses: 35,
  },
  {
    id: 22,
    title: "Limestone walls, blue water.",
    caption: "Somewhere between the cliffs, the map starts to feel small.",
    author: "TIDE_MARKER",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    answer: "El Nido, Philippines",
    city: "El Nido",
    country: "Philippines",
    guesses: 42,
  },
  {
    id: 21,
    title: "The city keeps moving after sunset.",
    caption: "Neon, traffic, and one more stop before heading home.",
    author: "CITY_WALKER",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Manila%2C_Intramuros%2C_Philippines.jpg?width=1400",
    answer: "Manila, Philippines",
    city: "Manila",
    country: "Philippines",
    guesses: 51,
  },
  {
    id: 20,
    title: "A blue edge to the weekend.",
    caption: "The kind of afternoon that makes a ferry ride worth taking.",
    author: "COASTAL_NOTES",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cebu_City%2C_Philippines_(Unsplash_yPbBYE1pkHo).jpg?width=1400",
    answer: "Cebu, Philippines",
    city: "Cebu",
    country: "Philippines",
    guesses: 38,
  },
  {
    id: 19,
    title: "A road that feels like a beginning.",
    caption:
      "No clues in the caption. Just the feeling of a long drive and somewhere new.",
    author: "ANONYMOUS_TRAVELER",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    answer: "Queenstown, New Zealand",
    city: "Queenstown",
    country: "New Zealand",
    guesses: 18,
  },
  {
    id: 18,
    title: "The morning market is awake.",
    caption: "Colors, noise, and the best kind of breakfast rush.",
    author: "HIDDEN_FRAME",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
    answer: "Marrakech, Morocco",
    city: "Marrakech",
    country: "Morocco",
    guesses: 31,
  },
  {
    id: 17,
    title: "Blue hour on the water.",
    caption: "Some cities wear the evening beautifully.",
    author: "NO_NAME_YET",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=85",
    answer: "Paris, France",
    city: "Paris",
    country: "France",
    guesses: 44,
  },
];
const locationHints = {
  Vigan: "Look for Spanish-era streets and cobblestones in Ilocos Norte.",
  Bohol: "Look for the famous Chocolate Hills on this Central Visayas island.",
  Siargao: "Look for coconut palms and surf breaks in General Luna.",
  Baguio: "Look for pine trees and cool mountain roads in Benguet.",
  Davao: "Look for People's Park or Mount Apo clues in Mindanao.",
  Boracay: "Look for White Beach and its famous powdery sand.",
  Banaue: "Look for the Ifugao rice terraces carved into the mountains.",
  "El Nido": "Look for limestone karst islands around Bacuit Bay.",
  Manila: "Look for Intramuros walls or Manila Bay city details.",
  Cebu: "Look for Cebu City skyline, port, or heritage landmarks.",
  Queenstown: "Look for alpine peaks beside a deep blue lake.",
  Marrakech: "Look for a red-walled medina and busy souks.",
  Paris: "Look for the Seine, grand boulevards, or a familiar iron landmark.",
};
const seedGuesses = [
  {
    place: "Lisbon, Portugal",
    result: "Same continent",
    points: "+100",
    ago: "Yesterday",
  },
  {
    place: "Osaka, Japan",
    result: "Not quite",
    points: "+0",
    ago: "2 days ago",
  },
  {
    place: "Cebu, Philippines",
    result: "Same country",
    points: "+100",
    ago: "3 days ago",
  },
];
const seedPlaces = [
  {
    name: "Boracay, Philippines",
    count: 112,
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Banaue, Philippines",
    count: 104,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Banaue_Rice_Terraces_Ifugao.jpg?width=800",
  },
  {
    name: "El Nido, Philippines",
    count: 96,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Manila, Philippines",
    count: 89,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Manila%2C_Intramuros%2C_Philippines.jpg?width=800",
  },
  {
    name: "Queenstown, New Zealand",
    count: 128,
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Marrakech, Morocco",
    count: 97,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Paris, France",
    count: 86,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
];
const leaderboard = [
  { name: "Nadia Cruz", points: 3210, guesses: 19, initials: "NC" },
  { name: "Theo Lim", points: 2860, guesses: 16, initials: "TL" },
  { name: "Mika Santos", points: 2480, guesses: 14, initials: "MS" },
  { name: "Kai Rivera", points: 2310, guesses: 13, initials: "KR" },
  { name: "Jessa Reyes", points: 1840, guesses: 11, initials: "JR" },
];
const key = "guess-location-data";
const saved = JSON.parse(localStorage.getItem(key) || "null");
const state = saved || {
  mysteries: seedMysteries,
  guesses: seedGuesses,
  totalScore: 1840,
  guessed: false,
  hintUsed: false,
};
if (saved) {
  const existingMysteryIds = new Set(state.mysteries.map((mystery) => mystery.id));
  const seedMysteriesById = new Map(
    seedMysteries.map((mystery) => [mystery.id, mystery]),
  );
  state.mysteries = [
    ...seedMysteries.filter((mystery) => !existingMysteryIds.has(mystery.id)),
    ...state.mysteries.map((mystery) =>
      seedMysteriesById.has(mystery.id)
        ? { ...mystery, image: seedMysteriesById.get(mystery.id).image }
        : mystery,
    ),
  ];
}
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
function persist() {
  localStorage.setItem(key, JSON.stringify(state));
}
function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  setTimeout(() => element.classList.remove("show"), 2300);
}
function switchView(view) {
  $$(".view").forEach((item) =>
    item.classList.toggle("active", item.id === `${view}View`),
  );
  $$(".nav-link").forEach((item) =>
    item.classList.toggle("active", item.dataset.view === view),
  );
  if (view === "places") renderPlaces();
  if (view === "scores") renderScores();
  if (view === "play") renderPlay();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function currentMystery() {
  return state.mysteries[0];
}
function renderPlay() {
  const mystery = currentMystery();
  $("#mysteryImage").src = mystery.image;
  $("#mysteryTitle").textContent = mystery.title;
  $("#mysteryCaption").textContent = mystery.caption;
  $("#postAuthor").textContent = mystery.author;
  $("#guessCount").textContent = mystery.guesses;
  $("#totalScore").textContent = state.totalScore.toLocaleString();
  $("#recentGuesses").innerHTML = state.guesses
    .slice(0, 3)
    .map(
      (guess) =>
        `<div class="recent-guess"><div><b>${escapeHtml(guess.place)}</b><span>${escapeHtml(guess.result)} · ${guess.ago}</span></div><strong>${guess.points} XP</strong></div>`,
    )
    .join("");
  $("#placeBars").innerHTML = seedPlaces
    .map(
      (place, index) =>
        `<div class="place-bar"><label><span>${place.name}</span><b>${place.count}</b></label><div class="bar-track"><i style="width:${100 - index * 19}%"></i></div></div>`,
    )
    .join("");
  if (state.guessed) showReveal(false);
  else {
    $("#answerShield").classList.remove("hidden");
    $("#guessPanel").classList.remove("hidden");
    $("#revealPanel").classList.add("hidden");
    $("#guessInput").value = "";
  }
}
function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
}
function guessScore(input, mystery) {
  const clean = input.toLowerCase();
  if (clean.includes(mystery.city.toLowerCase()))
    return { points: 500, result: "Exact city" };
  if (clean.includes(mystery.country.toLowerCase()))
    return { points: 100, result: "Same country" };
  return { points: 0, result: "Not quite" };
}
function showReveal(showToast = true) {
  const mystery = currentMystery();
  $("#answerShield").classList.add("hidden");
  $("#guessPanel").classList.add("hidden");
  $("#revealPanel").classList.remove("hidden");
  $("#answerText").textContent = mystery.answer;
  if (showToast) toast("Location revealed. Nice guessing.");
}
function submitGuess() {
  if (state.guessed) return;
  const input = $("#guessInput");
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }
  const result = guessScore(value, currentMystery());
  state.guesses.unshift({
    place: value,
    result: result.result,
    points: `+${result.points}`,
    ago: "Just now",
  });
  state.totalScore += result.points;
  state.guessed = true;
  currentMystery().guesses += 1;
  persist();
  $("#resultText").textContent =
    result.result === "Exact city"
      ? "You found the exact city. Sharp eyes."
      : result.result === "Same country"
        ? "You got the country. Keep chasing the details."
        : "A brave guess. The world is still full of places.";
  $("#earnedPoints").textContent = `+${result.points} XP`;
  showReveal();
  renderPlay();
}
function playAgain() {
  const completedMystery = state.mysteries.shift();
  state.mysteries.push(completedMystery);
  state.guessed = false;
  state.hintUsed = false;
  persist();
  renderPlay();
  toast("New mystery loaded. Make your next guess.");
}
function renderPlaces() {
  $("#placesGrid").innerHTML = seedPlaces
    .map(
      (place) =>
        `<article class="place-card"><img src="${place.image}" alt="${place.name}" /><div><h3>${place.name}</h3><p>${place.count} mysteries revealed here</p></div></article>`,
    )
    .join("");
}
function renderScores() {
  $("#leaderboard").innerHTML = leaderboard
    .map(
      (person, index) =>
        `<div class="leader-row"><strong>#${String(index + 1).padStart(2, "0")}</strong><span class="leader-user"><span class="rank-avatar">${person.initials}</span>${person.name}</span><em>${person.guesses} guesses</em><span>${person.points.toLocaleString()} XP</span></div>`,
    )
    .join("");
}
function openPostModal() {
  $("#postModal").classList.add("open");
  $("#postForm input")[0].focus();
}
function closePostModal() {
  $("#postModal").classList.remove("open");
}
function submitPost(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  state.mysteries.unshift({
    id: Date.now(),
    title: form.get("title"),
    caption: form.get("caption") || "A place waiting to be found.",
    author: "JESSA_REYES",
    image: form.get("image"),
    answer: form.get("location"),
    city: form.get("location").split(",")[0].trim(),
    country: form.get("location").split(",")[1]?.trim() || form.get("location"),
    guesses: 0,
  });
  state.guessed = false;
  persist();
  closePostModal();
  event.target.reset();
  renderPlay();
  toast("Mystery posted. Let them guess.");
}
$$("[data-view]").forEach((button) =>
  button.addEventListener("click", () => switchView(button.dataset.view)),
);
$("#guessSubmit").addEventListener("click", submitGuess);
$("#playAgainButton").addEventListener("click", playAgain);
$("#guessInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") submitGuess();
});
$("#hintButton").addEventListener("click", () => {
  if (state.hintUsed) return toast("Hint already used for this mystery.");
  state.hintUsed = true;
  const mystery = currentMystery();
  toast(`Hint: ${locationHints[mystery.city] || `Think about ${mystery.country}.`}`);
});
$("#closeModal").addEventListener("click", closePostModal);
$("#postForm").addEventListener("submit", submitPost);
$("#postModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) closePostModal();
});
renderPlay();
renderPlaces();
renderScores();
