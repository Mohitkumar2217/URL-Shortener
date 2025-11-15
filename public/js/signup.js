document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signForm");

  if (!form) return;

  form.addEventListener("submit", () => {
    form.querySelector("button").disabled = true;
  });
});
