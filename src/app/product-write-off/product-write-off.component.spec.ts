import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWriteOffComponent } from './product-write-off.component';

describe('ProductWriteOffComponent', () => {
  let component: ProductWriteOffComponent;
  let fixture: ComponentFixture<ProductWriteOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWriteOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductWriteOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
