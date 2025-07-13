import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommandOutput, TerminalState, HistoryEntry } from '../models/terminal.models';
import { CommandsService } from './commands.service';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private readonly commandsService = inject(CommandsService);

  private readonly initialState: TerminalState = {
    history: [],
    currentInput: '',
    commandHistory: [],
    historyIndex: -1,
    isProcessing: false,
    theme: 'dark',

  };

  private stateSubject = new BehaviorSubject<TerminalState>(this.initialState);
  public state$: Observable<TerminalState> = this.stateSubject.asObservable();

  constructor() {
    this.initializeTerminal();
  }

  private initializeTerminal(): void {
    const welcomeEntry: HistoryEntry = {
      command: '',
      output: {
        content: this.getWelcomeMessage(),
        type: 'info',
        html: true
      },
      timestamp: new Date()
    };

    this.updateState({ history: [welcomeEntry] });
  }

  private getWelcomeMessage(): string {
    return `
      <div class="welcome-message">
        <pre class="ascii-art">
                                            
      </pre>
      <div class="welcome-text">
        <p>Welcome to my interactive terminal portfolio! </p>
          <p> Type <span class="highlight"> 'help' </span> to see available commands.</p>
            <p>Use <span class="highlight"> Tab </span> for auto-completion and <span class="highlight">↑↓</span> for command history.</p>
              </div>
              </div>
                `;
  }

  async executeCommand(input: string): Promise<void> {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    this.updateState({ isProcessing: true });

    // Add to command history
    const currentState = this.stateSubject.value;
    const newCommandHistory = [...currentState.commandHistory, trimmedInput];

    // Add command to display history
    const commandEntry: HistoryEntry = {
      command: trimmedInput,
      timestamp: new Date()
    };

    this.updateState({
      commandHistory: newCommandHistory,
      historyIndex: -1,
      history: [...currentState.history, commandEntry]
    });

    try {
      const output = await this.commandsService.executeCommand(trimmedInput);

      // Update the last entry with output
      const updatedHistory = [...this.stateSubject.value.history];
      updatedHistory[updatedHistory.length - 1].output = output;

      this.updateState({
        history: updatedHistory,
        isProcessing: false,
        currentInput: ''
      });
    } catch (error) {
      const errorOutput: CommandOutput = {
        content: `Error: ${error} `,
        type: 'error'
      };

      const updatedHistory = [...this.stateSubject.value.history];
      updatedHistory[updatedHistory.length - 1].output = errorOutput;

      this.updateState({
        history: updatedHistory,
        isProcessing: false,
        currentInput: ''
      });
    }
  }

  updateCurrentInput(input: string): void {
    this.updateState({ currentInput: input });
  }

  navigateHistory(direction: 'up' | 'down'): string {
    const currentState = this.stateSubject.value;
    const { commandHistory, historyIndex } = currentState;

    if (commandHistory.length === 0) return '';

    let newIndex = historyIndex;

    if (direction === 'up') {
      newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
    } else {
      newIndex = Math.max(historyIndex - 1, -1);
    }

    this.updateState({ historyIndex: newIndex });

    return newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex];
  }

  getAutocompleteSuggestions(input: string): string[] {
    return this.commandsService.getAutocompleteSuggestions(input);
  }

  clearHistory(): void {
    this.updateState({ history: [] });
  }

  toggleTheme(): void {
    const currentState = this.stateSubject.value;
    const newTheme = currentState.theme === 'dark' ? 'light' : 'dark';
    this.updateState({ theme: newTheme });
  }

  exportSession(): string {
    const currentState = this.stateSubject.value;
    const session = {
      timestamp: new Date().toISOString(),
      history: currentState.history,
      theme: currentState.theme
    };
    return JSON.stringify(session, null, 2);
  }

  private updateState(partialState: Partial<TerminalState>): void {
    const currentState = this.stateSubject.value;
    const newState = { ...currentState, ...partialState };
    this.stateSubject.next(newState);
  }
}