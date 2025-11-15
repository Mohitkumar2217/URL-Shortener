// public/js/history.js
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector(".logout-navbar");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (event) => {
      // If logout is a form submit, let it proceed; if anchor, prevent and redirect
      // Here we redirect to /logout to ensure proper server-side logout handling
      event.preventDefault();
      window.location.href = "/logout";
    });
  }
});
