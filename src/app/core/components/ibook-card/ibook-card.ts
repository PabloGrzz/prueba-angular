import { Component, inject, Signal } from '@angular/core';
import { IBookService } from '../../services/ibook.service';
import { Book } from '../../models/ibook';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification';


@Component({
  selector: 'app-ibook-card',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './ibook-card.html',
  styleUrls: ['./ibook-card.scss']
})
export class IBookCardComponent {
  private bookService = inject(IBookService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  
  books: Signal<Book[]> = this.bookService.getAll();

  editBook(id: number) {
    this.router.navigate(['/library/edit', id]);
  }

  deleteBook(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.bookService.delete(id);
    }else{
      this.notificationService.showError('Eliminación cancelada');
    }
  }
}