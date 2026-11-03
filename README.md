# 🚀 Interactive 3D Developer Portfolio

A cutting-edge, high-performance 3D portfolio website designed to showcase full-stack engineering excellence and WebGL / Three.js craft on your resume and CV.

---

## ✨ Features & 3D Interactive Highlights

- 🖥️ **Hero 3D Cyber Workstation**:
  - Interactive 3D Developer Desk built with Three.js & React Three Fiber.
  - Ultra-wide curved monitor with glowing terminal display.
  - PC tower with rotating cooling fans and internal RGB lighting.
  - Steaming coffee mug with rising procedural steam particles.
  - Clickable desk lamp with real-time lighting mode toggling.
  - Audio visualizer bars reacting with dynamic sine wave oscillations.
  - Orbit controls: Drag to rotate, scroll to zoom, bounded camera choreography.
- 🌐 **Interactive 3D Skills Sphere**:
  - Fibonacci sphere algorithm positioning technologies across a 3D globe.
  - Drag to spin, hover over tags to inspect proficiency scores and sound cues.
- 🎨 **Dynamic Theme Engine**:
  - Real-time 3D lighting and UI theme switcher: **Cyberpunk Neon**, **Matrix Emerald**, **Synthwave Sunset**, and **Obsidian Minimal**.
- 🔊 **Zero-Asset Web Audio Synthesizer**:
  - Completely self-contained sound engine using the browser's Web Audio API.
  - High-tech blips, switch glitches, and success chimes without loading external audio files.
- 🗂️ **Interactive Developer Terminal**:
  - Tabbed terminal interface (`whoami.sh`, `architecture.ts`, `metrics.json`, `setup.cfg`) with copy-to-clipboard functionality.
- 🃏 **3D Perspective Tilt Project Cards**:
  - Cards tilt dynamically following mouse coordinates with glowing border reflections.
  - In-depth **Architecture Deep Dive** modal highlighting production metrics, system design, and live deployment links.
- 📄 **ATS-Friendly In-App Printable Resume**:
  - Dedicated resume modal formatted for clean screen viewing and 1-click `window.print()` / PDF export.
- ✉️ **Transmission / Contact Form**:
  - Interactive validation with festive confetti fireworks blast upon submission.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **3D & Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS v4, Glassmorphism backdrop filters
- **Icons**: Lucide Icons + Custom Vector SVGs
- **Audio**: Web Audio API Procedural Synthesizer
- **Effects**: Canvas-Confetti

---

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## ✏️ How to Customize with Your Own Information

All user-facing information, projects, and skills are organized in a single file:  
`src/data/portfolioData.ts`

1. **Personal Information**:
   - Update `PERSONAL_INFO.name`, `title`, `tagline`, `location`, `email`, and social links (GitHub, LinkedIn, Twitter/X, LeetCode).
2. **Projects**:
   - Replace the entries in `PROJECTS` with your own projects, screenshots, live demo URLs, and GitHub repos.
3. **Skills**:
   - Modify `SKILL_CATEGORIES` to match your exact languages, frameworks, and databases.
4. **Work Experience & Education**:
   - Update `EXPERIENCES` and `EDUCATION` with your past roles, internships, degrees, and metrics.

---

## 🚢 Deploy to Production

### Deploy to Vercel (Recommended):
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify:
```bash
npm run build
# Drag and drop the `dist/` directory into Netlify drop
```

### Deploy to GitHub Pages:
Add `"base": "/<your-repo-name>/"` in `vite.config.ts`, then run `npm run build` and deploy the `dist/` folder using `gh-pages`.
