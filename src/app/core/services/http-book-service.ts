import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IBookService } from './ibook.service';
import { Book } from '../models/ibook';
import { NotificationService } from './notification';

interface MockAPIBook {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class HttpBookService implements IBookService {
  private booksSignal = signal<Book[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  private apiUrl = 'https://68e3d2808e14f4523daec833.mockapi.io/api/v1/books';

  private notificationService = inject(NotificationService);

  constructor(private http: HttpClient) {
    this.loadInitialBooks();
  }

  getAll(): Signal<Book[]> {
    return this.booksSignal.asReadonly();
  }

  getById(id: number): Signal<Book | undefined> {
    return signal(this.booksSignal().find(b => b.id === id));
  }

  create(book: Omit<Book, 'id'>): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.post<MockAPIBook>(this.apiUrl, book).pipe(
      map(mockBook => this.normalizeBook(mockBook)),
      tap(newBook => {
        this.booksSignal.update(books => [newBook, ...books]);
        this.loadingSignal.set(false);
        this.notificationService.showSuccess('Libro creado');
      }),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  update(book: Book): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.put<MockAPIBook>(`${this.apiUrl}/${book.id}`, book).pipe(
      map(mockBook => this.normalizeBook(mockBook)),
      tap(updatedBook => {
        this.booksSignal.update(books =>
          books.map(b => b.id === updatedBook.id ? updatedBook : b)
        );
        this.loadingSignal.set(false);
        this.notificationService.showSuccess('Libro editado');
      }),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  delete(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.booksSignal.update(books => books.filter(b => b.id !== id));
        this.loadingSignal.set(false);
        this.notificationService.showSuccess('Libro eliminado');
      }),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  private loadInitialBooks(): void {
    this.loadingSignal.set(true);
    
    this.http.get<MockAPIBook[]>(this.apiUrl).pipe(
      map(mockBooks => mockBooks.map(book => this.normalizeBook(book))),
      tap(books => {
        this.booksSignal.set(books);
        this.loadingSignal.set(false);
      }),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  private normalizeBook(mockBook: MockAPIBook): Book {
    return {
      ...mockBook,
      id: parseInt(mockBook.id, 10)
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.loadingSignal.set(false);
    
    let errorMessage = 'Error de conexión';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    
    this.errorSignal.set(errorMessage);
    console.error('HTTP Error:', error);
    return throwError(() => error);
  }

  get loading(): Signal<boolean> {
    return this.loadingSignal.asReadonly();
  }

  get error(): Signal<string | null> {
    return this.errorSignal.asReadonly();
  }
}