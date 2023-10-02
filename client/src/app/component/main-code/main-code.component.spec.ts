import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCodeComponent } from './main-code.component';

describe('MainCodeComponent', () => {
  let component: MainCodeComponent;
  let fixture: ComponentFixture<MainCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainCodeComponent]
    });
    fixture = TestBed.createComponent(MainCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
