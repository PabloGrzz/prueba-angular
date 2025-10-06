import { Signal } from '@angular/core';
import { Book } from '../models/ibook';

export abstract class IBookService {
  abstract getAll(): Signal<Book[]>;
  abstract getById(id: number): Signal<Book | undefined>;
  abstract create(book: Omit<Book, 'id'>): void;
  abstract update(book: Book): void;
  abstract delete(id: number): void;
}
