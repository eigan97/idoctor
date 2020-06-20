import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNombreComponent } from './consulta-nombre.component';

describe('ConsultaNombreComponent', () => {
  let component: ConsultaNombreComponent;
  let fixture: ComponentFixture<ConsultaNombreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaNombreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
