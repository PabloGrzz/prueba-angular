import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IBookCardComponent } from './ibook-card';

describe('IbookCard', () => {
  let component: IBookCardComponent;
  let fixture: ComponentFixture<IBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IBookCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
