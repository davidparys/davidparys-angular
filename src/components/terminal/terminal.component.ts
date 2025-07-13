import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TerminalService } from '../../services/terminal.service';
import { TerminalState, HistoryEntry } from '../../models/terminal.models';
import { TypewriterComponent } from '../typewriter/typewriter.component';

import { Download, File, House, LucideAngularModule, Menu, Moon, Sun, UserCheck, LUCIDE_ICONS, LucideIconProvider, Github } from 'lucide-angular';


@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, TypewriterComponent, LucideAngularModule],
  templateUrl: './terminal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Download, File, House, Sun, Moon, Menu, UserCheck, Github })
    }
  ]
})
export class TerminalComponent implements OnInit, OnDestroy {
  @ViewChild('terminalContainer', { static: true }) terminalContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('commandInput', { static: true }) commandInput!: ElementRef<HTMLInputElement>;

  state: TerminalState = {
    history: [],
    currentInput: '',
    commandHistory: [],
    historyIndex: -1,
    isProcessing: false,
    theme: 'dark'
  };

  cursorPosition = 0;
  readonly Download = Download;
  readonly File = File;
  readonly House = House;
  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly Menu = Menu;
  readonly UserCheck = UserCheck;
  readonly Github = Github;
  private destroy$ = new Subject<void>();
  private typewriterTimeouts: number[] = [];

