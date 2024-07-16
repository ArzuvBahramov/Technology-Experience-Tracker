import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixWindowComponent } from './matrix-window.component';

describe('MatrixWindowComponent', () => {
  let component: MatrixWindowComponent;
  let fixture: ComponentFixture<MatrixWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrixWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
