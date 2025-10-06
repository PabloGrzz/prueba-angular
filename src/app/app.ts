import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule],
  template: `
  <div class="bg-grey-200 min-h-screen">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {}
