import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookCardComponent } from '../ibook-card/ibook-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    CommonModule,        
    IBookCardComponent  
  ],
  template: `
    <section class="py-10 px-4 max-w-7xl mx-auto">
      <div class="flex justify-end mb-8">
        <button 
          (click)="addNewBook()"
          class="px-6 py-3 bg-gradient-to-r from-violet-400 to-rose-400 text-black rounded-xl font-medium hover:from-violet-500 hover:to-rose-500 transition-all duration-300 animate-slide-up-pronounced">
          + Añadir Nuevo Libro
        </button>
      </div>
      
      <app-ibook-card></app-ibook-card>
    </section>
  `,
  styles: []
})
export class LibraryComponent {
  private router = inject(Router);

  addNewBook() {
    this.router.navigate(['/library/new']);
  }
}
