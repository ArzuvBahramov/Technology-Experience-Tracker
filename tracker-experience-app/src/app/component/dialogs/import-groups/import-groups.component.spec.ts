import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGroupsComponent } from './import-groups.component';

describe('ImportGroupsComponent', () => {
  let component: ImportGroupsComponent;
  let fixture: ComponentFixture<ImportGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
