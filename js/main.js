function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

function loadPage(file) {
  const id = "main-content";
  const htmlPath = `pages/${file}.html`;
  let cssPath = `styles/${file}.css`;
  const jsPath = `js/${file}.js`;

  if (file == 'secondaryRecord') {
    cssPath = `styles/case.css`;
  }

  fetch(htmlPath)
    .then(res => {
      if (!res.ok) throw new Error(`🚫 Couldn't fetch HTML for ${file}`);
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // 🌈 CSS file loading
      fetch(cssPath, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            const exists = [...document.querySelectorAll('link[rel="stylesheet"]')]
              .some(link => link.href.includes(cssPath));
            if (!exists) {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = cssPath;
              document.head.appendChild(link);
              console.log(`🎨 Added style: ${cssPath}`);
            }
          } else {
            console.log(`🧘 No styles found for ${file}, all good.`);
          }
        })
        .catch(err => {
          console.log(`🌈 Couldn't check styles for ${file}, but we move on.`);
        });

      // 🧠 JS file loading
      fetch(jsPath, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            const exists = [...document.querySelectorAll('script')]
              .some(script => script.src.includes(jsPath));
            if (!exists) {
              const script = document.createElement('script');
              script.src = jsPath;
              script.defer = true;
              script.onload = () => {
                console.log(`🧠 Script ${jsPath} loaded.`);
                if (typeof renderCaseNotes === "function") {
                  renderCaseNotes();
                }
                if (file === "case" && typeof switchTab === "function") {
                  switchTab("Summary");
                  toggleNotesPosition();
                }
              };
              document.body.appendChild(script);
            } else {
              if (typeof renderCaseNotes === "function") {
                renderCaseNotes();
              }
              if (file === "case" && typeof switchTab === "function") {
                switchTab("Summary");
                toggleNotesPosition();
              }
            }
          }
        })
        .catch(err => {
          console.log(`💥 JS check failed for ${file}, still cruising.`, err);
        });
    })
    .catch(err => {
      document.getElementById(id).innerHTML = `<p style="color:red;">Failed to load ${file}, bro 😞</p>`;
      console.error(`💀 Big oof loading page ${file}:`, err);
    });
}


// Load layout pieces
loadComponent("navbar", "components/navbar.html");
loadComponent("sidebar", "components/sidebar.html");
loadPage("myWork");


// ****************************************************************** //
// Notes functions //
// ****************************************************************** //

function loadNote(noteId) {
  const notesContainer = document.getElementById('notes-container');
  if (!notesContainer) return;

  const notePath = `notes/${noteId}.html`;
  const fallbackPath = `notes/noNote.html`;

  fetch(notePath)
    .then(res => {
      if (!res.ok) throw new Error("Note not found");
      return res.text();
    })
    .then(html => {
      notesContainer.innerHTML = html;
      injectCloseButton(); // inject the lil’ "x"
      openNotePanel();
    })
    .catch((err) => {
      console.warn(`Note "${noteId}" not found, loading fallback...`, err);

      fetch(fallbackPath)
        .then(res => {
          if (!res.ok) throw new Error("Fallback note also missing!");
          return res.text();
        })
        .then(html => {
          notesContainer.innerHTML = html;
          injectCloseButton(); // also inject on fallback
          openNotePanel();
        })
        .catch(err => {
          console.error("BRO... even the fallback failed. Nothing to load.", err);
          notesContainer.innerHTML = `
            <div class="note-card error">
              <h2>Oops, no note found</h2>
              <p>Even the fallback note went walkabout, bro. Might wanna check your file paths.</p>
            </div>
          `;
          injectCloseButton(); // still inject it, man
          openNotePanel();
        });
    });
}

function injectCloseButton() {
  const notesContainer = document.getElementById('notes-container');
  if (!notesContainer) return;

  const existingBtn = notesContainer.querySelector('.close-note-btn');
  if (existingBtn) return; // no duplicates, man

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.classList.add('close-note-btn');
  closeBtn.onclick = closeNotePanel;

  notesContainer.prepend(closeBtn);
}

function openNotePanel() {
  const panel = document.getElementById('notes-panel');
  if (panel) {
    panel.classList.add('open');
  }
}

function closeNotePanel() {
  const panel = document.getElementById('notes-panel');
  if (panel) {
    panel.classList.remove('open');
  }
}

loadNote('welcome'); // Load the welcome note start

// ****************************************************************** //
// MyWork tables functions //
// ****************************************************************** //

const toggleMyOpenCases = () => {
  console.log("Showing open work table");
  document.getElementById('myWork-Open').style.display = 'table';
  document.getElementById('myWork-Closed').style.display = 'none';

  document.getElementById('btn-open').classList.add('active');
  document.getElementById('btn-closed').classList.remove('active');
}

const toggleMyClosedCases = () => {
  console.log("Showing closed work table");
  document.getElementById('myWork-Open').style.display = 'none';
  document.getElementById('myWork-Closed').style.display = 'table';

  document.getElementById('btn-closed').classList.add('active');
  document.getElementById('btn-open').classList.remove('active');
}
