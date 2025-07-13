import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixControlService } from '../../services/matrix-control.service';

@Component({
  selector: 'app-matrix-background',
  standalone: true,
  imports: [CommonModule],
  template: '<canvas #matrixCanvas class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-black"></canvas>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('matrixCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId = 0;
  private drops: number[] = [];
  private fontSize = 14;
  private columns = 0;
  private isPaused = false;
  private speed = 1;
  private opacity = 0.3;
  private color = '#00ff41'; // Matrix green
  private charSet = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private trailOpacity = 0.04;

  // Available character sets
  private charSets = {
    matrix: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    binary: '01',
    hex: '0123456789ABCDEF',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    hiragana: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'
  };

  // Available color presets
  private colorPresets = {
    matrix: '#00ff41',
    red: '#ff0000',
    blue: '#0080ff',
    purple: '#8000ff',
    cyan: '#00ffff',
    yellow: '#ffff00',
    orange: '#ff8000',
    pink: '#ff0080',
    white: '#ffffff'
  };

  private readonly matrixControlService = inject(MatrixControlService);

  ngOnInit(): void {
    this.initializeCanvas();
    this.setupResizeListener();
    this.startAnimation();

    // Register this component with the control service
    this.matrixControlService.registerMatrixComponent({
      pause: () => this.pause(),
      resume: () => this.resume(),
      setSpeed: (speed: number) => this.setSpeed(speed),
      setOpacity: (opacity: number) => this.setOpacity(opacity),
      setColor: (color: string) => this.setColor(color),
      setCharSet: (charSet: string) => this.setCharSet(charSet),
      setFontSize: (fontSize: number) => this.setFontSize(fontSize),
      setTrailOpacity: (trailOpacity: number) => this.setTrailOpacity(trailOpacity),
      getCurrentState: () => this.getCurrentState(),
      getCharSets: () => this.getCharSets(),
      getColorPresets: () => this.getColorPresets()
    });
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.matrixControlService.unregisterMatrixComponent();
  }

  private initializeCanvas(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.initializeDrops();
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
  }

  private initializeDrops(): void {
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100;
    }
  }

  private setupResizeListener(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize(): void {
    this.resizeCanvas();
    this.initializeDrops();
  }

  private startAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.animate();
  }

  private stopAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
  }

  private animate(): void {
    if (this.isPaused) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }

    // Semi-transparent black background for trail effect
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.trailOpacity})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Matrix rain effect
    this.ctx.fillStyle = this.color;
    this.ctx.globalAlpha = this.opacity;
    this.ctx.font = `${this.fontSize}px 'Fira Code', monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      // Random character
      const char = this.charSet[Math.floor(Math.random() * this.charSet.length)];

      // Draw character
      this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

      // Reset drop if it goes beyond screen height
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      // Move drop down
      this.drops[i] += this.speed;
    }

    // Reset global alpha
    this.ctx.globalAlpha = 1.0;

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  // Public methods for controlling the animation
  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  setSpeed(speed: number): void {
    this.speed = Math.max(0.1, Math.min(10, speed));
  }

  setOpacity(opacity: number): void {
    this.opacity = Math.max(0.1, Math.min(1, opacity));
  }

  setColor(color: string): void {
    this.color = color;
  }

  setCharSet(charSet: string): void {
    // Use predefined character sets if available, otherwise use the provided string
    if (this.charSets[charSet as keyof typeof this.charSets]) {
      this.charSet = this.charSets[charSet as keyof typeof this.charSets];
    } else {
      this.charSet = charSet;
    }
  }

  setFontSize(fontSize: number): void {
    this.fontSize = Math.max(8, Math.min(32, fontSize));
    this.resizeCanvas();
    this.initializeDrops();
  }

  setTrailOpacity(trailOpacity: number): void {
    this.trailOpacity = Math.max(0.01, Math.min(0.2, trailOpacity));
  }

  // Getter methods for current state
  getCurrentState() {
    // Find the current character set name
    let charSetName = 'custom';
    for (const [name, chars] of Object.entries(this.charSets)) {
      if (chars === this.charSet) {
        charSetName = name;
        break;
      }
    }

    return {
      isPaused: this.isPaused,
      speed: this.speed,
      opacity: this.opacity,
      color: this.color,
      charSet: charSetName,
      fontSize: this.fontSize,
      trailOpacity: this.trailOpacity
    };
  }

  // Get available presets
  getCharSets() {
    return this.charSets;
  }

  getColorPresets() {
    return this.colorPresets;
  }
}