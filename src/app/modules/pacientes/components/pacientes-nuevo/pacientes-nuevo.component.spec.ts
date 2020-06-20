import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesNuevoComponent } from './pacientes-nuevo.component';

describe('PacientesNuevoComponent', () => {
  let component: PacientesNuevoComponent;
  let fixture: ComponentFixture<PacientesNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
