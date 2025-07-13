import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MatrixState {
    isPaused: boolean;
    speed: number;
    opacity: number;
    color: string;
    charSet: string;
    fontSize: number;
    trailOpacity: number;
}

export interface MatrixControl {
    pause: () => void;
    resume: () => void;
    setSpeed: (speed: number) => void;
    setOpacity: (opacity: number) => void;
    setColor: (color: string) => void;
    setCharSet: (charSet: string) => void;
    setFontSize: (fontSize: number) => void;
    setTrailOpacity: (trailOpacity: number) => void;
    getCurrentState: () => MatrixState;
    getCharSets: () => Record<string, string>;
    getColorPresets: () => Record<string, string>;
}

@Injectable({
    providedIn: 'root'
})
export class MatrixControlService {
    private matrixComponent: MatrixControl | null = null;
    private isPausedSubject = new BehaviorSubject<boolean>(false);
    private speedSubject = new BehaviorSubject<number>(1);
    private opacitySubject = new BehaviorSubject<number>(0.3);
    private colorSubject = new BehaviorSubject<string>('#00ff41');
    private charSetSubject = new BehaviorSubject<string>('matrix');
    private fontSizeSubject = new BehaviorSubject<number>(14);
    private trailOpacitySubject = new BehaviorSubject<number>(0.04);

    public isPaused$ = this.isPausedSubject.asObservable();
    public speed$ = this.speedSubject.asObservable();
    public opacity$ = this.opacitySubject.asObservable();
    public color$ = this.colorSubject.asObservable();
    public charSet$ = this.charSetSubject.asObservable();
    public fontSize$ = this.fontSizeSubject.asObservable();
    public trailOpacity$ = this.trailOpacitySubject.asObservable();

    registerMatrixComponent(component: MatrixControl): void {
        this.matrixComponent = component;
    }

    unregisterMatrixComponent(): void {
        this.matrixComponent = null;
    }

    pause(): void {
        if (this.matrixComponent) {
            this.matrixComponent.pause();
            this.isPausedSubject.next(true);
        }
    }

    resume(): void {
        if (this.matrixComponent) {
            this.matrixComponent.resume();
            this.isPausedSubject.next(false);
        }
    }

    setSpeed(speed: number): void {
        if (this.matrixComponent) {
            this.matrixComponent.setSpeed(speed);
            this.speedSubject.next(speed);
        }
    }

    setOpacity(opacity: number): void {
        if (this.matrixComponent) {
            this.matrixComponent.setOpacity(opacity);
            this.opacitySubject.next(opacity);
        }
    }

    setColor(color: string): void {
        if (this.matrixComponent) {
            this.matrixComponent.setColor(color);
            this.colorSubject.next(color);
        }
    }

    setCharSet(charSet: string): void {
        if (this.matrixComponent) {
            this.matrixComponent.setCharSet(charSet);
            this.charSetSubject.next(charSet);
        }
    }

    setFontSize(fontSize: number): void {
        if (this.matrixComponent) {
            this.matrixComponent.setFontSize(fontSize);
            this.fontSizeSubject.next(fontSize);
        }
    }

    setTrailOpacity(trailOpacity: number): void {
        if (this.matrixComponent) {
            this.matrixComponent.setTrailOpacity(trailOpacity);
            this.trailOpacitySubject.next(trailOpacity);
        }
    }

    getCurrentState(): MatrixState {
        if (this.matrixComponent) {
            return this.matrixComponent.getCurrentState();
        }
        return {
            isPaused: this.isPausedSubject.value,
            speed: this.speedSubject.value,
            opacity: this.opacitySubject.value,
            color: this.colorSubject.value,
            charSet: this.charSetSubject.value,
            fontSize: this.fontSizeSubject.value,
            trailOpacity: this.trailOpacitySubject.value
        };
    }

    getCharSets(): Record<string, string> {
        if (this.matrixComponent) {
            return this.matrixComponent.getCharSets();
        }
        return {};
    }

    getColorPresets(): Record<string, string> {
        if (this.matrixComponent) {
            return this.matrixComponent.getColorPresets();
        }
        return {};
    }
} 