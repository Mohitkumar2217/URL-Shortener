document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#generateForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const longUrl = document.querySelector("#longUrl").value;
        const resp = await fetch("/url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin", // ensures cookies (session) are sent
            body: JSON.stringify({ longUrl }),
        });

        if (resp.redirected) {
            window.location.href = resp.url;
            return;
        }

        const data = await resp.json().catch(() => null);
        // TODO: update UI with success/error using `data`
        console.log("create response", resp.status, data);
    });
});