document.addEventListener("DOMContentLoaded", () => {
  initCopyButtons();
  initFaqAccordion();
  initSearchHighlight();
});

function initCopyButtons() {
  document.querySelectorAll(".btn-copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.url;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 2000);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 2000);
      }
    });
  });
}

function initFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((el) => el.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

function initSearchHighlight() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  if (!query) return;

  document.querySelectorAll(".searchable-row").forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query.toLowerCase()) ? "" : "none";
  });
}