  private readonly terminalService = inject(TerminalService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.terminalService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.state = state;
        this.cdr.markForCheck();
        // Reset cursor position to end if input changes
        this.cursorPosition = this.state.currentInput.length;
        // Auto-scroll to bottom when new content is added
        if (state.history.length > 0) {
          setTimeout(() => this.scrollToBottom(), 100);
        }
      });

    // Focus input on component load
    setTimeout(() => this.focusInput(), 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearTypewriterTimeouts();
  }

  onInputKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.executeCommand(input.value);
        break;

      case 'ArrowUp': {
        event.preventDefault();
        const upCommand = this.terminalService.navigateHistory('up');
        input.value = upCommand;
        this.terminalService.updateCurrentInput(upCommand);
        this.cursorPosition = upCommand.length;
        this.cdr.markForCheck();
        break;
      }

      case 'ArrowDown': {
        event.preventDefault();
        const downCommand = this.terminalService.navigateHistory('down');
        input.value = downCommand;
        this.terminalService.updateCurrentInput(downCommand);
        this.cursorPosition = downCommand.length;
        this.cdr.markForCheck();
        break;
      }

      case 'Tab':
        event.preventDefault();
        this.handleAutocompletion(input);
        break;

      case 'c':
        if (event.ctrlKey) {
          event.preventDefault();
          input.value = '';
          this.terminalService.updateCurrentInput('');
          this.cursorPosition = 0;
          this.cdr.markForCheck();
        }
        break;

      case 'l':
        if (event.ctrlKey) {
          event.preventDefault();
          this.terminalService.clearHistory();
        }
        break;
    }
  }

  onInputChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    this.terminalService.updateCurrentInput(inputEl.value);
    this.cursorPosition = inputEl.selectionStart || 0;
    this.cdr.markForCheck();
  }

  onInputKeyup(event: KeyboardEvent): void {
    const inputEl = event.target as HTMLInputElement;
    this.cursorPosition = inputEl.selectionStart || 0;
    this.cdr.markForCheck();
  }

  onInputClick(event: MouseEvent): void {
    const inputEl = event.target as HTMLInputElement;
    this.cursorPosition = inputEl.selectionStart || 0;
    this.cdr.markForCheck();
  }

  onInputLineClick(event: MouseEvent | KeyboardEvent): void {
    // If it's a keyboard event, just focus the input
    if (event instanceof KeyboardEvent) {
      this.focusInput();
      return;
    }

    // If clicking on the prompt, just focus the input
    if ((event.target as HTMLElement).classList.contains('prompt')) {
      this.focusInput();
      return;
    }

    // For other areas, delegate to the container click handler
    this.onInputContainerClick(event);

    // Prevent event bubbling to avoid conflicts
    event.stopPropagation();
  }

  onInputContainerClick(event: MouseEvent | KeyboardEvent): void {
    // Focus the input when clicking anywhere in the input container
    this.focusInput();

    // If it's a keyboard event, just focus and return
    if (event instanceof KeyboardEvent) {
      return;
    }

    // Check if input element is available
    if (!this.commandInput?.nativeElement) {
      return;
    }

    // Calculate cursor position based on click position
    const inputEl = this.commandInput.nativeElement;
    const rect = inputEl.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

    // Get the prompt width to offset the click position
    const promptElement = inputEl.closest('.input-line')?.querySelector('.prompt') as HTMLElement;
    const promptWidth = promptElement?.offsetWidth || 0;
    const adjustedClickX = clickX - promptWidth;

    // Approximate cursor position based on click position
    const charWidth = this.getCharacterWidth();
    const approximatePosition = Math.round(adjustedClickX / charWidth);
    this.cursorPosition = Math.max(0, Math.min(approximatePosition, this.state.currentInput.length));

    // Set the cursor position in the real input
    inputEl.setSelectionRange(this.cursorPosition, this.cursorPosition);
    this.cdr.markForCheck();

    // Prevent event bubbling
    event.stopPropagation();
  }

  private async executeCommand(command: string): Promise<void> {
    if (command.trim() === 'clear' || command.trim() === 'cls') {
      this.terminalService.clearHistory();
      if (this.commandInput?.nativeElement) {
        this.commandInput.nativeElement.value = '';
      }
      this.terminalService.updateCurrentInput('');
      this.cursorPosition = 0;
      this.cdr.markForCheck();
      return;
    }

    if (command.trim() === 'theme') {
      this.terminalService.toggleTheme();
    }

    await this.terminalService.executeCommand(command);
    if (this.commandInput?.nativeElement) {
      this.commandInput.nativeElement.value = '';
    }
    this.terminalService.updateCurrentInput('');
    this.cursorPosition = 0;
    this.cdr.markForCheck();
  }

  private handleAutocompletion(input: HTMLInputElement): void {
    const currentValue = input.value;
    const suggestions = this.terminalService.getAutocompleteSuggestions(currentValue);

    if (suggestions.length === 1) {
      input.value = suggestions[0];
      this.terminalService.updateCurrentInput(suggestions[0]);
      this.cursorPosition = suggestions[0].length;
      this.cdr.markForCheck();
    } else if (suggestions.length > 1) {
      // Show suggestions in terminal output
      const suggestionText = `Suggestions: ${suggestions.join(', ')}`;
      console.log(suggestionText); // For now, just log suggestions
    }
  }

  private scrollToBottom(): void {
    if (this.terminalContainer?.nativeElement) {
      const container = this.terminalContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  private focusInput(): void {
    if (this.commandInput?.nativeElement) {
      this.commandInput.nativeElement.focus();
      // Ensure cursor is at the end when focusing
      this.cursorPosition = this.state.currentInput.length;
      this.cdr.markForCheck();
    }
  }

  private getCharacterWidth(): number {
    // Create a temporary span to measure character width
    const span = document.createElement('span');
    span.style.fontFamily = 'Fira Code, Consolas, Monaco, monospace';
    span.style.fontSize = '14px';
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'pre';
    span.textContent = 'W'; // Use a wide character for measurement
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
  }

  onTerminalClick(): void {
    // Only focus if the terminal is not processing and input is available
    if (!this.state.isProcessing && this.commandInput?.nativeElement) {
      this.focusInput();
    }
  }

  getPrompt(): string {
    return 'guest@portfolio:~$ ';
  }

  renderOutput(entry: HistoryEntry): string {
    if (!entry.output) return '';

    if (entry.output.html) {
      return entry.output.content;
    }

    // Convert plain text to HTML, preserving line breaks
    return entry.output.content.replace(/\n/g, '<br>');
  }

  shouldShowTypewriter(entry: HistoryEntry): boolean {
    return !!entry.output?.delay;
  }

  private clearTypewriterTimeouts(): void {
    this.typewriterTimeouts.forEach(timeout => clearTimeout(timeout));
    this.typewriterTimeouts = [];
  }

  /**
   * Downloads the C.V from the assets folder.
   */
  exportCV(): void {
    window.open('/assets/David-Parys-C.V.pdf', '_blank');

  }

  openGithub(): void {
    window.open('https://github.com/davidparys', '_blank');
  }

  /**
   * Toggle between dark and light terminal themes.
   */
  toggleTheme(): void {
    this.terminalService.toggleTheme();
  }

  /**
   * TrackBy function for ngFor to optimize DOM rendering.
   * @param index The index of the item in the array.
   */
  trackByIndex(index: number): number {
    return index;
  }

  // Keyboard shortcuts
  onKeydown(event: KeyboardEvent): void {
    // Ctrl+Shift+C to copy
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
      this.copyToClipboard();
    }

    // Ctrl+Shift+V to paste
    if (event.ctrlKey && event.shiftKey && event.key === 'V') {
      this.pasteFromClipboard();
    }
  }

  private async copyToClipboard(): Promise<void> {
    const terminalText = this.state.history
      .map(entry => {
        const prompt = entry.command ? `${this.getPrompt()}${entry.command}\n` : '';
        const output = entry.output ? entry.output.content + '\n' : '';
        return prompt + output;
      })
      .join('');

    try {
      await navigator.clipboard.writeText(terminalText);
      console.log('Terminal content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }

  private async pasteFromClipboard(): Promise<void> {
    try {
      const text = await navigator.clipboard.readText();
      if (this.commandInput?.nativeElement) {
        const input = this.commandInput.nativeElement;
        input.value += text;
        this.terminalService.updateCurrentInput(input.value);
      }
    } catch (err) {
      console.error('Failed to paste from clipboard:', err);
    }
  }
}