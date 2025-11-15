const form = document.getElementById("login-form");

if (form) {
  form.addEventListener("submit", (e) => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!email.value.trim() || !password.value.trim()) {
      e.preventDefault();
      alert("Please fill all fields.");
    }
  });
}
