

function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

// Load layout pieces
loadComponent("navbar", "components/navbar.html");
loadComponent("sidebar", "components/sidebar.html");
loadComponent("main-content", "pages/incidentDetails.html");



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
      if (!res.ok) {
        throw new Error("Note not found"); // triggers fallback
      }
      return res.text();
    })
    .then(html => {
      notesContainer.innerHTML = html;
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
          openNotePanel();
        });
    });
}

function openNotePanel() {
  const panel = document.getElementById('notes-panel');
  if (panel) {
    panel.classList.add('open');
  }
}

// Optional: Close button handler if your note panel has one
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-note')) {
    document.getElementById('notes-panel')?.classList.remove('open');
  }
});
