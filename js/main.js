function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

function loadPage(file) {
  const id = "main-content";
  fetch(`pages/${file}.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Try to load matching CSS file from styles/[id].css
      const cssPath = `styles/${file}.css`;
      console.log(cssPath);

      // Clean up old dynamic style if any
      const oldLink = document.getElementById(`dynamic-style-${id}`);
      if (oldLink) {
        oldLink.remove();
      }

      // Check if the CSS file exists without throwing a fit
      fetch(cssPath, { method: 'HEAD' })
        .then(res => {
          console.log(res);
          if (res.ok) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            link.id = `dynamic-style-${id}`;
            document.head.appendChild(link);
          } else {
            // It's cool man, no CSS needed
            console.log(`🧘 No styles found for #${id}, all good.`);
          }
        })
        .catch(err => {
          // Still chill if fetch bombs out
          console.log(`🌈 Couldn't check styles for #${id}, but we move on.`);
        });
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
