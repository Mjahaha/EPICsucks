const loadCaseTabContent = () => {
    const caseTabContent = document.getElementById('case-tab-content');
    caseTabContent.innerHTML = `<p>Loading case details...</p>`;
    console.log("Loading case tab content...");
}

loadCaseTabContent();

// ****************************************************************** //
// Case Notes code //
// ****************************************************************** //

// 🌿 Dummy notes array
let caseNotes = [
  {
    author: "Ben Lewin",
    time: "9 June 2025, 05:21",
    text: "Followed up on odour complaint. Resident reports strong chemical smell in the morning."
  },
  {
    author: "Ben Lewin",
    time: "11 June 2025, 05:21",
    text: "Spoke to facility operator, advised they were cleaning a tank around 8 AM. Monitoring planned."
  }
];

// 📝 Render those vibes
function renderCaseNotes() {
  const container = document.getElementById("case-notes");
  if (!container) return;

  container.innerHTML = ""; // Clear old notes

  caseNotes.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "case-note";

    noteDiv.innerHTML = `
      <div class="note-meta">
        <span class="note-author">${note.author}</span>
        <span class="note-time">${note.time}</span>
      </div>
      <div class="note-text">${note.text}</div>
    `;

    container.appendChild(noteDiv);
  });
}

// ➕ Add a new note
function addCaseNote(author, text) {
  const now = new Date();
  const time = now.toISOString().slice(0, 16).replace("T", " ");

  caseNotes.push({
    author,
    time,
    text
  });

  renderCaseNotes();
}

renderCaseNotes();

// ****************************************************************** //
// Case Notes input //
// ****************************************************************** //


// ✨ Format date as "dd MMMM yyyy HH:mm"
function formatDateFancy(date) {
  const datePart = date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const timePart = date.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  return `${datePart}, ${timePart}`;
}


// 🚀 Updated addCaseNote
function addCaseNote(author, text) {
  const now = new Date();
  const time = formatDateFancy(now); // e.g. "13 June 2025"

  caseNotes.push({
    author,
    time,
    text
  });

  renderCaseNotes();
}

// 🧪 Hooked up to the button
function handleAddNote() {
  const input = document.getElementById("new-note-text");
  const text = input.value.trim();

  if (text === "") {
    alert("Hey bro, you gotta write something first 😅");
    return;
  }

  addCaseNote("James Pridgeon", text);
  input.value = ""; // Clear after adding
}
