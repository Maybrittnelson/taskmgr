import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import {trigger, state, transition, style, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('square',
      [
        state('green', style({'background-color': 'green', 'height': '100px', 'transform': 'translateY(-100%)'})),
        state('red', style({'background-color': 'red', 'height': '100px', 'transform': 'translateX(100%)'})),
        transition('green => red', animate('.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)')),
        transition('red => green', animate(5000, keyframes([
          style({transform: 'translateX(100%)'}),
          style({transform: 'translateX(98%)'}),
          style({transform: 'translateX(95%)'}),
          style({transform: 'translateX(90%)'}),
          style({transform: 'translateX(80%)'}),
          style({transform: 'translateX(60%)'}),
          style({transform: 'translateX(30%)'}),
          style({transform: 'translateX(0%)'}),
          style({transform: 'translateX(-10%)'}),
          style({transform: 'translateX(-5%)'}),
          style({transform: 'translateX(-2%)'}),
          style({transform: 'translateX(0%)'}),
          style({transform: 'translateX(10%)'}),
          style({transform: 'translateX(15%)'}),
          style({transform: 'translateX(-15%)'}),
          style({transform: 'translateX(-40%)'}),
          style({transform: 'translateX(-80%)'}),
          style({transform: 'translateX(-90%)'}),
          style({transform: 'translateX(-95%)'}),
          style({transform: 'translateX(100%)'}),
        ])))
      ])
  ]
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

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }
}
