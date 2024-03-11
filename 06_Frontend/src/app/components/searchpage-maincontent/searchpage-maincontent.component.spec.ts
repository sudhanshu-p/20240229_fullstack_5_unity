import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpageMaincontentComponent } from './searchpage-maincontent.component';

describe('SearchpageMaincontentComponent', () => {
  let component: SearchpageMaincontentComponent;
  let fixture: ComponentFixture<SearchpageMaincontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchpageMaincontentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchpageMaincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
