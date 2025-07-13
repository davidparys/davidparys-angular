export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => Promise<CommandOutput> | CommandOutput;
}

export interface CommandOutput {
  content: string;
  type: 'success' | 'error' | 'info' | 'warning';
  html?: boolean;
  delay?: number;
}

export interface TerminalState {
  history: HistoryEntry[];
  currentInput: string;
  commandHistory: string[];
  historyIndex: number;
  isProcessing: boolean;
  theme: 'dark' | 'light';
}

export interface HistoryEntry {
  command: string;
  output?: CommandOutput;
  timestamp: Date;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'languages';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  honors?: string[];
}