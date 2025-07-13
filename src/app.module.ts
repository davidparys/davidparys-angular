import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { TypewriterComponent } from './components/typewriter/typewriter.component';
import { MatrixBackgroundComponent } from './components/matrix-background/matrix-background.component';

import { TerminalService } from './services/terminal.service';
import { CommandsService } from './services/commands.service';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    TypewriterComponent,
    MatrixBackgroundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [
    TerminalService,
    CommandsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }