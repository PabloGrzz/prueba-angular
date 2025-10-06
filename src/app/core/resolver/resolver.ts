import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IBookService } from '../services/ibook.service';
import { Book } from '../models/ibook';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book | null> {
  private bookService = inject(IBookService);

  resolve(route: ActivatedRouteSnapshot): Book | null {
    const id = route.paramMap.get('id');
    if (!id) return null;
    
    const bookId = parseInt(id, 10);
    const bookSignal = this.bookService.getById(bookId);
    return bookSignal() || null;
  }
}