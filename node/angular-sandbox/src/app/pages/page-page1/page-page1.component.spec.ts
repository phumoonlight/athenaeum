import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePage1Component } from './page-page1.component';

describe('PagePage1Component', () => {
  let component: PagePage1Component;
  let fixture: ComponentFixture<PagePage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
