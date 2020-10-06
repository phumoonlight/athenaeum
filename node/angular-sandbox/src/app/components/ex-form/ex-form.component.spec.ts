import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExFormComponent } from './ex-form.component';

describe('ExFormComponent', () => {
  let component: ExFormComponent;
  let fixture: ComponentFixture<ExFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
