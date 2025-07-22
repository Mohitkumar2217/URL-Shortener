# 🔗 URL Shortener

A simple and lightweight URL shortener built with Node.js and Express. It allows users to shorten long URLs and optionally customize their short codes. All data is stored locally in a JSON file.

---

## 🚀 Features

- Shorten any valid URL
- Optional custom short codes
- Redirect short URLs to original links
- Persistent storage using `links.json`
- Frontend form with dynamic feedback

---

## 📁 Project Structure
URL-Shortener/ ├── public/               # Static frontend files 
│   ├── URL.html       # Main form page 
│   ├── css/ 
│   │   └── style.css 
│   └── js/ 
│       └── script.js 
├── routes/              # Express route handlers 
│   ├── shorten.js       # POST /shorten 
│   └── redirect.js      # GET /:shortCode 
├── utils/                # Utility modules 
│   ├── fileHandler.js   # Read/write links.json 
│   └── validator.js      # URL validation 
├── data/ │   └── links.json        # Persistent storage 
├── app.js                # Express app setup 
├── server.js             # Entry point 
├── package.json 
└── README.md


---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Mohitkumar2217/URL-Shortener.git
cd URL-Shortener
