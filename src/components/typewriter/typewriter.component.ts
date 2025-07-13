import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [CommonModule],
  template: '<div [innerHTML]="displayContent"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypewriterComponent implements OnInit, OnDestroy {
  @Input() content = '';
  @Input() delay = 50;
  @Input() html = false;

  displayContent = '';
  private timeouts: number[] = [];

  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  private startTypewriter(): void {
    if (!this.content) return;

    this.displayContent = '';

    if (this.html) {
      this.typeHTMLContent();
    } else {
      this.typeTextContent();
    }
  }

  private typeTextContent(): void {
    const chars = this.content.split('');

    chars.forEach((char, index) => {
      const timeout = setTimeout(() => {
        this.displayContent += char;
        this.cdr.markForCheck();
      }, index * this.delay);

      this.timeouts.push(timeout);
    });
  }

  private typeHTMLContent(): void {
    // For HTML content, we need to be more careful about timing
    // This is a simplified version - for full HTML support, we'd need a more sophisticated parser
    const timeout = setTimeout(() => {
      this.displayContent = this.content;
      this.cdr.markForCheck();
    }, this.delay);

    this.timeouts.push(timeout);
  }

  private clearTimeouts(): void {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
  }
}