import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersSellerComponent } from './my-orders-seller.component';

describe('MyOrdersSellerComponent', () => {
  let component: MyOrdersSellerComponent;
  let fixture: ComponentFixture<MyOrdersSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersSellerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyOrdersSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
