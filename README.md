# <p align="center"><img src="public/befu.png" alt="BeForth Logo" width="100" /><br/>BeForth Knowledge Base</p>

<p align="center">
  <strong>The Official Documentation & Knowledge Platform for BeForth.</strong><br/>
  An enterprise-grade documentation engine built for speed, precision, and high-end technical clarity.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Internal%20Release-6a20a0?style=for-the-badge" alt="Internal" />
  <img src="https://img.shields.io/badge/Framework-Next.js%2014-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Animation-Framer%20Motion-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Deployment-Production-success?style=for-the-badge" alt="Deployment" />
</p>

---

## 🏗️ Technical Architecture
BeForth KB is engineered using a modern, low-latency stack designed to provide an instant reading experience for our team and clients.

- **Frontend**: Next.js 14 utilizing the App Router and Server Components for optimized delivery.
- **Design System**: A custom **Industrial Minimalist** design system built on Tailwind CSS, featuring a strict neutral palette (Zinc/Slate) and high-legibility typography.
- **Motion Engine**: Framer Motion powered transitions for sidebar interactions, breadcrumb navigation, and UI state changes.
- **Typographic Stack**: 
  - **Headings**: Outfit (Sans-Serif)
  - **Body**: Plus Jakarta Sans (Sans-Serif)
  - **Code/Metadata**: DM Mono

---

## 🔥 Key Platforms & Features

### 🏢 Internal Operations
Comprehensive guides for our internal system, including:
- **Core HR**: Managing employee lifecycles and records.
- **Time & Attendance**: Tracking shifts, holidays, and attendance logs.
- **Talent Acquisition**: Full-cycle recruitment and onboarding pipelines.
- **System Admin**: RBAC (Role-Based Access Control) and security settings.

### 🎭 Animation & UX
- **Elastic Sidebar**: Folders that expand with a custom cubic-bezier ease for a mechanical feel.
- **Intelligent Breadcrumbs**: Real-time position tracking with blur-fade transitions.
- **Command Palette (⌘K)**: Global instant-search indexing across the entire documentation structure.

### 📜 Automated Content Management
- **Structured Data**: Documentation is driven by a centralized `docs-content.ts` engine, allowing for easy updates and versioning.
- **Static Site Generation**: Fast load times with high SEO efficiency.

---

## 🛠️ Developer Setup

For the BeForth engineering team:

### 1. Requirements
Ensure you have **Node.js 18+** installed.

### 2. Installation
```bash
git clone https://github.com/RandomKid24/docy.git
cd docy
npm install
```

### 3. Running Locally
```bash
npm run dev
```
Navigate to [http://localhost:6969](http://localhost:6969).

### 4. Code Standards
Please refer to the [BeForth Design & Implementation Guide](src/BEFORTH_DESIGN_GUIDE.md) before making UI or animation changes.

---

## ⚖️ License
© 2026 BeForth. All Rights Reserved.  
Proprietary software. Unauthorized copying, modification, or distribution is strictly prohibited.

---

<p align="center">
  Generated for BeForth by Antigravity AI.
</p>
