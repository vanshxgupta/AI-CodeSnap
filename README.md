# 🧠 CodeSnap — AI-Powered Wireframe to Code Converter

CodeSnap is a full-stack AI-powered application that instantly converts wireframes or design descriptions into clean, production-ready React/HTML,CSS Code, Ideal for developers, designers, and startups looking to streamline UI prototyping and accelerate development.


## 🚀 Features

- ✨ **AI Design-to-Code Conversion** — Upload wireframes or enter UI descriptions to generate responsive React + Tailwind UI.
- 🔐 **Authentication** — Seamless auth flow using Google Sign-In.
- 💳 **Credits System** — Daily free credits for fair usage.
- 💾 **Persistent Code Storage** — Save and revisit your generated UIs anytime.
- 📦 **Built-in Editor** — Live preview and code editor using Sandpack.
- 🎨 **Dark Mode Support** — Developer-friendly interface, day or night.

---

## 🛠️ Tech Stack

| Tech                  | Role                             |
|-----------------------|----------------------------------|
| **Next.js 14**        | App framework                    |
| **TypeScript**        | Type safety                      |
| **Tailwind CSS**      | Utility-first styling            |
| **Drizzle ORM**       | Database management              |
| **PostgreSQL**        | Primary database                 |
| **OpenAI API**        | Code generation engine           |
| **Clerk/Auth**        | Authentication (if used)         |
| **Sandpack**          | Embedded code editor             |
| **Vercel**            | Deployment platform              |

---

## 📸 Preview

| Upload Wireframe           | Get Clean React Code         |
|----------------------------|------------------------------|
| ![](./public/wireframe.png)| ![](./public/output-code.png)|

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/codesnap.git
cd codesnap
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file and add the following:

```env
OPENAI_API_KEY=your-openai-key
DATABASE_URL=your-postgresql-url
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> _Ensure your PostgreSQL DB is running and connected via Drizzle ORM._

### 4. Push your schema with Drizzle

```bash
npx drizzle-kit push
```

### 5. Start the development server

```bash
npm run dev
```

---

## ⚙️ Folder Structure

```
├── app/
│   ├── _components/           # UI Components (Sidebar, Header, etc.)
│   ├── api/                   # Server-side API routes (OpenAI, DB updates)
│   ├── provider.tsx           # Auth/Context Providers
├── configs/
│   ├── db.ts                  # Drizzle DB config
│   ├── schema.ts              # Drizzle schema definitions
├── data/Constants.ts          # Static values (Models, Prompts)
├── public/                    # Static assets (logo, banners)
├── .env.local                 # Local env vars
```

---

## 📈 Future Plans

- [ ] Support for multi-page design flows
- [ ] Integrate with Figma API
- [ ] Export to Vue/Svelte code
- [ ] Referral & monetization system

---

## 🌐 Live Demo

> Coming soon:

> Designed and developed by [Vansh Gupta](https://github.com/vanshxgupta)
