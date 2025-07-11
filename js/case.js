
// ****************************************************************** //
// Case Notes code //
// ****************************************************************** //

// 🌿 Case notes array
let caseNotes = [
  {
    author: "Jane EnviroLine",
    time: "9 June 2025, 09:21",
    text: "Created Incident"
  },  
  {
    author: "Ben Lewin",
    time: "9 June 2025, 12:21",
    text: "Followed up on odour complaint. Resident reports strong chemical smell in the morning."
  },
  {
    author: "Ben Lewin",
    time: "11 June 2025, 05:21",
    text: "Spoke to facility operator, advised they were cleaning a tank around 8 AM. Monitoring planned."
  },
  {
    author: "James Pridgeon",
    time: "12 June 2025, 05:21",
    text: "A draft <b>Prevention Notice</b> was created <a href='#' class='case-link' onclick='loadComponent('main-content', 'pages/dashboard.html')'>SR-123</a>."
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

// ****************************************************************** //
// Incident Details functions //
// ****************************************************************** //

let caseDetails = {
  operationalArea: "General Operations",
  dateDiscovered: "2024-06-01",
  dateReported: "2024-06-10",
  incidentDescription: "Smoke from mine operations affecting air quality.",
  incidentType: "Air",
  incidentSubtype: "SMOKE",
  impact: "Human Health",
  source: "MINE"
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