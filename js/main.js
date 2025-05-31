

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