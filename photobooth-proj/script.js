const state = {
  photos: [],
  template: "classic",
  filter: "original",
  background: "paper",
  caption: "A little memory",
  stream: null,
  facingMode: "user",
  editingId: null,
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const storageKey = "snapbox-sessions";
const getSessions = () => JSON.parse(localStorage.getItem(storageKey) || "[]");
const saveSessions = (sessions) => {
  localStorage.setItem(storageKey, JSON.stringify(sessions));
  updateSessionCount();
};

function showScreen(name) {
  $$(".screen").forEach((screen) =>
    screen.classList.toggle("active", screen.id === `${name}Screen`),
  );
  $$(".nav-link").forEach((link) =>
    link.classList.toggle("active", link.dataset.screen === name),
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "sessions") renderSessions();
}

function updateSessionCount() {
  const count = getSessions().length;
  $("#sessionCount").textContent = count;
  $("#sessionTotal").textContent = count;
}
function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  setTimeout(() => element.classList.remove("show"), 2600);
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    $("#cameraStatus").textContent = "USE PHONE CAMERA";
    $("#cameraHelp").textContent =
      "Webcam access needs HTTPS. Use the phone camera button below.";
    toast("Use the phone camera button to take a photo.");
    return;
  }

  $("#cameraStatus").textContent = "REQUESTING CAMERA";
  $("#cameraHelp").textContent = "Allow camera access in your browser prompt.";
  $("#startCamera").disabled = true;

  try {
    if (state.stream) state.stream.getTracks().forEach((track) => track.stop());
    state.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: state.facingMode,
        width: { ideal: 1280 },
        height: { ideal: 800 },
      },
      audio: false,
    });
    $("#camera").srcObject = state.stream;
    $("#cameraPlaceholder").classList.add("hidden");
    $("#cameraStatus").textContent = "LIVE CAMERA";
    $("#captureButton").disabled = false;
  } catch (error) {
    $("#startCamera").disabled = false;
    $("#cameraStatus").textContent = "CAMERA UNAVAILABLE";
    $("#cameraHelp").textContent =
      error.name === "NotAllowedError"
        ? "Camera access was blocked. Allow it in site settings, then try again."
        : "Camera could not start. Check that it is connected and not in use.";
    toast(
      "Camera could not start. You can use the phone camera option instead.",
    );
  }
}

