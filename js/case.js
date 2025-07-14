
// ****************************************************************** //
// Case Notes code //
// ****************************************************************** //

// 🌿 Case notes array
let caseNotes = [
  {
    author: "Jane EnviroLine",
    time: "9 June 2025, 09:21",
    text: "Case was created from an EnviroLine call. <br><br>Incident Description: <br>Report of a strong stench and air pollution out of chimney stacks. Council referred issue to EPA. Bovine Services Beef Exports, out of Bathurst. Worst smell from 2pm onwards. Caller believes that it's hotter days when the smell is present. "
  },  
  {
    author: "Ben Lewin",
    time: "9 June 2025, 12:21",
    text: "Followed up on odour complaint with called. Resident reports strong chemical smell in the morning."
  },  
  {
    author: "Ben Lewin",
    time: "9 June 2025, 14:21",
    text: "This case has been reallocated to <b>James Pridgeon</b>. "
  },
  {
    author: "James Pridgeon",
    time: "11 June 2025, 05:21",
    text: "Spoke to facility operator, advised they were cleaning a tank around 1:30 PM. I explained to him his obligation under this EPL and that he needs to take management steps to prevent reoccurance."
  },
  {
    author: "James Pridgeon",
    time: "12 June 2025, 05:21",
    text: `A draft <b>Warning Letter</b> was created <a href="#" class="case-link" onclick="loadPage('secondaryRecord')">REG-123</a>.`
  }
];

// 📝 Render those vibes
function renderCaseNotes() {
  const container = document.getElementById("case-notes");
  if (!container) return;

  container.innerHTML = ""; // Clear old notes

  let servedCaseNotes = [...caseNotes].reverse();

  servedCaseNotes.forEach(note => {
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


let notesInline = false;

function toggleNotesPosition() {
  const notesSection = document.getElementById('case-notes-section');
  const tabContent = document.getElementById('case-tab-content');

  notesInline = !notesInline;

  if (notesInline) {
    notesSection.classList.add('inline');
    tabContent.classList.add('inline-notes');
  } else {
    notesSection.classList.remove('inline');
    tabContent.classList.remove('inline-notes');
  }

  console.log(`📐 Notes now ${notesInline ? "inline" : "below"} bro`);
}

// For closure tab, show final case note
function renderFinalCaseNote() {
  const container = document.getElementById("final-case-note-container");
  if (!container) {
    console.warn("Yo bro, no final-case-note-container on the page 🌪️");
    return;
  }

  container.innerHTML = ""; // clear any old vibes

  const finalNote = caseNotes[caseNotes.length - 1];
  if (!finalNote) {
    container.innerHTML = "<p>No case notes yet, my dude.</p>";
    return;
  }

  const noteDiv = document.createElement("div");
  noteDiv.className = "case-note";

  noteDiv.innerHTML = `
    <div class="note-meta">
      <span class="note-author">${finalNote.author}</span>
      <span class="note-time">${finalNote.time}</span>
    </div>
    <div class="note-text">${finalNote.text}</div>
  `;

  container.appendChild(noteDiv);
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
  renderFinalCaseNote(); // Update final case note display
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

// ****************************************************************** //
// Incident Details functions //
// ****************************************************************** //

let caseDetails = {
  operationalArea: "General Operations",
  dateDiscovered: "2024-06-08",
  dateReported: "2024-06-09",
  incidentDescription: "Report of a strong stench and air pollution out of chimney stacks. Council referred issue to EPA. Bovine Services Beef Exports, out of Bathurst. Worst smell from 2pm onwards. Caller believes that it's hotter days when the smell is present.",
  incidentType: "Air",
  incidentSubtype: "ODOUR",
  impact: "Human Health",
  source: ""
};


function populateDetails() {
  Object.keys(caseDetails).forEach(key => {
    const el = document.querySelector(`[data-key="${key}"]`);
    if (el) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = caseDetails[key];
      } else if (el.tagName === "SELECT") {
        const valueToSelect = caseDetails[key];

        // If that option isn't in the dropdown, add it
        let optionExists = [...el.options].some(opt => opt.value === valueToSelect);
        if (!optionExists) {
          const newOption = document.createElement("option");
          newOption.value = valueToSelect;
          newOption.textContent = valueToSelect;
          el.appendChild(newOption);
        }

        el.value = valueToSelect;
      }
    }
  });
}


function saveDetails() {
  Object.keys(caseDetails).forEach(key => {
    const el = document.querySelector(`[data-key="${key}"]`);
    if (el) {
      caseDetails[key] = el.value;
    }
  });
}

function enableEditMode() {
  const fields = document.querySelectorAll('[data-key]');
  fields.forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.removeAttribute('readonly');
      el.style.backgroundColor = "#fff";
    } else if (el.tagName === 'SELECT') {
      el.removeAttribute('disabled');
    }
  });

  const btnContainer = document.getElementById('edit-button-container');
  btnContainer.innerHTML = `
    <button class="action-btn save" onclick="handleSave()">💾 Save</button>
    <button class="action-btn discard" onclick="handleDiscard()">↩ Discard</button>
  `;
}

function disableEditMode() {
  const fields = document.querySelectorAll('[data-key]');
  fields.forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.setAttribute('readonly', true);
      el.style.backgroundColor = "#eee";
    } else if (el.tagName === 'SELECT') {
      el.setAttribute('disabled', true);
    }
  });

  const btnContainer = document.getElementById('edit-button-container');
  btnContainer.innerHTML = `
    <button class="action-btn edit" onclick="enableEditMode()">✏️ Edit</button>
  `;
}

function handleSave() {
  saveDetails();
  disableEditMode();
}

function handleDiscard() {
  populateDetails();
  disableEditMode();
}


// ****************************************************************** //
// Switch Tab function for tabs in cases //
// ****************************************************************** //

function switchTab(tabName) {
  const tabContent = document.getElementById("case-tab-content");
  if (!tabContent) {
    console.warn("🚫 Tab content container not found, bro.");
    return;
  }

  // Close any open note panel
  if (typeof closeNotePanel === "function") {
    closeNotePanel();
    console.log("🧼 Closed note panel due to tab switch.");
  }

  const tabPath = `pages/caseTabs/${tabName}.html`;

  fetch(tabPath)
    .then(res => {
      if (!res.ok) throw new Error(`Couldn't fetch tab: ${tabName}`);
      return res.text();
    })
    .then(html => {
      tabContent.innerHTML = html;
      console.log(`🌀 Loaded tab: ${tabName}`);

      // 🧠 This now runs after the HTML is loaded in
      if (tabName === "Details" && typeof populateDetails === "function") {
        console.log(`🌿 Populating details for tab: ${tabName}`);
        populateDetails();
        //loadNote('incidentDetailsNote');
      }
      if (tabName === "Closure" && typeof populateDetails === "function") {
        console.log(`🌿 Populating details for tab: ${tabName}`);
        populateDetails();
        renderFinalCaseNote();

      }
    })
    .catch(err => {
      tabContent.innerHTML = `<p style="color:red;">Couldn't load "${tabName}" tab, man. Check your vibes or your files 🤷‍♂️</p>`;
      console.error(`💀 Tab load failed (${tabName}):`, err);
    });
}


// ****************************************************************** //
// Actions dropdown in header //
// ****************************************************************** //

function toggleDropdown() {
  const container = document.querySelector('.dropdown-container');
  container.classList.toggle('open');
}

