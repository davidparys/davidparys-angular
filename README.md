# 🖥️ Angular Terminal Portfolio

> **An interactive terminal portfolio that brings the classic command-line experience to the modern web**

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A fully interactive terminal portfolio built with **Angular 20** featuring a Matrix-style background animation, typewriter effects, and a comprehensive command-line interface. Perfect for developers who want to showcase their skills in a unique and engaging way.

## ✨ Features

### 🎮 Interactive Terminal Experience
- **Real Command-Line Interface** - Type commands just like a real terminal
- **Command History Navigation** - Use ↑/↓ arrows to browse previous commands
- **Tab Auto-completion** - Intelligent command suggestions
- **Typewriter Effects** - Authentic character-by-character output
- **Blinking Cursor** - Realistic terminal cursor animation
- **Copy/Paste Support** - Full clipboard integration with keyboard shortcuts

### 🌟 Matrix Background Animation
- **Canvas-based Matrix Rain** - High-performance animated background
- **Customizable Settings** - Adjust speed, opacity, colors, and character sets
- **Responsive Design** - Adapts to any screen size
- **Performance Optimized** - 60fps smooth animation using RequestAnimationFrame

### 🎨 Modern Design
- **Dark/Light Theme Toggle** - Switch between classic terminal and modern light mode
- **Glassmorphism Effects** - Beautiful backdrop blur and transparency
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Accessibility First** - WCAG 2.1 AA compliant with keyboard navigation

## 🚀 Live Demo

**[Try it live here](https://davidparys-angular.vercel.app/)**

## 📋 Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `help` | Show all available commands | `help` |
| `about` | Personal introduction | `about` |
| `skills` | Technical skills & proficiency | `skills` |
| `projects` | Portfolio projects showcase | `projects` |
| `experience` | Work experience timeline | `experience` |
| `education` | Educational background | `education` |
| `contact` | Contact information & social links | `contact` |
| `resume` | Download CV/resume | `resume` |
| `clear` | Clear terminal output | `clear` |
| `whoami` | Current user info | `whoami` |
| `date` | Current date & time | `date` |
| `theme` | Toggle dark/light theme | `theme` |
| `matrix` | Control background animation | `matrix pause` |

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `↑` / `↓` | Navigate command history |
| `Tab` | Auto-complete commands |
| `Ctrl + C` | Clear current input |
| `Ctrl + L` | Clear terminal screen |
| `Ctrl + Shift + C` | Copy terminal content |
| `Ctrl + Shift + V` | Paste from clipboard |

## 🛠️ Tech Stack

- **Framework**: Angular 20 with TypeScript
- **Styling**: Tailwind CSS 4 with custom design system
- **Icons**: Lucide Angular for beautiful icons
- **Animation**: Canvas API for Matrix background
- **State Management**: RxJS for reactive programming
- **Build Tool**: Angular CLI with optimized bundling

## 🏗️ Architecture

```
src/
├── components/
│   ├── terminal/              # Main terminal interface
│   ├── typewriter/            # Typewriter effect component
│   └── matrix-background/     # Matrix rain animation
├── services/
│   ├── terminal.service.ts    # Terminal state management
│   ├── commands.service.ts    # Command execution logic
│   └── matrix-control.service.ts # Matrix animation control
├── models/
│   └── terminal.models.ts     # TypeScript interfaces
└── assets/
    └── David-Parys-C.V.pdf   # Resume file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/davidparys/angular-terminal-portfolio.git
   cd angular-terminal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
# Build optimized production bundle
npm run build:prod

# Serve production build locally
npx http-server dist/angular-terminal-portfolio/browser
```

## 🎨 Customization

### Personal Information
Update your details in `src/services/commands.service.ts`:

```typescript
// Update contact information
private contactCommand(): CommandOutput {
  return {
    content: `
      <div class="contact-section">
        <h2>CONTACT</h2>
        <ul>
          <li><strong>Email:</strong> your-email@example.com</li>
          <li><strong>LinkedIn:</strong> linkedin.com/in/yourprofile</li>
          <li><strong>GitHub:</strong> github.com/yourusername</li>
        </ul>
      </div>
    `,
    type: 'info',
    html: true
  };
}
```

### Matrix Animation Settings
Customize the Matrix background in `src/components/matrix-background/matrix-background.component.ts`:

```typescript
// Available character sets
private charSets = {
  matrix: 'アイウエオカキクケコサシスセソタチツテト...',
  binary: '01',
  hex: '0123456789ABCDEF',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Available color presets
private colorPresets = {
  matrix: '#00ff41',
  red: '#ff0000',
  blue: '#0080ff',
  purple: '#8000ff'
};
```

### Styling
Modify the design system in `src/global_styles.css`:

```css
:root {
  /* Color palette */
  --terminal-green: #00ff41;
  --terminal-bg: #000000;
  --terminal-text: #ffffff;
  
  /* Typography */
  --font-mono: 'Fira Code', 'Consolas', monospace;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}
```



### Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Write comprehensive tests
- Maintain accessibility standards
- Update documentation for API changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Matrix Rain Effect**: Inspired by the iconic Matrix movie aesthetic
- **Terminal Design**: Based on classic Unix terminal interfaces
- **Typewriter Effect**: Enhanced user experience with realistic typing animation
- **Angular Community**: For the excellent framework and ecosystem

## 📞 Contact

**David Parys** - [david@mountain-web-studio.com](mailto:david@mountain-web-studio.com)


---

⭐ **Star this repository if you found it helpful!**

🔄 **Feel free to fork and customize for your own portfolio!**