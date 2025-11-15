const form = document.getElementById("signup-form");

if (form) {
  form.addEventListener("submit", (e) => {
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!username.value.trim() || !email.value.trim() || !password.value.trim()) {
      e.preventDefault();
      alert("All fields are required.");
    }
  });
}
