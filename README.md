# 🔗 LinkSnap — URL Shortener

<p align="center">
  <strong>A full-stack URL shortening service with authentication, analytics, and an admin dashboard.</strong><br/>
  <sub>Shorten links, track every click, and manage your history — all from a responsive web UI.</sub>
</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Templating-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)

</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-how-a-link-gets-created">Link Flow</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-setup">Setup</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#️-roadmap">Roadmap</a>
</p>

---

## 🚀 Overview

**LinkSnap** turns long URLs into short, shareable links — with a full account system behind it. Every link is tied to a user, every click is logged, and admins get a platform-wide view of activity.

| Capability | Details |
|---|---|
| 🔗 URL Shortening | Long URLs → compact `nanoid`-based short codes |
| 📊 Click Analytics | Per-link visit counts with timestamp history |
| 🔐 Authentication | JWT-based login/signup with secure cookies |
| 🗂️ Link History | Search, browse, and manage all your links |
| 📋 Copy to Clipboard | One-click copy on every generated link |
| 📁 Export | Download your links as a `.txt` file |
| 🛡️ Admin Dashboard | Platform-wide overview for admin roles |
| 📱 Responsive UI | Mobile-first design across every page |

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

**🔗 Core Shortening**
- Convert long URLs into short, unique codes
- `nanoid` for collision-resistant ID generation
- Instant redirect on visit
- Copy-to-clipboard on every link

</td>
<td width="50%" valign="top">

**📊 Analytics & History**
- Per-link click counts + timestamps
- Searchable link history
- Analytics overview page (`/see-more`)
- Export all links to `.txt`

</td>
</tr>
<tr>
<td valign="top">

**🔐 Auth & Accounts**
- JWT-based signup/login
- Secure, httpOnly cookie sessions
- Role-based access (user vs. admin)
- Editable user profile & settings

</td>
<td valign="top">

**🛡️ Admin & Support**
- Admin-only dashboard (`/admin/urls`)
- Help center & FAQ pages
- Quick tips / notes page

</td>
</tr>
</table>

---

## 🏗️ Architecture

```mermaid
flowchart LR
    U["👤 User"] --> B["🌐 Browser"]
    B --> V["🖼️ EJS Views"]
    V --> E["🚂 Express Server"]

    E --> MW["🔐 Auth Middleware"]
    MW --> C["⚙️ Controllers"]

    C --> M["📦 Mongoose Models"]
    M --> DB[("🍃 MongoDB")]

    C --> S["🔑 JWT Service"]

    style U fill:#111827,color:#fff
    style B fill:#2563eb,color:#fff
    style V fill:#B4CA65,color:#111827
    style E fill:#000000,color:#fff
    style MW fill:#dc2626,color:#fff
    style C fill:#7c3aed,color:#fff
    style M fill:#0891b2,color:#fff
    style DB fill:#47A248,color:#fff
    style S fill:#ea580c,color:#fff
```

### Request Lifecycle

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant R as 🚂 Express Route
    participant A as 🔐 Auth Middleware
    participant Ctrl as ⚙️ Controller
    participant DB as 🍃 MongoDB

    U->>R: HTTP request (e.g. POST /url)
    R->>A: Verify JWT cookie
    A-->>R: ✅ Authenticated / ❌ 401
    R->>Ctrl: Forward to controller
    Ctrl->>DB: Query / write via Mongoose
    DB-->>Ctrl: Result
    Ctrl-->>U: Rendered EJS view / JSON response
```

---

## 🔄 How a Link Gets Created

```mermaid
flowchart TD
    A["User submits long URL"] --> B["POST /url"]
    B --> C["Auth middleware verifies JWT"]
    C --> D["shorturl.js controller"]
    D --> E["nanoid generates short code"]
    E --> F["Save URL doc in MongoDB"]
    F --> G["Return short link to user"]

    style A fill:#2563eb,color:#fff
    style B fill:#000000,color:#fff
    style C fill:#dc2626,color:#fff
    style D fill:#7c3aed,color:#fff
    style E fill:#ea580c,color:#fff
    style F fill:#47A248,color:#fff
    style G fill:#16a34a,color:#fff
```

## 🔀 How a Redirect + Click Gets Logged

```mermaid
sequenceDiagram
    participant V as 🧑 Visitor
    participant R as 🚂 GET /url/:shortId
    participant Ctrl as ⚙️ redirect.js
    participant DB as 🍃 MongoDB

    V->>R: Visit short link
    R->>Ctrl: Look up shortId
    Ctrl->>DB: Find URL document
    DB-->>Ctrl: Original URL + click history
    Ctrl->>DB: Append click timestamp
    Ctrl-->>V: 302 Redirect to original URL
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | EJS, CSS3, Bootstrap 5, JavaScript |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose) |
| Auth | JSON Web Tokens (JWT) |
| ID Generation | nanoid |

---

## 📁 Project Structure

