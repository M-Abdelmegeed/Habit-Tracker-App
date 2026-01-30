# 📊 Habit Tracker App

A fully responsive habit tracking web application built with React, Firebase, and Tailwind CSS. Track your daily habits, monitor your progress with beautiful visualizations, and build better routines.

![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Enabled-0f172a)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4)

## ✨ Features

- **🔐 Google Authentication** - Secure sign-in with Google
- **📝 Habit Management** - Add, edit, and delete habits with custom icons and colors
- **📅 Calendar View** - Monthly calendar grid showing habit completions
- **📊 Progress Analytics** - Visual charts showing daily and monthly progress
- **😊 Mental State Tracking** - Track your mood and motivation daily
- **🎯 Goal Setting** - Set monthly goals for each habit
- **🔥 Streak Tracking** - Monitor your habit streaks
- **📱 Fully Responsive** - Works on desktop, tablet, and mobile
- **🌙 Dark Mode** - Beautiful dark theme
- **🎨 Customizable Colors** - All colors configurable in theme file
- **💾 Data Export** - Export your data as JSON

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Firebase project (see setup below)

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → **Google** sign-in
4. Create a **Firestore Database** (start in test mode)
5. Add a **Web App** and copy the config

### Installation

1. Clone/download this repository

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Login, ProtectedRoute
│   ├── dashboard/      # Dashboard, Calendar, Charts
│   ├── habits/         # HabitCard, HabitForm, HabitList
│   ├── layout/         # Layout, Sidebar
│   └── ui/             # Button, Modal, Loading
├── config/
│   ├── firebase.js     # Firebase configuration
│   └── theme.js        # 🎨 All colors and design tokens
├── contexts/
│   ├── AuthContext.jsx # Authentication state
│   └── HabitContext.jsx # Habits & completions state
├── pages/
│   ├── DashboardPage.jsx
│   ├── HabitsPage.jsx
│   ├── TodayPage.jsx
│   └── SettingsPage.jsx
├── utils/
│   ├── calculations.js # Progress calculations
│   └── dateUtils.js    # Date helper functions
├── App.jsx
└── main.jsx
```

## 🎨 Customizing Colors

All colors are defined in `src/config/theme.js`. Edit this file to customize:

- Background colors
- Text colors
- Accent colors
- Status colors (success, warning, danger)
- Habit preset colors
- Chart colors

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase Auth** - Authentication
- **Firebase Firestore** - Database
- **React Router** - Routing
- **Recharts** - Charts
- **Lucide React** - Icons

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🚀 Deployment

### Firebase Hosting (Recommended)

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login and initialize:

```bash
firebase login
firebase init hosting
```

3. Deploy:

```bash
npm run build
firebase deploy
```

### Other Options

- Vercel
- Netlify
- GitHub Pages

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ using React and Firebase

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
