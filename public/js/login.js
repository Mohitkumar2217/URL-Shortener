// Prevent double form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".loginForm");

  if (!form) return;

  form.addEventListener("submit", () => {
    form.querySelector("button").disabled = true;
  });
});
