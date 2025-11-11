# 🖥️ XYZ HR Console – Frontend (React + Tailwind + Vercel)


A responsive and modern recruitment portal built using **React**, **Tailwind CSS**, and **Framer Motion**.
It allows candidates to browse jobs, apply online, and track application progress — all integrated with the XYZ HR Console backend (ASP.NET Core API).


---


## 🚀 Live Demo
🔗 **Frontend (Vercel):** [(https://hrm-app-ten.vercel.app/)](#)
🔗 **Backend (Azure API):** [(https://hrapp-bgerb7f5ezfjb6ar.canadacentral-01.azurewebsites.net/hr/)](#)


---


## ✨ Key Features
- View open positions from the HR backend
- Apply to jobs with resume uploads
- Candidate dashboard for tracking applications
- Framer Motion animations and modern design
- Fully responsive layout optimized for desktop and mobile
- Secure API communication with JWT Authentication


---


## 🧩 Tech Stack
| Category | Technology |
|-----------|-------------|
| Framework | React 18 |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Routing | React Router DOM v6 |
| Deployment | Vercel |
| Icons | Lucide React |


---


## ⚙️ Environment Variables
Create a `.env` file in your root directory:


```bash
REACT_APP_API_URL=https://hrapp-bgerb7f5ezfjb6ar.canadacentral-01.azurewebsites.net/hr/
```


---


## 🧠 Folder Structure
```
src/
├── components/
├── pages/
├── context/
├── services/
├── assets/
├── App.jsx
└── main.jsx
```


---

## 🧑‍💻 Local Development
```bash
# Clone the repository
git clone https://github.com/YourUser/frontend.git
cd frontend


# Install dependencies
npm install


# Run locally
npm run dev
```


Runs on: **http://localhost:3000**


---


## 🚀 Deployment on Vercel
1. Push your repo to GitHub.
2. Log in to [Vercel](https://vercel.com).
3. Import your repo and add the environment variable `REACT_APP_API_URL`.
4. Build Command: `npm run build`
Output Directory: `dist` or `build`
5. Click **Deploy**.


---


## 🧾 License
© 2025 XYZ HR Console Team. All rights reserved.


---
