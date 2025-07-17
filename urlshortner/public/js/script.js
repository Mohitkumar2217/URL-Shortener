const shorten = document.getElementById("shorten-form");
shorten.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get("url");
    const shortcode = formData.get("shortCode");
    console.log(url,shortcode);
});