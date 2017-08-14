import { Component, Inject, ReflectiveInjector } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import {environment} from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  darkTheme = false;
  squareState: string;
  constructor(private oc: OverlayContainer) {
  }

  switchTheme(checked) {
    this.darkTheme = checked;
    this.oc.themeClass = checked ? 'myapp-dark-theme' : null;
  }

}

