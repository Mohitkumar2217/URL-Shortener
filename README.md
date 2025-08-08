### 🔗 URL Shortener
---
A simple, modular URL shortener built with HTML, CSS, and JavaScript — designed to be extended with a backend using Node.js, Express, and MongoDB. This project is a work in progress and aims to provide a clean UI and robust API for shortening and managing links.

🚀 Features
- ✂️ Shortens long URLs into compact, shareable links
- 📋 Copy-to-clipboard functionality
- 🎨 Clean and responsive front-end design
- 🧱 Planned backend integration with Express and MongoDB
- 🔐 Environment-based configuration using .env

🧰 Tech Stack
```
| Layer | Tools Used | 
| Frontend | HTML, CSS, JavaScript | 
| Backend (WIP) | Node.js, Express.js | 
| Database | MongoDB | 
| Deployment | Render | 
```


📦 Installation
# Clone the repo
git clone https://github.com/Mohitkumar2217/URL-Shortener.git
cd URL-Shortener

# Install dependencies (once backend is added)
npm install

# Start the server (when backend is ready)
npm start



🛠️ Project Structure (planned)
```
URL-Shortener/
├── public/           # Frontend files
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server/           # Backend logic (Express)
│   ├── routes/
│   ├── models/
│   └── app.js
├── .env              # Environment variables
├── .gitignore
└── README.md
```

📌 To Do
- [x] Build front-end interface
- [ ] Add backend API for URL shortening
- [ ] Connect to MongoDB Atlas
- [ ] Implement analytics (click tracking, expiry)
- [ ] Add unit tests with Jest or Mocha

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