function updateCaptureUi() {
  const remaining = 3 - state.photos.length;
  $("#shotCounter").textContent = `${state.photos.length} / 3`;
  $("#captureLabel").textContent = remaining
    ? `Take photo ${state.photos.length + 1}`
    : "All photos captured";
  $("#captureHint").textContent = remaining
    ? `${remaining} photo${remaining === 1 ? "" : "s"} remaining`
    : "Ready to customize your strip";
  $("#captureButton").disabled = remaining === 0;
  $("#saveAllButton").disabled = state.photos.length === 0;
}
function addThumbnail(dataUrl) {
  const item = document.createElement("div");
  item.className = "thumbnail";
  item.innerHTML = `<img src="${dataUrl}" alt="Captured photo ${state.photos.length}" />`;
  $("#thumbnailRow").appendChild(item);
}
function saveAllPhotos() {
  if (!state.photos.length) {
    toast("Take photos before saving them.");
    return;
  }
  state.photos.forEach((photo, index) => {
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `snapbox-photo-${index + 1}.jpg`;
      link.href = photo;
      link.click();
    }, index * 250);
  });
  toast(`${state.photos.length} photos sent to your downloads.`);
}
function addPhonePhoto(file) {
  if (!file || state.photos.length >= 3) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.photos.push(reader.result);
    addThumbnail(reader.result);
    updateCaptureUi();
    $("#cameraStatus").textContent = "PHONE CAMERA";
    $("#cameraHelp").textContent =
      "Photo added. Take another or continue to customize.";
  };
  reader.readAsDataURL(file);
}
function capturePhoto() {
  if (!state.stream || state.photos.length >= 3) return;
  const countdown = $("#countdown");
  let number = 3;
  countdown.textContent = number;
  countdown.classList.remove("show");
  void countdown.offsetWidth;
  countdown.classList.add("show");
  const interval = setInterval(() => {
    number -= 1;
    if (number > 0) {
      countdown.textContent = number;
    } else {
      clearInterval(interval);
      const video = $("#camera");
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 960;
      canvas.height = video.videoHeight || 600;
      const context = canvas.getContext("2d");
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/jpeg", 0.86);
      state.photos.push(image);
      addThumbnail(image);
      updateCaptureUi();
    }
  }, 650);
}
function renderStrip() {
  $("#stripPhotos").innerHTML = state.photos
    .map(
      (photo, index) =>
        `<img class="strip-photo" src="${photo}" alt="Photo ${index + 1}" />`,
    )
    .join("");
  const strip = $("#photoStrip");
  strip.className = `photo-strip template-${state.template} bg-${state.background}`;
  strip.style.setProperty("--photo-filter", filterValue(state.filter));
  $("#stripCaptionPreview").textContent = state.caption || "A little memory";
}
function openCustomize() {
  renderStrip();
  showScreen("customize");
}
function resetBooth() {
  state.photos = [];
  $("#thumbnailRow").innerHTML = "";
  updateCaptureUi();
  showScreen("booth");
}
function openSaveDialog() {
  if (!state.photos.length) {
    toast("Take at least one photo before saving.");
    return;
  }
  $("#sessionName").value = state.editingId
    ? getSessions().find((session) => session.id === state.editingId)?.name ||
      ""
    : "";
  $("#sessionDialog").showModal();
}
function saveCurrentSession() {
  const name = $("#sessionName").value.trim();
  if (!name) return;
  const sessions = getSessions();
  const session = {
    id: state.editingId || crypto.randomUUID(),
    name,
    caption: state.caption,
    template: state.template,
    filter: state.filter,
    background: state.background,
    photos: state.photos,
    createdAt: state.editingId
      ? sessions.find((item) => item.id === state.editingId)?.createdAt
      : new Date().toISOString(),
  };
  const existingIndex = sessions.findIndex((item) => item.id === session.id);
  if (existingIndex > -1) sessions[existingIndex] = session;
  else sessions.unshift(session);
  saveSessions(sessions);
  state.editingId = null;
  $("#sessionDialog").close();
  toast(
    existingIndex > -1 ? "Session updated." : "Session saved to your archive.",
  );
  showScreen("sessions");
}
function renderSessions() {
  const query = $("#sessionSearch").value.trim().toLowerCase();
  const sessions = getSessions().filter(
    (session) =>
      session.name.toLowerCase().includes(query) ||
      session.caption.toLowerCase().includes(query),
  );
  $("#sessionsGrid").innerHTML = sessions
    .map(
      (session) =>
        `<article class="session-card"><div class="session-preview template-${session.template || "classic"} bg-${session.background}" style="--session-bg: ${backgroundColor(session.background)}; --session-filter: ${filterValue(session.filter)}">${session.photos.map((photo, index) => `<img src="${photo}" alt="${session.name} photo ${index + 1}" />`).join("")}</div><div class="session-info"><h3>${escapeHtml(session.name)}</h3><p>${formatDate(session.createdAt)} · ${escapeHtml(session.caption)}</p><div class="session-actions"><button data-action="view" data-id="${session.id}">View strip ↗</button><button data-action="edit" data-id="${session.id}">Edit</button><button data-action="print" data-id="${session.id}">Print</button><button data-action="download" data-id="${session.id}">PNG</button><button class="delete" data-action="delete" data-id="${session.id}">Delete</button></div></div></article>`,
    )
    .join("");
  $("#emptyState").style.display = sessions.length ? "none" : "block";
}
function backgroundColor(background) {
  return (
    {
      blush: "#e9b6a8",
      ink: "#1e1e1c",
      lemon: "#f2d75f",
      mint: "#b9d1a9",
      paper: "#fffdf8",
    }[background] || "#fffdf8"
  );
}
function filterValue(filter) {
  return (
    {
      original: "none",
      bw: "grayscale(1)",
      vintage: "sepia(.45) saturate(.8)",
      warm: "sepia(.15) saturate(1.25)",
      cool: "saturate(.8) hue-rotate(12deg)",
    }[filter] || "none"
  );
}
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
function escapeHtml(value) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ],
  );
}
function xmlEscape(value) {
  return escapeHtml(String(value));
}
function templateStyle(template, fallbackBackground) {
  return (
    {
      olive: {
        background: "#515838",
        ink: "#f5efe4",
        accent: "#ebb15b",
        border: "#f5efe4",
      },
      cocoa: {
        background: "#432e22",
        ink: "#f7ede2",
        accent: "#efa19a",
        border: "#f7ede2",
      },
    }[template] || {
      background: fallbackBackground,
      ink: "#1e1e1c",
      accent: "#e87453",
      border: "#d9d5ca",
    }
  );
}
function exportPng(session) {
  if (!session?.photos?.length) {
    toast("Take a photo before downloading.");
    return;
  }
  const width = 700;
  const photoHeight = 390;
  const photoGap = 16;
  const top = 125;
  const photoWidth = width - 80;
  const height =
    top +
    photoHeight * session.photos.length +
    photoGap * (session.photos.length - 1) +
    155;
  const style = templateStyle(
    session.template,
    backgroundColor(session.background),
  );
  const background = style.background;
  const photoBorder =
    session.template === "olive" || session.template === "cocoa"
      ? ` stroke="${style.border}" stroke-width="6"`
      : "";
  const images = session.photos
    .map(
      (photo, index) =>
        `<image href="${photo}" x="40" y="${top + index * (photoHeight + photoGap)}" width="${photoWidth}" height="${photoHeight}" preserveAspectRatio="xMidYMid slice" style="filter:${filterValue(session.filter)}"${photoBorder} />`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${background}"/><text x="40" y="48" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="${style.ink}">SNAP<tspan fill="${style.accent}">BOX</tspan></text><text x="40" y="78" font-family="Arial,sans-serif" font-size="11" letter-spacing="2" fill="${style.ink}">YOUR MOMENT, YOUR WAY</text>${images}<text x="${width / 2}" y="${height - 75}" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="600" fill="${style.ink}">${xmlEscape(session.caption || "A little memory")}</text><line x1="40" x2="${width - 40}" y1="${height - 50}" y2="${height - 50}" stroke="${style.border}"/><text x="40" y="${height - 25}" font-family="Arial,sans-serif" font-size="11" letter-spacing="2" fill="${style.ink}">SNAPBOX</text><text x="${width - 40}" y="${height - 25}" text-anchor="end" font-family="Arial,sans-serif" font-size="11" letter-spacing="2" fill="${style.ink}">2026</text></svg>`;
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0);
    const link = document.createElement("a");
    link.download = `${session.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "snapbox-strip"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast("PNG downloaded.");
  };
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function currentSession() {
  return {
    name: $("#sessionName").value.trim() || "snapbox-strip",
    caption: state.caption,
    template: state.template,
    filter: state.filter,
    background: state.background,
    photos: state.photos,
  };
}
function printSession(session = currentSession()) {
  if (!session.photos.length) {
    toast("Take a photo before printing.");
    return;
  }
  renderStrip();
  window.print();
}
function loadSession(id) {
  const session = getSessions().find((item) => item.id === id);
  if (!session) return null;
  state.editingId = id;
  state.photos = session.photos;
  state.template = session.template;
  state.filter = session.filter;
  state.background = session.background;
  state.caption = session.caption;
  $("#captionInput").value = state.caption;
  $$(".choice").forEach((choice) =>
    choice.classList.toggle(
      "active",
      choice.dataset.template === state.template,
    ),
  );
  $$(".filter-choice").forEach((choice) =>
    choice.classList.toggle("active", choice.dataset.filter === state.filter),
  );
  $$(".background-choice").forEach((choice) =>
    choice.classList.toggle(
      "active",
      choice.dataset.background === state.background,
    ),
  );
  renderStrip();
  return session;
}
function editSession(id) {
  const session = getSessions().find((item) => item.id === id);
  if (!session) return;
  state.editingId = id;
  state.photos = session.photos;
  state.template = session.template;
  state.filter = session.filter;
  state.background = session.background;
  state.caption = session.caption;
  $("#captionInput").value = state.caption;
  $$(".choice").forEach((choice) =>
    choice.classList.toggle(
      "active",
      choice.dataset.template === state.template,
    ),
  );
  $$(".filter-choice").forEach((choice) =>
    choice.classList.toggle("active", choice.dataset.filter === state.filter),
  );
  $$(".background-choice").forEach((choice) =>
    choice.classList.toggle(
      "active",
      choice.dataset.background === state.background,
    ),
  );
  openCustomize();
}
function deleteSession(id) {
  if (!confirm("Delete this photo session?")) return;
  saveSessions(getSessions().filter((session) => session.id !== id));
  renderSessions();
  toast("Session deleted.");
}

$$("[data-screen]").forEach((element) =>
  element.addEventListener("click", () => {
    if (element.dataset.screen === "booth") resetBooth();
    else showScreen(element.dataset.screen);
  }),
);
$("#designStripButton").addEventListener("click", openCustomize);
$("#startCamera").addEventListener("click", startCamera);
$("#phoneCamera").addEventListener("change", (event) => {
  addPhonePhoto(event.target.files[0]);
  event.target.value = "";
});
$("#flipCamera").addEventListener("click", () => {
  state.facingMode = state.facingMode === "user" ? "environment" : "user";
  startCamera();
});
$("#captureButton").addEventListener("click", capturePhoto);
$("#saveAllButton").addEventListener("click", saveAllPhotos);
$("#saveButton").addEventListener("click", openSaveDialog);
$("#printButton").addEventListener("click", () => printSession());
$("#downloadButton").addEventListener("click", () =>
  exportPng(currentSession()),
);
$("#confirmSave").addEventListener("click", (event) => {
  event.preventDefault();
  saveCurrentSession();
});
$("#retakeButton").addEventListener("click", resetBooth);
$("#sessionSearch").addEventListener("input", renderSessions);
$$(".template-choices .choice").forEach((choice) =>
  choice.addEventListener("click", () => {
    state.template = choice.dataset.template;
    $$(".template-choices .choice").forEach((item) =>
      item.classList.toggle("active", item === choice),
    );
    renderStrip();
  }),
);
$$(".filter-choice").forEach((choice) =>
  choice.addEventListener("click", () => {
    state.filter = choice.dataset.filter;
    $$(".filter-choice").forEach((item) =>
      item.classList.toggle("active", item === choice),
    );
    renderStrip();
  }),
);
$$(".background-choice").forEach((choice) =>
  choice.addEventListener("click", () => {
    state.background = choice.dataset.background;
    $$(".background-choice").forEach((item) =>
      item.classList.toggle("active", item === choice),
    );
    renderStrip();
  }),
);
$("#captionInput").addEventListener("input", (event) => {
  state.caption = event.target.value;
  renderStrip();
});
$("#sessionsGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const id = button.dataset.id;
  const session = getSessions().find((item) => item.id === id);
  if (button.dataset.action === "delete") deleteSession(id);
  if (button.dataset.action === "edit") editSession(id);
  if (button.dataset.action === "view") {
    loadSession(id);
    showScreen("customize");
  }
  if (button.dataset.action === "print") {
    loadSession(id);
    showScreen("customize");
    printSession(session);
  }
  if (button.dataset.action === "download") exportPng(session);
});
updateSessionCount();
updateCaptureUi();
$("#captureButton").disabled = true;
