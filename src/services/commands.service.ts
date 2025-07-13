import { Injectable, inject } from '@angular/core';
import { Command, CommandOutput } from '../models/terminal.models';
import { MatrixControlService } from './matrix-control.service';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private readonly matrixControlService = inject(MatrixControlService);
  private commands: Map<string, Command> = new Map<string, Command>();

  constructor() {
    this.initializeCommands();
  }

  private initializeCommands(): void {
    const commands: Command[] = [
      {
        name: 'help',
        description: 'Display all available commands with descriptions',
        execute: () => this.helpCommand()
      },
      {
        name: 'about',
        description: 'Show personal introduction and background',
        execute: () => this.aboutCommand()
      },
      {
        name: 'skills',
        description: 'Display technical skills with proficiency levels',
        execute: () => this.skillsCommand()
      },
      {
        name: 'projects',
        description: 'Show portfolio projects with filtering options',
        execute: () => this.projectsCommand()
      },
      {
        name: 'contact',
        description: 'Display contact information and social links',
        execute: () => this.contactCommand()
      },
      {
        name: 'experience',
        description: 'List professional work experience',
        execute: () => this.experienceCommand()
      },
      {
        name: 'education',
        description: 'Show educational background and qualifications',
        execute: () => this.educationCommand()
      },
      {
        name: 'resume',
        description: 'Download or view resume',
        execute: () => this.resumeCommand()
      },
      {
        name: 'clear',
        description: 'Clear the terminal screen',
        aliases: ['cls'],
        execute: () => this.clearCommand()
      },
      {
        name: 'whoami',
        description: 'Display current user information',
        execute: () => this.whoamiCommand()
      },
      {
        name: 'date',
        description: 'Show current date and time',
        execute: () => this.dateCommand()
      },
      {
        name: 'sudo',
        description: 'Execute commands with administrator privileges',
        execute: () => this.sudoCommand()
      },
      {
        name: 'theme',
        description: 'Toggle between dark and light themes',
        execute: () => this.themeCommand()
      },
      {
        name: 'matrix',
        description: 'Control Matrix background animation',
        execute: (args) => this.matrixCommand(args)
      },
      {
        name: 'languages',
        description: 'Display spoken languages proficiency',
        execute: () => this.languagesCommand()
      },
      {
        name: 'proglangs',
        description: 'Display programming languages proficiency',
        execute: () => this.proglangsCommand()
      },
      {
        name: 'interests',
        description: 'Display personal interests and hobbies',
        execute: () => this.interestsCommand()
      }
    ];

    commands.forEach(cmd => {
      this.commands.set(cmd.name, cmd);
      if (cmd.aliases) {
        cmd.aliases.forEach(alias => this.commands.set(alias, cmd));
      }
    });
  }

  async executeCommand(input: string): Promise<CommandOutput> {
    const [commandName, ...args] = input.trim().split(' ');
    const command = this.commands.get(commandName.toLowerCase());

    if (!command) {
      return {
        content: `Command not found: ${commandName}. Type 'help' for available commands.`,
        type: 'error'
      };
    }

    try {
      const result = await command.execute(args);
      return result;
    } catch (error) {
      return {
        content: `Error executing command: ${error}`,
        type: 'error'
      };
    }
  }

  getAutocompleteSuggestions(input: string): string[] {
    const commandNames = Array.from(this.commands.keys());
    return commandNames.filter(cmd => cmd.startsWith(input.toLowerCase()));
  }

  private helpCommand(): CommandOutput {
    const commandList = Array.from(new Set(Array.from(this.commands.values())))
      .map(cmd => `<div class="help-command"><span class="command-name">${cmd.name}</span> - ${cmd.description}</div>`)
      .join('');

    return {
      content: `<div class="help-section">Available commands:<br><br>${commandList}<br><br>Tip: Use Tab for auto-completion and ↑↓ for command history.</div>`,
      type: 'info',
      html: true
    };
  }

  private aboutCommand(): CommandOutput {
    // Adapted to match the 'Profile' section of the CV
    return {
      content: `
<div class="about-section">
  <h2>David Parys</h2>
  <h3 style="margin-top:0;">SOFTWARE ENGINEER | FRONTEND-FOCUSED | SAAS & FINSURTECH SPECIALIST</h3>
  <p>📍 Wroclaw, Poland · 🇫🇷 French · 🇬🇧 English · 🇵🇱 Polish</p>
  <hr>
  <h3>PROFILE</h3>
  <p>User-centric software engineer with over 5 years of experience delivering responsive, scalable, and performant web applications. Proven track record in the fin-surtech sector and in running a web agency. Expertise in modern frontend frameworks, UI/UX design, and full-stack JavaScript development. Passionate about crafting efficient solutions that blend business needs with elegant user experiences.</p>
</div>
      `,
      type: 'info',
      html: true,
      delay: 50
    };
  }

  private skillsCommand(): CommandOutput {
    // Adapted to match the 'Core Skills' section of the CV
    return {
      content: `
<div class="skills-section">
  <h2>CORE SKILLS</h2>
  <ul>
    <li><strong>Languages & Frameworks:</strong> TypeScript, Vue3, Pinia (colada), JavaScript, Node.js, Express, React, Next.js, Nuxt.js, GraphQL, REST</li>
    <li><strong>Styling & UI:</strong> Tailwind CSS (4), ShadCN, Chakra UI, Bootstrap, SCSS, Storybook</li>
    <li><strong>Databases & APIs:</strong> PostgreSQL, Strapi, Prismic, SQL</li>
    <li><strong>AI Tools & Workflows:</strong> ChatGPT, Claude, Cursor, Windsurf, Copilot - integrating LLMs in development workflows, code generation, testing, and productivity</li>
    <li><strong>DevOps & Tools:</strong> Git, GitLab/GitHub CI/CD, Netlify, Semver, Vercel</li>
    <li><strong>CMS & Platforms:</strong> WordPress, JAMstack, cPanel/WHM</li>
    <li><strong>UX & Product:</strong> Product Design, User-Centered Design, A/B Testing, SEO, Analytics</li>
    <li><strong>Other:</strong> Google Search Console, DNS Management, N8N, trigger.dev, zapier</li>
  </ul>
</div>
      `,
      type: 'info',
      html: true,
      delay: 30
    };
  }

  private projectsCommand(): CommandOutput {
    // Adapted to match the 'Projects & Case Studies' section of the CV
    return {
      content: `
<div class="projects-section">
  <h2>PROJECTS & CASE STUDIES</h2>
  <p><em>(Links available upon request or via portfolio)</em></p>
  <ul>
    <li>🏰 <strong>Château Ferté Saint-Aubin</strong> – Informative tourism website with custom CMS and booking logic</li>
    <li>📸 <strong>Leahmarie Kownacka Photography</strong> – Portfolio site with media gallery and branding</li>
    <li>🧾 <strong>Axonomy App</strong> – UX-forward invoicing software for SMEs</li>
    <li>🔧 <strong>Tomcar MS GmbH</strong> – B2B website for a license plate manufacturing company</li>
    <li>⚡ <strong>Sprintkit</strong> – Nuxt-based boilerplate to accelerate SaaS MVPs</li>
  </ul>
</div>
      `,
      type: 'info',
      html: true,
      delay: 40
    };
  }

  private contactCommand(): CommandOutput {
    // Adapted to match the contact/social info from the CV
    return {
      content: `
<div class="contact-section">
  <h2>CONTACT</h2>
  <ul>
    <li><strong>Email:</strong> <a href="mailto:david@mountain-web-studio.com">david@mountain-web-studio.com</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/david-parys/" target="_blank">linkedin.com/in/davidparys</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/davidparys" target="_blank">github.com/davidparys</a></li>
    <li><strong>Website:</strong> <a href="https://mountain-web-studio.com" target="_blank">mountain-web-studio.com</a></li>
  </ul>
  <p>Feel free to reach out for opportunities, collaborations, or just to say hello!</p>
</div>
      `,
      type: 'info',
      html: true
    };
  }

  private experienceCommand(): CommandOutput {
    // Adapted to match the 'Experience' section of the CV
    return {
      content: `
<div class="experience-section">
  <h2>EXPERIENCE</h2>
  <div class="experience-item">
    <h3>⛰️ FOUNDER & CEO</h3>
    <p><strong>Mountain Web Studio</strong> – Remote / Freelance<br>Jun 2023 – Present</p>
    <ul>
      <li>Founded and led a boutique web agency focused on tailored SaaS and eCommerce platforms for niche clients, particularly in equine industries.</li>
      <li>Built and deployed full-stack applications using Nuxt, Tailwind, and PostgreSQL</li>
      <li>Delivered brand-aligned UX/UI designs including logos, typography, and corporate identity</li>
      <li>Managed client relations, project roadmaps, and technical strategy</li>
      <li>Created reusable Nuxt boilerplate (Sprintkit) for faster MVP launches</li>
      <li>Delivered performance-optimized websites hosted on Vercel and Netlify</li>
    </ul>
  </div>
  <div class="experience-item">
    <h3>💼 FRONTEND DEVELOPER & PRODUCT DESIGNER</h3>
    <p><strong>The Prosperity Company AG</strong> – Ruggell, Liechtenstein<br>May 2020 – Aug 2023</p>
    <ul>
      <li>Worked on financial SaaS tools in a highly regulated environment, contributing to product strategy and UI development.</li>
      <li>Developed scalable frontend interfaces with Next.js, React, and Tailwind CSS</li>
      <li>Integrated GraphQL APIs with Apollo and REST endpoints</li>
      <li>Implemented Storybook and component libraries for design consistency</li>
      <li>Collaborated with backend teams (Node.js, Express) and contributed to CI/CD pipelines</li>
      <li>Supported design systems and corporate branding initiatives</li>
      <li><strong>Tools used:</strong> Strapi, Gatsby, Chakra UI, Styled Components, Prismic, PostgreSQL</li>
    </ul>
  </div>
  <div class="experience-item">
    <h3>💻 CONTENT DESIGN MANAGER</h3>
    <p><strong>GTS AG</strong> – Vaduz, Liechtenstein<br>Sep 2019 – May 2020</p>
    <ul>
      <li>Led content and design efforts for an eCommerce business (pre-bankruptcy during COVID).</li>
      <li>Designed and launched global WordPress-based eCommerce layouts</li>
      <li>Improved lead generation using SEO techniques, A/B testing, and analytics</li>
      <li>Created multilingual support documentation and SOPs</li>
    </ul>
  </div>
  <div class="experience-item">
    <h3>🌐 WEB IMPLEMENTATION SPECIALIST</h3>
    <p><strong>Cognizant (Google Project)</strong> – Kraków, Poland<br>Oct 2018 – Aug 2019</p>
    <ul>
      <li>Part of Google’s Shopping & Tags Team, supporting clients with implementation of web analytics and tracking.</li>
      <li>Guided business clients through implementing web-based products and analytics (Google Tags)</li>
      <li>Collaborated with internal teams to verify and troubleshoot tag setups</li>
      <li>Trained clients on optimizing mobile performance</li>
      <li>Used HTML, CSS, JavaScript, PHP, and SQL for support and integration tasks</li>
      <li>Gained exposure to CMS platforms (WordPress, Magento, Drupal, Shopify) and web server configuration (Apache, Nginx)</li>
    </ul>
  </div>
  <div class="experience-item">
    <h3>🖥️ IT ANALYST</h3>
    <p><strong>HCL Technologies (Estee Lauder Project)</strong> – Kraków, Poland<br>Apr 2018 – Sep 2018</p>
    <ul>
      <li>Provided remote IT support for Estee Lauder’s European operations.</li>
      <li>Analyzed and resolved software and hardware issues across EU markets</li>
      <li>Coordinated dispatch of field technicians for onsite client support</li>
      <li>Delivered technical support and training via Bomgar and phone</li>
    </ul>
  </div>
</div>
      `,
      type: 'info',
      html: true,
      delay: 35
    };
  }

  private educationCommand(): CommandOutput {
    // Adapted to match the 'Education & Certifications' section of the CV
    return {
      content: `
<div class="education-section">
  <h2>EDUCATION & CERTIFICATIONS</h2>
  <ul>
    <li>Self-Taught Developer via Bootcamps & Freelance Projects<br><em>(No formal degree, professional experience and real-world projects)</em></li>
  </ul>
</div>
      `,
      type: 'info',
      html: true
    };
  }

  private resumeCommand(): CommandOutput {
    return {
      content: `
<div class="resume-section">
  <h2>Resume</h2>
  <p>You can download my resume in the following formats:</p>
  
  <div class="resume-links">
    <div class="resume-link">
      <a href="/assets/David-Parys-C.V.pdf" download="David-Parys-C.V.pdf" target="_blank">
        📄 Download PDF Version
      </a>
    </div>
    <div class="resume-link">
      <a href="https://www.linkedin.com/in/david-parys/" target="_blank">
        💼 View LinkedIn Profile
      </a>
    </div>
  </div>
  
  <p class="resume-note">Resume last updated: ${new Date().toLocaleDateString()}</p>
</div>
      `,
      type: 'info',
      html: true
    };
  }

  private clearCommand(): CommandOutput {
    // This will be handled by the terminal service
    return {
      content: '',
      type: 'info'
    };
  }

  private whoamiCommand(): CommandOutput {
    return {
      content: `
<div class="whoami-section">
  <p><strong>User:</strong> guest</p>
  <p><strong>Host:</strong> portfolio-terminal</p>
  <p><strong>Shell:</strong> portfolio-shell v1.0</p>
  <p><strong>Platform:</strong> ${navigator.platform}</p>
  <p><strong>Browser:</strong> ${navigator.userAgent.split(' ')[0]}</p>
  <p><strong>Location:</strong> Portfolio Website</p>
  <p><strong>Access Level:</strong> Visitor</p>
</div>
      `,
      type: 'info',
      html: true
    };
  }

  private dateCommand(): CommandOutput {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    return {
      content: `${dateString} ${timeString}`,
      type: 'info'
    };
  }

  private sudoCommand(): CommandOutput {
    const responses = [
      "Nice try! But this is a portfolio, not a real terminal. 😄",
      "Access denied. You don't have sudo privileges here!",
      "sudo: portfolio: command not found in real world",
      "Error: Cannot grant admin access to a demo terminal",
      "sudo make me a sandwich? I'm a terminal, not a kitchen!"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      content: randomResponse,
      type: 'warning'
    };
  }

  private themeCommand(): CommandOutput {
    // This will be handled by the terminal service
    return {
      content: 'Theme toggled successfully!',
      type: 'success'
    };
  }

  private matrixCommand(args: string[]): CommandOutput {
    const subcommand = args[0]?.toLowerCase();

    switch (subcommand) {
      case 'pause':
        this.matrixControlService.pause();
        return {
          content: 'Matrix animation paused',
          type: 'success'
        };
      case 'resume':
        this.matrixControlService.resume();
        return {
          content: 'Matrix animation resumed',
          type: 'success'
        };
      case 'speed': {
        const speed = args[1];
        if (speed && !isNaN(Number(speed))) {
          const speedValue = Number(speed);
          this.matrixControlService.setSpeed(speedValue);
          return {
            content: `Matrix animation speed set to ${speedValue}`,
            type: 'success'
          };
        }
        return {
          content: 'Usage: matrix speed <number> (1-10)',
          type: 'error'
        };
      }
      case 'opacity': {
        const opacity = args[1];
        if (opacity && !isNaN(Number(opacity))) {
          const opacityValue = Number(opacity);
          this.matrixControlService.setOpacity(opacityValue);
          return {
            content: `Matrix animation opacity set to ${opacityValue}`,
            type: 'success'
          };
        }
        return {
          content: 'Usage: matrix opacity <number> (0.1-1.0)',
          type: 'error'
        };
      }
      case 'color': {
        const color = args[1];
        if (color) {
          this.matrixControlService.setColor(color);
          return {
            content: `Matrix animation color set to ${color}`,
            type: 'success'
          };
        }
        return {
          content: 'Usage: matrix color <hex_color> (e.g., #ff0000)',
          type: 'error'
        };
      }
      case 'charset': {
        const charSet = args[1];
        if (charSet) {
          this.matrixControlService.setCharSet(charSet);
          return {
            content: `Matrix animation character set changed to ${charSet}`,
            type: 'success'
          };
        }
        return {
          content: 'Usage: matrix charset <set_name> (matrix, binary, hex, symbols, letters, numbers, katakana, hiragana)',
          type: 'error'
        };
      }
      case 'fontsize': {
        const fontSize = args[1];
        if (fontSize && !isNaN(Number(fontSize))) {
          const fontSizeValue = Number(fontSize);
          this.matrixControlService.setFontSize(fontSizeValue);
          return {
            content: `Matrix animation font size set to ${fontSizeValue}`,
            type: 'success'
          };
        }
        return {
          content: 'Usage: matrix fontsize <number> (8-32)',
          type: 'error'
        };
      }
      case 'trail': {
        const trailOpacity = args[1];
        if (trailOpacity && !isNaN(Number(trailOpacity))) {
          const trailValue = Number(trailOpacity);
          this.matrixControlService.setTrailOpacity(trailValue);
          return {
            content: `Matrix animation trail opacity set to ${trailValue}`,
            type: 'success'
          };
        }
        return {
          content: 'Usage: matrix trail <number> (0.01-0.2)',
          type: 'error'
        };
      }
      case 'preset': {
        const preset = args[1];
        if (preset) {
          switch (preset.toLowerCase()) {
            case 'matrix':
              this.matrixControlService.setColor('#00ff41');
              this.matrixControlService.setCharSet('matrix');
              return {
                content: 'Matrix preset applied: Green color with Japanese characters',
                type: 'success'
              };
            case 'binary':
              this.matrixControlService.setColor('#00ffff');
              this.matrixControlService.setCharSet('binary');
              return {
                content: 'Binary preset applied: Cyan color with binary digits',
                type: 'success'
              };
            case 'fire':
              this.matrixControlService.setColor('#ff0000');
              this.matrixControlService.setCharSet('symbols');
              return {
                content: 'Fire preset applied: Red color with symbols',
                type: 'success'
              };
            case 'ocean':
              this.matrixControlService.setColor('#0080ff');
              this.matrixControlService.setCharSet('letters');
              return {
                content: 'Ocean preset applied: Blue color with letters',
                type: 'success'
              };
            default:
              return {
                content: 'Available presets: matrix, binary, fire, ocean',
                type: 'error'
              };
          }
        }
        return {
          content: 'Usage: matrix preset <name> (matrix, binary, fire, ocean)',
          type: 'error'
        };
      }
      case 'status': {
        const state = this.matrixControlService.getCurrentState();
        return {
          content: `Matrix animation status:
  Paused: ${state.isPaused ? 'Yes' : 'No'}
  Speed: ${state.speed}
  Opacity: ${state.opacity}
  Color: ${state.color}
  Character Set: ${state.charSet}
  Font Size: ${state.fontSize}
  Trail Opacity: ${state.trailOpacity}`,
          type: 'info'
        };
      }
      case 'help':
        return {
          content: `Matrix animation commands:
  matrix pause    - Pause the animation
  matrix resume   - Resume the animation
  matrix speed <number> - Set animation speed (1-10)
  matrix opacity <number> - Set animation opacity (0.1-1.0)
  matrix color <hex> - Set animation color (e.g., #ff0000)
  matrix charset <set> - Set character set (matrix, binary, hex, symbols, letters, numbers, katakana, hiragana)
  matrix fontsize <number> - Set font size (8-32)
  matrix trail <number> - Set trail opacity (0.01-0.2)
  matrix preset <name> - Apply preset (matrix, binary, fire, ocean)
  matrix status   - Show current animation status
  matrix help     - Show this help message`,
          type: 'info'
        };
      default:
        return {
          content: `Matrix animation commands:
  matrix pause    - Pause the animation
  matrix resume   - Resume the animation
  matrix speed <number> - Set animation speed (1-10)
  matrix opacity <number> - Set animation opacity (0.1-1.0)
  matrix color <hex> - Set animation color (e.g., #ff0000)
  matrix charset <set> - Set character set (matrix, binary, hex, symbols, letters, numbers, katakana, hiragana)
  matrix fontsize <number> - Set font size (8-32)
  matrix trail <number> - Set trail opacity (0.01-0.2)
  matrix preset <name> - Apply preset (matrix, binary, fire, ocean)
  matrix status   - Show current animation status
  matrix help     - Show this help message`,
          type: 'info'
        };
    }
  }

  // Spoken languages command
  private languagesCommand(): CommandOutput {
    // Adapted to match the 'Languages' section of the CV
    return {
      content: `
<div class="languages-section">
  <h2>LANGUAGES</h2>
  <ul>
    <li>🇬🇧 <strong>English</strong> – Fluent</li>
    <li>🇫🇷 <strong>French</strong> – Native</li>
    <li>🇵🇱 <strong>Polish</strong> – Fluent (but not super comfortable with technical terms)</li>
  </ul>
</div>
      `,
      type: 'info',
      html: true
    };
  }

  // Programming languages command
  private proglangsCommand(): CommandOutput {
    // Programming languages section, distinct from frameworks/tools
    return {
      content: `
<div class="proglangs-section">
  <h2>PROGRAMMING LANGUAGES</h2>
  <ul>
    <li><strong>TypeScript</strong> – Advanced</li>
    <li><strong>JavaScript</strong> – Advanced</li>
    <li><strong>SQL</strong> – Intermediate</li>
    <li><strong>PHP</strong> – Intermediate</li>
    <li><strong>Python</strong> – Intermediate</li>
    <li><strong>HTML & CSS</strong> – Advanced</li>
  </ul>
</div>
      `,
      type: 'info',
      html: true
    };
  }

  // Interests command
  private interestsCommand(): CommandOutput {
    // Adapted to match the 'Interests' section of the CV
    return {
      content: `
<div class="interests-section">
  <h2>INTERESTS</h2>
  <ul>
    <li>🧩 <strong>3D Printing & Design</strong> – Passionate about prototyping, modeling, and creating functional tools and parts with Fusion 360 and consumer-grade printers.</li>
    <li>🚴‍♂️ <strong>Cycling</strong> – Enjoy long-distance biking for focus and stamina.</li>
    <li>⛰️ <strong>Hiking</strong> – Exploring trails to recharge and reflect, often combining it with photography or creative thinking.</li>
  </ul>
</div>
      `,
      type: 'info',
      html: true
    };
  }
}