const shorten = document.getElementById("shorten-form");

shorten.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    const url = formData.get("url");
    const shortCode = formData.get("shortCode");
    console.log(url,shortCode);

    try {
        const response = await fetch("/shorten", {
            method: "POST",
            headers: {"Content-tyoe":"application/json"},
            body: {url, shortCode}
        });
        if(response.ok) {
            alert("form submitted successfully");
        }
        else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.log(error);        
    }
});

// const first = document.querySelectorAll(".first");
// first.addEventListener("onclick", (event) => {
//     event.preventDefault();
// });

// const submitBtn = document.querySelector('.submitBtn');

// submitBtn.addEventListener("onclick", (event) => {
//     event.preventDefault();

// })