# 🔮 TrueYouTeller

<div align="center">

**✨ Your magical guide to self-discovery! ✨**

*Discover your true personality with our fun, insightful, and delightfully cute personality test*

[![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

[🚀 Live Demo](https://www.trueyouteller.com) • [📖 Documentation](#features) • [🎮 Mini Games](#mini-games) • [📞 Contact](#contact--support)

</div>

---

## 🌟 What is TrueYouTeller?

**TrueYouTeller** is a delightful personality test website that helps you discover your unique traits, strengths, and quirks! Our magical crystal ball reveals one of **16 distinct personality types** complete with:

- 🦫 **Spirit Animals** that represent your personality
- 💪 **Strengths & Growth Areas** 
- 💼 **Career Insights & Recommendations**
- ❤️ **Relationship & Love Language Insights**
- 👨‍👩‍👧‍👦 **Family & Social Circle Dynamics**
- 🌟 **Famous Personality Matches**

## ✨ Features

### 🎯 Core Experience
- **📝 Engaging Personality Test** - Fun, thought-provoking questions that reveal your true self
- **⚡ Instant Results** - Get your complete personality analysis immediately
- **🔍 Detailed Insights** - Comprehensive breakdown of your personality type
- **🎨 Cute & Modern Design** - Visually delightful experience with a charming interface
- **📱 Responsive Design** - Perfect experience on all devices

### 🎮 Mini-Games
Discover even more about yourself with our themed mini-games:
- **👫 Friends Quiz** - Which Friends character matches your personality?
- **🎭 Inside Out Quiz** - Which emotion from Pixar's Inside Out are you?

### 📊 Comprehensive Personality Analysis
Each result includes:
- **🐾 Spirit Animal** with cute emoji representation
- **💡 Personal Growth Recommendations**
- **🔋 What Energizes vs. Drains You**
- **💼 Career Path Suggestions** with specific job recommendations
- **💕 Relationship Insights** including your love language
- **👨‍👩‍👧‍👦 Parenting & Friendship Styles**
- **🌟 Celebrity & Character Matches**

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) package manager

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chhedadhruv/trueyouteller.git
   cd trueyouteller
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Add environment variables**: copy `.env.example` to `.env` and fill in your Firebase and EmailJS keys.

4. **Start the development server**
   ```bash
   yarn dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173` 🎉

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | 🏃‍♂️ Runs the app in development mode |
| `yarn build` | 🏗️ Builds the app, prerenders every SEO page to static HTML and writes `sitemap.xml` |
| `yarn deploy` | 🚀 Builds and deploys to Firebase Hosting |
| `yarn lint` | 🔍 Lints the project files |
| `yarn test` | 🧪 Runs the scoring unit tests |
| `yarn images:optimize` | 🖼️ Converts images in `src/assets` into small WebP files in `src/images` |
| `yarn og:generate` | 🃏 Regenerates the social share images in `public/og/` |
| `node scripts/make-dark-logo.mjs` | 🌙 Rebuilds the dark-mode navbar logo from `src/images/trueyouteller.webp` |

To preview the production build exactly as Firebase serves it, run `yarn build` and then `firebase emulators:start --only hosting` (http://localhost:5055).

### 🔎 SEO

- Indexable routes are listed in `src/seoRoutes.js`. They are prerendered at build time and added to the sitemap.
- Each page sets its title, description, canonical URL, Open Graph/Twitter tags and JSON-LD through a `meta` export built with `buildMeta()` in `src/utils/seo.js`.
- The canonical domain is `https://www.trueyouteller.com`.

## 🎭 Personality Types

Our test reveals one of **16 personality types**, each with:

| Code | Name | Spirit Animal | Emoji |
|------|------|---------------|-------|
| ISTJ | The Logistician | Busy Beaver | 🦫 |
| ISFJ | The Defender | Gentle Deer | 🦌 |
| INFJ | The Advocate | Wise Wolf | 🐺 |
| INTJ | The Architect | Insightful Owl | 🦉 |
| ISTP | The Virtuoso | Curious Cat | 🐈 |
| ... | *and 11 more!* | *Various Animals* | 🎯 |

## 🏗️ Project Structure

```
trueyouteller/
├── 📁 src/
│   ├── 📁 components/       # Reusable UI components
│   ├── 📁 pages/           # Main page components
│   │   ├── 🏠 LandingPage.jsx
│   │   ├── 📝 TestPage.jsx
│   │   ├── 📊 ResultsPage.jsx
│   │   ├── 📋 DetailedResultsPage.jsx
│   │   ├── 💌 FeedbackPage.jsx
│   │   ├── 📞 ContactUsPage.jsx
│   │   └── ℹ️ AboutUsPage.jsx
│   ├── 📁 data/            # Quiz data and personality types
│   │   ├── 🧠 personalityTypes.js
│   │   ├── ❓ questions.js
│   │   └── 📁 mini-games/
│   ├── 📁 styles/          # CSS styling files
│   ├── 📁 images/          # Optimized WebP images used by the app
│   ├── 📁 utils/           # SEO and image helpers
│   ├── 📄 root.jsx         # HTML shell, navbar, footer, error page
│   ├── 📄 routes.js        # Route table
│   └── 📄 seoRoutes.js     # Prerendered + sitemap routes
├── 📁 public/og/           # Social share images
├── 📁 scripts/             # Image, OG and sitemap generators
├── 📄 firebase.json        # Hosting + Firestore rules config
└── 📄 package.json
```

## 🛠️ Built With

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| ⚛️ **React** | Frontend Framework | 19 |
| ⚡ **Vite** | Build Tool & Dev Server | Latest |
| 🔥 **Firebase** | Backend & Hosting | Latest |
| 🧭 **React Router** | Routing, prerendering & meta tags | 7 |
| 🎨 **CSS3** | Styling | Latest |

</div>

## 🎮 Mini-Games

### 👫 Friends Quiz
*"Could this BE any more accurate?"*
- Discover which Friends character matches your personality
- Features all main characters with detailed personality breakdowns
- Fun references and quotes from the show

### 🎭 Inside Out Quiz  
*"Which emotion drives your inner world?"*
- Based on Pixar's beloved Inside Out movie
- Explores your dominant emotions and psychological patterns
- Colorful, emotion-themed results

## 🙏 Acknowledgments

- 🎨 Design inspiration from modern personality test platforms
- 🧠 Personality type system based on established psychological frameworks
- 🎭 Mini-game themes inspired by popular culture
- 💖 Built with love for self-discovery and personal growth

## 📞 Contact & Support

- 🌐 **Website**: [TrueYouTeller](https://www.trueyouteller.com)
- 📧 **Email**: [contact@trueyouteller.com](mailto:contact@trueyouteller.com)

---

<div align="center">

**🔮 Ready to discover your true self? ✨**

[**🚀 Take the Test Now!**](https://www.trueyouteller.com)

*Made with 💖 by the TrueYouTeller team*

</div>
