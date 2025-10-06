// book-form.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBookService } from '../../services/ibook.service';
import { Book } from '../../models/ibook';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-book-form',
  templateUrl: './ibook-form.html',
  styleUrls: ['./ibook-form.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class BookFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(IBookService); 
  private notificationService = inject(NotificationService);
  
  bookForm: FormGroup;
  isEdit = signal<boolean>(false);
  bookId = signal<number | null>(null);

  constructor() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1000), Validators.max(2025)]],
      genre: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit() {
    const resolvedBook = this.route.snapshot.data['book'] as Book | null;
    
    if (resolvedBook) {
      this.isEdit.set(true);
      this.bookId.set(resolvedBook.id as number);
      this.loadBook(resolvedBook);
    }
  }

  loadBook(book: Book) {
    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      year: book.year,
      genre: book.genre,
      image: book.image || ''
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      
      if (this.isEdit() && this.bookId()) {
        this.bookService.update({ 
          ...bookData, 
          id: this.bookId()! 
        });
      } else {
        this.bookService.create(bookData);
      }
      
      this.router.navigate(['/library']);
    }
  }

  cancel() {
    this.router.navigate(['/library']);
    this.notificationService.showError('Operación cancelada');
  }
}