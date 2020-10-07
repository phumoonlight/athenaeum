import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePage2Component } from './page-page2.component';

describe('PagePage2Component', () => {
  let component: PagePage2Component;
  let fixture: ComponentFixture<PagePage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
