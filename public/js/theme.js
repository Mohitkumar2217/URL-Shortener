// Load saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
const themeLink = document.getElementById("themeStylesheet");

// Apply theme
themeLink.href = `/css/${savedTheme}.css`;

// Toggle button
const toggleBtn = document.getElementById("themeToggle");
if (toggleBtn) {
    toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    toggleBtn.addEventListener("click", () => {
        const current = localStorage.getItem("theme") || "light";
        const next = current === "light" ? "dark" : "light";

        localStorage.setItem("theme", next);
        themeLink.href = `/css/${next}.css`;
        toggleBtn.textContent = next === "dark" ? "☀️" : "🌙";
    });
}
