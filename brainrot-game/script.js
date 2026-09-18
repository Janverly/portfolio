const rounds = [
  {
    tag: "AURA CHECK",
    copy: "you enter the room\nwith no plan",
    caption: "everyone looks at you",
    question: "Anong tawag sa confidence na walang ebidensya?",
    answers: [
      "Main character energy",
      "+1000 aura",
      "Delulu pero productive",
      "All of the above",
    ],
    correct: 3,
    note: "Correct. Hindi ka delulu, ikaw ay visionary.",
  },
  {
    tag: "NONCHALANT ERA",
    copy: "‘okay lang ako’\npero naka-12 stories",
    caption: "seen 2:14 AM",
    question: "Ano ang totoong translation ng ‘nonchalant’ sa group chat?",
    answers: [
      "Walang pakialam",
      "May pakialam pero aesthetic",
      "Natutulog talaga",
      "Naka-airplane mode",
    ],
    correct: 1,
    note: "Correct. Nonchalant outside, teleserye inside.",
  },
  {
    tag: "BUDGET CORE",
    copy: "₱50 budget\n₱49.50 iced coffee",
    caption: "financial decisions",
    question: "Ano ang natitirang budget para sa pamasahe?",
    answers: [
      "₱0.50 at dasal",
      "May GCash naman",
      "Utang muna kay mama",
      "Lahat ng nasa taas",
    ],
    correct: 3,
    note: "Correct. The Philippine economy is built on ‘send gcash pls’.",
  },
  {
    tag: "COMMENT SECTION",
    copy: "‘first’\n‘notice me’\n‘from tiktok?’",
    caption: "the comments arrived before the video",
    question: "Ano ang tunay na main character sa Filipino TikTok?",
    answers: [
      "The creator",
      "The sound",
      "The comment section",
      "The algorithm",
    ],
    correct: 2,
    note: "Correct. The comments are writing a better plot.",
  },
  {
    tag: "BRAINROT ALERT",
    copy: "skibidi\nhelp me\nwala na akong maintindihan",
    caption: "brain cells: offline",
    question: "Ano ang best response sa malalang brainrot?",
    answers: [
      "Touch grass",
      "Mag-TikTok pa",
      "Matulog",
      "Touch grass habang naka-TikTok",
    ],
    correct: 3,
    note: "Correct-ish. At least may grass sa sentence.",
  },
  {
    tag: "TITA MATH",
    copy: "‘discount yan’\npero 3x bumili",
    caption: "sale is a lifestyle",
    question: "Kailan naging tipid ang paggastos?",
    answers: [
      "Kapag may free shipping",
      "Kapag may voucher",
      "Kapag sinabi ni Tita",
      "Kapag hindi mo sinabi kay Mama",
    ],
    correct: 2,
    note: "Correct. Tita math is an exact science.",
  },
  {
    tag: "FILIPINO TIME",
    copy: "5 minutes away\n(umalis pa lang)",
    caption: "ETA: emotionally soon",
    question: "Anong oras talaga darating ang ‘papunta na ako’?",
    answers: ["5 minutes", "30 minutes", "Kapag tapos na ang event", "Secret"],
    correct: 2,
    note: "Correct. Time is a social construct, apparently.",
  },
  {
    tag: "FINAL BOSS",
    copy: "‘sige ikaw bahala’",
    caption: "the most dangerous sentence",
    question: "Ano ang tamang next move?",
    answers: [
      "Choose anything",
      "Ask ‘sure ka?’ 3 times",
      "Prepare for consequences",
      "Mag-sorry agad",
    ],
    correct: 1,
    note: "Correct. You have survived the Filipino group chat.",
  },
];
let index = 0,
  score = 0,
  streak = 0,
  answered = false;
const $ = (s) => document.querySelector(s);
function render() {
  const r = rounds[index];
  answered = false;
  $("#roundLabel").textContent =
    `ROUND ${String(index + 1).padStart(2, "0")} / ${String(rounds.length).padStart(2, "0")}`;
  $("#score").textContent = score.toLocaleString();
  $("#progressBar").style.width = `${(index / rounds.length) * 100}%`;
  $("#tag").textContent = r.tag;
  $("#visualCopy").textContent = r.copy;
  $("#visualCaption").textContent = r.caption;
  $("#question").textContent = r.question;
  $("#feedback").textContent =
    "Pili ka nang maayos. Walang edit button sa buhay.";
  $("#nextButton").classList.add("hidden");
  $("#answers").innerHTML = r.answers
    .map(
      (answer, i) =>
        `<button class="answer" data-index="${i}"><span>${String.fromCharCode(65 + i)}</span>${answer}</button>`,
    )
    .join("");
  document
    .querySelectorAll(".answer")
    .forEach((button) => button.addEventListener("click", choose));
}
function choose(event) {
  if (answered) return;
  answered = true;
  const selected = Number(event.currentTarget.dataset.index);
  const r = rounds[index];
  const buttons = [...document.querySelectorAll(".answer")];
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === r.correct) button.classList.add("correct");
    if (i === selected && selected !== r.correct) button.classList.add("wrong");
  });
  if (selected === r.correct) {
    score += 100;
    streak += 1;
    $("#feedback").textContent = r.note;
  } else {
    streak = 0;
    $("#feedback").textContent =
      `Wrong answer. The correct vibe was “${r.answers[r.correct]}”.`;
  }
  $("#score").textContent = score.toLocaleString();
  $("#streak").textContent = streak;
  $("#nextButton").classList.remove("hidden");
}
function next() {
  index += 1;
  if (index >= rounds.length) return finish();
  render();
}
function finish() {
  $("#roundLabel").textContent = "GAME COMPLETE";
  $("#progressBar").style.width = "100%";
  $("#tag").textContent = "FINAL SCORE";
  $("#visualCopy").textContent = `${score}\nAURA POINTS`;
  $("#visualCaption").textContent = streak
    ? `${streak} streak. Grabe ang lock-in.`
    : "Bawi next game, boss.";
  $("#question").textContent =
    score >= 600
      ? "Certified Filipino meme scholar ka."
      : "May potential. Kailangan lang ng konting scroll.";
  $("#answers").innerHTML = "";
  $("#feedback").textContent = `Final score: ${score} aura points.`;
  $("#nextButton").textContent = "PLAY AGAIN ↻";
  $("#nextButton").classList.remove("hidden");
  $("#nextButton").onclick = () => {
    index = 0;
    score = 0;
    streak = 0;
    $("#nextButton").textContent = "NEXT MEME →";
    $("#nextButton").onclick = next;
    render();
  };
}
$("#nextButton").addEventListener("click", next);
render();
