import { Component, OnInit, HostListener, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalService } from './services/terminal.service';
import { TerminalComponent } from './components/terminal/terminal.component';
import { MatrixBackgroundComponent } from './components/matrix-background/matrix-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TerminalComponent, MatrixBackgroundComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly terminalService = inject(TerminalService);

  ngOnInit(): void {
    // Subscribe to theme changes and update <html> class
    this.terminalService.state$.subscribe(state => {
      const html = document.documentElement;
      if (state.theme === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
      }
    });
  }

  @HostListener('window:beforeunload')
  beforeUnloadHandler(): void {
    // Optionally save session data before page unload
    const session = this.terminalService.exportSession();
    localStorage.setItem('terminal-session', session);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardShortcuts(event: KeyboardEvent): void {
    // Global keyboard shortcuts
    if (event.ctrlKey && event.shiftKey) {
      switch (event.key) {
        case 'T':
          event.preventDefault();
          this.terminalService.toggleTheme();
          break;
        case 'E':
          event.preventDefault();
          this.exportSession();
          break;
      }
    }
  }

  private exportSession(): void {
    const session = this.terminalService.exportSession();
    const blob = new Blob([session], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `terminal-session-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}