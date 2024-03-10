import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersBuyersComponent } from './my-orders-buyers.component';

describe('MyOrdersBuyersComponent', () => {
  let component: MyOrdersBuyersComponent;
  let fixture: ComponentFixture<MyOrdersBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersBuyersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyOrdersBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
