import { NgModule, ModuleWithProviders } from '@angular/core';
import { IBookService } from './ibook.service';
import { InMemoryBookService } from './in-memory-book-service';
import { HttpBookService } from './http-book-service';

@NgModule({})
export class CoreModule {
  static forRoot(useHttpService: boolean = false): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: IBookService,
          useClass: useHttpService ? HttpBookService : InMemoryBookService
        }
      ]
    };
  }
}