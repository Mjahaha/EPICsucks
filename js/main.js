

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


// ******************************************************************
// Notes functions 
function loadNote(noteId) {
  const notePath = `notes/${noteId}.html`;
  const fallbackPath = `notes/noNote.html`;

  fetch(notePath)
    .then(res => {
      if (!res.ok) throw new Error("Note not found");
      return res.text();
    })
    .then(html => {
      document.getElementById('notes-container').innerHTML = html;
      openNotePanel(); // Show the note panel
    })
    .catch(() => {
      // Load fallback note
      fetch(fallbackPath)
        .then(res => res.text())
        .then(html => {
          document.getElementById('notes-container').innerHTML = html;
          openNotePanel(); // Show the fallback note panel
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
