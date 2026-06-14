# VoxLocal - AI Voice Agents for Local Businesses

Welcome to the VoxLocal project directory. VoxLocal provides AI-powered voice agents that answer calls, book appointments, take orders, and handle FAQs for local businesses — 24/7, with zero hold times, at a fraction of the cost of a human receptionist.

This directory contains the shared project structure for the VoxLocal web presence, including the landing page and the interactive browser-based voice agent simulator.

---

## Workspace Findings & Environment Status

The workspace environment has been thoroughly explored and analyzed. Here are the available runtimes and tools on the sandbox system:

- **Node.js**: `v24.16.0` (Active and ready)
- **NPM**: `11.13.0`
- **Bun**: `1.3.14` (Pre-installed; extremely fast for local TS execution)
- **Python**: `3.12.3`
- **PIP**: `24.0`
- **SQLite**: `3.45.1`

---

## Directory Structure

We have established a clean and modular directory layout under `/home/team/shared/voxlocal/` to allow seamless collaboration across the team:

```text
/home/team/shared/voxlocal/
├── README.md               # Project foundation and setup documentation (This file)
└── frontend/               # Vite + React + TypeScript + Tailwind CSS App
    ├── index.html          # Entry HTML page
    ├── package.json        # Main dependencies (React 19, Tailwind CSS v4, Lucide Icons)
    ├── vite.config.ts      # Vite bundler configuration with @tailwindcss/vite plugin
    ├── tsconfig.json       # TypeScript configuration files
    └── src/                # React Source Code
        ├── main.tsx        # Application mountpoint
        ├── App.tsx         # Combined Landing Page & Interactive Voice Agent Phone Simulator
        ├── index.css       # Tailwind CSS styles import (@import "tailwindcss";)
        └── assets/         # Project images and assets
```

---

## Tech Stack Decisions

1. **Frontend**: **Vite + React (TypeScript)**. Extremely fast to spin up, lightweight on memory footprint, and fully supports the latest standards (React 19).
2. **Styling**: **Tailwind CSS v4.3.0**. Uses the cutting-edge `@tailwindcss/vite` compiler plugin. Configured directly via CSS imports (`@import "tailwindcss";`), removing the bloat of configuration files and enabling extremely rapid UI prototyping.
3. **Icons**: **Lucide React**. High-quality, modern, lightweight SVG icons.
4. **Simulator**: A high-fidelity browser-based **Phone Call Simulator** built directly in React.
   - Leverages **Web Speech API** for native browser **Text-to-Speech (TTS)** and **Speech-to-Text (STT)**.
   - Provides a beautiful visual phone call mock with sound wave animations, audio controls (Mute, speaker synthesis toggle), and full interactive keypads.
   - Gracefully falls back to a responsive chat-bubble keyboard interaction if speech permissions are not granted or supported.

---

## Development & Build Instructions

To install dependencies and run the development server locally:

```bash
# Navigate to the frontend directory
cd /home/team/shared/voxlocal/frontend

# Install dependencies (already completed)
npm install

# Start the Vite development server on port 3000 bound to all interfaces
npm run dev -- --host 0.0.0.0 --port 3000
```

To build for production:

```bash
cd /home/team/shared/voxlocal/frontend
npm run build
```

The compiled assets will be placed in `frontend/dist` and can be served statically.