```text
URL-Shortener/
├── controllers/           # Route handlers
│   ├── account.js         # Profile management
│   ├── analytic.js        # Click analytics API
│   ├── redirect.js        # Short URL redirects
│   ├── shorturl.js        # URL creation
│   └── user.js            # Auth (login/signup)
├── middlewares/
│   └── auth.js            # JWT authentication & role checks
├── models/
│   ├── url.js              # URL schema
│   └── user.js             # User schema
├── public/
│   ├── css/main.css        # Global design system
│   ├── js/main.js          # Copy, FAQ, search utilities
│   └── views/
│       ├── partials/       # Shared navbar, footer, table
│       ├── home.ejs        # Dashboard
│       ├── history.ejs     # Link history
│       ├── login.ejs       # Login page
│       ├── signup.ejs      # Registration
│       ├── account.ejs     # User profile
│       ├── settings.ejs    # App settings
│       ├── see-more.ejs    # Analytics overview
│       ├── create-file.ejs # Export URLs
│       ├── save-urls.ejs   # Saved links view
│       ├── admin.ejs       # Admin dashboard
│       ├── help.ejs        # Help center
│       ├── faq.ejs         # FAQ page
│       └── notes.ejs       # Quick tips
├── routes/
│   ├── static.js           # Page routes
│   ├── posturl.js          # POST /url
│   ├── geturl.js           # GET /url/:shortId
│   └── user.js             # Auth routes
├── services/
│   └── auth.js             # JWT helpers
├── connect.js               # MongoDB connection
├── index.js                 # App entry point
├── .env                      # Environment variables
└── package.json
```

---

## 🗺️ Pages

| Route | Description | Auth Required |
|---|---|:---:|
| `/` | Dashboard — shorten URLs | ✅ |
| `/history` | View all your links | ✅ |
| `/see-more` | Analytics overview | ✅ |
| `/create-file` | Export links as text file | ✅ |
| `/save-urls` | Saved links view | ✅ |
| `/account` | Edit profile | ✅ |
| `/setting` | App settings | ✅ |
| `/notes` | Quick tips & notes | ✅ |
| `/help` | Help center | — |
| `/faq` | Frequently asked questions | — |
| `/login` | Sign in | — |
| `/signup` | Create account | — |
| `/admin/urls` | Admin dashboard | 🛡️ Admin only |
| `/url/:shortId` | Redirect to original URL | — |

---

## ⚙️ Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally or a cloud instance

### Installation

```mermaid
flowchart LR
    A["1. Clone repo"] --> B["2. npm install"]
    B --> C["3. Configure .env"]
    C --> D["4. Start MongoDB"]
    D --> E["5. npm start"]
    E --> F["6. Open localhost:8001"]

    style A fill:#2563eb,color:#fff
    style B fill:#7c3aed,color:#fff
    style C fill:#ea580c,color:#fff
    style D fill:#47A248,color:#fff
    style E fill:#000000,color:#fff
    style F fill:#16a34a,color:#fff
```

**1. Clone the repository**

```bash
git clone https://github.com/Mohitkumar2217/URL-Shortener.git
cd URL-Shortener
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment**

Create a `.env` file in the project root:

```env
PORT=8001
SECRET=your_jwt_secret_key_here
```

**4. Start MongoDB**

Make sure MongoDB is running at `mongodb://127.0.0.1:27017/urlshortener` (configured in `index.js`).

**5. Run the server**

```bash
npm start
```

**6. Open in browser**

```text
http://localhost:8001
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/url` | Create a short URL |
| `GET` | `/url/:shortId` | Redirect to original URL |
| `GET` | `/url/analytic/:shortId` | Get click analytics JSON |
| `POST` | `/user` | Register a new user |
| `POST` | `/user/login` | Login |
| `GET` | `/logout` | Logout |

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `8001` |
| `SECRET` | JWT signing secret | `my-super-secret-key` |

---

## 🛣️ Roadmap

**Shipped**
- [x] User authentication (JWT)
- [x] URL shortening & redirects
- [x] Click tracking & analytics
- [x] Responsive UI with all pages active
- [x] Link history & search
- [x] Export URLs
- [x] Admin dashboard

**Planned**
- [ ] QR code generation
- [ ] Link expiry dates
- [ ] Custom short aliases

```mermaid
flowchart LR
    A["✅ Core Platform"] --> B["🔲 QR Codes"]
    B --> C["🔲 Link Expiry"]
    C --> D["🔲 Custom Aliases"]

    style A fill:#16a34a,color:#fff
    style B fill:#374151,color:#fff
    style C fill:#374151,color:#fff
    style D fill:#374151,color:#fff
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

```bash
git checkout -b feature/your-feature
# make your changes
git commit -m "feat: describe your change"
git push origin feature/your-feature
```

--- 

## 👤 Author

Built by [Mohit Kumar](https://github.com/Mohitkumar2217)

<p align="center">
  <sub>🔗 Shorten it. Share it. Track it.</sub>
</p>