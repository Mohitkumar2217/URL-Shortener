const shorten = document.getElementById("shorten-form");


const first = document.querySelectorAll(".first");
first.addEventListener("onclick", (event) => {
    event.preventDefault();
});

const submitBtn = document.querySelector('.submitBtn');

submitBtn.addEventListener("onclick", (event) => {
    event.preventDefault();

})
shorten.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get("url");
    const shortcode = formData.get("shortCode");
    console.log(url,shortcode);
});