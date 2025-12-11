function revealPage() {
    const coverPage = document.getElementById("cover-page");
    const mainContent = document.getElementById("main-content");

    // Hide the cover page
    coverPage.classList.add("hidden");

    // Show the main content
    mainContent.classList.remove("hidden");
}
