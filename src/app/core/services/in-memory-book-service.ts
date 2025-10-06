import { inject, Injectable, signal, Signal } from '@angular/core';
import { IBookService } from './ibook.service';
import { Book } from '../models/ibook';
import { NotificationService } from './notification';

@Injectable({ providedIn: 'root' })
export class InMemoryBookService implements IBookService {
  private booksSignal = signal<Book[]>([
  { id: 1, title: 'The Midnight Library', author: 'Matt Haig', year: 2020, genre: 'Ficción', image: 'https://ia802309.us.archive.org/view_archive.php?archive=/20/items/l_covers_0008/l_covers_0008_23.zip&file=0008238576-L.jpg' },
  { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', year: 2021, genre: 'Ciencia Ficción' },
  { id: 3, title: 'Klara and the Sun', author: 'Kazuo Ishiguro', year: 2021, genre: 'Ciencia Ficción' },
  { id: 4, title: 'Lessons in Chemistry', author: 'Bonnie Garmus', year: 2022, genre: 'Ficción' },
  { id: 5, title: 'Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', year: 2022, genre: 'Ficción' },
  { id: 6, title: 'Sea of Tranquility', author: 'Emily St. John Mandel', year: 2022, genre: 'Ciencia Ficción' },
  { id: 7, title: 'Demon Copperhead', author: 'Barbara Kingsolver', year: 2022, genre: 'Ficción' },
  { id: 8, title: 'The House of Eve', author: 'Sadeqa Johnson', year: 2023, genre: 'Historia' },
  { id: 9, title: 'Happy Place', author: 'Emily Henry', year: 2023, genre: 'Romance' }
  ]);

  private notificationService = inject(NotificationService);
  

  getAll(): Signal<Book[]> {
    return this.booksSignal;
  }

  getById(id: number): Signal<Book | undefined> {
    return signal(this.booksSignal().find(b => b.id === id));
  }

  create(book: Omit<Book, 'id'>): void {
    const newBook: Book = {
      ...book,
      id: this.generateId()
    };
    this.booksSignal.update(books => [newBook, ...books]);
    this.notificationService.showSuccess('Libro creado');
  }

  update(book: Book): void {
  this.booksSignal.update(books =>
    books.map(b => b.id === book.id ? { ...book } : b)
    );
    this.notificationService.showSuccess('Libro editado');
  }


  delete(id: number): void {
    this.booksSignal.set(this.booksSignal().filter(b => b.id !== id));
    this.notificationService.showSuccess('Libro eliminado');
  }

  private generateId(): number {
    const books = this.booksSignal();
    return Math.max(...books.map(b => b.id), 0) + 1;
  }
}
