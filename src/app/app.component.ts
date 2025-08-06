import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_MATERIAL_MODULES } from './shared/components/material';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    ...SHARED_MATERIAL_MODULES,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hero Cards App';

  constructor(){

  }
}
 