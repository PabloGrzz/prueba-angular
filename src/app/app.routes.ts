import { Routes } from '@angular/router';
import { LibraryComponent } from './core/components/library/library';
import { BookFormComponent } from './core/components/ibook-form/ibook-form';
import { BookResolver } from './core/resolver/resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/library', pathMatch: 'full' },
  { path: 'library', component: LibraryComponent },
  { path: 'library/new', component: BookFormComponent },
  { path: 'library/edit/:id', component: BookFormComponent,resolve: {book: BookResolver} },
  { path: '**', redirectTo: '/library' }
];