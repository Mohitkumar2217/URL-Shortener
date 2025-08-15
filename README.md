
# 🔗 URL Shortener

A sleek and minimal URL shortening service built with Node.js, Express, MongoDB, and vanilla JavaScript. Shorten long URLs into compact, shareable links with ease.

<!-- ![Screenshot](https://your-screenshot-link-if-any.png) -->

---

## 🚀 Features

- ✂️ Shorten long URLs into concise links
- 📋 Copy-to-clipboard functionality
- 📱 Responsive and clean UI
- 🌐 MongoDB-powered backend (via Mongoose)
- 🔐 Environment-based configuration using `.env`
- 📊 Planned analytics and link expiry

---

## 🛠️ Tech Stack

| Layer       | Technology            |
|------------|------------------------|
| Frontend   | HTML, CSS, JavaScript  |
| Backend    | Node.js, Express.js    |
| Database   | MongoDB (Atlas)        |
| Deployment | Render                 |

---

## 📁 Project Structure

```
URL-Shortener/
├── controllers/           # backend
│   ├── analytic.js
│   ├── redirect.js
│   ├── shorturl.js
│   └── user.js
├── middlewares/           # backend
│   └── auth.js
├── models/           # backend
│   ├── url.js
│   └── user.js
├── public/           # frontend
│   ├── css/
|   |   └── style.css
│   ├── jss/
│   |   └── script.js
│   └── URL.html
├── routes/           # backend
│   ├── geturl.js
│   ├── posturl.js
│   ├── static.js
│   └── user.js
├── services/           # Backend 
│   └── auth.js
├── views/        # Backend 
|   ├── home.ejs
|   ├── login.ejs
│   └── signup.js
├── .env              # Environment variables
├── .gitignore
├── connect.js
├── index.js
├── package.json
└── README.md
```
 
---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/Mohitkumar2217/URL-Shortener.git
   cd URL-Shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root:
   ```env
   MONGO_URI=your_mongodb_connection_string
   BASE_URL=http://localhost:3000
   ```

4. **Run the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   Visit `http://localhost:3000`

---

## 📌 To-Do

- [x] Basic frontend UI
- [x] Backend API for shortening
- [x] MongoDB integration
- [ ] QR code generation
- [ ] Link expiry and analytics
- [ ] Admin dashboard

---

## 🤝 Contributing

Pull requests are welcome! If you find a bug or have a feature request, feel free to open an issue.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

Built with ❤️ by [Mohit Kumar](https://github.com/Mohitkumar2217)
```

---

Let me know if you want to include a live demo link, tech stack icons, or a badge section (like GitHub stars, forks, etc.). I can also help you auto-generate QR codes or add analytics tracking next.
