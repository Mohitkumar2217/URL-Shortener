const myUrl = document.getElementById('url');
const myshortCode = document.getElementById('shortCode');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('shorten-form');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = myUrl.value.trim();
    const shortCode = myshortCode.value.trim();

    if (!url) {
      resultDiv.textContent = 'Please enter a valid URL.';
      resultDiv.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, shortCode })
      });

      const data = await response.json();

      if (response.ok) {
        const fullShortUrl = `${window.location.origin}/${data.shortCode}`;
        resultDiv.innerHTML = `
          <p>Shortened URL:</p>
          <a href="${fullShortUrl}" target="_blank">${fullShortUrl}</a>
        `;
        resultDiv.style.color = 'green';
      } else {
        resultDiv.textContent = data || 'Already used';
        alert('This short name already taken!');
        resultDiv.style.color = 'red';
      }
    } catch (err) {
      resultDiv.textContent = 'Error connecting to server.';
      resultDiv.style.color = 'red';
      console.error(err);
    }
  });
});