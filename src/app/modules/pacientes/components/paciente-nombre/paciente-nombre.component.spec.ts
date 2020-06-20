import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteNombreComponent } from './paciente-nombre.component';

describe('PacienteNombreComponent', () => {
  let component: PacienteNombreComponent;
  let fixture: ComponentFixture<PacienteNombreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteNombreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
