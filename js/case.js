const loadCaseTabContent = () => {
    const caseTabContent = document.getElementById('case-tab-content');
    caseTabContent.innerHTML = `<p>Loading case details...</p>`;
    console.log("Loading case tab content...");
}

loadCaseTabContent();